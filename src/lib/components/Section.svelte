<script lang="ts">
  import { ChevronRight } from "flowbite-svelte";
  import { slide } from "svelte/transition";

  export let title: string;
  export let collapsible = false;

  let open = true;
</script>

<section class="rounded-lg border bg-white shadow dark:border-gray-600 dark:bg-gray-800">
  {#if collapsible}
    <button
      class="flex w-full flex-row items-center justify-between rounded-t-lg border-b dark:border-gray-600"
      type="button"
      on:click={() => {
        open = !open;
      }}
    >
      <h1 class="flex-1 p-4 text-left text-xl font-bold dark:text-white">{title}</h1>
      <slot name="actions" />
      <div
        class="-rotate-90 p-4 transition-transform duration-300 dark:text-white"
        class:rotate-90={!open}
      >
        <ChevronRight size="24px" variation="solid" />
      </div>
    </button>
  {:else}
    <div
      class="flex w-full flex-row items-center justify-between rounded-t-lg border-b dark:border-gray-600"
    >
      <h1 class="flex-1 p-4 text-left text-xl font-bold dark:text-white">{title}</h1>
      <slot name="actions" />
    </div>
  {/if}
  {#if open}
    <div class="overflow-clip rounded-b-lg" transition:slide={{ duration: 300 }}>
      <slot />
    </div>
  {/if}
</section>
