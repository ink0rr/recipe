import { deserializeState, type RecipeState } from "$lib/core/state";
import type { PageLoad } from "./$types";

export const load = (async ({ url }) => {
  const param = url.searchParams.get("recipe");
  if (!param) {
    return {
      recipe: {
        type: "crafting",
        mode: "shaped",
        input: [],
        output: null,
      },
    };
  }

  return {
    recipe: deserializeState(param),
  };
}) satisfies PageLoad<{ recipe: RecipeState }>;
