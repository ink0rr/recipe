<script lang="ts">
  export let src: string | undefined;
  export let alt: string | undefined;
  export let width = "32px";
  export let height = "32px";
</script>

<img
  class="pointer-events-none select-none object-contain"
  style="image-rendering: pixelated;"
  style:width
  style:height
  src={src ?? "/missing.png"}
  {alt}
  {width}
  {height}
/>
