<script lang="ts">
	import sanitizeHtml from 'sanitize-html';

	import { doof } from '@/stores/doof.js';

	import Player from '@/components/Player.svelte';
	import Status from '@/components/Status.svelte';

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	export let data: any;
	// $: console.log('shows/[id]/+page.svelte: ', data);

	const descriptionLength = 312;
	let lastUpdated = new Date();

	const coverUrl = `${$doof.urlBase}/getCoverArt?u=${$doof.username}&p=${$doof.password}&${$doof.urlSuffix}&id=${data.coverArt}`;
	// console.log(coverUrl);
	async function downloadEpisode(id: string) {
		// https://puoro.haume.nz/rest/downloadPodcastEpisode?u=admin&p=AngelDust&c=doof&f=json&id=pe-3667
		const url = `${$doof.urlBase}/downloadPodcastEpisode?u=${$doof.username}&p=${$doof.password}${$doof.urlSuffix}&id=${id}`;

		const data = await fetch(url);
		const json = await data.json();

		if (json['subsonic-response'].status === 'ok') {
			lastUpdated = new Date();
		} else {
			// TODO need to trigger a rerender so UI updates when downloaded
			$doof.status = json['subsonic-response'].error.message;
			throw new Error(json['subsonic-response'].error.message);
		}
	}
</script>

<Player />
<Status />

<!-- <div id="wrapper"> -->
<h1>{data.title}</h1>
<p class="description">{data.description}</p>
<hr />

<ul>
	{#each data.episode as episode}
		<li>
			<p>
				<time
					>{new Date(episode.publishDate).toLocaleString('en-nz', {
						day: '2-digit',
						month: 'long',
						year: 'numeric'
					})}
				</time>
			</p>
			<p class="title">{episode.title}</p>
			<p class="description">
				{#if episode.description.length < descriptionLength}
					{@html sanitizeHtml(episode.description)}
				{:else}
					{@html sanitizeHtml(
						// TODO better truncating of description
						// .substring(0, descriptionLength)
						episode.description.substring(0, episode.description.indexOf('.')) + '.'
					)}
				{/if}
				{#if episode.path !== ''}
					<audio controls>
						<source
							src={`${$doof.urlBase}/stream?id=${episode.streamId}&u=${$doof.username}&p=${$doof.password}&${$doof.urlSuffix}`}
							type="audio/mpeg"
						/>
					</audio>
				{:else}
					<br />
					<button on:click={() => downloadEpisode(episode.streamId)}> Download </button>
				{/if}
			</p>
		</li>
	{/each}
</ul>

<!-- </div> -->
<style>
	/* #wrapper {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		margin: 0.5rem;
	} */
	h1 {
		color: darkgoldenrod;
		font-weight: bold;
		text-align: center;
	}
	.description {
		/* padding: 0 0.5rem; */
		color: silver;
		text-align: justify;
		font-weight: 200;
		hyphens: auto;
	}
	ul {
		/* margin: 0 0.5rem; */
		list-style-type: none;
	}
	li {
		margin-top: 1rem;
	}
	.title {
		margin: 0.25rem 0;
		color: darkgoldenrod;

		font-size: 1.1rem;
		font-weight: bold;
	}
	li time {
		/* font-size: 1rem; */
		font-weight: 200;
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
