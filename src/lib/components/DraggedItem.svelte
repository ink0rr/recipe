<script lang="ts">
  import { getItem } from "$lib/utils/getItem";
  import { draggedItem } from "../stores/draggedItem";
  import { mouse } from "../stores/mouse";
  import Texture from "./Texture.svelte";

  $: item = getItem($draggedItem);
</script>

{#if item}
  <div
    class="pointer-events-none fixed z-[1] select-none"
    style:left={`${$mouse.x - 24}px`}
    style:top={`${$mouse.y - 24}px`}
  >
    <Texture src={item.texture} alt={item.name} width="42px" height="42px" />
  </div>
{/if}
