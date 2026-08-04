<script lang="ts">
	import { base } from '$app/paths';
	import { goto } from '$app/navigation';
	import SpeciesPhoto from '$lib/components/SpeciesPhoto.svelte';
	import { grove } from '$lib/grove.svelte';
	import { shareSpecies } from '$lib/share';

	let { data } = $props();
	const sp = $derived(data.species);

	let tab: 'spot' | 'folklore' | 'science' = $state('spot');
	const inGrove = $derived(grove.has(sp.id));

	async function add() {
		grove.addFind(sp.id);
		await goto(`${base}/trees/`);
	}

	/** Splits **bold** spans so reference notes can emphasise the key feature. */
	function parts(text: string) {
		return text.split(/(\*\*[^*]+\*\*)/).map((chunk) =>
			chunk.startsWith('**') && chunk.endsWith('**')
				? { bold: true, text: chunk.slice(2, -2) }
				: { bold: false, text: chunk }
		);
	}
</script>

<svelte:head>
	<title>{sp.name} ({sp.latin}) · Meet a Tree</title>
	<meta
		name="description"
		content="{sp.name} ({sp.latin}) — how to spot it, its folklore and its science. {sp.tell}"
	/>
	<meta property="og:title" content="{sp.name} · Meet a Tree" />
	<meta property="og:description" content={sp.tell} />
</svelte:head>

