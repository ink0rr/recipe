import type { RecipeItem } from "./RecipeItem";
import type { RecipeTag } from "./RecipeTag";

interface BaseRecipe {
  description: {
    identifier: string;
  };
  group?: string;
  /**
   * Defines where this recipe can be made.
   */
  tags?: RecipeTag[];
}

export interface RecipeBrewing extends BaseRecipe {
  /**
   * Input potion used in the brewing container recipe.
   */
  input?: string;
  /**
   * Output potion from the brewing container recipe.
   */
  output?: string;
  /**
   * Item used in the brewing container recipe with the input potion.
   */
  reagent?: string;
}

export interface RecipeFurnace extends BaseRecipe {
  /**
   * Items used as input for the furnace recipe.
   */
  input?: string;
  /**
   * Items used as output for the furnace recipe.
   */
  output?: string;
}

export interface RecipeShaped extends BaseRecipe {
  /**
   * Sets the priority order of the recipe. Lower numbers represent a higher priority.
   */
  priority?: number;
  /**
   * Keys to map characters to item names to be used in 'pattern'
   */
  key?: Record<string, RecipeItem>;
  /**
   * Characters that represent a pattern to be defined by keys
   */
  pattern?: string[];
  /**
   * When input items match the pattern then these items are the result.
   */
  result?: RecipeItem;
}

export interface RecipeShapeless extends BaseRecipe {
  /**
   * Sets the priority order of the recipe. Lower numbers represent a higher priority.
   */
  priority?: number;
  /**
   * Items used as input (without a shape) for the recipe.
   */
  ingredients?: RecipeItem[];
  /**
   * When the neccessary ingredients have been provided, this will be the result.
   */
  result?: RecipeItem;
}

export interface Recipe {
  format_version: "1.12.0";
  /**
   * Represents a recipe that for use with a potion brewing station.
   */
  "minecraft:recipe_brewing_container"?: RecipeBrewing;
  /**
   * Represents a recipe that for use with a Potion Brewing station.
   */
  "minecraft:recipe_brewing_mix"?: RecipeBrewing;
  /**
   * Represents a recipe for use with a furnace.
   */
  "minecraft:recipe_furnace"?: RecipeFurnace;
  /**
   * Represents a recipe that requires a dedicated pattern when using a crafting table.
   */
  "minecraft:recipe_shaped"?: RecipeShaped;
  /**
   * Represents a recipe that does not require a dedicated pattern.
   */
  "minecraft:recipe_shapeless"?: RecipeShapeless;
}
