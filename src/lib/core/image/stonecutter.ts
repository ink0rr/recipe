import type { Item } from "$lib/types/Item";
import type { OverlayOptions } from "sharp";
import type { RecipeState } from "../recipe/state";
import { TextureList, decodeImage, resizeOptions } from "./utils";

export async function stonecutter(recipe: RecipeState, customItems: Record<string, Item>) {
  const result =
    decodeImage(`data:image/png;base64,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
`);
  const composites: OverlayOptions[] = [];

  const textures = new TextureList(customItems);

  const input = recipe.input[0];
  if (input) {
    const image = textures.get(input).resize(64, 64, resizeOptions);
    composites.push({
      input: await image.toBuffer(),
      left: 28,
      top: 80,
    });
  }

  if (recipe.output) {
    const image = textures.get(recipe.output).resize(84, 84, resizeOptions);
    composites.push({
      input: await image.toBuffer(),
      left: 254,
      top: 70,
    });
  }

  result.composite(composites);
  return result;
}
