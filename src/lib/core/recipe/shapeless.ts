import type { Recipe, RecipeItem } from "../../types/recipe";
import { getRecipeItem } from "../../utils/getRecipeItem";

export function recipeShapeless(input: string[], output: string): Recipe {
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
  return {
    format_version: "1.12.0",
    "minecraft:recipe_shapeless": {
      description: {
        identifier: result?.item ?? "unknown",
      },
      tags: ["crafting_table"],
      ingredients,
      result,
    },
  };
}
