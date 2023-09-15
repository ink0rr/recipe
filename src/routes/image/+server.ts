import { loadRecipeState, type RecipeState } from "$lib/core/recipe/state";
import { getItem } from "$lib/utils/getItem";
import { error, type RequestHandler } from "@sveltejs/kit";
import { toUint8Array } from "js-base64";
import { inflate } from "pako";
import sharp, { type OverlayOptions, type Sharp } from "sharp";

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
    "data:image/png;base64,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",
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
      const image = getItemTexture(input).resize(48, 48);
      composites.push({
        input: await image.toBuffer(),
        left: 6 + x * 54,
        top: 6 + y * 54,
      });
    }
    if (++x % 3 === 0) {
      x = 0;
      y++;
    }
  }
  if (recipe.output) {
    const image = getItemTexture(recipe.output).resize(48, 48);
    composites.push({
      input: await image.toBuffer(),
      left: 300,
      top: 60,
    });
  }

  result.composite(composites);
  if (compact) {
    result.resize(168, 168, { position: "left" });
  }
  return result;
}

async function furnaceImage(recipe: RecipeState) {
  const result = decodeImage(
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAARAAAACuCAMAAADJY6KWAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAzUExURcbGxjc3N4uLi////7e3t9hMRf+2AP//Hx0aFCsmHUI7LzErIhMRDX1vWE5FNmBVQyMfGPld4/kAAAAJcEhZcwAADsIAAA7CARUoSoAAAANESURBVHhe7djZbtswFAZhN2uz5/2ftn/NY4KZVonlqAzqzFwI1Jqe74IGujOztf1Y38XFRb18jtWQaxIEnT1IBlzV5eVlvXyOCYIEQYIgQZAgSBAkCBIECYIEQYIgQZAgSBAkCBIECYIEQYIgQZAgSBAkCBIECYIEQYIgQZAgSBAkCBIECYIEQYIgQZAgSBAkCBIECYL+L5D8a7cqg9RH39ZurUoQJAj6WpD6R3y6pSkEQYKgdmtt9fL0BEGCoAkg/1eCIEGQIEgQJAgSBAmCzhvk6uqqVkcnCBIETQW5vr6u1d96/+5JBWStiSBIEDQV5ObmZpwa69ytk81qIKnOj0gQJAiaCpLGqZfW21Uc++rSRwmCBEFTQbJR3N7e1slul3XfRsb1dpXFobr6boIgQdBUkGwUI0jqW0eu/4NtpCCG6sZygiBB0FSQTD0+lE2jI+Q6rJar2U6tvrKQIEgQNA8k42fkcaMYT7PI6XG/vDXYJ6oP/S1BkCBoHkhGzhN95CxyGoR+Cq7laqpTq68sJAgSBM0DybzjE5k9V7pPGn02qgiG6sZygiBB0DyQ3E59l8hifKGd/mOQuvpugiBB0DwQ/M5mMb7QTsctZYsKYl9d+ihBkCBoHkjKE/2hJtB9xlvbVRZHayRBkCBoHkj7YcXPbn8HdzdqrUYSBAmCpu4h01urkQRBgqDzBjkhQZAgSBAkCBIECYImgORPrC1fq5en1/76JgmCBEHvgNQTR/eF25EgSBD0hSA/D9X50BeCtL++VfXRtwmCBEF/ggTh7u7u/v7+4eEhi8fHx7pxaOlT55EgSBAEkIwfh6enp+fn55eXlxz/NBFEEEFaTSO7R9fIOsFEEEEEaWXqjJ+f3bAEJDtJTrPI8fX1tZsIIoggrYyc7SIgzaRrtHU3EUQQQUaNDN5Mcpqi0a8IIkimFmQEyezZLtr4Y7meu4L0BEHfE6RN3cp6pIhSjoIIssf4nSAZto//vP+fQ5jkKIggggCkDZ5jX3STHAXJce8hyO++OUgaTUaNVtNIgrQEESQ1k15Oe/WEIIfqCUEO1RPfDCTV/Pvq0tsEQYKg7wbyYYIgQdB5g7QB11Yvn2OCIEHM7LR2u1/XT6b/ozrb8gAAAABJRU5ErkJggg==",
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
    const image = getItemTexture(input).resize(48, 48);
    composites.push({
      input: await image.toBuffer(),
      left: 6,
      top: 6,
    });
  }

  if (recipe.output) {
    const image = getItemTexture(recipe.output).resize(48, 48);
    composites.push({
      input: await image.toBuffer(),
      left: 192,
      top: 63,
    });
  }

  result.composite(composites);
  return result;
}

export const GET: RequestHandler = async ({ url, setHeaders }) => {
  try {
    const recipe = loadRecipeState(url.searchParams);
    const compact = url.searchParams.get("compact") === "true";
    const customItems = loadCustomItems(url.searchParams);

    let image: Sharp;
    if (recipe.type === "crafting") {
      image = await craftingImage(recipe, compact, customItems);
    } else {
      image = await furnaceImage(recipe);
    }
    setHeaders({
      "Content-Type": "image/png",
    });
    return new Response(await image.toBuffer());
  } catch {
    throw error(400, { message: "Invalid recipe." });
  }
};
