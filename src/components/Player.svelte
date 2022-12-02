<script>
	import { goto } from '$app/navigation';

	import Icon from 'svelte-awesome';
	import { faArrowRightFromBracket, faPodcast } from '@fortawesome/free-solid-svg-icons';

	import { doof } from '@/stores/doof.js';
</script>

<div id="bar">
	<button style="width: 5ch;" on:click={() => goto('/')}>
		<Icon data={faPodcast} />
	</button>

	<button style="width: 100%">TODO: Search? </button>

	<button
		style="width: 5ch;"
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
</style>
