import type { Recipe, RecipeItem } from "../../types/recipe";
import { getRecipeItem } from "../../utils/getRecipeItem";
import type { RecipeState } from "./state";

function getIdentifier(item?: RecipeItem) {
  if (!item) return;

  let result = item.item;
  if (item.data) {
    result += `:${item.data}`;
  }
  return result;
}

export function recipeFurnace({ input, output, identifier }: RecipeState): Recipe {
  const inputItem = getRecipeItem(input[0]);
  const outputItem = getRecipeItem(output, 1);
  if (!identifier) {
    identifier = outputItem?.item ?? "unknown";
  }
  return {
    format_version: "1.12.0",
    "minecraft:recipe_furnace": {
      description: {
        identifier,
      },
      tags: ["furnace"],
      input: getIdentifier(inputItem),
      output: getIdentifier(outputItem),
    },
  };
}
