<script lang="ts">
	import { base } from '$app/paths';
	import { goto } from '$app/navigation';
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
	<title>My Grove · Meet a Tree</title>
</svelte:head>

<main class="view">
	<div class="vhead">
		<h1>My Grove</h1>
		<button class="pill" onclick={onShare}>Share my grove</button>
	</div>
	<p class="howto">
		<a href="{base}/identify/">Photograph a leaf</a> to add a tree to your grove.
	</p>

	<div class="stats">
		<div class="stat"><div class="n">{grove.speciesCount}</div><div class="l">species</div></div>
		<div class="stat"><div class="n">{grove.finds.length}</div><div class="l">finds</div></div>
		<div class="stat">
			<div class="n">{grove.co2 ? `~${grove.co2}` : '0'}<span class="unit">kg</span></div>
			<div class="l">CO₂ / yr</div>
		</div>
		<div class="stat">
			<div class="n">{SPECIES.length - grove.speciesCount}</div>
			<div class="l">to find</div>
		</div>
	</div>

	{#if grove.speciesCount === 0}
		<div class="card tint">
			<p class="label">Your grove is waiting</p>
			<p class="serif" style="font-size:15.5px">
				Every grove starts with one tree. Photograph a leaf, answer three quick questions, and it’s
				yours — there’s probably a candidate outside your window.
			</p>
			<a class="btn small" style="margin-top:10px" href="{base}/identify/">Meet your first tree</a>
		</div>
	{/if}

	<div class="grid">
		{#each SPECIES as sp (sp.id)}
			{@const has = grove.has(sp.id)}
			<a
				class="spcard"
				class:locked={!has}
				href={has ? `${base}/species/${sp.id}/` : `${base}/identify/`}
			>
				<span class="pic">
					{#if has}
						<img src="{base}/images/species/{sp.id}-thumb.webp" alt="" width="120" height="120" loading="lazy" decoding="async" />
					{:else}
						<span class="silhouette" aria-hidden="true">
							<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M6 21c0-9 3-15 12-17-1 9-4 14-12 17z" /><path d="M6 21c2-5 5-9 9-12" /></svg>
						</span>
					{/if}
				</span>
				<span class="sn">{has ? sp.name : 'Not yet met'}</span>
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
		<p class="gb">Your gift goes to the International Tree Foundation — registered charity 1106269.</p>
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
	.howto {
		margin: -4px 0 0;
		font-size: 13.5px;
		color: var(--soft);
	}
	.howto a {
		color: var(--deep);
		font-weight: 700;
	}
	.stats {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: 8px;
	}
	.stat {
		background: var(--card);
		border: 1px solid var(--line);
		border-radius: 12px;
		padding: 10px 4px;
		text-align: center;
	}
	.stat .n {
		font-family: var(--display);
		font-size: 19px;
		color: var(--deep);
		font-variant-numeric: tabular-nums;
	}
	.stat .unit {
		font-size: 11px;
	}
	.stat .l {
		font-size: 9.5px;
		font-weight: 700;
		letter-spacing: 0.04em;
		text-transform: uppercase;
		color: var(--soft);
	}
	.grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 9px;
	}
	.spcard {
		background: var(--card);
		border: 1px solid var(--line);
		border-radius: 14px;
		padding: 8px 8px 10px;
		text-align: center;
		text-decoration: none;
		color: inherit;
		display: flex;
		flex-direction: column;
		gap: 2px;
		transition: transform 0.12s ease, border-color 0.12s ease;
	}
	.spcard:hover {
		border-color: var(--green);
	}
	.spcard:active {
		transform: scale(0.96);
	}
	.pic {
		display: block;
		aspect-ratio: 1;
		border-radius: 10px;
		overflow: hidden;
		background: var(--stonewash);
		margin-bottom: 5px;
	}
	.pic img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		display: block;
	}
	.silhouette {
		width: 100%;
		height: 100%;
		display: grid;
		place-items: center;
		color: var(--line);
	}
	.silhouette svg {
		width: 46%;
		height: 46%;
	}
	.sn {
		font-size: 11.5px;
		font-weight: 700;
		line-height: 1.25;
	}
	.sl {
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
	@media (min-width: 700px) {
		.grid {
			grid-template-columns: repeat(4, 1fr);
		}
	}
	@media (min-width: 900px) {
		.grid {
			grid-template-columns: repeat(6, 1fr);
		}
		.stats {
			max-width: 620px;
		}
	}
</style>
