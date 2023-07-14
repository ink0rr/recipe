<script lang="ts">
  import { getItem } from "$lib/utils/getItem";
  import { draggedItem } from "../stores/draggedItem";
  import { isPicking } from "../stores/isPicking";
  import { mouse } from "../stores/mouse";

  export let itemId: string | null = null;
  export let recipe = false;
  export let large = false;
  export let disabled = false;

  let showTooltip = false;
  $: item = getItem(itemId);
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
    showTooltip = true;
    if (e.buttons && !itemId && $draggedItem && !$isPicking) {
      itemId = $draggedItem;
    }
  }}
  on:mouseleave={() => {
    showTooltip = false;
  }}
>
  {#if item}
    <img
      class="pointer-events-none"
      style="image-rendering: pixelated;"
      src={item.texture}
      alt={item.name}
      width="32px"
      height="32px"
    />
    {#if showTooltip}
      <div
        class="absolute z-[99] block rounded border-2 border-solid border-[#1B0C1B] bg-[#1B0C1B]"
        style:left={`${$mouse.x + 16}px`}
        style:top={`${$mouse.y - 24}px`}
      >
        <div class="rounded border-2 border-[#2C0863] p-1 text-center font-[Minecraft] text-white">
          {item.name}
        </div>
      </div>
    {/if}
  {/if}
</div>
