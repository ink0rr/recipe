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

<div class="flex h-screen w-screen flex-col">
  <main class="flex-1">
    <slot />
  </main>
  <footer class="whitespace-nowrap p-4 text-center text-xs text-gray-500">
    <span>
      © 2023
      <a
        class="underline underline-offset-4 hover:text-black"
        href="https://github.com/ink0rr"
        rel="noopener noreferrer"
        target="_blank"
      >
        ink0rr
      </a>
      Powered by
      <a
        class="underline underline-offset-4 hover:text-black"
        href="https://kit.svelte.dev"
        rel="noopener noreferrer"
        target="_blank"
      >
        SvelteKit
      </a>
    </span>
    <p class="mt-1">This site is not affiliated with Mojang Studios</p>
  </footer>
</div>
