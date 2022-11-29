<script lang="ts">
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';

	import { doof } from '@/stores/doof.js';
	$: console.log($doof.hasAuthenticated);
	const hasAuthenticated = true;
</script>

{#if browser}
	{#if $doof.hasAuthenticated}
		<!-- {#if hasAuthenticated} -->
		arphed!
		{goto('/p')}
	{:else}
		no arphed :-(
		{goto('/a')}
	{/if}
{/if}
