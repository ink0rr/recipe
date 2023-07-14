import { browser } from "$app/environment";
import { writable } from "svelte/store";
import type { Item } from "../types/Item";

function loadCustomItems(): Record<string, Item> {
  if (!browser) return {};

  const str = localStorage.getItem("customItems") ?? "{}";
  try {
    const items = JSON.parse(str);
    if (typeof items !== "object" || Array.isArray(items)) {
      throw new Error("Invalid custom items type");
    }
    return items;
  } catch {
    localStorage.setItem("customItems", "{}");
    return {};
  }
}

export const customItems = writable<Record<string, Item>>(loadCustomItems());
