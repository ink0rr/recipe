<script lang="ts">
  import type { RecipeState } from "$lib/core/recipe/state";
  import { TrashBinOutline } from "flowbite-svelte-icons";
  import ItemSlot from "./ItemSlot.svelte";

  export let title: string;
  export let centered = false;
  export let recipe: RecipeState;
</script>

<div class="flex flex-col rounded border-2 border-black bg-[#C6C6C6] p-2">
  <div class="relative">
    <button
      type="button"
      class="absolute right-0 top-0 p-2 hover:bg-[#DDDDDD] [&>*]:pointer-events-none"
      on:click={() => {
        recipe.identifier = undefined;
        recipe.fileName = undefined;
        recipe.input = [];
        recipe.output = null;
        recipe.tags = undefined;
      }}
    >
      <TrashBinOutline class="text-red-500" size="sm" tabindex="-1" />
    </button>
  </div>
  <div class="flex flex-row justify-center gap-6">
    <div class="grid auto-cols-max grid-flow-col auto-rows-min gap-x-4">
      <div class:col-span-3={centered}>
        <h2 class="text-center font-[Minecraft]">{title}</h2>
      </div>
      <div class="row-start-2">
        <slot />
      </div>
      <div class="pointer-events-none row-start-2 select-none self-center">
        <img
          style="image-rendering: pixelated;"
          src="/images/arrow.png"
          alt="Arrow"
          width="34px"
          height="34px"
        />
      </div>
      <div class="row-start-2 self-center">
        <ItemSlot bind:itemId={recipe.output} recipe large />
      </div>
    </div>
  </div>
</div>
