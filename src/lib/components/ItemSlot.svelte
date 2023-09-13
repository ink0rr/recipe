<script lang="ts">
  import { customItems } from "$lib/stores/customItems";
  import { tooltipText } from "$lib/stores/tooltipText";
  import type { Item } from "$lib/types/Item";
  import { getItem } from "$lib/utils/getItem";
  import { draggedItem } from "../stores/draggedItem";
  import { isPicking } from "../stores/isPicking";
  import Texture from "./Texture.svelte";

  export let itemId: string | null = null;
  export let recipe = false;
  export let large = false;
  export let disabled = false;

  let isHovered = false;
  let item: Item | null = null;
  $: {
    item = getItem(itemId);
    $customItems; // Trigger reactivity when customItems changes
  }
  $: {
    if (isHovered && item) {
      $tooltipText = item.name;
    } else {
      $tooltipText = null;
    }
  }
</script>

<div
  class="flex select-none items-center justify-center border-2 border-solid border-b-white border-l-[#373737] border-r-white border-t-[#373737] bg-[#8A8A8A] hover:bg-[#DDDDDD]"
  style:height={large ? "50px" : "36px"}
  style:width={large ? "50px" : "36px"}
  role="none"
  on:contextmenu|preventDefault
  on:mousedown={(e) => {
    if (disabled) return;

    if (itemId) {
      $isPicking = true;
      if (!recipe) {
        $draggedItem = $draggedItem ? null : itemId;
        return;
      }
      if ($draggedItem) {
        [itemId, $draggedItem] = [$draggedItem, itemId];
        return;
      }
      if (!e.shiftKey) {
        $draggedItem = itemId;
      }
      itemId = null;
    } else {
      itemId = $draggedItem;
    }
  }}
  on:mouseup={() => {
    if (disabled) return;

    if ($isPicking) {
      $isPicking = false;
    } else {
      $draggedItem = null;
    }
  }}
  on:mouseenter={(e) => {
    isHovered = true;
    if (e.buttons && !itemId && $draggedItem && !$isPicking) {
      itemId = $draggedItem;
    }
  }}
  on:mouseleave={() => {
    isHovered = false;
  }}
>
  {#if item}
    <Texture src={item.texture} alt={item.name} width="32px" height="32px" />
  {/if}
</div>
