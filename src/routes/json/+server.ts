import { createRecipe } from "$lib/core/recipe/createRecipe";
import { loadRecipeState } from "$lib/core/recipe/state";
import { error, type RequestHandler } from "@sveltejs/kit";

export const GET: RequestHandler = async ({ url }) => {
  try {
    const recipe = loadRecipeState(url.searchParams);
    recipe.fileName ||= recipe.output?.replace(/.*:/, "") ?? "recipe";
    const data = JSON.stringify(createRecipe(recipe), null, 2) + "\n";
    return new Response(data, {
      headers: {
        "Content-Type": "application/json",
        "Content-Disposition": `attachment; filename=${recipe.fileName}.json`,
      },
    });
  } catch {
    throw error(400, { message: "Invalid recipe." });
  }
};
