import type { Item } from "$lib/types/Item";
import type { OverlayOptions } from "sharp";
import type { RecipeState } from "../recipe/state";
import { TextureList, decodeImage, resizeOptions } from "./utils";

export async function crafting(
  recipe: RecipeState,
  customItems: Record<string, Item>,
  compact?: boolean,
) {
  const result = decodeImage(
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAfwAAADgAgMAAACbXzzUAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAMUExURcbGxjc3N4uLi////5b2zKAAAAAJcEhZcwAADsIAAA7CARUoSoAAAADbSURBVHja7doxDgIxDEVBX3Iv6UsuNQkrggQC8ueVjpTpksal8I6xXpnwt/F76FyZ8Pl8Pp/P5/P5fD6fz+fz+Xw+n8/n8zP946rmR/h90cnn87/v9zm2MuHv4s8/w8qEv40/nfzt+9f8bL/52X7zs/3mZ/vNz/abn+M/vJqf7Tc/2i9+in/fzPPj/OIn+8VP9ouf7Bc/2S9+sl/81337N9l+/P5Luj+deH/5fP47/PnnGn8w/s7+8/h8Pp/P5/P5fD6fz+fz+Xw+n8/n8/nv9T+7f8L/dV+5Vd0Ak9ZhC3hde1oAAAAASUVORK5CYII=",
  );
  const composites: OverlayOptions[] = [];

  const textures = new TextureList(customItems);

  let x = 0;
  let y = 0;
  for (const input of recipe.input) {
    if (input) {
      const image = textures.get(input).resize(64, 64, resizeOptions);
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
    const image = textures.get(recipe.output).resize(64, 64, resizeOptions);
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
