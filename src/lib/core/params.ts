import { decode, encode } from "js-base64";
import { z } from "zod";

const recipeParamsSchema = z.object({
  type: z.string().optional().default("shaped"),
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
});

export type RecipeParams = z.infer<typeof recipeParamsSchema>;

export function getRecipeParams(searchParams: URLSearchParams): RecipeParams {
  const object = Object.fromEntries(searchParams.entries());
  return recipeParamsSchema.parse(object);
}
