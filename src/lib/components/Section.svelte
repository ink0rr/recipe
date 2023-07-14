<script lang="ts">
  export let title: string;
</script>

<section class="rounded-lg border bg-white shadow">
  <div class="rounded-t-lg border-b p-4">
    <h1 class="text-xl font-bold">{title}</h1>
  </div>
  <slot />
</section>
