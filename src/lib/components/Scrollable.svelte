<div class="overflow-y-auto">
  <slot />
</div>

<style>
  div::-webkit-scrollbar {
    min-width: 12px;
    max-width: 16px;
  }

  div::-webkit-scrollbar-track {
    background-color: #8a8a8a;
    border: 2px solid;
    border-color: #373737 #ffffff #ffffff #373737;
  }

  div::-webkit-scrollbar-thumb {
    background-color: #c6c6c6;
    border: 2px solid;
    border-color: #ffffff #373737 #373737 #ffffff;
  }
</style>
