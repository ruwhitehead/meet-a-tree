<script lang="ts">
	import { base } from '$app/paths';
	import LeafCard from '$lib/components/LeafCard.svelte';
	import { KEY1, KEY2, keyCandidates } from '$lib/content/key';
	import type { LeafKind } from '$lib/content/types';
	import { grove } from '$lib/grove.svelte';

	let step1: LeafKind | null = $state(null);
	let step2: string | null = $state(null);
	let photo: string | null = $state(null);
	let camInput: HTMLInputElement | undefined = $state();

	const candidates = $derived(step1 && step2 ? keyCandidates(step1, step2) : []);

	function onPhoto(e: Event) {
		const input = e.currentTarget as HTMLInputElement;
		const f = input.files?.[0];
		if (!f) return;
		if (photo) URL.revokeObjectURL(photo);
		photo = URL.createObjectURL(f);
		step1 = null;
		step2 = null;
		grove.toast('Lovely. Three quick questions about it 🌿');
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

	<!-- Opens the native camera straight away: a single photo needs no permission
	     dialog on iOS or Android, so there's nothing to explain first. -->
	<button class="btn camerabtn" onclick={() => camInput?.click()}>
		<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" aria-hidden="true"><path d="M4 8h3l2-3h6l2 3h3v11H4z" /><circle cx="12" cy="13" r="3.4" /></svg>
		Photograph a leaf
	</button>
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

	{#if photo}
		<div class="card photocard">
			<img alt="Your leaf, ready for the field key" src={photo} />
			<button class="rm" onclick={removePhoto}>✕ Remove</button>
		</div>
	{/if}

	{#if !step1}
		<p class="label">Step 1 of 3 · What kind of leaf?</p>
		{#each KEY1 as k (k.id)}
			<button class="opt" onclick={() => (step1 = k.id)}>
				<span class="glyph"><LeafCard colors={['#4FA372', '#167E3C']} size={30} /></span>
				<span><span class="ot">{k.title}</span><br /><span class="ob">{k.desc}</span></span>
			</button>
		{/each}
		<p class="samplenote">
			Automatic photo matching arrives with the next release. The key below is how naturalists have
			done it for 200 years, and it works with no signal.
		</p>
	{:else if !step2}
		<button class="backlink" onclick={() => (step1 = null)}>← Start again</button>
		<p class="label">Step 2 of 3 · Look closer</p>
		{#each KEY2[step1] as k (k.id)}
			<button class="opt" onclick={() => (step2 = k.id)}>
				<span class="ot" style="padding-left:4px">{k.title}</span>
			</button>
		{/each}
	{:else}
		<button class="backlink" onclick={() => (step2 = null)}>← Back</button>
		<p class="label">Step 3 of 3 · Your candidates</p>
		{#each candidates as sp (sp.id)}
			<a class="opt" href="{base}/species/{sp.id}/">
				<span class="thumb">
					<img src="{base}/images/species/{sp.id}-leaf.webp" alt="" width="80" height="80" loading="lazy" />
				</span>
				<span>
					<span class="ot">{sp.name}</span>
					<span class="ob" style="font-style:italic">{sp.latin}</span><br />
					<span class="ob">{sp.hint}</span>
				</span>
			</a>
		{/each}
	{/if}
</main>

<style>
	.camerabtn {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: 9px;
		font-size: 15px;
		padding: 13px 20px;
		min-height: 52px;
	}
	.camerabtn svg {
		width: 21px;
		height: 21px;
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
		min-height: 60px;
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
		width: 44px;
		height: 44px;
		flex: none;
		display: grid;
		place-items: center;
	}
	.thumb {
		width: 52px;
		height: 52px;
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
		.camerabtn {
			align-self: start;
		}
		.opt {
			max-width: 620px;
		}
	}
</style>
