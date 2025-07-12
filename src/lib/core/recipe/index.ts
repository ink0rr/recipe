import type { Recipe } from "$lib/types/recipe";
import { crafting } from "./crafting";
import { furnace } from "./furnace";
import { stonecutter } from "./stonecutter";
import type { RecipeState } from "./state";

export function createRecipe(recipe: RecipeState): Recipe {
  switch (recipe.type) {
    case "crafting":
      return crafting(recipe);
    case "furnace":
      return furnace(recipe);
    case "stonecutter":
      return stonecutter(recipe);
    default:
      throw new Error(`Unknown recipe type: ${recipe.type}`);
  }
}
