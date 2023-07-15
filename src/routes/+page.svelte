<script lang="ts">
  import { browser } from "$app/environment";
  import { goto } from "$app/navigation";
  import DraggedItem from "$lib/components/DraggedItem.svelte";
  import HighlightJson from "$lib/components/HighlightJson.svelte";
  import ItemSlot from "$lib/components/ItemSlot.svelte";
  import RecipeArea from "$lib/components/RecipeArea.svelte";
  import Scrollable from "$lib/components/Scrollable.svelte";
  import Section from "$lib/components/Section.svelte";
  import Tooltip from "$lib/components/Tooltip.svelte";
  import { createRecipe } from "$lib/core/recipe/createRecipe";
  import { serializeState } from "$lib/core/state";
  import { customItems } from "$lib/stores/customItems";
  import { mouse } from "$lib/stores/mouse";
  import { vanillaItems } from "$lib/vanillaItems";
  import { Alert, ButtonGroup, Input, InputAddon, Label, Search, Select } from "flowbite-svelte";
  import type { PageData } from "./$types";

  export let data: PageData;

  let searchQuery = "";
  $: items = Object.keys($customItems).concat(Object.keys(vanillaItems));
  $: inventory = items.filter((item) => item.toLowerCase().includes(searchQuery.toLowerCase()));

  const recipe = data.recipe;
  $: result = createRecipe(recipe);
  $: if (browser) {
    goto(`/?recipe=${serializeState(recipe)}`, { noScroll: true });
  }
</script>

<svelte:window
  on:mousemove={({ pageX, pageY }) => {
    $mouse = {
      x: pageX,
      y: pageY,
    };
  }}
/>

<DraggedItem />
<Tooltip />

<div
  class="container mx-auto flex max-w-screen-lg flex-row-reverse flex-wrap justify-between gap-4 p-4"
>
  <!-- Recipe -->
  <div class="flex-1 overflow-x-auto">
    <div class="flex flex-col gap-y-2">
      <Section title="Recipe">
        <div class="p-4">
          {#if recipe.type.includes("shape")}
            <RecipeArea title="Crafting" bind:output={recipe.output}>
              <div class="grid grid-cols-3 grid-rows-3">
                {#each [...Array(9).keys()] as i (i)}
                  <ItemSlot bind:itemId={recipe.input[i]} recipe />
                {/each}
              </div>
            </RecipeArea>
          {:else}
            <Alert>
              <svg
                slot="icon"
                aria-hidden="true"
                class="h-5 w-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clip-rule="evenodd"
                />
              </svg>
              Furnace recipe is still work in progress.
            </Alert>
            <RecipeArea title="Furnace" centered bind:output={recipe.output}>
              <div class="flex flex-col items-center gap-y-2">
                <ItemSlot bind:itemId={recipe.input[0]} recipe />
                <img
                  style="image-rendering: pixelated;"
                  src="/images/flame.png"
                  alt="Flame"
                  width="32px"
                  height="32px"
                />
                <ItemSlot itemId="charcoal" disabled />
              </div>
            </RecipeArea>
          {/if}
        </div>
      </Section>
      <Section title="Settings">
        <div class="flex flex-col gap-4 p-4">
          <Label>
            Identifier
            <ButtonGroup class="mt-2 w-full">
              <Input placeholder={recipe.output ?? "identifier"} />
            </ButtonGroup>
          </Label>
          <Label>
            File Name
            <ButtonGroup class="mt-2 w-full">
              <Input placeholder="file_name" />
              <InputAddon>.json</InputAddon>
            </ButtonGroup>
          </Label>
          <Label>
            Recipe Type
            <Select class="mt-2" bind:value={recipe.type}>
              <option value="shaped">Shaped</option>
              <option value="shaped_exact">Shaped Exact</option>
              <option value="shapeless">Shapeless</option>
              <option value="furnace">Furnace</option>
            </Select>
          </Label>
        </div>
      </Section>
      <Section title="Result">
        <HighlightJson json={result} />
      </Section>
    </div>
  </div>
  <!-- Inventory -->
  <div class="md:flex-1">
    <Section title="Inventory">
      <div class="flex flex-col gap-4 p-4">
        <Search bind:value={searchQuery} />
        <div class="rounded border-2 border-black bg-[#C6C6C6] py-4 pl-4 pr-3">
          <Scrollable>
            <div class="flex max-h-[65vh] flex-row flex-wrap">
              {#each inventory as item (item)}
                <ItemSlot itemId={item} />
              {/each}
            </div>
          </Scrollable>
        </div>
      </div>
    </Section>
  </div>
</div>
