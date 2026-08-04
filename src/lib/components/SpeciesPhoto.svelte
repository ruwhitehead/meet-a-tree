<script lang="ts">
	import { base } from '$app/paths';
	import credits from '$lib/content/credits.json';

	let {
		id,
		kind,
		alt,
		height = 200,
		priority = false
	}: { id: string; kind: 'tree' | 'leaf'; alt: string; height?: number; priority?: boolean } =
		$props();

	const credit = $derived(
		(credits as Record<string, Record<string, { artist: string; license: string; page: string }>>)[id]?.[
			kind
		]
	);
</script>

<figure class="photo" style="--h:{height}px">
	<img
		src="{base}/images/species/{id}-{kind}.webp"
		{alt}
		width="900"
		height="675"
		loading={priority ? 'eager' : 'lazy'}
		fetchpriority={priority ? 'high' : 'auto'}
		decoding="async"
	/>
	<figcaption>
		{kind === 'tree' ? 'The whole tree' : 'Leaf detail'}
		{#if credit}
			· <a href={credit.page} target="_blank" rel="noopener">{credit.artist || 'Wikimedia'}</a>,
			{credit.license}
		{/if}
	</figcaption>
</figure>

<style>
	.photo {
		margin: 0;
	}
	img {
		width: 100%;
		height: var(--h);
		object-fit: cover;
		border-radius: 14px;
		display: block;
		background: var(--stonewash);
	}
	figcaption {
		font-size: 10.5px;
		color: var(--soft);
		margin-top: 5px;
		line-height: 1.4;
	}
	figcaption a {
		color: var(--soft);
	}
</style>
