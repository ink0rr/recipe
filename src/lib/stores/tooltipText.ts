import { writable } from "svelte/store";

export const tooltipText = writable<string | null>(null);
