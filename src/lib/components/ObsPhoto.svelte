<script lang="ts">
	import { getPhoto } from '$lib/trees.svelte';
	import { detectSaveCapability, saveToPhotos } from '$lib/photos';
	import { grove } from '$lib/grove.svelte';

	let {
		photoKey,
		alt,
		height = 150,
		savable = false
	}: { photoKey: string; alt: string; height?: number; savable?: boolean } = $props();

	let url: string | null = $state(null);
	/** kept in memory so the save handler can share immediately — awaiting
	 *  IndexedDB inside the click would cost us WebKit's transient activation */
	let blob: Blob | null = $state(null);

	const cap = detectSaveCapability();

	$effect(() => {
		let mine: string | null = null;
		let cancelled = false;
		getPhoto(photoKey).then((b) => {
			if (!b || cancelled) return;
			blob = b;
			mine = URL.createObjectURL(b);
			url = mine;
		});
		return () => {
			cancelled = true;
			if (mine) URL.revokeObjectURL(mine);
			url = null;
			blob = null;
		};
	});

	async function save() {
		if (!blob) return;
		const outcome = await saveToPhotos(blob);
		if (outcome === 'shared') grove.toast('Choose “Save Image” to keep it in Photos');
		else if (outcome === 'unsupported')
			grove.toast('Press and hold the photo, then “Add to Photos”');
		else if (outcome === 'failed') grove.toast('Couldn’t open the share sheet — press and hold instead');
	}
</script>

{#if url}
	<img src={url} {alt} style="--h:{height}px" />
	{#if savable && cap.offer}
		<button class="save" onclick={save}>
			<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" aria-hidden="true"><path d="M12 3v12" /><path d="M8 11l4 4 4-4" /><rect x="4" y="17" width="16" height="4" rx="1.5" /></svg>
			Save to Photos
		</button>
	{/if}
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
	/* a shimmer while the blob comes out of IndexedDB — a bare grey block reads
	   as a broken image */
	.ph {
		background-image: linear-gradient(
			100deg,
			var(--stonewash) 30%,
			color-mix(in oklab, var(--stonewash) 60%, var(--card)) 50%,
			var(--stonewash) 70%
		);
		background-size: 200% 100%;
		animation: sweep 1.4s ease-in-out infinite;
	}
	@keyframes sweep {
		from {
			background-position: 140% 0;
		}
		to {
			background-position: -40% 0;
		}
	}
	@media (prefers-reduced-motion: reduce) {
		.ph {
			animation: none;
		}
	}
	.save {
		display: inline-flex;
		align-items: center;
		gap: 7px;
		margin-top: 8px;
		font-size: 12.5px;
		font-weight: 700;
		color: var(--deep);
		background: var(--wash);
		border: 1px solid var(--wash-line);
		border-radius: 999px;
		padding: 8px 14px;
		min-height: 44px;
	}
	.save svg {
		width: 15px;
		height: 15px;
	}
</style>
