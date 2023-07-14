import type { RecipeItem } from "../types/recipe";
import { getItem } from "./getItem";

export function getRecipeItem(id: string | null, count?: number): RecipeItem | undefined {
  const item = getItem(id);
  if (!item) {
    return undefined;
  }
  return {
    item: item.identifier,
    data: item.data,
    count,
  };
}
