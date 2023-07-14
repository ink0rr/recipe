import { decode, encode } from "js-base64";
import { z } from "zod";

const recipeParamsSchema = z.object({
  type: z.string().optional().default("shaped"),
  input: z
    .string()
    .transform((value) => decode(value).split(","))
    .optional()
    .default(""),
  output: z
    .string()
    .transform((value) => decode(value))
    .optional()
    .default(""),
});

export type RecipeParams = z.infer<typeof recipeParamsSchema>;

export function getRecipeParams(searchParams: URLSearchParams): RecipeParams {
  const object = Object.fromEntries(searchParams.entries());
  return recipeParamsSchema.parse(object);
}

export function getSearchParams(recipeParams: RecipeParams): URLSearchParams {
  const { type, input, output } = recipeParams;
  const searchParams = new URLSearchParams({
    type,
    input: encode(input.join(",")),
    output: encode(output ?? ""),
  });

  return searchParams;
}
