import data from "$lib/vanillaItems/data.json";
import type { Item } from "../types/Item";

export const vanillaItems = data as Record<string, Item>;
