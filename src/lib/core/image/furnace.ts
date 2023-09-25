import type { Item } from "$lib/types/Item";
import type { OverlayOptions } from "sharp";
import type { RecipeState } from "../recipe/state";
import { TextureList, decodeImage, resizeOptions } from "./utils";

export async function furnace(recipe: RecipeState, customItems: Record<string, Item>) {
  const result = decodeImage(
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAXQAAAD4CAMAAADLuO12AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAzUExURcbGxjc3N4uLi////7e3t9hMRf+2AP//Hx0aFCsmHUI7LzErIhMRDX1vWE5FNmBVQyMfGPld4/kAAAAJcEhZcwAADsAAAA7AAWrWiQkAAAULSURBVHhe7dnZkqNIEETRmn1f/v9rB6c8MQQUyhBIjqbveUEZiRL17QesrT8AAAAAAADwGt+d4PuBj0MPdzuE6EXudgjRi9ztEKIXtWhH/DDwcehB9ACiBxA9gOgBRA8gegDRA4geQPQAogcQPYDoAUQPIHoA0QOIHkD0AKIHED2A6AFEDyB6ANEDiB5A9ACiBxA9gOgBRA8gegDRA4geQPQAogcQPYDoAUQPIHoA0QOIHkD0AKIHED2A6AFEDyB6ANEDiB5A9ACiBxA9gOgBRA8gegDRA76V6PpzPpta+HH72s1HEP2TWvhx+9rNRxD9k1r4cfvazUcQ/ZNa+HH72s1HvEt0/9yn6e5A9PMQfYHoAZeK3m4+ysddFtEDiB5A9IBLRf9WED2A6AFEDyB6ANEDiB5A9ACiBxA9gOgBRC/6ceCPDyN6EdEDiB7w/47+08Afd/XedxJFFy8fQvQiNyc60deIvnDd6D8PlkG31rrPy1dw85FHZUQvcu+RR2VEL3LvkUdlRC9y75FHZdeNLsug99Yv4N4Tj0uIXuTWE49LiF7k1hOPS4he5NYTj0uuG10vyV8GXo601tzL1foF3PqGt7oRvcidb3irG9GL3PmGt7oRvcidb3ir23Wj6yWpqF5O5i9P7c/XL+DOK97uQvQiN17xdheiF7nxire7EL3IjVe83eW60RV0+U29NOeRta/7vKxwq1P56LuIfiIffRfRT+Sj7yL6iXz0XdeMrriKOQ8sy5k+a6b7PerlTqfz8buIfjIfv4voJ/Pxu4h+Mh+/65rRFVPfmsfUZ80U2aMv/3I6uNGpfPRdRD+Rj76L6Cfy0XcR/UQ++q5rRlfI5bcUVnOF9mik+zT38tncd8XbXYhe5MYr3u5C9CI3XvF2F6IXufGKt7tcM7q+IQrt0fRy9XLUZuHo3upG9CJ3vuGtbkQvcucb3upG9CJ3vuGtbteMrpflMqY+L09qs+XL9YnceeJxCdGL3HricQnRi9x64nEJ0YvceuJxyTWji74lXk6BdfVodc8LuPXIozKiF7n3yKMyohe598ijMqIXuffIo7JrRm//6NHVo2kmHm3e92Tu/XBwIXqRmxOd6GvzTH22YraZeET0r80zvb2jwYXoRUQPIHoA0d8U0QOIHkD0AKIHED2A6AFEDyB6wKWi68ccpQf6uMtqv/OZiL7QfuczEX2h/c5nIvpC+53PVIru7zys+2FBRA8gegDRA94q+q8zHq28Q/T2O5/Nj9tH9HP5cfuIfi4/bh/Rz+XH7fsquiL/Nvh98MdAn/8cePtG98PwiegBRA8gesBWdMVV6L8Gfw/+Gej6VXiiFxE9gOgBRA9YRm/B9QKdB9datsITvYjoAUQPIHrAVnTF1T+OFF/R9ULVTJ91/XcwD0/0IqIHED2A6AFb0fWyVHRR+Hnwtp6HJ3oR0QOIHkD0gHn0eXBFHasPNBMFn8+J/iCiBxA9gOgBW9EVVi9Lt13Rvu4j+oOIHkD0AKIHLKO3oI3Wbj3F1l+IrkR/ENEDiB5A9IBl9Hlc/Ye0rlqP1QdtT1eiP4joAUQPIHrAVvQWVVdpn8fqA611JfqDiB5A9ACiB8yjyzK8zIM3LbgQvYjoAUQPIHrAMrq08HOazfnWEdGLiB5A9ACiB2xFF7edeLyJ6EVEDyB6ANEDvopeQfQiogcQPYDoAS3aUT4OPYgeQPQAogMAAAAAAOC9fXz8BwwWKPCkNf5nAAAAAElFTkSuQmCC",
  );
  const composites: OverlayOptions[] = [];

  const textures = new TextureList(customItems);

  const input = recipe.input[0];
  if (input) {
    const image = textures.get(input).resize(64, 64, resizeOptions);
    composites.push({
      input: await image.toBuffer(),
      left: 16,
      top: 16,
    });
  }

  if (recipe.output) {
    const image = textures.get(recipe.output).resize(64, 64, resizeOptions);
    composites.push({
      input: await image.toBuffer(),
      left: 264,
      top: 92,
    });
  }

  result.composite(composites);
  return result;
}
