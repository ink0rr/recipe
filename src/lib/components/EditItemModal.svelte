<script lang="ts">
  import { customItems } from "$lib/stores/customItems";
  import { Button, Modal } from "flowbite-svelte";
  import { TrashBinOutline } from "flowbite-svelte-icons";
  import IconButton from "./IconButton.svelte";
  import Texture from "./Texture.svelte";

  let open = false;
</script>

<Button
  class="px-3 py-1"
  on:click={() => {
    open = true;
  }}
>
  Edit
</Button>

<Modal title="Edit Item(s)" bind:open>
  <Button
    color="red"
    on:click={() => {
      if (confirm("Delete all items?")) {
        customItems.set({});
      }
    }}
  >
    Delete All
  </Button>
  <div class="overflow-x-auto">
    <table class="w-full">
      <thead class="bg-gray-100 text-left text-black dark:bg-gray-700 dark:text-white">
        <tr class="[&>*]:px-2 [&>*]:py-3 [&>*]:font-medium">
          <th class="w-24 text-center">Texture</th>
          <th class="min-w-[192px]">Identifier</th>
          <th class="min-w-[192px]">Name</th>
          <th class="w-12" />
        </tr>
      </thead>
      <tbody class="gap text-black dark:text-white">
        {#each Object.entries($customItems) as [id, item] (id)}
          <tr class="border-b last:border-b-0 dark:border-gray-700 [&>*]:px-2 [&>*]:py-4">
            <td>
              <div class="flex items-center justify-center">
                <Texture src={item.texture} alt={item.name} width="48px" height="48px" />
              </div>
            </td>
            <td>{item.identifier}</td>
            <td>{item.name}</td>
            <td>
              <IconButton
                on:click={() => {
                  customItems.update((items) => {
                    delete items[id];
                    return items;
                  });
                }}
              >
                <TrashBinOutline class="text-red-500" />
              </IconButton>
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
</Modal>
