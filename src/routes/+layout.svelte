<script>
  import { assets } from "$app/paths";
  import { page } from "$app/stores";
  import "../app.postcss";
</script>

<svelte:head>
  <title>Recipe Generator</title>
  <meta name="description" content="Recipe generator for Minecraft Bedrock" />
  <meta property="twitter:card" content="summary_large_image" />
  <meta property="twitter:site" content="@ink0rr" />
  <meta property="twitter:title" content="Recipe Generator" />
  <meta property="twitter:image" content={`${assets}/image${$page.url.search}`} />
  <meta property="twitter:description" content="Recipe generator for Minecraft Bedrock" />
  <meta property="og:title" content="Recipe Generator" />
  <meta property="og:description" content="Recipe generator for Minecraft Bedrock" />
  <meta property="og:type" content="website" />
  <meta property="og:image" content={`${assets}/image${$page.url.search}`} />
  <meta property="og:image:type" content="image/png" />
  <meta property="og:image:width" content="64" />
  <meta property="og:image:height" content="64" />
</svelte:head>

<slot />
