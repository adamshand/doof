<script>
  import { app } from './stores.js'
  import Auth from './lib/Auth.svelte'
  import Podcasts from './lib/Podcasts.svelte'
</script>

<main>
  {#if $app.hasAuthenticated}
    <div id="header">
      <button id="player"> This will be player</button>
      <button on:click={() => ($app.hasAuthenticated = false)}>Q</button>
    </div>
  {:else}
    <img src="/doof.png" alt="d0oF Logo" />
  {/if}

  <div id="status">
    {$app.status}
  </div>

  {#if $app.hasAuthenticated}
    <Podcasts />
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
  .header {
    display: flex;
    flex-direction: row;
  }
  .player {
    width: 100%;
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
