<script lang="ts">
  import { settings } from "$lib/stores/settings";
  import { Helper, Input, Label, Modal, Toggle } from "flowbite-svelte";
  import { CogOutline } from "flowbite-svelte-icons";
  import { snakeCase } from "lodash-es";
  import IconButton from "./IconButton.svelte";

  let open = false;
  let namespace = $settings.namespace;
  let invalidNamespace: string | false = false;

  $: if (!open) {
    namespace = snakeCase(namespace);
    $settings.namespace = namespace;
  }
  $: if (namespace && !namespace.match(/^[a-z](\w+)?$/)) {
    invalidNamespace = "Invalid namespace";
  } else {
    invalidNamespace = false;
  }
</script>

<IconButton
  on:click={() => {
    open = true;
  }}
>
  <CogOutline />
</IconButton>

<Modal title="Settings" size="sm" outsideclose bind:open>
  <div class="flex flex-col gap-4">
    <div class="flex flex-col gap-1">
      <Label>Default Namespace</Label>
      <Input color={invalidNamespace ? "red" : "base"} spellcheck="false" bind:value={namespace} />
      {#if invalidNamespace}
        <Helper color="red">{invalidNamespace}</Helper>
      {/if}
    </div>
    <Toggle bind:checked={$settings.compact}>Compact Result Image</Toggle>
  </div>
</Modal>
