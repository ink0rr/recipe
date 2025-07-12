import type { Recipe, RecipeItem } from "$lib/types/recipe";
import type { RecipeState } from "./state";
import { getRecipeItem } from "./utils";

export function stonecutter({ input, output, identifier }: RecipeState): Recipe {
  const ingredients: RecipeItem[] = [];

  const inputItem = getRecipeItem(input[0], 1);
  if (inputItem) {
    ingredients.push(inputItem);
  }

  const result = getRecipeItem(output, 1);
  if (!identifier) {
    identifier = result?.item ?? "unknown";
  }

  return {
    format_version: "1.12.0",
    "minecraft:recipe_shapeless": {
      description: {
        identifier,
      },
      tags: ["stonecutter"],
      ingredients,
      result,
    },
  };
}
