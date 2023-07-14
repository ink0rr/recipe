<script lang="ts">
  import hljs from "highlight.js";
  import "highlight.js/styles/atom-one-dark.css";

  export let json: unknown;

  $: result = hljs.highlight(JSON.stringify(json, null, 2), { language: "json" }).value;
</script>

<pre><code class="hljs language-json">{@html result}</code></pre>
