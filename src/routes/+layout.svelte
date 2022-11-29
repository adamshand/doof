<script lang="ts">
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';

	import { doof } from '@/stores/doof.js';

	$: console.log('/+layout: ', $doof.hasAuthenticated);

	if ($doof.hasAuthenticated) {
		if (browser) {
			goto('/shows');
		} else {
			goto('/');
		}
	}
</script>

<main>
	<slot />
</main>

<style>
	main {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}
</style>
