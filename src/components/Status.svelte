<script>
	import { doof } from '@/stores/doof.js';
</script>

<div id="status">
	{$doof.status}
</div>

<style>
	#status {
		padding: 0.5rem;
		width: 100%;
		border: 2px solid darkgoldenrod;
		background-color: var(--background);
		color: goldenrod;
		text-align: center;
		font-weight: 200;
	}
</style>
