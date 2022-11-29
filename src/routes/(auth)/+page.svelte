<script lang="ts">
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';

	import { doof } from '@/stores/doof.js';
	import Auth from '@/components/Auth.svelte';
	import Status from '@/components/Status.svelte';

	$: console.log('(auth)/+page: ', $doof.hasAuthenticated);

	if (browser && $doof.hasAuthenticated) {
		goto('/shows');
	}

	// export let data: { user: { name: string; email: string } };
</script>

<img src="/doof.png" alt="d0oF Logo" />

<Status />

<Auth />
