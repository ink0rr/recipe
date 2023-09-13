<script lang="ts">
  import { browser } from "$app/environment";
  import { goto } from "$app/navigation";
  import { page } from "$app/stores";
  import DraggedItem from "$lib/components/DraggedItem.svelte";
  import HighlightJson from "$lib/components/HighlightJson.svelte";
  import Inventory from "$lib/components/Inventory.svelte";
  import ItemSlot from "$lib/components/ItemSlot.svelte";
  import RecipeArea from "$lib/components/RecipeArea.svelte";
  import Section from "$lib/components/Section.svelte";
  import SettingsModal from "$lib/components/SettingsModal.svelte";
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
    Select,
    TabItem,
    Tabs,
  } from "flowbite-svelte";
  import type { PageData } from "./$types";

  export let data: PageData;

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
  class="container mx-auto flex max-w-screen-lg flex-row-reverse flex-wrap justify-between gap-x-4 gap-y-2 p-4"
>
  <!-- Recipe -->
  <div class="flex-1 overflow-x-auto">
    <div class="flex flex-col gap-y-2">
      <Section title="Recipe">
        <div class="px-4" slot="actions">
          <SettingsModal />
        </div>
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
        <div class="flex flex-col gap-4 px-4 pb-4">
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
          <div class="flex flex-col gap-2">
            <Label>Share</Label>
            <ButtonGroup>
              <Button>Recipe Link</Button>
              <Button>Recipe Image</Button>
              <Button>Google Docs</Button>
            </ButtonGroup>
          </div>
          <Button href="/json{$page.url.search}">Download</Button>
        </div>
      </Section>
      <Section title="JSON Preview" collapsible>
        <HighlightJson json={createRecipe(recipe)} />
      </Section>
    </div>
  </div>
  <!-- Inventory -->
  <div class="flex flex-col gap-y-2 md:flex-1">
    <Section title="Vanilla Items">
      <Inventory items={Object.keys(vanillaItems)} />
    </Section>
    <Section title="Custom Items">
      <Inventory items={Object.keys($customItems)} />
    </Section>
  </div>
</div>
