import { createRecipeImage } from "$lib/core/image";
import { recipeStateSchema } from "$lib/core/recipe/state";
import { getRecipeFileName } from "$lib/utils/getRecipeFileName";
import { error, type RequestHandler } from "@sveltejs/kit";
import { z } from "zod";

export const POST: RequestHandler = async ({ url, request }) => {
  try {
    const data = await request.json();
    const recipe = recipeStateSchema.parse(data.recipe);
    const fileName = getRecipeFileName(recipe);

    const itemSchema = z.object({
      name: z.string(),
      identifier: z.string(),
      data: z.number().optional(),
      texture: z.string().optional(),
    });
    const customItems = z.record(itemSchema).parse(data.customItems);

    const compact = url.searchParams.get("compact") === "true";
    const download = url.searchParams.get("download") === "true";
    const image = await createRecipeImage(recipe, customItems, compact);

    return new Response(image, {
      headers: {
        "Content-Type": "image/png",
        "Content-Disposition": `${download ? "attachment; " : ""}filename=${fileName}.png`,
      },
    });
  } catch {
    throw error(400, { message: "Invalid recipe." });
  }
};
