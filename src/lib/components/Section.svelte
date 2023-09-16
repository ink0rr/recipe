<script lang="ts">
  import { ChevronRightSolid } from "flowbite-svelte-icons";
  import { slide } from "svelte/transition";

  export let title: string;
  export let collapsible = false;

  let open = true;
</script>

<section
  class="overflow-hidden rounded-lg border bg-white shadow dark:border-gray-700 dark:bg-gray-800"
>
  {#if collapsible}
    <button
      class="flex w-full flex-row items-center justify-between rounded-t-lg border-b dark:border-gray-700"
      type="button"
      on:click={() => {
        open = !open;
      }}
    >
      <h1 class="flex-1 p-4 text-left text-xl font-bold dark:text-white">{title}</h1>
      <slot name="actions" />
      <div
        class="p-5 transition-transform duration-300 dark:text-white"
        class:-rotate-90={!open}
        class:rotate-90={open}
      >
        <ChevronRightSolid class="pointer-events-none" size="sm" />
      </div>
    </button>
  {:else}
    <div
      class="flex w-full flex-row items-center justify-between rounded-t-lg border-b dark:border-gray-700"
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
