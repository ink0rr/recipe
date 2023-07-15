import type { Recipe } from "../../types/recipe";
import type { RecipeState } from "../state";
import { recipeFurnace } from "./furnace";
import { recipeShaped } from "./shaped";
import { recipeShapeless } from "./shapeless";

export function createRecipe(state: RecipeState): Recipe {
  switch (state.type) {
    case "shaped":
      return recipeShaped(state);
    // TODO: Remove this case
    case "shaped_exact":
      return recipeShaped(state);
    case "shapeless":
      return recipeShapeless(state);
    case "furnace":
      return recipeFurnace(state);
    default:
      throw new Error(`Unknown recipe type: ${state.type}`);
  }
}
