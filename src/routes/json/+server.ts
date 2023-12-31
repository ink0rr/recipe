import { createRecipe } from "$lib/core/recipe";
import { loadRecipeState } from "$lib/core/recipe/state";
import { getRecipeFileName } from "$lib/utils/getRecipeFileName";
import { error, type RequestHandler } from "@sveltejs/kit";

export const GET: RequestHandler = async ({ url }) => {
  try {
    const recipe = loadRecipeState(url.searchParams);
    const fileName = getRecipeFileName(recipe);

    const data = JSON.stringify(createRecipe(recipe), null, 2) + "\n";
    return new Response(data, {
      headers: {
        "Content-Type": "application/json",
        "Content-Disposition": `attachment; filename=${fileName}.json`,
      },
    });
  } catch {
    error(400, { message: "Invalid recipe." });
  }
};
