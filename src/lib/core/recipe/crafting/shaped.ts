import type { Recipe, RecipeItem } from "$lib/types/recipe";
import type { RecipeState } from "../state";
import { getRecipeItem } from "../utils";

function findKey<T>(object: T, predicate: (value: T[keyof T]) => boolean) {
  for (const key in object) {
    if (predicate(object[key])) {
      return key;
    }
  }
  return undefined;
}

export function shaped({ mode, input, output, identifier }: RecipeState): Recipe {
  const patternKeys = [..."#ABCDEFGHIJKLMNOPQRSTUVWXYZ"];
  const key: Record<string, RecipeItem> = {};
  const grid = [
    [" ", " ", " "],
    [" ", " ", " "],
    [" ", " ", " "],
  ];

  for (const i in input) {
    const item = getRecipeItem(input[i]);
    if (!item) continue;

    let k = findKey(key, (v) => v.item === item.item && v.data === item.data);
    if (!k) {
      k = patternKeys.shift() as string;
      key[k] = item;
    }
    const idx = parseInt(i);
    grid[Math.floor(idx / 3)][idx % 3] = k;
  }

  let pattern = grid.map((s) => s.join(""));

  // Remove extra spaces
  if (mode !== "shaped_exact") {
    const min: number[] = [];
    const max: number[] = [];
    for (const s of pattern) {
      min.push(3 - s.trimStart().length);
      max.push(3 - s.trimEnd().length);
    }
    const start = Math.min(...min);
    const end = 3 - Math.min(...max);

    const isNotEmpty = (s: string) => s.trim().length > 0;
    const len = pattern.filter(isNotEmpty).length;
    pattern = pattern
      .map((s) => s.slice(start, end))
      .filter((s, i) => isNotEmpty(s) || (i === 1 && len === 2));
  }
  const result = getRecipeItem(output, 1);
  if (!identifier) {
    identifier = result?.item ?? "unknown";
  }
  return {
    format_version: "1.12.0",
    "minecraft:recipe_shaped": {
      description: {
        identifier,
      },
      tags: ["crafting_table"],
      pattern,
      key,
      result,
    },
  };
}
