<script lang="ts">
  import { browser } from "$app/environment";
  import { goto } from "$app/navigation";
  import { page } from "$app/stores";
  import AddItemModal from "$lib/components/AddItemModal.svelte";
  import AsyncButton from "$lib/components/AsyncButton.svelte";
  import DraggedItem from "$lib/components/DraggedItem.svelte";
  import EditItemModal from "$lib/components/EditItemModal.svelte";
  import HighlightJson from "$lib/components/HighlightJson.svelte";
  import Inventory from "$lib/components/Inventory.svelte";
  import ItemSlot from "$lib/components/ItemSlot.svelte";
  import ItemTooltip from "$lib/components/ItemTooltip.svelte";
  import RecipeArea from "$lib/components/RecipeArea.svelte";
  import Section from "$lib/components/Section.svelte";
  import SettingsModal from "$lib/components/SettingsModal.svelte";
  import { createRecipe } from "$lib/core/recipe/createRecipe";
  import { serializeState } from "$lib/core/state";
  import { customItems } from "$lib/stores/customItems";
  import { mouse } from "$lib/stores/mouse";
  import { settings } from "$lib/stores/settings";
  import { getGdocsBlob, getImageBlob } from "$lib/utils/blob";
  import { getItem } from "$lib/utils/getItem";
  import { vanillaItems } from "$lib/vanillaItems";
  import {
    Button,
    ButtonGroup,
    DarkMode,
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
<ItemTooltip />

<div
  class="container mx-auto flex max-w-screen-lg flex-row-reverse flex-wrap justify-between gap-x-4 gap-y-2 p-4"
>
  <!-- Recipe -->
  <div class="flex-1 overflow-x-auto">
    <div class="flex flex-col gap-y-2">
      <Section title="Recipe">
        <div class="px-4" slot="actions">
          <DarkMode />
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
            <div class="flex flex-col gap-1 p-2">
              <Label>Crafting Type</Label>
              <Select bind:value={recipe.mode}>
                <option value="shaped">Shaped</option>
                <option value="shaped_exact">Shaped Exact</option>
                <option value="shapeless">Shapeless</option>
              </Select>
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
          <div class="flex flex-col gap-1">
            <Label>Identifier</Label>
            <Input placeholder={outputId ?? "identifier"} bind:value={recipe.identifier} />
          </div>
          <div class="flex flex-col gap-1">
            <Label>File Name</Label>
            <ButtonGroup>
              <Input
                placeholder={outputId?.split(":")[1] ?? "file_name"}
                bind:value={recipe.fileName}
              />
              <InputAddon>.json</InputAddon>
            </ButtonGroup>
          </div>
          <div class="flex flex-col gap-1">
            <Label>Share</Label>
            <div class="block">
              <ButtonGroup>
                <AsyncButton
                  onClick={async () => {
                    await navigator.clipboard.writeText(location.href);
                  }}
                >
                  Recipe Link
                </AsyncButton>
                <AsyncButton
                  onClick={async () => {
                    const blob = await getImageBlob($settings.compact);
                    await navigator.clipboard.write([
                      new ClipboardItem({
                        [blob.type]: blob,
                      }),
                    ]);
                  }}
                >
                  Recipe Image
                </AsyncButton>
                <AsyncButton
                  onClick={async () => {
                    const blob = getGdocsBlob($settings.compact);
                    await navigator.clipboard.write([
                      new ClipboardItem({
                        [blob.type]: blob,
                      }),
                    ]);
                  }}
                >
                  Google Docs
                </AsyncButton>
              </ButtonGroup>
            </div>
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
      <div class="flex flex-row gap-2 px-4" slot="actions">
        <AddItemModal />
        <EditItemModal />
      </div>
      <Inventory items={Object.keys($customItems)} />
    </Section>
  </div>
</div>
