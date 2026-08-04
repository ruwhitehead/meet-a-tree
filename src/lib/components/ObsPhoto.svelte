<script lang="ts">
	import { getPhoto } from '$lib/trees.svelte';

	let { photoKey, alt, height = 150 }: { photoKey: string; alt: string; height?: number } = $props();

	let url: string | null = $state(null);

	// Photos live as blobs in IndexedDB; mint an object URL per mount and revoke
	// it on teardown so a long timeline doesn't leak.
	$effect(() => {
		let mine: string | null = null;
		let cancelled = false;
		getPhoto(photoKey).then((blob) => {
			if (!blob || cancelled) return;
			mine = URL.createObjectURL(blob);
			url = mine;
		});
		return () => {
			cancelled = true;
			if (mine) URL.revokeObjectURL(mine);
			url = null;
		};
	});
</script>

{#if url}
	<img src={url} {alt} style="--h:{height}px" />
{:else}
	<span class="ph" style="--h:{height}px" aria-hidden="true"></span>
{/if}

<style>
	img,
	.ph {
		display: block;
		width: 100%;
		height: var(--h);
		object-fit: cover;
		border-radius: 12px;
		background: var(--stonewash);
	}
</style>
