<script lang="ts">
  import { getSearchParams, type RecipeParams } from "$lib/core/params";
  import { serializeState } from "$lib/core/serde";
  import Section from "./Section.svelte";

  export let recipe: RecipeParams;
</script>

<Section title="Plain">
  <pre class="flex flex-wrap"><code>{JSON.stringify(recipe, (_, value) => value ?? undefined)}</code
    ></pre>
</Section>

<Section title="Current">
  <pre class="flex flex-wrap"><code>{getSearchParams(recipe)}</code></pre>
</Section>

<Section title="Pako">
  <pre class="flex flex-wrap"><code>{serializeState(recipe)}</code></pre>
</Section>
