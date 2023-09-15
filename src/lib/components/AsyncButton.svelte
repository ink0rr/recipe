<script lang="ts">
  import { Button, Spinner } from "flowbite-svelte";
  import { CheckCircleOutline, XCircleOutline } from "flowbite-svelte-icons";

  export let onClick: (event: MouseEvent) => Promise<void>;
  export let timeout: number = 1000;

  let disabled = false;
  let state: "IDLE" | "LOADING" | "FAILED" | "SUCCESS" = "IDLE";
</script>

<Button
  class="disabled:bg-gray-100 disabled:opacity-100 dark:disabled:bg-gray-600"
  {disabled}
  on:click={async (event) => {
    disabled = true;
    state = "LOADING";
    try {
      await onClick(event);
      state = "SUCCESS";
    } catch {
      state = "FAILED";
    } finally {
      setTimeout(() => {
        disabled = false;
        state = "IDLE";
      }, timeout);
    }
  }}
>
  <div class:invisible={disabled}>
    <slot />
  </div>
  {#if state !== "IDLE"}
    <div class="absolute [&>*]:pointer-events-none">
      {#if state === "SUCCESS"}
        <CheckCircleOutline class="text-green-500" />
      {:else if state === "FAILED"}
        <XCircleOutline class="text-red-500" />
      {:else if state === "LOADING"}
        <Spinner size="5" />
      {/if}
    </div>
  {/if}
</Button>
