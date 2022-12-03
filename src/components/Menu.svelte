<script lang="ts">
	import { goto } from '$app/navigation';

	import Icon from 'svelte-awesome';
	import { faArrowRightFromBracket, faPodcast, faRss } from '@fortawesome/free-solid-svg-icons';

	import { doof } from '@/stores/doof.js';

	export let rss = '';
</script>

<div id="bar">
	<a href="/">
		<button>
			<Icon data={faPodcast} />
		</button>
	</a>

	<input style="width: 100%" placeholder="TODO: Search?" />

	{#if rss}
		<a href={rss}>
			<button>
				<Icon data={faRss} />
			</button>
		</a>
	{/if}

	<button
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
		border: 2px solid silver;
		background-color: var(--background);
		color: darkgoldenrod;
		width: 4ch;
	}
	button:hover {
		color: gold;
	}
</style>
