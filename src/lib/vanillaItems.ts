import json from "$lib/vanillaItems.json";
import type { Item } from "./types/Item";

export const vanillaItems = json as Record<string, Item>;
