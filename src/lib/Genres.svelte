<script>
  import { loop_guard } from 'svelte/internal'

  async function getGenres() {
    const data = await fetch(
      'https://puoro.haume.nz/rest/getGenres?u=adam&p=AngelDust&c=testing&f=json',
    )
    const json = await data.json()
    if (json['subsonic-response'].status === 'ok') {
      // console.log(json['subsonic-response'].genres.genre)
      return json['subsonic-response'].genres.genre
    } else {
      throw new Error('ooh bad')
    }
  }
  const genresPromise = getGenres()
</script>

<h1>Genres</h1>

{#await genresPromise}
  <p>Loading genres ...</p>
{:then genres}
  {#each genres as genre}
    <div>
      {genre.value}<span
        >Songs: {genre.songCount} Albums: {genre.albumCount}</span
      >
    </div>
  {/each}
{:catch error}
  <p>error ...</p>
{/await}

<style>
  div {
    width: 100%;
    text-align: left;
  }
  span {
    float: right;
  }
</style>
