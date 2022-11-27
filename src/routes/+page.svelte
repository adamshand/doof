<script>
	import { doof } from '../stores/doof.js';
	import Auth from '../components/Auth.svelte';
	// import Podcasts from '../components/Podcasts.svelte';
</script>

<main>
	{#if $doof.hasAuthenticated}
		<div id="header">
			<button id="player"> This will be player</button>
			<button on:click={() => ($doof.hasAuthenticated = false)}>Q</button>
		</div>
	{:else}
		<img src="/doof.png" alt="d0oF Logo" />
	{/if}

	<div id="status">
		{$doof.status}
	</div>

	{#if $doof.hasAuthenticated}
		<h2>oooh, fancy you logged in.</h2>
	{:else}
		<Auth />
	{/if}
</main>

<style>
	#header {
		display: flex;
		flex-direction: row;
		flex-wrap: nowrap;
		width: 100%;
	}
	#player {
		/* width: 100%; */
	}
	img {
		width: 100%;
	}
	#status {
		padding: 0.5rem;
		width: 100%;
		background-color: darkgoldenrod;
		color: whitesmoke;
		text-align: center;
		font-weight: 200;
	}
</style>
