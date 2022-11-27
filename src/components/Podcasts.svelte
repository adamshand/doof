<script>
	// import { SyncLoader } from 'svelte-loading-spinners'
	import { onMount } from 'svelte';

	import { doof } from '../stores/doof.js';

	function buildUrl(action, params) {
		return `${$doof.baseUrl}/${action}?u=${$doof.username}&p=${$doof.password}${$doof.defaultQuerySrings}`;
	}

	async function getPodcasts() {
		const url = buildUrl('getPodcasts');
		console.log(url);
		const data = await fetch(url);
		const json = await data.json();

		if (json['subsonic-response'].status === 'ok') {
			return json['subsonic-response'].podcasts.channel;
		} else {
			$doof.status = json['subsonic-response'].error.message;
			throw new Error(json['subsonic-response'].error.message);
		}
	}

	async function getNewestPodcasts() {
		const numEpisodes = 10;
		const url = `${$doof.baseUrl}/getNewestPodcasts?u=${$doof.username}&p=${$doof.password}${$doof.defaultQuerySrings}&count=${numEpisodes}`;

		const data = await fetch(url);
		const json = await data.json();

		if (json['subsonic-response'].status === 'ok') {
			$doof.status = json['subsonic-response'].status;
			return json['subsonic-response'].newestPodcasts.episode;
		} else {
			$doof.status = json['subsonic-response'].error.message;
			throw new Error(json['subsonic-response'].error.message);
		}
	}
</script>

<div id="podcasts">
	{#await getPodcasts()}
		<div id="loading">
			<!-- <SyncLoader size="60" color="darkgoldenrod" unit="px" duration="1s" /> -->
			Loading ...
		</div>
	{:then podcasts}
		{#each podcasts.sort( (a, b) => (a.episode[0].publishDate < b.episode[0].publishDate ? 1 : -1) ) as podcast}
			{console.log(podcast)}

			<div class="cover">
				<img
					on:click={() => ($doof.display = ['episodes', podcast])}
					alt={`Cover Art for ${podcast.title}`}
					src={`${$doof.baseUrl}/getCoverArt?u=${$doof.username}&p=${$doof.password}${$doof.defaultQuerySrings}&id=${podcast.coverArt}&size=128`}
					title={podcast.title}
				/>
			</div>
		{/each}
	{:catch error}
		{($doof.status = error)}
	{/await}
</div>

<style>
	#loading {
		position: absolute;
		right: 42%;
		top: 30%;
	}
	#podcasts {
		display: flex;
		flex-wrap: wrap;
		place-items: center;
	}
	.cover {
		width: 29%;
		margin: 0.4rem;
	}
	.cover img {
		width: 100%;
	}
	/* .cover button {
    width: 1rem;
    height: 1rem;
    border-radius: 0;
    position: absolute;
    top: 300;
    right: 30;
    padding: 0.3rem;
    background-color: crimson;
    font-size: 1rem;
  } */
</style>
