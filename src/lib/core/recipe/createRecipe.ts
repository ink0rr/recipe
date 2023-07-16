import type { Recipe } from "../../types/recipe";
import type { RecipeState } from "../state";
import { recipeFurnace } from "./furnace";
import { recipeShaped } from "./shaped";
import { recipeShapeless } from "./shapeless";

export function createRecipe(recipe: RecipeState): Recipe {
  if (recipe.type === "crafting") {
    switch (recipe.mode) {
      case "shaped":
        return recipeShaped(recipe);
      case "shaped_exact":
        return recipeShaped(recipe);
      case "shapeless":
        return recipeShapeless(recipe);
    }
  } else if (recipe.type === "furnace") {
    return recipeFurnace(recipe);
  }
  throw new Error(`Unknown recipe type: ${recipe.type}`);
}
