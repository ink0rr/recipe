<script lang="ts">
  import { Checkbox, Dropdown, Input } from "flowbite-svelte";

  export let tags: string[] | undefined;

  const items = [
    { name: "Furnace", value: "furnace" },
    { name: "Blast Furnace", value: "blast_furnace" },
    { name: "Smoker", value: "smoker" },
    { name: "Campfire", value: "campfire" },
    { name: "Soul Campfire", value: "soul_campfire" },
  ];
  let checked: Record<string, boolean> = Object.fromEntries(tags?.map((key) => [key, true]) ?? []);

  $: selectedItems = items.filter(({ value }) => checked[value]);
  $: if (selectedItems.length) {
    tags = selectedItems.map(({ value }) => value);
  } else {
    tags = undefined;
  }
</script>

<Input
  class="overflow-ellipsis"
  value={selectedItems.map(({ name }) => name).join(", ")}
  readonly
/>
<Dropdown class="py-0" placement="bottom-start">
  {#each items as { name, value }}
    <li class="first:rounded-t-lg last:rounded-b-lg hover:bg-gray-100 dark:hover:bg-gray-600">
      <Checkbox class="w-60 select-none p-2.5" bind:checked={checked[value]}>
        {name}
      </Checkbox>
    </li>
  {/each}
</Dropdown>
