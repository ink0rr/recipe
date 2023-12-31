export type RecipeTag =
  | (string & Record<never, never>)
  | "blast_furnace"
  | "brewing_stand"
  | "campfire"
  | "cartography_table"
  | "crafting_table"
  | "furnace"
  | "material_reducer"
  | "smoker"
  | "soul_campfire"
  | "stonecutter";
