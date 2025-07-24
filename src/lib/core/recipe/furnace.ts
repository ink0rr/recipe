import type { Recipe, RecipeItem } from "$lib/types/recipe";
import type { RecipeState } from "./state";
import { getRecipeItem } from "./utils";

function getIdentifier(item?: RecipeItem) {
  if (!item) return;

  let result = item.item;
  if (item.data) {
    result += `:${item.data}`;
  }
  return result;
}

export function furnace({ input, output, identifier, tags }: RecipeState): Recipe {
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
      tags: tags ?? ["furnace"],
      input: getIdentifier(inputItem),
      output: getIdentifier(outputItem),
      unlock: {
        context: "AlwaysUnlocked",
      },
    },
  };
}
