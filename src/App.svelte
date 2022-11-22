<script>
  import { subSonicApi } from './stores.js'
  import Auth from './lib/Auth.svelte'
  import Songs from './lib/Podcasts.svelte'
</script>

<main>
  <img src="/doof.png" alt="d0oF Logo" />

  <div id="status">
    {$subSonicApi.status}
  </div>

  {#if $subSonicApi.hasAuthenticated}
    <Songs />
  {:else}
    <Auth />
  {/if}
</main>

<style>
  main {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  img {
    width: 100%;
  }
  #status {
    padding: 0.5rem;
    margin: 1rem 0;
    width: 100%;
    background-color: darkgoldenrod;
    color: whitesmoke;
  }
</style>
