import type { Recipe } from "$lib/types/recipe";
import type { RecipeState } from "../state";
import { shaped } from "./shaped";
import { shapeless } from "./shapeless";

export function crafting(recipe: RecipeState): Recipe {
  switch (recipe.mode) {
    case "shaped":
    case "shaped_exact":
      return shaped(recipe);
    case "shapeless":
      return shapeless(recipe);
    default:
      throw new Error(`Unknown crafting mode: ${recipe.mode}`);
  }
}
