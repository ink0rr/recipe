import { loadRecipeState, type RecipeState } from "$lib/core/recipe/state";
import type { PageLoad } from "./$types";

export const load = (async ({ url }) => {
  return {
    recipe: loadRecipeState(url.searchParams),
  };
}) satisfies PageLoad<{ recipe: RecipeState }>;
