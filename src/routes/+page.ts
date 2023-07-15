import { deserializeState, type RecipeState } from "$lib/core/state";
import type { PageLoad } from "./$types";

export const load: PageLoad<{ recipe: RecipeState }> = async ({ url }) => {
  const param = url.searchParams.get("recipe");
  if (!param) {
    return {
      recipe: {
        type: "shaped",
        input: [],
        output: "",
      },
    };
  }

  return {
    recipe: deserializeState(param),
  };
};
