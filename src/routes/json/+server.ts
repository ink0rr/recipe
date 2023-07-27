import { createRecipe } from "$lib/core/recipe/createRecipe";
import { deserializeState } from "$lib/core/state";
import { error, type RequestHandler } from "@sveltejs/kit";

export const GET: RequestHandler = async ({ url }) => {
  try {
    const param = url.searchParams.get("recipe")!;
    const recipe = deserializeState(param);
    const fileName =
      recipe.fileName ||
      (recipe.identifier?.replace(/.*:/, "") ?? recipe.output?.replace(/.*:/, "") ?? "recipe");

    const data = JSON.stringify(createRecipe(recipe), null, 2) + "\n";
    return new Response(data, {
      headers: {
        "Content-Type": "application/json",
        "Content-Disposition": `attachment; filename=${fileName}.json`,
      },
    });
  } catch {
    throw error(400, { message: "Invalid recipe." });
  }
};
