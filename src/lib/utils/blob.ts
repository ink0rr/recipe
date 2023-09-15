import { saveRecipeState, type RecipeState } from "$lib/core/recipe/state";
import { settings } from "$lib/stores/settings";
import { get } from "svelte/store";

export async function getImageBlob(recipe: RecipeState) {
  const params = saveRecipeState(recipe, true);
  params.set("compact", `${get(settings).compact}`);
  const res = await fetch(`/image?${params}`);
  return res.blob();
}

export function getGdocsBlob(recipe: RecipeState) {
  const params = saveRecipeState(recipe, true);
  params.set("compact", `${get(settings).compact}`);
  return new Blob(
    [
      `<meta charset="utf-8"><b><a href="${location.href}" style="text-decoration:none;"><span><span>&hairsp;<img src="${location.origin}/image?${params}"></span></span></a></b>`,
    ],
    { type: "text/html" },
  );
}
