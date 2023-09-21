<script lang="ts">
  import { settings } from "$lib/stores/settings";
  import { Helper, Input, Label, Modal, Toggle } from "flowbite-svelte";
  import { CogOutline } from "flowbite-svelte-icons";
  import { snakeCase } from "lodash-es";
  import IconButton from "./IconButton.svelte";

  let open = false;
  let namespace = $settings.namespace;

  $: if (!open) {
    namespace = snakeCase(namespace);
    $settings.namespace = namespace;
  }
  $: invalidNamespace = namespace && !namespace.match(/^[a-z](\w+)?$/);
</script>

<IconButton
  on:click={() => {
    open = true;
  }}
>
  <CogOutline />
</IconButton>

<Modal title="Settings" size="sm" outsideclose bind:open>
  <div class="flex flex-col">
    <Label>Default Namespace</Label>
    <Input
      class="mt-1"
      color={invalidNamespace ? "red" : "base"}
      spellcheck="false"
      bind:value={namespace}
    />
    {#if invalidNamespace}
      <Helper class="mt-1" color="red">Invalid namespace</Helper>
    {/if}
    <Label class="mt-4">Result Image</Label>
    <div class="mt-1 flex flex-col gap-2 px-2">
      <Toggle bind:checked={$settings.compact}>Show recipe grid only</Toggle>
      <Toggle bind:checked={$settings.downloadImage}>Download image</Toggle>
    </div>
  </div>
</Modal>
