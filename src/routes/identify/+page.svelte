<script lang="ts">
	import { base } from '$app/paths';
	import LeafShape from '$lib/components/LeafShape.svelte';
	import { KEY1, KEY2, keyCandidates } from '$lib/content/key';
	import { speciesById } from '$lib/content/species';
	import type { LeafKind } from '$lib/content/types';
	import { grove } from '$lib/grove.svelte';

	type Match = { latin: string; common: string; score: number; id: string | null };

	let step1: LeafKind | null = $state(null);
	let step2: string | null = $state(null);
	let photo: string | null = $state(null);
	let camInput: HTMLInputElement | undefined = $state();

	/** Photo identification. Runs against /api/identify, which proxies Pl@ntNet
	 *  with the key held server-side. On a static host the endpoint isn't there,
	 *  so we fall through to the field key rather than pretending. */
	let idState: 'idle' | 'working' | 'done' | 'unavailable' | 'failed' = $state('idle');
	let matches: Match[] = $state([]);
	let organ: 'leaf' | 'bark' | 'flower' | 'fruit' = $state('leaf');

	async function identify(file: File) {
		idState = 'working';
		matches = [];
		try {
			const body = new FormData();
			body.append('image', file);
			body.append('organ', organ);
			const res = await fetch(`${base}/api/identify`, { method: 'POST', body });
			if (res.status === 503 || res.status === 404) {
				idState = 'unavailable';
				return;
			}
			if (!res.ok) {
				idState = 'failed';
				return;
			}
			const data = (await res.json()) as { ok: boolean; matches?: Match[] };
			matches = data.matches ?? [];
			idState = 'done';
			if (matches.length) grove.toast(`Best guess: ${matches[0].common || matches[0].latin}`);
		} catch {
			idState = 'unavailable';
		}
	}

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
		input.value = '';
		identify(f);
	}
	function removePhoto() {
		if (photo) URL.revokeObjectURL(photo);
		photo = null;
		idState = 'idle';
		matches = [];
	}
</script>

<svelte:head>
	<title>Identify a tree · Meet a Tree</title>
</svelte:head>

