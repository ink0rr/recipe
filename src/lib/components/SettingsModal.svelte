<script lang="ts">
  import { settings } from "$lib/stores/settings";
  import { Input, Label, Modal, Toggle } from "flowbite-svelte";
  import { CogOutline } from "flowbite-svelte-icons";

  let open = false;
</script>

<button
  class="rounded-lg p-2.5 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
  on:click={() => {
    open = true;
  }}
>
  <CogOutline class="h-5 w-5" />
</button>

<Modal title="Settings" size="sm" outsideclose bind:open>
  <div class="flex flex-col gap-4">
    <div class="flex flex-col gap-1">
      <Label>Default Namespace</Label>
      <Input placeholder={"custom"} bind:value={$settings.namespace} />
    </div>
    <Toggle bind:checked={$settings.compact}>Compact Result Image</Toggle>
  </div>
</Modal>
