<script lang="ts">
  import { mouse } from "$lib/stores/mouse";
  import { tooltipText } from "$lib/stores/tooltipText";
</script>

{#if $tooltipText}
  <div
    class="fixed z-[99] inline-block whitespace-nowrap rounded border-2 border-solid border-[#1B0C1B] bg-[#1B0C1B] before:box-border after:box-border"
    style:left={`${$mouse.x + 16}px`}
    style:top={`${$mouse.y - 24}px`}
  >
    <div
      class="block rounded border-2 border-[#2C0863] p-1 text-center font-[Minecraft] text-white"
    >
      {$tooltipText}
    </div>
  </div>
{/if}
