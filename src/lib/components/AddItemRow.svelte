<script lang="ts">
  import type { Item } from "$lib/types/Item";
  import { Helper, Input } from "flowbite-svelte";
  import { TrashBinOutline } from "flowbite-svelte-icons";
  import { startCase } from "lodash-es";
  import IconButton from "./IconButton.svelte";
  import Texture from "./Texture.svelte";

  export let item: Item;

  let invalidIdentifier: string | false = false;
  $: {
    if (!item.identifier) {
      invalidIdentifier = "Identifier is required";
    } else if (!item.identifier.match(/^\w+:[a-z](\w+)?$/)) {
      invalidIdentifier = "Invalid identifier";
    } else {
      invalidIdentifier = false;
    }
  }
</script>

<tr class="border-b last:border-b-0 dark:border-gray-700 [&>*]:px-2 [&>*]:py-5">
  <td>
    <div class="flex items-center justify-center">
      <Texture src={item.texture} alt={item.name} width="48px" height="48px" />
    </div>
  </td>
  <td>
    <Input
      color={invalidIdentifier ? "red" : "base"}
      placeholder="Identifier"
      spellcheck="false"
      required
      bind:value={item.identifier}
    />
    {#if invalidIdentifier}
      <Helper class="absolute" color="red">{invalidIdentifier}</Helper>
    {/if}
  </td>
  <td>
    <Input
      placeholder={invalidIdentifier || startCase(item.identifier.split(":")[1])}
      bind:value={item.name}
    />
  </td>
  <td>
    <IconButton on:click>
      <TrashBinOutline class="text-red-500" />
    </IconButton>
  </td>
</tr>
