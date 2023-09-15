import { decode, fromUint8Array, toUint8Array } from "js-base64";
import { deflate, inflate } from "pako";
import { z } from "zod";

export function saveRecipeState(state: RecipeState) {
  const json = JSON.stringify(state, (_, value) => (value === "" ? undefined : value));
  const data = new TextEncoder().encode(json);
  const compressed = deflate(data, { level: 9 });
  return fromUint8Array(compressed, true);
}

export function loadRecipeState(params: URLSearchParams): RecipeState {
  const recipe = params.get("recipe");
  if (recipe) {
    const data = inflate(toUint8Array(recipe), { to: "string" });
    return recipeStateSchema.parse(JSON.parse(data));
  }
  if (params.has("type")) {
    const object = Object.fromEntries(params.entries());
    const state = oldRecipeSchema.parse(object);
    return state;
  }
  return {
    type: "crafting",
    mode: "shaped",
    input: [],
    output: null,
  };
}

const recipeStateSchema = z.object({
  type: z.union([z.literal("crafting"), z.literal("furnace")]),
  mode: z
    .union([z.literal("shaped"), z.literal("shaped_exact"), z.literal("shapeless"), z.null()])
    .default("shaped"),
  identifier: z.string().optional(),
  fileName: z.string().optional(),
  input: z.array(z.string().or(z.null())).default([]),
  output: z.string().or(z.null()).default(null),
});

export type RecipeState = z.infer<typeof recipeStateSchema>;

const oldRecipeSchema = z
  .object({
    type: z
      .union([z.literal("shaped"), z.literal("shaped_exact"), z.literal("shapeless")])
      .default("shaped"),
    input: z
      .string()
      .default("")
      .transform((value) => decode(value).split(",")),
    output: z
      .string()
      .default("")
      .transform((value) => {
        const decoded = decode(value);
        if (decoded === "") {
          return null;
        }
        return decoded;
      }),
  })
  .transform(
    (value): RecipeState => ({
      type: "crafting",
      mode: value.type,
      input: value.input,
      output: value.output,
    })
  );
