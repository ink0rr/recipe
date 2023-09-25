import type { Item } from "$lib/types/Item";
import type { Sharp } from "sharp";
import type { RecipeState } from "../recipe/state";
import { crafting } from "./crafting";
import { furnace } from "./furnace";

export async function createRecipeImage(
  recipe: RecipeState,
  customItems: Record<string, Item>,
  compact?: boolean,
) {
  let image: Sharp;
  switch (recipe.type) {
    case "crafting":
      image = await crafting(recipe, customItems, compact);
      break;
    case "furnace":
      image = await furnace(recipe, customItems);
      break;
  }
  return image.toBuffer();
}
