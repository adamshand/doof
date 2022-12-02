<script lang="ts">
	// import { SyncLoader } from 'svelte-loading-spinners';

	import { doof } from '@/stores/doof.js';

	import Player from '@/components/Player.svelte';
	import Status from '@/components/Status.svelte';

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	export let data: any;
	// $: console.log('shows/+page.js: ', data.channel);
</script>

<Player />
<Status />

<div id="tiles">
	<!-- {#each data.channel.sort( (a, b) => (a.episode[0].publishDate < b.episode[0].publishDate ? 1 : -1) ) as podcast} -->
	{#each data.channel as podcast}
		<!-- {console.log(podcast)} -->
		{@const coverUrl = `${$doof.urlBase}/getCoverArt?u=${$doof.username}&p=${$doof.password}&${$doof.urlSuffix}&id=${podcast.coverArt}`}
		<div class="cover">
			<a href={`/shows/${podcast.id}`}>
				<img alt={`Cover Art for ${podcast.title}`} src={coverUrl} title={podcast.title} /></a
			>
		</div>
	{/each}
</div>

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
	/* #loading {
		position: absolute;
		right: 42%;
		top: 30%;
	} */
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
