import { customItems } from "$lib/stores/customItems";
import { vanillaItems } from "$lib/vanillaItems";
import { startCase } from "lodash-es";
import { get } from "svelte/store";

export function getItem(itemId: string | null) {
  if (!itemId) return null;

  const vanilla = vanillaItems[itemId];
  if (vanilla) {
    return vanilla;
  }

  const customItem = get(customItems)[itemId];
  if (customItem) {
    return customItem;
  }

  return {
    name: startCase(itemId.split(":")[1] ?? itemId),
    identifier: itemId,
  };
}
