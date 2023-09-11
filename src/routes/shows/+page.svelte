<script lang="ts">
	// import { SyncLoader } from 'svelte-loading-spinners';
	import { browser } from '$app/environment'
	import { goto } from '$app/navigation'

	import { doof } from '@/stores/doof.js'

	import Menu from '@/components/Menu.svelte'
	import Status from '@/components/Status.svelte'

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	export let data: any

	if (browser && !$doof.hasAuthenticated) {
		goto('/')
	}
	// $: console.log('shows/+page.js: ', p);
</script>

<div id="podcast">
	<Menu />
	<Status />

	<div id="tiles">
		<!-- {#each data.channel.sort( (a, b) => (a.episode[0].publishDate < b.episode[0].publishDate ? 1 : -1) ) as podcast} -->
		{#each data.channel as podcast}
			{@const coverUrl = `${$doof.urlBase}/getCoverArt?u=${$doof.username}&p=${$doof.password}&${$doof.urlSuffix}&id=${podcast.coverArt}`}
			<div class="cover">
				<a href={`/shows/${podcast.id}`}>
					<img alt={`Cover Art for ${podcast.title}`} src={coverUrl} title={podcast.title} /></a
				>
			</div>
		{/each}
	</div>
</div>

<style>
	#podcast {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}
	#tiles {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: center;
		gap: 0.7rem;
	}
	.cover {
		width: 31%;
		height: 31%;
	}
	.cover img {
		object-fit: cover;
	}
</style>
