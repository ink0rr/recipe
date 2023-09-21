import { loadRecipeState, type RecipeState } from "$lib/core/recipe/state";
import { getItem } from "$lib/utils/getItem";
import { error, type RequestHandler } from "@sveltejs/kit";
import { toUint8Array } from "js-base64";
import { inflate } from "pako";
import sharp, { type OverlayOptions, type ResizeOptions, type Sharp } from "sharp";

const resizeOptions: ResizeOptions = {
  background: "#00000000",
  fit: "contain",
  kernel: "nearest",
};

const missingTexture = decodeImage(
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAt1BMVEX/AP//AP//AP/9AP0fAB8AAAABAAEAAAD/AP/9AP0fAB8BAAH/AP/+AP4YABgBAAH/AP/+AP4WABYBAAH+AP4XABcBAAH+AP4XABf/AP//AP/+AP4YABgBAAEAAAD/AP/+AP4ZABkDAAP+AP4SABL+AP4UABT+AP7+AP7+AP7+AP7+AP70APRXAFcUABQYABgXABcXABcXABceAB4VABUXABcSABJYAFj0APT+AP7+AP7+AP79AP2J1Tm8AAAAAWJLR0QF+G/pxwAAAAd0SU1FB+EJDhcOFGEzO8MAAAAJdnBBZwAAACIAAAAiAPgEXxQAAADzSURBVDjL1dDZkoIwEAXQy3IBBQVFUVHcd8d9G5f//64pCy0yqQrv3n5LnaTTDWTRdMAwSctmFojAAQpF0lUCDyiVSV8JAqBSJcM8UKuTUR5oNL8SaFlaMdDukEnXzgLd8YJ34h7QH5DDJEoT+q4FKaMx/0cGk6kMjMKsMm8sXtVejlY/681429k1X7WvHoomzGP5VE8PzoPL9Po7ufXv6YXao/Q0IL24WclNJXC5ycBy/fA9VTIkt0ugF38G9xwdwk66CXm+A3FL2J7Ywo7I3QIINMUfvgbs53kgJE+PPOCThxngKYFLHp+AowQWaRqALoI/Q50gLzlZBxIAAAAldEVYdGRhdGU6Y3JlYXRlADIwMTctMDktMTVUMDE6MTQ6MjArMDI6MDDBw4POAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDE3LTA5LTE1VDAxOjE0OjIwKzAyOjAwsJ47cgAAAABJRU5ErkJggg==",
);

function decodeImage(base64: string) {
  const bytes = toUint8Array(base64.split(",")[1]);
  return sharp(bytes);
}

function loadCustomItems(params: URLSearchParams) {
  const customItems = params.get("customItems");
  try {
    const data = inflate(toUint8Array(customItems!), { to: "string" });
    return JSON.parse(data);
  } catch {
    return {};
  }
}

async function craftingImage(
  recipe: RecipeState,
  compact: boolean,
  customItems: Record<string, string>,
) {
  const result = decodeImage(
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAfwAAADgAgMAAACbXzzUAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAMUExURcbGxjc3N4uLi////5b2zKAAAAAJcEhZcwAADsIAAA7CARUoSoAAAADbSURBVHja7doxDgIxDEVBX3Iv6UsuNQkrggQC8ueVjpTpksal8I6xXpnwt/F76FyZ8Pl8Pp/P5/P5fD6fz+fz+Xw+n8/n8zP946rmR/h90cnn87/v9zm2MuHv4s8/w8qEv40/nfzt+9f8bL/52X7zs/3mZ/vNz/abn+M/vJqf7Tc/2i9+in/fzPPj/OIn+8VP9ouf7Bc/2S9+sl/81337N9l+/P5Luj+deH/5fP47/PnnGn8w/s7+8/h8Pp/P5/P5fD6fz+fz+Xw+n8/n8/nv9T+7f8L/dV+5Vd0Ak9ZhC3hde1oAAAAASUVORK5CYII=",
  );
  const composites: OverlayOptions[] = [];

  const textures = new Map<string, Sharp>();
  const getItemTexture = (id: string) => {
    if (textures.has(id)) {
      return textures.get(id)!;
    }
    const item = getItem(id);
    const texture = customItems[id]
      ? decodeImage(customItems[id])
      : item?.texture
      ? decodeImage(item.texture)
      : missingTexture;
    textures.set(id, texture);
    return texture;
  };

  let x = 0;
  let y = 0;
  for (const input of recipe.input) {
    if (input) {
      const image = getItemTexture(input).resize(64, 64, resizeOptions);
      composites.push({
        input: await image.toBuffer(),
        left: 8 + x * 72,
        top: 8 + y * 72,
      });
    }
    if (++x % 3 === 0) {
      x = 0;
      y++;
    }
  }
  if (recipe.output) {
    const image = getItemTexture(recipe.output).resize(64, 64, resizeOptions);
    composites.push({
      input: await image.toBuffer(),
      left: 400,
      top: 80,
    });
  }

  result.composite(composites);
  if (compact) {
    result.resize(224, 224, { kernel: "nearest", position: "left" });
  }
  return result;
}

