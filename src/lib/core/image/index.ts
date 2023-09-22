import type { Sharp } from "sharp";
import type { RecipeState } from "../recipe/state";
import { crafting } from "./crafting";
import { furnace } from "./furnace";

export async function createRecipeImage(recipe: RecipeState, compact?: boolean) {
  let image: Sharp;
  switch (recipe.type) {
    case "crafting":
      image = await crafting(recipe, compact);
      break;
    case "furnace":
      image = await furnace(recipe);
      break;
  }
  return image.toBuffer();
}
