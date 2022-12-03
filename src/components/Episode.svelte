<script lang="ts">
	import sanitizeHtml from 'sanitize-html';
	import { BarLoader } from 'svelte-loading-spinners';
	import { invalidateAll } from '$app/navigation';

	import { doof } from '@/stores/doof.js';

	export let episode: any;

	const descriptionLength = 312;
	let episodeDownloading = false;

	async function downloadEpisode(id: string) {
		const url = `${$doof.urlBase}/downloadPodcastEpisode?u=${$doof.username}&p=${$doof.password}&${$doof.urlSuffix}&id=${id}`;
		episodeDownloading = true;

		const data = await fetch(url);
		const json = await data.json();

		if (json['subsonic-response'].status === 'ok') {
			episodeDownloading = false;
			invalidateAll();
		} else {
			$doof.status = json['subsonic-response'].error.message;
			throw new Error(json['subsonic-response'].error.message);
		}
	}
</script>

<li>
	<p class="meta">
		<time
			>{new Date(episode.publishDate).toLocaleString('en-nz', {
				day: '2-digit',
				month: 'long',
				year: 'numeric'
			})}
		</time>
		<span>
			{Math.floor(episode.duration / 60)} minutes
		</span>
	</p>

	<p class="title">{episode.title}</p>

	<p class="description">
		{#if episode.description.length < descriptionLength}
			{@html sanitizeHtml(episode.description)}
		{:else}
			{@html sanitizeHtml(episode.description)}
		{/if}
	</p>

	{#if episode.path === '' && episodeDownloading}
		<center>
			<BarLoader size="150" color="silver" unit="px" duration="2s" pause={false} />
		</center>
	{:else if episode.path === '' && !episodeDownloading}
		<button on:click={() => downloadEpisode(episode.streamId)}> Download </button>
	{:else}
		<audio controls>
			<source
				src={`${$doof.urlBase}/stream?id=${episode.streamId}&u=${$doof.username}&p=${$doof.password}&${$doof.urlSuffix}`}
				type="audio/mpeg"
			/>
		</audio>
	{/if}
</li>

<style>
	li {
		display: flex;
		flex-direction: column;
		gap: 0.33rem;
	}
	.description {
		display: -webkit-box;
		-webkit-line-clamp: 7;
		-webkit-box-orient: vertical;
		overflow: hidden;
		color: silver;
		text-align: justify;
		hyphens: auto;
		font-weight: 200;
	}
	.title {
		color: darkgoldenrod;

		font-size: 1.1rem;
		font-weight: bold;
	}
	.meta {
		font-weight: 200;
		color: grey;
	}
	.meta span {
		float: right;
	}
	audio {
		width: 100%;
		background-color: grey;
	}
	button {
		padding: 0.3rem;
		background-color: var(--background);
		border: 2px solid silver;
		color: white;
	}
</style>
