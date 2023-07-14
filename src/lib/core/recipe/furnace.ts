import type { Recipe, RecipeItem } from "../../types/recipe";
import { getRecipeItem } from "../../utils/getRecipeItem";

function getIdentifier(item?: RecipeItem) {
  if (!item) return;

  let result = item.item;
  if (item.data) {
    result += `:${item.data}`;
  }
  return result;
}

export function recipeFurnace(input: string, output: string): Recipe {
  const inputItem = getRecipeItem(input);
  const outputItem = getRecipeItem(output, 1);
  return {
    format_version: "1.12.0",
    "minecraft:recipe_furnace": {
      description: {
        identifier: getIdentifier(outputItem) ?? "unknown",
      },
      tags: ["furnace"],
      input: getIdentifier(inputItem),
      output: getIdentifier(outputItem),
    },
  };
}
