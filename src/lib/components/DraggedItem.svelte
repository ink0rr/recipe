<script lang="ts">
  import { getItem } from "$lib/utils/getItem";
  import { draggedItem } from "../stores/draggedItem";
  import { mouse } from "../stores/mouse";

  $: texture = getItem($draggedItem)?.texture;
</script>

{#if texture}
  <div
    class="pointer-events-none fixed z-[1] select-none"
    style:left={`${$mouse.x - 24}px`}
    style:top={`${$mouse.y - 24}px`}
  >
    <img
      class="pointer-events-none h-[42px] w-[42px] select-none"
      style="image-rendering: pixelated;"
      src={texture}
      alt={$draggedItem}
      width="42px"
      height="42px"
    />
  </div>
{/if}
