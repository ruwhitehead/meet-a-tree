<script lang="ts">
	import { base } from '$app/paths';

	const NEAR: { name: string; dist: string; id: string | null }[] = [
		{ name: 'English oak', dist: '120 m · park gates, the big one', id: 'oak' },
		{ name: 'Sycamore', dist: '200 m · churchyard corner', id: 'sycamore' },
		{ name: 'Rowan', dist: '450 m · three along the cycle path', id: 'rowan' },
		{ name: 'Silver birch', dist: '600 m · edge of the playing field', id: 'birch' },
		{ name: 'Wild service tree', dist: '800 m · rare — one of few in the area', id: null }
	];
</script>

<svelte:head>
	<title>Near you · Grove</title>
</svelte:head>

<main class="view">
	<div class="vhead">
		<h1>Near you</h1>
		<span class="pill">within 1 km</span>
	</div>

	<div class="card tint">
		<p class="label">Species around you</p>
		<p class="serif" style="font-size:22px">27 species <span style="font-size:14px">within a kilometre</span></p>
		<p class="sub">More than a botanic garden's worth, hiding in plain sight.</p>
	</div>

	<div class="nearlist">
		{#each NEAR as n (n.name)}
			{#if n.id}
				<a class="nearrow" href="{base}/species/{n.id}/">
					<span><span class="nn">{n.name}</span><br /><span class="nd">{n.dist}</span></span>
					<span class="pill">Guide</span>
				</a>
			{:else}
				<div class="nearrow">
					<span><span class="nn">{n.name}</span><br /><span class="nd">{n.dist}</span></span>
					<span class="pill rare">Rare</span>
				</div>
			{/if}
		{/each}
	</div>
	<p class="samplenote">
		Sample data for this build — the production feed pulls live occurrence records from GBIF &amp;
		iNaturalist, cached for offline walks.
	</p>
</main>

<style>
	.nearlist {
		display: flex;
		flex-direction: column;
		gap: 9px;
	}
	.nearrow {
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 10px;
		background: var(--card);
		border: 1px solid var(--line);
		border-radius: 13px;
		padding: 11px 14px;
		min-height: 44px;
		text-decoration: none;
		color: inherit;
	}
	.nn {
		font-weight: 700;
		font-size: 13.5px;
	}
	.nd {
		font-size: 12px;
		color: var(--soft);
	}
	.pill.rare {
		background: var(--stonewash);
		color: var(--forest);
		border-color: var(--line);
	}
</style>
