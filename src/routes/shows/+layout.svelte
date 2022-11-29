<script lang="ts">
	import { doof } from '@/stores/doof.js';
</script>

<!-- {#if $doof.hasAuthenticated} -->
<slot />

<!-- {:else}
	{(window.location.href = '/a')}
{/if}} -->
<style>
</style>
