<script lang="ts">
	import { base } from '$app/paths';
	import LeafShape from '$lib/components/LeafShape.svelte';
	import { KEY1, KEY2, keyCandidates } from '$lib/content/key';
	import type { LeafKind } from '$lib/content/types';
	import { grove } from '$lib/grove.svelte';

	let step1: LeafKind | null = $state(null);
	let step2: string | null = $state(null);
	let photo: string | null = $state(null);
	let camInput: HTMLInputElement | undefined = $state();

	const candidates = $derived(step1 && step2 ? keyCandidates(step1, step2) : []);
	const step2Options: { id: string; title: string }[] = $derived(step1 ? KEY2[step1] : []);

	function onPhoto(e: Event) {
		const input = e.currentTarget as HTMLInputElement;
		const f = input.files?.[0];
		if (!f) return;
		if (photo) URL.revokeObjectURL(photo);
		photo = URL.createObjectURL(f);
		step1 = null;
		step2 = null;
		grove.toast('Got it. Now three quick questions 🌿');
		input.value = '';
	}
	function removePhoto() {
		if (photo) URL.revokeObjectURL(photo);
		photo = null;
	}
</script>

<svelte:head>
	<title>Identify a tree · Meet a Tree</title>
</svelte:head>

<main class="view">
	<div class="vhead"><h1>Identify a tree</h1></div>

	<!-- Honest about what this build does. Automatic photo matching needs a
	     server to hold the Pl@ntNet API key, which the static build has not got
	     yet — so the photo is a record and the key does the identifying. -->
	<div class="card stonebg">
		<p class="how">
			<strong>How this works.</strong> Answer three quick questions about the leaf and the guide
			narrows 40 British trees down to a shortlist. It takes under a minute and needs no signal.
		</p>
		<p class="how soft">
			Photographing the leaf is optional — it keeps the leaf on screen while you work through the
			questions. <strong>Automatic species matching from the photo is not in this build yet</strong>;
			it needs a server to talk to the Pl@ntNet service.
		</p>
	</div>

	{#if photo}
		<div class="card photocard">
			<img alt="Your leaf, ready for the field key" src={photo} />
			<button class="rm" onclick={removePhoto}>✕ Remove</button>
		</div>
		<button class="btn ghost" onclick={() => camInput?.click()}>Retake photo</button>
	{:else}
		<button class="btn ghost camerabtn" onclick={() => camInput?.click()}>
			<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" aria-hidden="true"><path d="M4 8h3l2-3h6l2 3h3v11H4z" /><circle cx="12" cy="13" r="3.4" /></svg>
			Photograph the leaf (optional)
		</button>
	{/if}
	<input
		bind:this={camInput}
		type="file"
		accept="image/*"
		capture="environment"
		class="visually-hidden"
		aria-hidden="true"
		tabindex="-1"
		onchange={onPhoto}
	/>

	{#if !step1}
		<p class="label">Step 1 of 3 · What kind of leaf is it?</p>
		{#each KEY1 as k (k.id)}
			<button class="opt" onclick={() => (step1 = k.id)}>
				<span class="glyph"><LeafShape shape={k.id} size={44} /></span>
				<span><span class="ot">{k.title}</span><br /><span class="ob">{k.desc}</span></span>
			</button>
		{/each}
	{:else if !step2}
		<button class="backlink" onclick={() => (step1 = null)}>← Start again</button>
		<p class="label">Step 2 of 3 · Look a little closer</p>
		{#each step2Options as k (k.id)}
			<button class="opt" onclick={() => (step2 = k.id)}>
				<span class="glyph"><LeafShape shape={k.id} size={44} /></span>
				<span class="ot">{k.title}</span>
			</button>
		{/each}
	{:else}
		<button class="backlink" onclick={() => (step2 = null)}>← Back</button>
		<p class="label">
			Step 3 of 3 · {candidates.length}
			{candidates.length === 1 ? 'candidate' : 'candidates'} — compare with your leaf
		</p>
		{#each candidates as sp (sp.id)}
			<a class="opt" href="{base}/species/{sp.id}/">
				<span class="thumb">
					<img src="{base}/images/species/{sp.id}-leaf.webp" alt="" width="120" height="120" loading="lazy" decoding="async" />
				</span>
				<span>
					<span class="ot">{sp.name}</span>
					<span class="ob" style="font-style:italic">{sp.latin}</span><br />
					<span class="ob">{sp.hint}</span>
				</span>
			</a>
		{/each}
		{#if candidates.length === 0}
			<p class="sub">Nothing in the guide matches that combination — try stepping back.</p>
		{/if}
	{/if}
</main>

<style>
	.how {
		margin: 0;
		font-size: 13.5px;
		line-height: 1.55;
		color: var(--soft);
	}
	.how strong {
		color: var(--ink);
	}
	.how.soft {
		margin-top: 8px;
	}
	.camerabtn {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: 9px;
		font-size: 14.5px;
		padding: 12px 18px;
		min-height: 50px;
	}
	.camerabtn svg {
		width: 20px;
		height: 20px;
	}
	.opt {
		display: flex;
		align-items: center;
		gap: 13px;
		width: 100%;
		background: var(--card);
		border: 1px solid var(--line);
		border-radius: 14px;
		padding: 13px 14px;
		min-height: 66px;
		text-decoration: none;
		color: inherit;
		transition: transform 0.12s ease, border-color 0.12s ease;
	}
	.opt:hover {
		border-color: var(--green);
	}
	.opt:active {
		transform: scale(0.98);
	}
	.glyph {
		width: 46px;
		flex: none;
		display: grid;
		place-items: center;
	}
	.thumb {
		width: 54px;
		height: 54px;
		flex: none;
		border-radius: 10px;
		overflow: hidden;
		background: var(--stonewash);
	}
	.thumb img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		display: block;
	}
	.ot {
		font-weight: 700;
		font-size: 14.5px;
	}
	.ob {
		font-size: 12.5px;
		color: var(--soft);
	}
	.backlink {
		font-size: 13.5px;
		font-weight: 700;
		color: var(--deep);
		min-height: 44px;
		display: inline-flex;
		align-items: center;
	}
	.photocard {
		position: relative;
		padding: 6px;
	}
	.photocard img {
		width: 100%;
		max-height: 220px;
		object-fit: cover;
		border-radius: 12px;
		display: block;
	}
	.photocard .rm {
		position: absolute;
		top: 12px;
		right: 12px;
		background: rgba(18, 27, 20, 0.78);
		color: #fff;
		font-size: 12px;
		font-weight: 700;
		border-radius: 999px;
		padding: 7px 13px;
		min-height: 38px;
	}
	@media (min-width: 900px) {
		.camerabtn,
		.opt {
			max-width: 620px;
		}
	}
</style>
