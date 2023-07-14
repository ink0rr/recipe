import type { Recipe } from "../../types/recipe";
import type { RecipeParams } from "../params";
import { recipeFurnace } from "./furnace";
import { recipeShaped } from "./shaped";
import { recipeShapeless } from "./shapeless";

export function createRecipe({ type, input, output }: RecipeParams): Recipe {
  switch (type) {
    case "shaped":
      return recipeShaped(input, output);
    case "shaped_exact":
      return recipeShaped(input, output, true);
    case "shapeless":
      return recipeShapeless(input, output);
    case "furnace":
      return recipeFurnace(input[0], output);
    default:
      throw new Error(`Unknown recipe type: ${type}`);
  }
}