<main class="view">
	<div class="vhead"><h1>Identify a tree</h1></div>

	<div class="card stonebg">
		<p class="how">
			<strong>Two ways in.</strong> Photograph the leaf and we'll ask Pl@ntNet what it thinks — or
			answer three questions and the guide narrows 40 British trees down to a shortlist. The
			questions work with no signal at all.
		</p>
	</div>

	<fieldset class="organs">
		<legend class="label">What are you photographing?</legend>
		{#each [['leaf', 'Leaf'], ['bark', 'Bark'], ['flower', 'Flower'], ['fruit', 'Fruit']] as [value, title] (value)}
			<label class="organ" class:on={organ === value}>
				<input type="radio" name="organ" value={value} bind:group={organ} />
				<span>{title}</span>
			</label>
		{/each}
	</fieldset>

	{#if photo}
		<div class="card photocard">
			<img alt="The {organ} you photographed" src={photo} />
			<button class="rm" onclick={removePhoto}>✕ Remove</button>
		</div>
		<button class="btn camerabtn" onclick={() => camInput?.click()}>
			<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" aria-hidden="true"><path d="M4 8h3l2-3h6l2 3h3v11H4z" /><circle cx="12" cy="13" r="3.4" /></svg>
			Take another photo
		</button>
	{:else}
		<button class="btn camerabtn" onclick={() => camInput?.click()}>
			<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" aria-hidden="true"><path d="M4 8h3l2-3h6l2 3h3v11H4z" /><circle cx="12" cy="13" r="3.4" /></svg>
			Photograph the {organ}
		</button>
	{/if}

	{#if idState === 'working'}
		<div class="card tint" aria-live="polite">
			<p class="label">Identifying</p>
			<p class="serif" style="font-size:15px">Comparing your photo against Pl@ntNet’s flora…</p>
		</div>
	{:else if idState === 'done'}
		<div class="card tint" aria-live="polite">
			<p class="label">{matches.length ? 'Best matches' : 'No confident match'}</p>
			{#if matches.length === 0}
				<p class="serif" style="font-size:15px">
					Pl@ntNet couldn’t place that one. Try a flatter, closer shot of a single leaf against a
					plain background — or use the questions below.
				</p>
			{:else}
				<ul class="matches">
					{#each matches as m (m.latin)}
						{@const sp = m.id ? speciesById(m.id) : undefined}
						<li>
							{#if sp}
								<a class="match" href="{base}/species/{sp.id}/">
									<span class="thumb">
										<img src="{base}/images/species/{sp.id}-leaf.webp" alt="" width="120" height="120" loading="lazy" />
									</span>
									<span class="mtext">
										<span class="ot">{sp.name}</span><br />
										<span class="ob" style="font-style:italic">{sp.latin}</span>
									</span>
									<span class="score">{m.score}%</span>
								</a>
							{:else}
								<div class="match notinguide">
									<span class="mtext">
										<span class="ot">{m.common || m.latin}</span><br />
										<span class="ob" style="font-style:italic">{m.latin} · not in this guide</span>
									</span>
									<span class="score muted">{m.score}%</span>
								</div>
							{/if}
						</li>
					{/each}
				</ul>
				<p class="sub">
					Percentages are Pl@ntNet’s confidence, not certainty. Check the spotting notes before you
					trust one.
				</p>
			{/if}
		</div>
	{:else if idState === 'unavailable'}
		<div class="card stonebg" aria-live="polite">
			<p class="how">
				<strong>Photo matching isn’t available here.</strong> This copy of the app is running without
				its identification server, so use the questions below — they need no signal and no server.
			</p>
		</div>
	{:else if idState === 'failed'}
		<div class="card stonebg" aria-live="polite">
			<p class="how">
				<strong>That didn’t get through.</strong> Could be a patchy signal or a busy service. Try
				again, or use the questions below.
			</p>
		</div>
	{/if}

	<p class="orline"><span>or answer three questions</span></p>
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
	.organs {
		border: none;
		margin: 0;
		padding: 0;
		display: flex;
		flex-wrap: wrap;
		gap: 8px;
		align-items: center;
	}
	.organs legend {
		width: 100%;
		margin-bottom: 6px;
	}
	.organ {
		display: inline-flex;
		align-items: center;
		min-height: 44px;
		padding: 8px 16px;
		border-radius: 999px;
		border: 1.5px solid var(--line);
		background: var(--card);
		font-size: 13.5px;
		font-weight: 600;
		color: var(--ink);
		cursor: pointer;
	}
	.organ.on {
		border-color: var(--green);
		background: var(--wash);
		color: var(--deep);
		font-weight: 700;
	}
	.organ input {
		position: absolute;
		opacity: 0;
		width: 1px;
		height: 1px;
	}
	.organ:focus-within {
		outline: 3px solid var(--deep);
		outline-offset: 2px;
	}
	.matches {
		list-style: none;
		margin: 8px 0 0;
		padding: 0;
		display: grid;
		gap: 8px;
	}
	.match {
		display: flex;
		align-items: center;
		gap: 12px;
		background: var(--card);
		border: 1px solid var(--line);
		border-radius: 13px;
		padding: 9px 12px;
		min-height: 60px;
		text-decoration: none;
		color: inherit;
	}
	.match:hover {
		border-color: var(--green);
	}
	.match.notinguide {
		background: transparent;
		border-style: dashed;
	}
	.mtext {
		flex: 1;
		min-width: 0;
	}
	.score {
		font-family: var(--body);
		font-weight: 700;
		font-size: 13px;
		color: var(--deep);
		background: var(--wash);
		border-radius: 8px;
		padding: 5px 9px;
		font-variant-numeric: tabular-nums;
		flex: none;
	}
	.score.muted {
		color: var(--soft);
		background: var(--stonewash);
	}
	.orline {
		display: flex;
		align-items: center;
		gap: 10px;
		margin: 6px 0 0;
		font-size: 12px;
		font-weight: 700;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: var(--soft);
	}
	.orline::before,
	.orline::after {
		content: '';
		flex: 1;
		height: 1px;
		background: var(--line);
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
