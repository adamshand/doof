<script>
	import { app } from '../stores.js';

	async function getRandomSongs() {
		const url = `${$app.baseUrl}/getRandomSongs?u=${$app.username}&p=${$app.password}${$app.defaultQuerySrings}`;

		const data = await fetch(url);
		const json = await data.json();

		if (json['subsonic-response'].status === 'ok') {
			$app.status = json['subsonic-response'].status;
			return json['subsonic-response'].randomSongs.song;
		} else {
			$app.status = json['subsonic-response'].error.message;
			throw new Error(json['subsonic-response'].error.message);
		}
	}
</script>

<h1>Random Songs</h1>

{#await getRandomSongs()}
	<p>Loading genres ...</p>
{:then genres}
	{#each genres as genre}
		<div>
			{genre.value}<span>Songs: {genre.songCount} Albums: {genre.albumCount}</span>
		</div>
	{/each}
{:catch error}
	<p>error ...</p>
{/await}

<style>
	h1 {
		color: darkgoldenrod;
		font-weight: bold;
	}

	div {
		width: 100%;
		text-align: left;
	}
	span {
		float: right;
	}
</style>
