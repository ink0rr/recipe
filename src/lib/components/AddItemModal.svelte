<script lang="ts">
  import { customItems } from "$lib/stores/customItems";
  import { settings } from "$lib/stores/settings";
  import type { Item } from "$lib/types/Item";
  import { fileToBase64 } from "$lib/utils/fileToBase64";
  import { Alert, Button, Modal } from "flowbite-svelte";
  import { snakeCase, startCase } from "lodash-es";
  import AddItemRow from "./AddItemRow.svelte";

  let open = false;

  let upload: HTMLInputElement;
  let files: FileList | undefined;
  let items: Item[] = [];
  let isInvalid = true;

  async function updateItems(fileList: FileList) {
    for (const file of fileList) {
      const fileName = snakeCase(file.name.replace(/.png$/, ""));
      items.push({
        name: "",
        identifier: `${$settings.namespace || "custom"}:${fileName}`,
        texture: await fileToBase64(file),
      });
    }
  }

  $: if (!open) {
    items = [];
  }
  $: if (files) {
    updateItems(files).then(() => {
      items = items;
      files = undefined;
    });
  }
  $: isInvalid =
    items.length === 0 || items.some((item) => !item.identifier.match(/^\w+:[a-z](\w+)?$/));
</script>

<Button
  class="px-3 py-1"
  on:click={() => {
    open = true;
  }}
>
  Add
</Button>

<Modal title="Add Item(s)" bind:open>
  {#if !$settings.namespace}
    <Alert color="blue" class="dark:bg-blue-900">
      <span class="font-medium">Tip:</span>
      You can set a default namespace in <span class="font-medium">settings</span>.
    </Alert>
  {/if}
  <div class="flex flex-col gap-4">
    <div class="flex flex-row items-center gap-2">
      <Button
        color="alternative"
        on:click={() => {
          items.push({
            name: "",
            identifier: `${$settings.namespace || "custom"}:unknown`,
          });
          items = items;
        }}
      >
        Add Entry
      </Button>
      or
      <Button
        color="alternative"
        on:click={() => {
          upload.click();
        }}
      >
        Upload Files
        <input class="hidden" type="file" accept=".png" multiple bind:this={upload} bind:files />
      </Button>
    </div>
  </div>
  {#if items.length}
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
          {#each items as item}
            <AddItemRow
              bind:item
              on:click={() => {
                items = items.filter((i) => i !== item);
              }}
            />
          {/each}
        </tbody>
      </table>
    </div>
  {/if}
  <svelte:fragment slot="footer">
    <Button
      disabled={isInvalid}
      on:click={() => {
        for (const item of items) {
          const identifier = item.identifier;
          $customItems[identifier] = {
            name: item.name || startCase(identifier.split(":")[1]),
            identifier,
            texture: item.texture,
          };
        }
        open = false;
      }}
    >
      Save
    </Button>
  </svelte:fragment>
</Modal>
