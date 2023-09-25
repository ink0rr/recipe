import type { RecipeState } from "$lib/core/recipe/state";

export function getRecipeFileName(recipe: RecipeState) {
  const identifier = recipe.identifier ?? recipe.output;
  return recipe.fileName ?? identifier?.replace(/.*:/, "") ?? "recipe";
}