<main class="view">
	<div class="row between">
		<a class="backlink" href="{base}/learn/">
			<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
				<path d="M19 12H6" /><path d="M11.5 6.5L6 12l5.5 5.5" />
			</svg>
			All trees
		</a>
		<button class="pill" onclick={() => shareSpecies(sp)}>Share</button>
	</div>

	<div class="photos">
		<SpeciesPhoto id={sp.id} kind="tree" alt="A mature {sp.name}" height={210} priority />
		<SpeciesPhoto id={sp.id} kind="leaf" alt="Close-up of {sp.name} foliage" height={210} />
	</div>

	<div>
		<h1>{sp.name}</h1>
		<p class="sub latin">{sp.latin} · {sp.family}{inGrove ? ' · in your grove' : ''}</p>
		{#if sp.aka?.length}
			<p class="sub">Also called {sp.aka.join(', ')}.</p>
		{/if}
	</div>

	<div class="row" style="flex-wrap:wrap">
		{#if inGrove}
			<span class="pill">✓ In your grove</span>
			<button class="removebtn" onclick={() => grove.removeFind(sp.id)}>Remove from grove</button>
		{:else}
			<button class="btn" onclick={add}>Add to my grove</button>
		{/if}
	</div>

	<dl class="quick">
		{#each sp.quick as [label, value] (label)}
			<div><dt>{label}</dt><dd>{value}</dd></div>
		{/each}
	</dl>

	<div class="tabs" role="tablist" aria-label="Species information">
		<button class="tab" role="tab" aria-selected={tab === 'spot'} onclick={() => (tab = 'spot')}>Spotting it</button>
		<button class="tab" role="tab" aria-selected={tab === 'folklore'} onclick={() => (tab = 'folklore')}>Folklore</button>
		<button class="tab" role="tab" aria-selected={tab === 'science'} onclick={() => (tab = 'science')}>Science</button>
	</div>

	{#if tab === 'spot'}
		<div class="prose">
			{#each sp.spot as note, i (i)}
				<p class="note">
					{#each parts(note) as part, j (j)}{#if part.bold}<strong>{part.text}</strong>{:else}{part.text}{/if}{/each}
				</p>
			{/each}
		</div>
		<h2 class="subhead">Through the year</h2>
		<div class="seasons">
			{#each sp.season as [season, note] (season)}
				<div class="seasoncard">
					<p class="label">{season}</p>
					<p class="sn">{note}</p>
				</div>
			{/each}
		</div>
	{:else}
		<div class="prose">
			{#each sp[tab] as [title, body] (title)}
				<article class="entry">
					<h2>{title}</h2>
					<p>{body}</p>
				</article>
			{/each}
		</div>
	{/if}

	<p class="tell">One to tell: {sp.tell}</p>
</main>

<style>
	h1 {
		font-family: var(--display);
		font-weight: 400;
		font-size: 27px;
		margin: 0;
		line-height: 1.15;
	}
	.latin {
		font-style: italic;
	}
	.backlink {
		font-size: 13.5px;
		font-weight: 700;
		color: var(--deep);
		min-height: 44px;
		display: inline-flex;
		align-items: center;
		gap: 5px;
		text-decoration: none;
	}
	.backlink svg {
		width: 15px;
		height: 15px;
		flex: none;
	}
	.photos {
		display: grid;
		gap: 10px;
		grid-template-columns: 1fr;
	}
	.quick {
		margin: 0;
		background: var(--card);
		border: 1px solid var(--line);
		border-radius: 14px;
		overflow: hidden;
	}
	.quick > div {
		display: grid;
		grid-template-columns: 96px 1fr;
		gap: 10px;
		padding: 9px 14px;
		border-bottom: 1px solid var(--line);
	}
	.quick > div:last-child {
		border-bottom: none;
	}
	.quick dt {
		font-size: 11px;
		font-weight: 700;
		letter-spacing: 0.06em;
		text-transform: uppercase;
		color: var(--soft);
		padding-top: 2px;
	}
	.quick dd {
		margin: 0;
		font-size: 13.5px;
	}
	.tabs {
		display: flex;
		gap: 4px;
		background: var(--stonewash);
		border-radius: 12px;
		padding: 4px;
	}
	.tab {
		flex: 1;
		text-align: center;
		font-size: 12.5px;
		font-weight: 700;
		padding: 9px 0;
		border-radius: 9px;
		color: var(--soft);
		min-height: 40px;
	}
	.tab[aria-selected='true'] {
		background: var(--card);
		color: var(--ink);
		box-shadow: 0 1px 3px rgba(30, 30, 30, 0.18);
	}
	.prose {
		display: flex;
		flex-direction: column;
		gap: 14px;
	}
	.note {
		font-size: 14.5px;
		line-height: 1.6;
		border-left: 3px solid var(--wash-line);
		padding-left: 13px;
		max-width: 68ch;
	}
	.entry h2 {
		font-family: var(--display);
		font-weight: 700;
		font-size: 17px;
		margin: 0 0 5px;
	}
	.entry p {
		font-size: 14.5px;
		line-height: 1.65;
		color: var(--soft);
		margin: 0;
		max-width: 68ch;
	}
	.subhead {
		font-family: var(--display);
		font-weight: 400;
		font-size: 19px;
		margin: 8px 0 0;
	}
	.seasons {
		display: grid;
		gap: 9px;
		grid-template-columns: 1fr;
	}
	.seasoncard {
		background: var(--card);
		border: 1px solid var(--line);
		border-radius: 13px;
		padding: 11px 13px;
	}
	.sn {
		margin: 0;
		font-size: 13.5px;
		line-height: 1.55;
		color: var(--soft);
	}
	.removebtn {
		font-size: 13px;
		font-weight: 600;
		color: var(--soft);
		text-decoration: underline;
		min-height: 44px;
		display: inline-flex;
		align-items: center;
		padding: 0 4px;
	}
	.removebtn:hover {
		color: var(--ink);
	}
	.tell {
		background: var(--stonewash);
		border: 1px solid var(--line);
		border-radius: 12px;
		padding: 13px 15px;
		font-family: var(--display);
		font-style: italic;
		font-size: 14.5px;
		color: var(--forest);
		margin: 4px 0 0;
	}
	@media (min-width: 700px) {
		.photos,
		.seasons {
			grid-template-columns: 1fr 1fr;
		}
	}
	@media (min-width: 900px) {
		h1 {
			font-size: 36px;
		}
		.quick > div {
			grid-template-columns: 120px 1fr;
		}
	}
</style>
