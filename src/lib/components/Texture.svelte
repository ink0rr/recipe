<script lang="ts">
  export let src: string | undefined;
  export let alt: string | undefined;
  export let width: string | undefined;
  export let height: string | undefined;
</script>

<img
  class="pointer-events-none select-none"
  style="image-rendering: pixelated;"
  src={src ?? "/missing.png"}
  {alt}
  {width}
  {height}
/>
