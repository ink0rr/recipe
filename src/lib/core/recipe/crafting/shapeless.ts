import type { Recipe, RecipeItem } from "$lib/types/recipe";
import type { RecipeState } from "../state";
import { getRecipeItem } from "../utils";

export function shapeless({ input, output, identifier }: RecipeState): Recipe {
  const ingredients: RecipeItem[] = [];

  for (const id of input) {
    const item = getRecipeItem(id, 1);
    if (!item) continue;

    const ingredient = ingredients.find((i) => i.item === item.item && i.data === item.data);

    if (ingredient) {
      ingredient.count ??= 1;
      ingredient.count++;
    } else {
      ingredients.push(item);
    }
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
      tags: ["crafting_table"],
      ingredients,
      result,
      unlock: {
        context: "AlwaysUnlocked",
      },
    },
  };
}
