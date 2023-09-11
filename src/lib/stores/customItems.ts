import { persisted } from "svelte-local-storage-store";
import type { Item } from "../types/Item";

export const customItems = persisted<Record<string, Item>>("customItems", {});
