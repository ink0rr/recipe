<script lang="ts">
  import { ChevronRight } from "flowbite-svelte";
  import { slide } from "svelte/transition";

  export let title: string;
  export let collapsible = false;

  let open = true;
</script>

<section class="rounded-lg border bg-white shadow">
  {#if collapsible}
    <button
      class="flex w-full flex-row items-center justify-between rounded-t-lg border-b p-4"
      type="button"
      on:click={() => {
        open = !open;
      }}
    >
      <h1 class="text-xl font-bold">{title}</h1>
      <div class="-rotate-90 transition-transform duration-300" class:rotate-90={!open}>
        <ChevronRight size="24px" variation="solid" />
      </div>
    </button>
  {:else}
    <div class="rounded-t-lg border-b p-4">
      <h1 class="text-xl font-bold">{title}</h1>
    </div>
  {/if}
  {#if open}
    <div transition:slide={{ duration: 300 }}>
      <slot />
    </div>
  {/if}
</section>
