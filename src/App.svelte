<script>
  import { subSonicApi } from './stores.js'
  import Auth from './lib/Auth.svelte'
  import Genres from './lib/Genres.svelte'
  import Recent from './lib/Recent.svelte'
</script>

<main>
  <img src="/doof.png" class="logo svelte" alt="Svelte Logo" />

  <div id="status">
    {$subSonicApi.status}
  </div>

  {#if $subSonicApi.hasAuthenticated}
    <Genres />
    <!-- <p>genres goes here</p> -->
  {:else}
    <Auth />
    <!-- <p>auth goes here</p> -->
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
    margin-top: 1rem;
    width: 100%;
    background-color: darkgoldenrod;
    color: whitesmoke;
  }
</style>
