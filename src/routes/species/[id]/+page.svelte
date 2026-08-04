<script lang="ts">
	import { base } from '$app/paths';
	import { goto } from '$app/navigation';
	import LeafCard from '$lib/components/LeafCard.svelte';
	import { grove } from '$lib/grove.svelte';
	import { shareSpecies } from '$lib/share';

	let { data } = $props();
	const sp = $derived(data.species);

	let tab: 'spot' | 'folklore' | 'science' = $state('spot');
	const inGrove = $derived(grove.has(sp.id));

	async function add() {
		grove.addFind(sp.id);
		await goto(`${base}/grove/`);
	}
</script>

<svelte:head>
	<title>{sp.name} · Grove</title>
	<meta name="description" content="{sp.name} ({sp.latin}) — how to spot it, its folklore and its science. {sp.tell}" />
	<meta property="og:title" content="{sp.name} · Grove" />
	<meta property="og:description" content={sp.tell} />
</svelte:head>

<main class="view">
	<div class="row between">
		<a class="backlink" href="{base}/identify/">← Identify</a>
		<button class="pill" onclick={() => shareSpecies(sp)}>Share</button>
	</div>

	<div class="hero-ill" aria-hidden="true">
		<span class="heroleaf"><LeafCard colors={sp.colors} size={120} rotate={-14} /></span>
	</div>

	<div>
		<h1>{sp.name}</h1>
		<p class="sub" style="font-style:italic">
			{sp.latin}{inGrove ? ' · in your Grove' : ''}
		</p>
	</div>

	<div class="tabs" role="tablist" aria-label="Species information">
		<button class="tab" role="tab" aria-selected={tab === 'spot'} onclick={() => (tab = 'spot')}>Spotting it</button>
		<button class="tab" role="tab" aria-selected={tab === 'folklore'} onclick={() => (tab = 'folklore')}>Folklore</button>
		<button class="tab" role="tab" aria-selected={tab === 'science'} onclick={() => (tab = 'science')}>Science</button>
	</div>

	{#if tab === 'spot'}
		{#each sp.spot as s (s)}
			<div class="lore"><p class="lb">{s}</p></div>
		{/each}
	{:else}
		{#each sp[tab] as [title, body] (title)}
			<div class="lore">
				<p class="lt">{title}</p>
				<p class="lb">{body}</p>
			</div>
		{/each}
	{/if}

	<p class="tell">One to tell: {sp.tell}</p>

	<div class="row" style="flex-wrap:wrap">
		{#if inGrove}
			<span class="pill">✓ In your Grove</span>
		{:else}
			<button class="btn" onclick={add}>Add to my Grove</button>
		{/if}
	</div>
</main>

<style>
	h1 {
		font-family: var(--display);
		font-weight: 400;
		font-size: 26px;
		margin: 0;
	}
	.backlink {
		font-size: 13.5px;
		font-weight: 700;
		color: var(--deep);
		min-height: 44px;
		display: inline-flex;
		align-items: center;
		text-decoration: none;
	}
	.hero-ill {
		height: 120px;
		border-radius: 16px;
		position: relative;
		overflow: hidden;
		background: linear-gradient(180deg, color-mix(in oklab, var(--wash) 80%, var(--green)), var(--wash));
	}
	.heroleaf {
		position: absolute;
		right: 16px;
		top: 20px;
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
	.lore {
		border-left: 3px solid var(--forest);
		padding: 3px 0 3px 12px;
	}
	.lore .lt {
		font-weight: 700;
		font-size: 14px;
		margin: 0;
	}
	.lore .lb {
		font-size: 13.5px;
		color: var(--soft);
		margin: 0;
	}
	.tell {
		background: var(--stonewash);
		border: 1px solid var(--line);
		border-radius: 12px;
		padding: 12px 14px;
		font-family: var(--display);
		font-style: italic;
		font-size: 14px;
		color: var(--forest);
		margin: 2px 0 0;
	}
</style>
