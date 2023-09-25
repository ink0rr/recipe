import { customItems } from "$lib/stores/customItems";
import { fromUint8Array } from "js-base64";
import { get } from "svelte/store";
import type { RecipeState } from "./recipe/state";

function fetchRecipeImage(recipe: RecipeState) {
  const itemIds = new Set([...recipe.input, recipe.output]);
  const entries = [...itemIds].map((id) => [id, get(customItems)[id!]]);
  const items = Object.fromEntries(entries);

  return fetch(`/image`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      recipe,
      customItems: items,
    }),
  });
}

export async function imageBlob(recipe: RecipeState) {
  const res = await fetchRecipeImage(recipe);
  return res.blob();
}

export async function gdocsBlob(recipe: RecipeState) {
  const res = await fetchRecipeImage(recipe);
  const buffer = await res.arrayBuffer();
  const base64 = fromUint8Array(new Uint8Array(buffer));
  return new Blob(
    [
      `<meta charset="utf-8"><b><a href="${location.href}" style="text-decoration:none;"><span><span>&hairsp;<img src="data:image/png;base64,${base64}"></span></span></a></b>`,
    ],
    { type: "text/html" },
  );
}
