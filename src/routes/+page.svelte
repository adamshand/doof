<script lang="ts">
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';

	import { doof } from '@/stores/doof.js';
	import Auth from '@/components/Auth.svelte';
	import Status from '@/components/Status.svelte';

	if (browser && $doof.hasAuthenticated) {
		goto('/shows');
	}
</script>

<img src="/doof.png" alt="d0oF Logo" />

<Status />

<Auth />
