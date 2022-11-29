<script>
	import { goto } from '$app/navigation';

	import Icon from 'svelte-awesome';
	import { faArrowRightFromBracket, faHouseChimney } from '@fortawesome/free-solid-svg-icons';

	import { doof } from '@/stores/doof.js';
</script>

<div id="bar">
	<button style="width: 5ch;" on:click={() => goto('/')}>
		<Icon data={faHouseChimney} />
	</button>

	<button style="width: 100%">Podcast Player Box</button>

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
