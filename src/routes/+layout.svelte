<script>
  import { page } from "$app/stores";
  import "../styles.css";
</script>

<svelte:head>
  <title>Recipe Generator</title>
  <meta name="description" content="Recipe generator for Minecraft Bedrock" />
  <meta property="twitter:card" content="summary_large_image" />
  <meta property="twitter:title" content="Recipe Generator" />
  <meta property="twitter:description" content="Recipe generator for Minecraft Bedrock" />
  <meta property="twitter:image" content={`/image${$page.url.search}`} />
  <meta property="og:title" content="Recipe Generator" />
  <meta property="og:description" content="Recipe generator for Minecraft Bedrock" />
  <meta property="og:type" content="website" />
  <meta property="og:image" content={`/image${$page.url.search}`} />
</svelte:head>

<slot />
