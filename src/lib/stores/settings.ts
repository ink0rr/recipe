import { persisted } from "svelte-local-storage-store";

export const settings = persisted("settings", {
  namespace: "",
  compact: false,
  downloadImage: false,
});
