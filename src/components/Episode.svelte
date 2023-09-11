<script lang="ts">
	import sanitizeHtml from 'sanitize-html';
	import { BarLoader } from 'svelte-loading-spinners';
	import { invalidateAll } from '$app/navigation';

	import { doof } from '@/stores/doof.js';

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	export let episode: {
		description: string;
		duration: number;
		path: string;
		publishDate: string;
		streamId: string;
		title: string;
	};

	const descriptionLength = 312;
	let episodeDownloading = false;

	async function downloadEpisode(id: string) {
		const url = `${$doof.urlBase}/downloadPodcastEpisode?u=${$doof.username}&p=${$doof.password}&${$doof.urlSuffix}&id=${id}`;
		episodeDownloading = true;

		const res = await fetch(url);
		const data = await res.json();

		if (data['subsonic-response'].status === 'ok') {
			episodeDownloading = false;
			await invalidateAll();
		} else {
			$doof.status = data['subsonic-response'].error.message;
			throw new Error(data['subsonic-response'].error.message);
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
		<div style="text-align: center">
			<BarLoader size="150" color="silver" unit="px" duration="2s" pause={false} />
		</div>
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
	.meta {
		text-align: left;
		font-weight: 200;
		color: grey;
	}
	.meta span {
		float: right;
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
		text-align: left;
		color: darkgoldenrod;
		font-size: 1.1rem;
		font-weight: bold;
	}
	audio {
		width: 100%;
		background-color: grey;
		border: 1px solid grey;
	}
	button {
		padding: 0.3rem;
		background-color: var(--background);
		border: 2px solid silver;
		color: white;
	}
</style>
