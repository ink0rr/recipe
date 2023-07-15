<script lang="ts">
  import { mouse } from "$lib/stores/mouse";
  import { tooltipText } from "$lib/stores/tooltipText";
</script>

{#if $tooltipText}
  <div
    class="absolute z-[99] block whitespace-nowrap rounded border-2 border-solid border-[#1B0C1B] bg-[#1B0C1B]"
    style:left={`${$mouse.x + 16}px`}
    style:top={`${$mouse.y - 24}px`}
  >
    <div class="rounded border-2 border-[#2C0863] p-1 text-center font-[Minecraft] text-white">
      {$tooltipText}
    </div>
  </div>
{/if}
