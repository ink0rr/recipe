import { page } from "$app/stores";
import { customItems } from "$lib/stores/customItems";
import { vanillaItems } from "$lib/vanillaItems";
import { get } from "svelte/store";

export function getItem(itemId: string | null) {
  if (!itemId) return null;

  const vanilla = vanillaItems[itemId];
  if (vanilla) {
    return vanilla;
  }

  const customItem = get(customItems)[itemId];
  const result = {
    identifier: itemId,
    name: itemId,
    texture: getTextureFromParams(itemId) ?? "./missing.png",
  };
  return Object.assign(result, customItem);
}

function getTextureFromParams(itemId: string) {
  const param = get(page).url.searchParams;
  const customItemsParam = param.get("customItems");

  if (customItemsParam) {
    const customItems = new URLSearchParams(customItemsParam);
    return customItems.get(btoa(itemId));
  }
  return null;
}
