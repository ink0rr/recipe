<script lang="ts">
  import { Button, Spinner, Tooltip } from "flowbite-svelte";
  import { CheckCircleOutline } from "flowbite-svelte-icons";

  export let onClick: () => Promise<void>;
  export let timeout: number = 1000;

  let disabled = false;
  let showTooltip = false;
  let showSuccess = false;
</script>

<Button
  {disabled}
  on:click={async () => {
    disabled = true;
    setTimeout(() => {
      showTooltip = true; // ???
    });
    await onClick();
    disabled = false;
    showSuccess = true;
    setTimeout(() => {
      showTooltip = false;
      showSuccess = false;
    }, timeout);
  }}
>
  <slot />
</Button>
<Tooltip class={showTooltip ? "" : "hidden"} trigger="click">
  {#if showSuccess}
    <CheckCircleOutline class="h-8 w-8 text-green-500 dark:text-green-600" />
  {:else}
    <Spinner />
  {/if}
</Tooltip>
