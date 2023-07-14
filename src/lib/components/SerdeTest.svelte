<script lang="ts">
  import { getSearchParams, type RecipeParams } from "$lib/core/params";
  import { fromUint8Array } from "js-base64";
  import { deflate } from "pako";
  import Section from "./Section.svelte";

  export let recipe: RecipeParams;

  function pakoSerde(state: string) {
    const data = new TextEncoder().encode(state);
    const compressed = deflate(data, { level: 9 });
    return fromUint8Array(compressed);
  }
</script>

<Section title="Plain">
  <pre class="flex flex-wrap"><code>{JSON.stringify(recipe, (_, value) => value ?? undefined)}</code
    ></pre>
</Section>

<Section title="Current">
  <pre class="flex flex-wrap"><code>{getSearchParams(recipe)}</code></pre>
</Section>

<Section title="Pako">
  <pre class="flex flex-wrap"><code
      >{pakoSerde(JSON.stringify(recipe, (_, value) => value ?? undefined))}</code
    ></pre>
</Section>
