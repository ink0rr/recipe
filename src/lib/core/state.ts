import { fromUint8Array, toUint8Array } from "js-base64";
import { deflate, inflate } from "pako";
import { z } from "zod";

export const recipeStateSchema = z.object({
  type: z.string(),
  identifier: z.string().optional(),
  fileName: z.string().optional(),
  input: z.array(z.string().or(z.null())).default([]),
  output: z.string().or(z.null()).default(""),
});

export type RecipeState = z.infer<typeof recipeStateSchema>;

export function serializeState(state: RecipeState) {
  const data = new TextEncoder().encode(JSON.stringify(state));
  const compressed = deflate(data, { level: 9 });
  return fromUint8Array(compressed, true);
}

export function deserializeState(state: string): RecipeState {
  const data = inflate(toUint8Array(state), { to: "string" });
  return recipeStateSchema.parse(JSON.parse(data));
}
