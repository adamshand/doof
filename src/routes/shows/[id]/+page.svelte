<script lang="ts">
	import sanitizeHtml from 'sanitize-html';
	import { invalidateAll } from '$app/navigation';
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';

	if (browser && !$doof.hasAuthenticated) {
		goto('/');
	}

	import { doof } from '@/stores/doof.js';

	import Player from '@/components/Player.svelte';
	import Status from '@/components/Status.svelte';

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	export let data: any;
	const descriptionLength = 312;

	async function downloadEpisode(id: string) {
		const url = `${$doof.urlBase}/downloadPodcastEpisode?u=${$doof.username}&p=${$doof.password}&${$doof.urlSuffix}&id=${id}`;

		const data = await fetch(url);
		const json = await data.json();

		if (json['subsonic-response'].status === 'ok') {
			invalidateAll();
		} else {
			$doof.status = json['subsonic-response'].error.message;
			throw new Error(json['subsonic-response'].error.message);
		}
	}
</script>

<div id="podcast">
	<Player />
	<Status />

	<h1>{data.title}</h1>
	<p class="description">{data.description}</p>
	<hr />

	<ul>
		{#each data.episode as episode}
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

				{#if episode.path !== ''}
					<audio controls>
						<source
							src={`${$doof.urlBase}/stream?id=${episode.streamId}&u=${$doof.username}&p=${$doof.password}&${$doof.urlSuffix}`}
							type="audio/mpeg"
						/>
					</audio>
				{:else}
					<!-- TODO: Download updated podcast list, after download successful (invalidate?) -->
					<br />
					<button on:click={() => downloadEpisode(episode.streamId)}> Download </button>
				{/if}
			</li>
		{/each}
	</ul>
</div>

<style>
	#podcast,
	ul {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}
	h1 {
		color: darkgoldenrod;
		font-weight: bold;
		text-align: center;
	}
	.description {
		display: -webkit-box;
		-webkit-line-clamp: 4;
		-webkit-box-orient: vertical;
		overflow: hidden;
		color: silver;
		text-align: justify;
		hyphens: auto;
		font-weight: 200;
	}
	ul {
		list-style-type: none;
	}
	.title {
		margin: 0.33rem 0;
		color: darkgoldenrod;

		font-size: 1.1rem;
		font-weight: bold;
	}
	li .meta {
		/* font-size: 1rem; */
		font-weight: 200;
		color: grey;
	}
	li .meta span {
		float: right;
	}
	audio {
		width: 100%;
		margin-top: 0.5rem;
	}
	button {
		padding: 0.3rem;
		background-color: var(--background);
		border: 2px solid darkgoldenrod;
		color: goldenrod;
	}
</style>
