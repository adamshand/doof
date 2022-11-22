<script>
  // import { Drawer } from '@brainandbones/skeleton'
  import sanitizeHtml from 'sanitize-html'
  import { subSonicApi } from '../stores.js'

  export let podcast
  const descriptionLength = 312

  async function downloadEpisode(id) {
    const episodeId = id
    const url = `${$subSonicApi.baseUrl}/downloadPodcastEpisode?u=${$subSonicApi.username}&p=${$subSonicApi.password}${$subSonicApi.defaultQuerySrings}&id=${episodeId}`
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

<div id="modal">
  <div id="podcast">
    <table>
      <tr>
        <td>
          <img alt="Logo for {podcast.title}" src={podcast.originalImageUrl} />
        </td>
        <td valign="top">
          <h1>{podcast.title}</h1>
          <p>{podcast.description}</p>
        </td>
      </tr>
    </table>
    <ol>
      {#each podcast.episode as episode}
        <li>
          <p>
            <time
              >{new Date(episode.publishDate).toLocaleString('en-nz', {
                day: '2-digit',
                month: 'long',
                year: 'numeric',
              })}
            </time>
          </p>
          <p class="title">{episode.title}</p>
          <p class="description">
            {#if episode.description.length < descriptionLength}
              {@html sanitizeHtml(episode.description)}
            {:else}
              {@html sanitizeHtml(
                episode.description
                  .substring(0, descriptionLength)
                  .substring(0, episode.description.lastIndexOf(' ') + 1),
              )}
            {/if}
            {#if episode.status === 'completed'}
              <audio controls>
                <source
                  src={`${$subSonicApi.baseUrl}/stream?id=${episode.streamId}&u=${$subSonicApi.username}&p=${$subSonicApi.password}${$subSonicApi.defaultQuerySrings}`}
                  type="audio/mpeg"
                />
              </audio>
            {:else}
              <br />
              <button on:click(downloadEpisode(${episode.streamId}))
                >Download</button
              >
            {/if}
          </p>
        </li>
      {/each}
    </ol>
  </div>
</div>

<style>
  #modal {
    position: absolute;
    top: 10;
    bottom: 10;
    right: 10;
    left: 10;
    background-color: black;
  }
  #podcast {
    margin: 1.5rem;
    text-align: left;
  }
  table {
    margin-bottom: 1rem;
  }
  tr {
    border: 1px solid silver;
  }
  td {
    width: 50%;
  }
  td img {
    padding: 1rem;
    object-fit: cover;
  }
  td h1,
  td p {
    padding-right: 1rem;
  }
  h1 {
    margin: 1rem 0;
    color: darkgoldenrod;
    font-weight: bold;
    font-size: 1.7rem;
  }
  li {
    margin-top: 1rem;
  }
  .title {
    font-size: 1.2rem;
    font-weight: bold;
  }
  .description {
    padding: 0.5rem;
    color: grey;
    text-align: justify;
    hyphens: auto;
  }
  li time {
    font-size: smaller;
    font-weight: lighter;
    color: grey;
  }
  audio {
    width: 100%;
    margin-top: 0.5rem;
  }
  button {
    padding: 0.3rem;
    background-color: darkgoldenrod;
    color: black;
  }
</style>
