import { createRecipeImage } from "$lib/core/image";
import { loadRecipeState } from "$lib/core/recipe/state";
import { customItems } from "$lib/stores/customItems";
import { error, type RequestHandler } from "@sveltejs/kit";
import { toUint8Array } from "js-base64";
import { inflate } from "pako";

function loadCustomItems(params: URLSearchParams) {
  const customItems = params.get("customItems");
  try {
    const data = inflate(toUint8Array(customItems!), { to: "string" });
    const entries = Object.entries(JSON.parse(data));
    return Object.fromEntries(
      entries.map(([id, texture]) => [
        id,
        {
          name: id,
          identifier: id,
          texture,
        },
      ]),
    );
  } catch {
    return {};
  }
}

export const GET: RequestHandler = async ({ url }) => {
  try {
    const recipe = loadRecipeState(url.searchParams);
    recipe.fileName ||= recipe.output?.replace(/.*:/, "") ?? "recipe";

    customItems.update((items) => {
      return Object.assign(items, loadCustomItems(url.searchParams));
    });
    const compact = url.searchParams.get("compact") === "true";
    const download = url.searchParams.get("download") === "true";
    const image = await createRecipeImage(recipe, compact);

    return new Response(image, {
      headers: {
        "Content-Type": "image/png",
        "Content-Disposition": `${download ? "attachment; " : ""}filename=${recipe.fileName}.png`,
      },
    });
  } catch {
    throw error(400, { message: "Invalid recipe." });
  }
};
