<script>
  import { app } from '../stores.js'
  import Episodes from './Episodes.svelte'

  let display = 'podcasts'

  function buildUrl(action, params) {
    return `${$app.baseUrl}/${action}?u=${$app.username}&p=${$app.password}${$app.defaultQuerySrings}`
  }

  async function getPodcasts() {
    $app.status = 'loading podcasts …'

    const url = buildUrl('getPodcasts')
    const data = await fetch(url)
    const json = await data.json()

    if (json['subsonic-response'].status === 'ok') {
      $app.status = 'listen to the sweet words…'
      return json['subsonic-response'].podcasts.channel
    } else {
      $app.status = json['subsonic-response'].error.message
      throw new Error(json['subsonic-response'].error.message)
    }
  }

  async function getNewestPodcasts() {
    const numEpisodes = 10
    const url = `${$app.baseUrl}/getNewestPodcasts?u=${$app.username}&p=${$app.password}${$app.defaultQuerySrings}&count=${numEpisodes}`

    const data = await fetch(url)
    const json = await data.json()

    if (json['subsonic-response'].status === 'ok') {
      $app.status = json['subsonic-response'].status
      return json['subsonic-response'].newestPodcasts.episode
    } else {
      $app.status = json['subsonic-response'].error.message
      throw new Error(json['subsonic-response'].error.message)
    }
  }
</script>

{#await getPodcasts() then podcasts}
  {($app.podcasts = podcasts)}
  {#if display === 'podcasts'}
    <div id="podcasts">
      {#each $app.podcasts.sort( (a, b) => (a.episode[0].publishDate < b.episode[0].publishDate ? 1 : -1), ) as podcast}
        <div class="podcastTile">
          <img
            alt={`Cover Art for ${podcast.title}`}
            src={`${$app.baseUrl}/getCoverArt?u=${$app.username}&p=${$app.password}${$app.defaultQuerySrings}&id=${podcast.coverArt}`}
            title={podcast.title} />
        </div>
      {/each}
    </div>
  {:else if display === 'episodes'}
    <Episodes podcast={podcasts[22]} />
  {/if}
{:catch error}
  {($app.status = error)}
{/await}

<style>
  #podcasts {
    display: flex;
    flex-wrap: wrap;
    place-items: center;
  }
  .podcastTile {
    width: 29%;
    margin: 0.4rem;
  }
  .podcastTile img {
    width: 100%;
  }
</style>
