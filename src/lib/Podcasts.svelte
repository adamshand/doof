<script>
  import { subSonicApi } from '../stores.js'
  import Episodes from './Episodes.svelte'

  let display = 'episodes'

  async function getPodcasts() {
    const numEpisodes = 10
    const url = `${$subSonicApi.baseUrl}/getPodcasts?u=${$subSonicApi.username}&p=${$subSonicApi.password}${$subSonicApi.defaultQuerySrings}&count=${numEpisodes}`

    const data = await fetch(url)
    const json = await data.json()

    if (json['subsonic-response'].status === 'ok') {
      $subSonicApi.status = json['subsonic-response'].status
      return json['subsonic-response'].podcasts.channel
    } else {
      $subSonicApi.status = json['subsonic-response'].error.message
      throw new Error(json['subsonic-response'].error.message)
    }
  }

  async function getNewestPodcasts() {
    const numEpisodes = 10
    const url = `${$subSonicApi.baseUrl}/getNewestPodcasts?u=${$subSonicApi.username}&p=${$subSonicApi.password}${$subSonicApi.defaultQuerySrings}&count=${numEpisodes}`

    const data = await fetch(url)
    const json = await data.json()

    if (json['subsonic-response'].status === 'ok') {
      $subSonicApi.status = json['subsonic-response'].status
      return json['subsonic-response'].newestPodcasts.episode
    } else {
      $subSonicApi.status = json['subsonic-response'].error.message
      throw new Error(json['subsonic-response'].error.message)
    }
  }
</script>

<h1>Podcasts</h1>

{#await getPodcasts()}
  <p>Loading podcasts ...</p>
{:then podcasts}
  {#if display === 'podcasts'}
    <div id="podcasts">
      <!-- {#each podcasts.sort( (a, b) => (a.episode[0].publishDate < b.episode[0].publishDate ? 1 : -1), ) as podcast} -->
      {#each podcasts as podcast}
        <div class="podcastTile">
          <img src={podcast.originalImageUrl} title={podcast.title} />
        </div>
      {/each}
    </div>
  {:else if display === 'episodes'}
    <Episodes podcast={podcasts[21]} />
  {/if}
{:catch error}
  {($subSonicApi.status = error)}
{/await}

<style>
  * {
    box-sizing: border-box;
  }
  h1 {
    color: darkgoldenrod;
    font-weight: bold;
  }
  h2,
  h3 {
    font-weight: bold;
  }
  div {
    width: 100%;
    padding: 1px solid white;
    text-align: left;
  }
  #podcasts {
    display: flex;
    flex-wrap: wrap;
    place-items: center;
  }
  .podcastTile {
    width: 30%;
    margin: 0.4rem;
  }
  .podcastTile img {
    width: 100%;
    /* padding: 3px;
    border: 2px solid white; */
    /* background: url('https://rcorbett.wpenginepowered.com/wp-content/uploads/2018/07/How-to-design-a-great-podcast-logo.jpg'); */
    /* background-size: 100% 100%; */
  }
  .episodes {
    position: absolute;
    width: 95%;
    height: 95%;
  }
  .episode {
    margin-top: 1rem;
  }
  .episode span {
    font-size: smaller;
    font-weight: lighter;
  }
</style>
