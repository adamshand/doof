<script lang="ts">
	import { SyncLoader } from 'svelte-loading-spinners';

	import { doof } from '@/stores/doof.js';

	import Player from '@/components/Player.svelte';
	import Status from '@/components/Status.svelte';

	function buildUrl(action = '', params = '') {
		return `${$doof.urlBase}/${action}?u=${$doof.username}&p=${$doof.password}&${$doof.urlSuffix}&${params}`;
	}

	export async function getPodcasts(id = '') {
		const url = buildUrl('getPodcasts', id);

		const data = await fetch(url);
		const json = await data.json();

		if (json['subsonic-response'].status === 'ok') {
			return json['subsonic-response'].podcasts.channel;
		} else {
			$doof.status = json['subsonic-response'].error.message;
			throw new Error(json['subsonic-response'].error.message);
		}
	}
	export let data: { user: { name: string; email: string } };
	$: console.log('page.js: ', data);
</script>

<Player />
<Status />

{#await getPodcasts()}
	<div id="loading">
		<SyncLoader size="60" color="darkgoldenrod" unit="px" duration="1s" />
	</div>
{:then podcasts}
	<div id="tiles">
		{#each podcasts.sort( (a, b) => (a.episode[0].publishDate < b.episode[0].publishDate ? 1 : -1) ) as podcast}
			<div class="cover">
				<a href={`/shows/${podcast.id}`}>
					<img
						alt={`Cover Art for ${podcast.title}`}
						src={`${$doof.urlBase}/getCoverArt?u=${$doof.username}&p=${$doof.password}&${$doof.urlSuffix}&id=${podcast.coverArt}&size=192`}
						title={podcast.title}
					/></a
				>
			</div>
		{/each}
	</div>
{:catch error}
	console.log(error)
	{($doof.status = error)}
{/await}

<style>
	#tiles {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: center;
		gap: 0.7rem;
		/* display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 1rem; */
	}
	#loading {
		position: absolute;
		right: 42%;
		top: 30%;
	}
	.cover {
		width: 28vw;
		height: 28vw;
	}
	.cover img {
		object-fit: cover;
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
