import { createRecipe } from "$lib/core/recipe/createRecipe";
import { deserializeState } from "$lib/core/state";
import { error, json, type RequestHandler } from "@sveltejs/kit";

export const GET: RequestHandler = async ({ url }) => {
  try {
    const param = url.searchParams.get("recipe")!;
    const recipe = deserializeState(param);
    return json(createRecipe(recipe));
  } catch {
    throw error(400, { message: "Invalid recipe." });
  }
};
