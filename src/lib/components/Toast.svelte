<script lang="ts">
	import { grove } from '$lib/grove.svelte';
</script>

<div class="toast" class:on={grove.toastMsg !== null} role="status" aria-live="polite">
	{grove.toastMsg ?? ''}
</div>

<style>
	.toast {
		position: fixed;
		left: 50%;
		transform: translateX(-50%);
		bottom: 96px;
		z-index: 60;
		background: var(--forest);
		color: #f2f1ea;
		font-size: 13.5px;
		font-weight: 600;
		padding: 10px 18px;
		border-radius: 999px;
		opacity: 0;
		visibility: hidden;
		transition: opacity 0.25s, visibility 0.25s;
		pointer-events: none;
		max-width: 88vw;
	}
	@media (prefers-color-scheme: dark) {
		.toast {
			background: #e9eddc;
			color: #1c3b23;
		}
	}
	.toast.on {
		opacity: 1;
		visibility: visible;
	}
</style>
