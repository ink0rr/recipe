<script lang="ts">
  import { ClipboardCheckOutline, ClipboardOutline } from "flowbite-svelte-icons";
  import hljs from "highlight.js";
  import "highlight.js/styles/atom-one-dark.css";

  export let json: unknown;

  let disabled = false;

  $: result = hljs.highlight(JSON.stringify(json, null, 2), { language: "json" }).value;
</script>

<div class="relative">
  <pre><code class="hljs language-json">{@html result}</code></pre>
  <button
    type="button"
    class="absolute right-2 top-2 rounded-lg border border-gray-700 p-2.5 text-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-700 disabled:cursor-not-allowed [&>*]:pointer-events-none"
    on:click={async () => {
      await navigator.clipboard.writeText(JSON.stringify(json, null, 2));
      disabled = true;
      setTimeout(() => {
        disabled = false;
      }, 1000);
    }}
    {disabled}
  >
    {#if disabled}
      <ClipboardCheckOutline class="text-green-500" tabindex="-1" />
    {:else}
      <ClipboardOutline class="text-gray-400" tabindex="-1" />
    {/if}
  </button>
</div>
