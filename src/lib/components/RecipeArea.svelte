<script lang="ts">
  import ItemSlot from "./ItemSlot.svelte";

  export let title: string;
  export let centered = false;
  export let output: string | null;
</script>

<div class="flex flex-col rounded border-2 border-black bg-[#C6C6C6] p-2">
  <div class="flex flex-row justify-center gap-6">
    <div class="grid auto-cols-max grid-flow-col auto-rows-min gap-x-4">
      <div class:col-span-3={centered}>
        <h2 class="text-center font-[Minecraft]">{title}</h2>
      </div>
      <div class="row-start-2">
        <slot />
      </div>
      <div class="pointer-events-none row-start-2 select-none self-center">
        <img
          style="image-rendering: pixelated;"
          src="/images/arrow.png"
          alt="Arrow"
          width="34px"
          height="34px"
        />
      </div>
      <div class="row-start-2 self-center">
        <ItemSlot bind:itemId={output} recipe large />
      </div>
    </div>
  </div>
</div>
