<script lang="ts">
  import { browser } from "$app/environment";
  import { goto } from "$app/navigation";
  import { page } from "$app/stores";
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
  import { getItem } from "$lib/utils/getItem";
  import { vanillaItems } from "$lib/vanillaItems";
  import {
    Button,
    ButtonGroup,
    Input,
    InputAddon,
    Label,
    Search,
    Select,
    TabItem,
    Tabs,
  } from "flowbite-svelte";
  import type { PageData } from "./$types";

  export let data: PageData;

  let searchQuery = "";
  $: items = Object.keys($customItems).concat(Object.keys(vanillaItems));
  $: inventory = items.filter((item) => item.toLowerCase().includes(searchQuery.toLowerCase()));

  const recipe = data.recipe;

  $: if (browser) {
    goto(`/?recipe=${serializeState(recipe)}`, {
      keepFocus: true,
      noScroll: true,
      replaceState: true,
    });
  }

  $: outputId = getItem(recipe.output)?.identifier;
</script>

<svelte:window
  on:mousemove={({ clientX, clientY }) => {
    $mouse = {
      x: clientX,
      y: clientY,
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
        <Tabs style="underline" contentClass="flex flex-col p-2">
          <TabItem
            title="Crafting"
            open={recipe.type === "crafting"}
            on:click={() => {
              recipe.type = "crafting";
            }}
          >
            <RecipeArea title="Crafting" bind:output={recipe.output}>
              <div class="grid grid-cols-3 grid-rows-3">
                {#each Array(9).keys() as i (i)}
                  <ItemSlot bind:itemId={recipe.input[i]} recipe />
                {/each}
              </div>
            </RecipeArea>
            <div class="p-2">
              <Label>
                Crafting Type
                <Select class="mt-2" bind:value={recipe.mode}>
                  <option value="shaped">Shaped</option>
                  <option value="shaped_exact">Shaped Exact</option>
                  <option value="shapeless">Shapeless</option>
                </Select>
              </Label>
            </div>
          </TabItem>
          <TabItem
            title="Furnace"
            open={recipe.type === "furnace"}
            on:click={() => {
              recipe.type = "furnace";
            }}
          >
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
          </TabItem>
        </Tabs>
      </Section>
      <Section title="Overrides">
        <div class="flex flex-col gap-4 p-4">
          <Label>
            Identifier
            <ButtonGroup class="mt-2 w-full">
              <Input placeholder={outputId ?? "identifier"} bind:value={recipe.identifier} />
            </ButtonGroup>
          </Label>
          <Label>
            File Name
            <ButtonGroup class="mt-2 w-full">
              <Input
                placeholder={outputId?.split(":")[1] ?? "file_name"}
                bind:value={recipe.fileName}
              />
              <InputAddon>.json</InputAddon>
            </ButtonGroup>
          </Label>
          <Button href="/json{$page.url.search}">Download</Button>
        </div>
      </Section>
      <Section title="Result">
        <HighlightJson json={createRecipe(recipe)} />
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
