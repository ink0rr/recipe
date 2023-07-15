import { fromUint8Array, toUint8Array } from "js-base64";
import { deflate, inflate } from "pako";

export type RecipeState = {
  type: string;
  identifier?: string;
  fileName?: string;
  input?: string[];
  output?: string;
};

export function serializeState(state: RecipeState) {
  const data = new TextEncoder().encode(JSON.stringify(state));
  const compressed = deflate(data, { level: 9 });
  return fromUint8Array(compressed, true);
}

export function deserializeState(state: string) {
  const data = toUint8Array(state);
  return inflate(data, { to: "string" });
}
