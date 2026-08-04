<script lang="ts">
	import { base } from '$app/paths';
	import Modal from '$lib/components/Modal.svelte';
	import LeafCard from '$lib/components/LeafCard.svelte';
	import { KEY1, KEY2, keyCandidates } from '$lib/content/key';
	import type { LeafKind } from '$lib/content/types';
	import { grove } from '$lib/grove.svelte';

	let step1: LeafKind | null = $state(null);
	let step2: string | null = $state(null);
	let photo: string | null = $state(null);
	let primer = $state(false);
	let camInput: HTMLInputElement | undefined = $state();

	const candidates = $derived(step1 && step2 ? keyCandidates(step1, step2) : []);

	function openCamera() {
		primer = false;
		camInput?.click();
	}
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
	<title>Identify a tree · Grove</title>
</svelte:head>

<main class="view">
	<div class="vhead"><h1>Identify a tree</h1></div>

	<button class="btn" style="text-align:center" onclick={() => (primer = true)}>
		📷 Photograph a leaf
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

	<div class="card stonebg">
		<p class="sub" style="margin:0">
			<strong style="color:var(--ink)">This build:</strong> on a phone, the button above opens your
			camera directly — no permission dialog needed for a single photo. Automatic species matching
			(Pl@ntNet) arrives with the next release; for now your photo joins the field key below — how
			naturalists did it for 200 years.
		</p>
	</div>

	{#if photo}
		<div class="card photocard" style="padding:6px">
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
				<span class="glyph"><LeafCard colors={sp.colors} size={34} /></span>
				<span>
					<span class="ot">{sp.name}</span>
					<span class="ob" style="font-style:italic">{sp.latin}</span><br />
					<span class="ob">{sp.hint}</span>
				</span>
			</a>
		{/each}
	{/if}
</main>

<Modal open={primer} onclose={() => (primer = false)} labelledby="cam-title">
	<h2 id="cam-title">Your camera, only when you ask</h2>
	<p>
		Grove opens the camera at the moment you need it — never before. Your photo stays on your phone
		in this build; nothing is uploaded.
	</p>
	<div class="actions">
		<button class="btn" onclick={openCamera}>Open camera</button>
		<button class="btn ghost" onclick={() => (primer = false)}>Not now</button>
	</div>
</Modal>

<style>
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
	}
	.opt:hover {
		border-color: var(--green);
	}
	.glyph {
		width: 44px;
		height: 44px;
		flex: none;
		display: grid;
		place-items: center;
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
	}
	.photocard img {
		width: 100%;
		max-height: 200px;
		object-fit: cover;
		border-radius: 12px;
		display: block;
	}
	.photocard .rm {
		position: absolute;
		top: 8px;
		right: 8px;
		background: rgba(18, 27, 20, 0.72);
		color: #fff;
		font-size: 12px;
		font-weight: 700;
		border-radius: 999px;
		padding: 6px 12px;
		min-height: 36px;
	}
</style>