async function furnaceImage(recipe: RecipeState) {
  const result = decodeImage(
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAXQAAAD4CAMAAADLuO12AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAzUExURcbGxjc3N4uLi////7e3t9hMRf+2AP//Hx0aFCsmHUI7LzErIhMRDX1vWE5FNmBVQyMfGPld4/kAAAAJcEhZcwAADsAAAA7AAWrWiQkAAAULSURBVHhe7dnZkqNIEETRmn1f/v9rB6c8MQQUyhBIjqbveUEZiRL17QesrT8AAAAAAADwGt+d4PuBj0MPdzuE6EXudgjRi9ztEKIXtWhH/DDwcehB9ACiBxA9gOgBRA8gegDRA4geQPQAogcQPYDoAUQPIHoA0QOIHkD0AKIHED2A6AFEDyB6ANEDiB5A9ACiBxA9gOgBRA8gegDRA4geQPQAogcQPYDoAUQPIHoA0QOIHkD0AKIHED2A6AFEDyB6ANEDiB5A9ACiBxA9gOgBRA8gegDRA76V6PpzPpta+HH72s1HEP2TWvhx+9rNRxD9k1r4cfvazUcQ/ZNa+HH72s1HvEt0/9yn6e5A9PMQfYHoAZeK3m4+ysddFtEDiB5A9IBLRf9WED2A6AFEDyB6ANEDiB5A9ACiBxA9gOgBRC/6ceCPDyN6EdEDiB7w/47+08Afd/XedxJFFy8fQvQiNyc60deIvnDd6D8PlkG31rrPy1dw85FHZUQvcu+RR2VEL3LvkUdlRC9y75FHZdeNLsug99Yv4N4Tj0uIXuTWE49LiF7k1hOPS4he5NYTj0uuG10vyV8GXo601tzL1foF3PqGt7oRvcidb3irG9GL3PmGt7oRvcidb3ir23Wj6yWpqF5O5i9P7c/XL+DOK97uQvQiN17xdheiF7nxire7EL3IjVe83eW60RV0+U29NOeRta/7vKxwq1P56LuIfiIffRfRT+Sj7yL6iXz0XdeMrriKOQ8sy5k+a6b7PerlTqfz8buIfjIfv4voJ/Pxu4h+Mh+/65rRFVPfmsfUZ80U2aMv/3I6uNGpfPRdRD+Rj76L6Cfy0XcR/UQ++q5rRlfI5bcUVnOF9mik+zT38tncd8XbXYhe5MYr3u5C9CI3XvF2F6IXufGKt7tcM7q+IQrt0fRy9XLUZuHo3upG9CJ3vuGtbkQvcucb3upG9CJ3vuGtbteMrpflMqY+L09qs+XL9YnceeJxCdGL3HricQnRi9x64nEJ0YvceuJxyTWji74lXk6BdfVodc8LuPXIozKiF7n3yKMyohe598ijMqIXuffIo7JrRm//6NHVo2kmHm3e92Tu/XBwIXqRmxOd6GvzTH22YraZeET0r80zvb2jwYXoRUQPIHoA0d8U0QOIHkD0AKIHED2A6AFEDyB6wKWi68ccpQf6uMtqv/OZiL7QfuczEX2h/c5nIvpC+53PVIru7zys+2FBRA8gegDRA94q+q8zHq28Q/T2O5/Nj9tH9HP5cfuIfi4/bh/Rz+XH7fsquiL/Nvh98MdAn/8cePtG98PwiegBRA8gesBWdMVV6L8Gfw/+Gej6VXiiFxE9gOgBRA9YRm/B9QKdB9datsITvYjoAUQPIHrAVnTF1T+OFF/R9ULVTJ91/XcwD0/0IqIHED2A6AFb0fWyVHRR+Hnwtp6HJ3oR0QOIHkD0gHn0eXBFHasPNBMFn8+J/iCiBxA9gOgBW9EVVi9Lt13Rvu4j+oOIHkD0AKIHLKO3oI3Wbj3F1l+IrkR/ENEDiB5A9IBl9Hlc/Ye0rlqP1QdtT1eiP4joAUQPIHrAVvQWVVdpn8fqA611JfqDiB5A9ACiB8yjyzK8zIM3LbgQvYjoAUQPIHrAMrq08HOazfnWEdGLiB5A9ACiB2xFF7edeLyJ6EVEDyB6ANEDvopeQfQiogcQPYDoAS3aUT4OPYgeQPQAogMAAAAAAOC9fXz8BwwWKPCkNf5nAAAAAElFTkSuQmCC",
  );
  const composites: OverlayOptions[] = [];

  const textures = new Map<string, Sharp>();
  const getItemTexture = (id: string) => {
    if (textures.has(id)) {
      return textures.get(id)!;
    }
    const item = getItem(id);
    const texture = item?.texture ? decodeImage(item.texture) : missingTexture;
    textures.set(id, texture);
    return texture;
  };

  const input = recipe.input[0];
  if (input) {
    const image = getItemTexture(input).resize(64, 64, resizeOptions);
    composites.push({
      input: await image.toBuffer(),
      left: 16,
      top: 16,
    });
  }

  if (recipe.output) {
    const image = getItemTexture(recipe.output).resize(64, 64, resizeOptions);
    composites.push({
      input: await image.toBuffer(),
      left: 264,
      top: 92,
    });
  }

  result.composite(composites);
  return result;
}

export const GET: RequestHandler = async ({ url, setHeaders }) => {
  try {
    const recipe = loadRecipeState(url.searchParams);
    recipe.fileName ||= recipe.output?.replace(/.*:/, "") ?? "recipe";
    const compact = url.searchParams.get("compact") === "true";
    const customItems = loadCustomItems(url.searchParams);
    const download = url.searchParams.get("download") === "true";
    let image: Sharp;
    if (recipe.type === "crafting") {
      image = await craftingImage(recipe, compact, customItems);
    } else {
      image = await furnaceImage(recipe);
    }
    setHeaders({
      "Content-Type": "image/png",
      "Content-Disposition": `${download ? "attachment; " : ""}filename=${recipe.fileName}.png`,
    });
    return new Response(await image.toBuffer());
  } catch {
    throw error(400, { message: "Invalid recipe." });
  }
};
