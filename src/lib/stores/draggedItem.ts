import { writable } from "svelte/store";

export const draggedItem = writable<string | null>(null);
