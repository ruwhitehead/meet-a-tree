<script lang="ts">
	import { base } from '$app/paths';
	import { goto } from '$app/navigation';
	import LeafCard from '$lib/components/LeafCard.svelte';
	import { SPECIES } from '$lib/content/species';
	import { BADGES, grove } from '$lib/grove.svelte';
	import { shareGrove } from '$lib/share';

	async function onShare() {
		if (!grove.speciesCount) {
			grove.toast('Meet your first tree, then show it off 🌿');
			await goto(`${base}/identify/`);
			return;
		}
		await shareGrove();
	}
</script>

<svelte:head>
	<title>My Grove · Grove</title>
</svelte:head>

<main class="view">
	<div class="vhead">
		<h1>My Grove</h1>
		<button class="pill" onclick={onShare}>Share my Grove</button>
	</div>

	<div class="stats">
		<div class="stat"><div class="n">{grove.speciesCount}</div><div class="l">species</div></div>
		<div class="stat"><div class="n">{grove.finds.length}</div><div class="l">finds</div></div>
		<div class="stat">
			<div class="n">{grove.co2 ? `~${grove.co2}` : '0'}<span style="font-size:12px">kg</span></div>
			<div class="l">CO₂ / yr</div>
		</div>
	</div>

	<div class="grid3">
		{#each SPECIES as sp (sp.id)}
			{@const has = grove.has(sp.id)}
			<a
				class="spcard"
				class:locked={!has}
				href={has ? `${base}/species/${sp.id}/` : `${base}/identify/`}
			>
				<span class="leafwrap"><LeafCard colors={has ? sp.colors : ['#DDD9CE', '#DDD9CE']} /></span>
				<span class="sn">{has ? sp.name : 'Not yet met'}</span><br />
				<span class="sl">{has ? sp.latin : 'tap to identify'}</span>
			</a>
		{/each}
	</div>

	<p class="label" style="margin-top:6px">Badges</p>
	<div class="badges">
		{#each BADGES as b (b.id)}
			{@const won = b.test(grove.speciesCount)}
			<span class="badge" class:won>{won ? '✓ ' : ''}{b.name}</span>
		{/each}
	</div>

	<div class="give">
		<p class="gt">🌱 Met some trees? Plant a real one.</p>
		<p class="gb">
			Your gift goes to the International Tree Foundation — registered charity 1106269.
		</p>
		<a
			class="btn small"
			style="margin-top:10px"
			href="https://internationaltreefoundation.org/donate/"
			target="_blank"
			rel="noopener">Donate to ITF ↗</a
		>
	</div>
</main>

<style>
	.stats {
		display: flex;
		gap: 8px;
	}
	.stat {
		flex: 1;
		background: var(--card);
		border: 1px solid var(--line);
		border-radius: 12px;
		padding: 10px 6px;
		text-align: center;
	}
	.stat .n {
		font-family: var(--display);
		font-size: 20px;
		color: var(--deep);
	}
	.stat .l {
		font-size: 10px;
		font-weight: 700;
		letter-spacing: 0.06em;
		text-transform: uppercase;
		color: var(--soft);
	}
	.grid3 {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 9px;
	}
	.spcard {
		background: var(--card);
		border: 1px solid var(--line);
		border-radius: 14px;
		padding: 12px 6px 10px;
		text-align: center;
		min-height: 44px;
		text-decoration: none;
		color: inherit;
	}
	.spcard .leafwrap {
		display: block;
		width: 38px;
		margin: 0 auto 7px;
	}
	.spcard .sn {
		font-size: 11.5px;
		font-weight: 700;
		line-height: 1.25;
	}
	.spcard .sl {
		font-size: 9.5px;
		font-style: italic;
		color: var(--soft);
	}
	.spcard.locked .sn {
		color: var(--soft);
		font-weight: 600;
	}
	.badges {
		display: flex;
		gap: 8px;
		flex-wrap: wrap;
	}
	.badge {
		font-size: 11.5px;
		font-weight: 700;
		color: var(--forest);
		background: var(--stonewash);
		border: 1px solid var(--line);
		border-radius: 999px;
		padding: 6px 12px;
	}
	.badge.won {
		color: var(--deep);
		background: var(--wash);
		border-color: var(--wash-line);
	}
</style>
