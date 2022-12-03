<script lang="ts">
	import { goto } from '$app/navigation';

	import Icon from 'svelte-awesome';
	import { faArrowRightFromBracket, faPodcast, faRss } from '@fortawesome/free-solid-svg-icons';

	import { doof } from '@/stores/doof.js';

	export let rss = '';
</script>

<div id="bar">
	<a href="/">
		<button title="Show all Podcasts">
			<Icon data={faPodcast} />
		</button>
	</a>

	<input bind:value={$doof.search} style="width: 100%" placeholder="Search episodes" />

	{#if rss}
		<a href={rss}>
			<button title="Link to Podcast RSS">
				<Icon data={faRss} />
			</button>
		</a>
	{/if}

	<button
		title="Logout"
		on:click={() => {
			$doof.hasAuthenticated = false;
			goto('/');
		}}
	>
		<Icon data={faArrowRightFromBracket} />
	</button>
</div>

<style>
	#bar {
		display: flex;
		flex-direction: row;
		flex-wrap: nowrap;
		gap: 0.5rem;
	}
	button {
		border: 2px solid darkgoldenrod;
		background-color: var(--background);
		color: darkgoldenrod;
		width: 4ch;
	}
	button:hover {
		color: gold;
	}
</style>
