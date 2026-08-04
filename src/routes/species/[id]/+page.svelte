<script lang="ts">
	import { base } from '$app/paths';
	import { goto } from '$app/navigation';
	import SpeciesPhoto from '$lib/components/SpeciesPhoto.svelte';
	import { grove } from '$lib/grove.svelte';
	import { shareSpecies } from '$lib/share';

	let { data } = $props();
	const sp = $derived(data.species);

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

	<nav class="contents" aria-label="On this page">
		<a href="#spotting">Spotting it</a>
		<a href="#year">Through the year</a>
		<a href="#folklore">Folklore</a>
		<a href="#science">Science</a>
	</nav>

	<section id="spotting" class="section">
		<h2 class="shead">Spotting it</h2>
		<div class="prose">
			{#each sp.spot as note, i (i)}
				<p class="note">
					{#each parts(note) as part, j (j)}{#if part.bold}<strong>{part.text}</strong>{:else}{part.text}{/if}{/each}
				</p>
			{/each}
		</div>
	</section>

	<section id="year" class="section">
		<h2 class="shead">Through the year</h2>
		<div class="seasons">
			{#each sp.season as [season, note] (season)}
				<div class="seasoncard {season.toLowerCase()}">
					<p class="label">{season}</p>
					<p class="sn">{note}</p>
				</div>
			{/each}
		</div>
	</section>

	<section id="folklore" class="section">
		<h2 class="shead">Folklore</h2>
		<div class="prose">
			{#each sp.folklore as [title, body] (title)}
				<article class="story">
					<h3>{title}</h3>
					<p>{body}</p>
				</article>
			{/each}
		</div>
	</section>

	<section id="science" class="section">
		<h2 class="shead">Science</h2>
		<div class="prose">
			{#each sp.science as [title, body] (title)}
				<article class="entry">
					<h3>{title}</h3>
					<p>{body}</p>
				</article>
			{/each}
		</div>
	</section>

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
	.contents {
		display: flex;
		flex-wrap: wrap;
		gap: 7px;
	}
	.contents a {
		font-size: 12.5px;
		font-weight: 700;
		color: var(--deep);
		background: var(--wash);
		border: 1px solid var(--wash-line);
		border-radius: 999px;
		padding: 8px 13px;
		min-height: 44px;
		display: inline-flex;
		align-items: center;
		text-decoration: none;
	}
	.section {
		scroll-margin-top: 12px;
	}
	.shead {
		font-family: var(--display);
		font-weight: 400;
		font-size: 22px;
		margin: 6px 0 10px;
		padding-bottom: 7px;
		border-bottom: 1px solid var(--line);
	}
	.prose {
		display: flex;
		flex-direction: column;
		gap: 14px;
	}
	/* spotting notes are instructions read standing under a tree: sans, larger,
	   full-contrast ink rather than soft grey */
	.note {
		font-size: 16px;
		line-height: 1.6;
		color: var(--ink);
		border-left: 3px solid var(--wash-line);
		padding-left: 14px;
		max-width: 66ch;
	}
	.entry h3,
	.story h3 {
		font-family: var(--display);
		font-weight: 700;
		font-size: 17px;
		margin: 0 0 6px;
	}
	.entry p {
		font-size: 15.5px;
		line-height: 1.65;
		color: var(--ink);
		margin: 0;
		max-width: 66ch;
	}
	/* the folklore is the reason someone falls for a tree rather than merely
	   naming it, so it reads as prose, not as a caption */
	.story p {
		font-family: var(--display);
		font-size: 17px;
		line-height: 1.62;
		color: var(--ink);
		margin: 0;
		max-width: 60ch;
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
		border-left: 4px solid var(--line);
		border-radius: 13px;
		padding: 11px 13px;
	}
	.seasoncard.spring {
		border-left-color: #8fbf5a;
	}
	.seasoncard.summer {
		border-left-color: var(--green);
	}
	.seasoncard.autumn {
		border-left-color: #c8862f;
	}
	.seasoncard.winter {
		border-left-color: #6b7f8a;
	}
	.sn {
		margin: 0;
		font-size: 14.5px;
		line-height: 1.55;
		color: var(--ink);
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
