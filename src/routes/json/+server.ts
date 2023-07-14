import { getRecipeParams } from "$lib/core/params";
import { createRecipe } from "$lib/core/recipe/createRecipe";
import { json, type RequestHandler } from "@sveltejs/kit";

export const GET: RequestHandler = async ({ url, locals }) => {
  const recipeParams = getRecipeParams(url.searchParams);
  return json(createRecipe(recipeParams));
};
