<script lang="ts">
	import sanitizeHtml from 'sanitize-html';
	import {browser} from '$app/environment';
	import {goto} from '$app/navigation';
	import {doof} from '@/stores/doof.js';

	import Menu from '@/components/Menu.svelte';
	import Status from '@/components/Status.svelte';
	import Episode from '@/components/Episode.svelte';

	if (browser && !$doof.hasAuthenticated) {
		goto('/');
	}

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	export let data: any;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	let episodes: any;

	// $: {
	// 	if ($doof.search !== '') {
	// 		episodes = data.episode.filter(
	// 			(ep: { title: string; description: string }) =>
	// 				ep.title.includes($doof.search) || ep.description.includes($doof.search)
	// 		);
	// 	}
	// }
</script>

<div id="podcast">
	<Menu rss={data.url}/>
	<Status/>

	<h1>{data.title}</h1>
	<p class="description">{@html sanitizeHtml(data.description)}</p>

	<hr/>

	<ul>
		<!-- {#each episodes as episode} -->
		{#each data.episode as episode}
			<Episode {episode}/>
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
		-webkit-line-clamp: 6;
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
</style>
