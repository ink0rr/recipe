import { z } from "zod";

type RecipeState = {
  type: string;
  identifier?: string;
  fileName?: string;
  input: string[];
  output?: string;
};
