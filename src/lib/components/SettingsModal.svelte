<script lang="ts">
  import { settings } from "$lib/stores/settings";
  import { Input, Label, Modal, Toggle } from "flowbite-svelte";
  import { CogOutline } from "flowbite-svelte-icons";
  import IconButton from "./IconButton.svelte";

  let open = false;
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
      <Input placeholder={"custom"} bind:value={$settings.namespace} />
    </div>
    <Toggle bind:checked={$settings.compact}>Compact Result Image</Toggle>
  </div>
</Modal>
