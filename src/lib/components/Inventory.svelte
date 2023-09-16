<script lang="ts">
  import { debounce } from "$lib/utils/debounce";
  import { Search } from "flowbite-svelte";
  import ItemSlot from "./ItemSlot.svelte";
  import Scrollable from "./Scrollable.svelte";

  export let items: string[];

  let query = "";
  let result = items;

  $: debounce(() => {
    result = items.filter((item) => item.toLowerCase().includes(query.toLowerCase()));
  });
</script>

<div class="flex flex-col gap-4 p-4">
  <Search bind:value={query} />
  <div class="rounded border-2 border-black bg-[#C6C6C6] py-4 pl-4 pr-3">
    <Scrollable>
      <div class="mr-2 flex max-h-[450px] flex-row flex-wrap">
        {#each result as item (item)}
          <ItemSlot itemId={item} />
        {/each}
      </div>
    </Scrollable>
  </div>
</div>
