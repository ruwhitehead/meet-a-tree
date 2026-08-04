<script lang="ts">
	import { base } from '$app/paths';
	import { goto } from '$app/navigation';
	import ObsPhoto from '$lib/components/ObsPhoto.svelte';
	import Modal from '$lib/components/Modal.svelte';
	import { SPECIES, searchSpecies, speciesById } from '$lib/content/species';
	import { EVENTS, trees } from '$lib/trees.svelte';
	import { shareGrove } from '$lib/share';
	import { grove } from '$lib/grove.svelte';
	import Give from '$lib/components/Give.svelte';
	import { detectSaveCapability } from '$lib/photos';

	let adding = $state(false);
	let q = $state('');
	let chosen: string | null = $state(null);
	let treeName = $state('');
	let placeName = $state('');

	const results = $derived(q ? searchSpecies(q).slice(0, 6) : []);
	const prompts = $derived(trees.prompts());
	const chosenSpecies = $derived(chosen ? speciesById(chosen) : undefined);
	const savecap = detectSaveCapability();

	/** A wall of 50 locked cards reads as "you have failed 50 times". Until
	 *  someone has a few species, lead with the ones they can genuinely find on
	 *  any street, and keep the full list below. */
	const STARTERS = ['oak', 'sycamore', 'birch', 'holly', 'hawthorn', 'ash'];
	const starters = $derived(
		STARTERS.map((id) => speciesById(id)).filter((s): s is NonNullable<typeof s> => Boolean(s))
	);
	const showStarters = $derived(grove.speciesCount < 3);

	/** Two halves of the same idea: the trees you follow, and the species you've
	 *  met. They used to be separate tabs, which nobody could tell apart. */
	let view: 'following' | 'species' = $state('following');

	function startAdd() {
		adding = true;
		q = '';
		chosen = null;
		treeName = '';
		placeName = '';
	}
	function pick(id: string) {
		chosen = id;
		q = '';
		if (!treeName) treeName = `The ${speciesById(id)?.name.toLowerCase() ?? 'tree'}`;
	}
	async function save() {
		if (!chosen) return;
		const t = trees.add(chosen, treeName, placeName);
		// meeting a tree in person counts as meeting the species
		if (!grove.has(chosen)) grove.addFind(chosen);
		adding = false;
		await goto(`${base}/trees/${t.id}/`);
	}

	function label(id: string) {
		return EVENTS.find((e) => e.id === id)?.label ?? id;
	}
	function pretty(date: string) {
		return new Date(date + 'T12:00:00').toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
	}
	function driftLine(drift: number | undefined, lastYear: string | undefined) {
		if (drift === undefined || !lastYear) return 'No record yet — this year sets the baseline.';
		const y = lastYear.slice(0, 4);
		if (drift > 2) return `${drift} days later than ${y} already.`;
		if (drift < -2) return `Due in about ${Math.abs(drift)} days, going by ${y}.`;
		return `Right about now, going by ${y}.`;
	}
</script>

<svelte:head>
	<title>My Trees · Meet a Tree</title>
	<meta
		name="description"
		content="Follow individual trees through the year — first leaves, blossom, fruit, autumn colour — and build a photo timeline of each one."
	/>
</svelte:head>

<main class="view">
	<div class="vhead">
		<h1>My Trees</h1>
		{#if view === 'species' && grove.speciesCount}
			<button class="pill" onclick={shareGrove}>Share</button>
		{/if}
	</div>

	<div class="tabs" role="tablist" aria-label="What to show">
		<button class="tab" role="tab" aria-selected={view === 'following'} onclick={() => (view = 'following')}>
			Following{trees.count ? ` · ${trees.count}` : ''}
		</button>
		<button class="tab" role="tab" aria-selected={view === 'species'} onclick={() => (view = 'species')}>
			Species met · {grove.speciesCount}
		</button>
	</div>

	{#if view === 'species'}
		<div class="stats">
			<div class="stat"><div class="n">{grove.speciesCount}</div><div class="l">of {SPECIES.length}</div></div>
			<div class="stat"><div class="n">{grove.co2 ? `~${grove.co2}` : '0'}<span class="unit">kg</span></div><div class="l">CO₂ / yr</div></div>
			<div class="stat"><div class="n">{SPECIES.length - grove.speciesCount}</div><div class="l">to find</div></div>
		</div>

		{#if showStarters}
			<div class="card tint">
				<p class="label">Six to start with</p>
				<p class="serif" style="font-size:15px">
					These six are on almost every British street and in almost every hedge. Learn them and you
					have most of what you will meet on an ordinary walk.
				</p>
			</div>
			<ul class="starters">
				{#each starters as sp (sp.id)}
					<li>
						<a class="starter" class:met={grove.has(sp.id)} href="{base}/species/{sp.id}/">
							<img src="{base}/images/species/{sp.id}-thumb.webp" alt="" width="120" height="120" loading="lazy" />
							<span class="stext">
								<span class="sname">{grove.has(sp.id) ? `✓ ${sp.name}` : sp.name}</span>
								<span class="shint">{sp.hint}</span>
							</span>
						</a>
					</li>
				{/each}
			</ul>
			<p class="label" style="margin-top:6px">The rest of the guide</p>
		{/if}

		<div class="grid">
			{#each SPECIES as sp (sp.id)}
				{@const has = grove.has(sp.id)}
				<a class="spcard" class:locked={!has} href={has ? `${base}/species/${sp.id}/` : `${base}/identify/`}>
					<span class="pic sq">
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

		<Give />
	{:else if trees.count === 0}

		<div class="card tint">
			<p class="label">Follow one tree for a year</p>
			<p class="serif" style="font-size:15.5px">
				Pick a tree you walk past often — the oak at the end of the road, the lime outside work — and
				note when it comes into leaf, flowers, fruits and turns. A year later you have its calendar,
				a photo timeline, and a genuinely useful record of how your patch is changing.
			</p>
			<button class="btn small" style="margin-top:10px" onclick={startAdd}>Add your first tree</button>
		</div>
		<div class="card">
			<p class="label">Why bother</p>
			<p class="sub" style="margin:0">
				First-leaf and first-flower dates are real science — Britain has records going back to 1736,
				and they are how we measure spring arriving earlier. Yours stay on your phone; nothing is
				uploaded.
			</p>
		</div>
	{:else}
		<button class="btn" onclick={startAdd}>+ Add a tree</button>

		{#if prompts.length}
			<p class="label" style="margin-top:6px">Worth a look this week</p>
			{#each prompts.slice(0, 4) as p (p.tree.id + p.event.id)}
				<a class="prompt" href="{base}/trees/{p.tree.id}/">
					<span class="pthumb">
						<img src="{base}/images/species/{p.species.id}-thumb.webp" alt="" width="120" height="120" loading="lazy" />
					</span>
					<span class="ptext">
						<span class="pt">{p.event.label} · {p.tree.name}</span>
						<span class="pb">{driftLine(p.drift, p.lastYear)}</span>
					</span>
					<span class="chev" aria-hidden="true">›</span>
				</a>
			{/each}
		{/if}

		{#if savecap.ios}
			<div class="card stonebg">
				<p class="label">Where your photos live</p>
				<p class="sub" style="margin:0">
					On iPhone, photos taken inside a browser are kept by this app and
					<strong>not</strong> added to your Photos library, so they aren’t in your iCloud backup.
					Each photo has a <strong>Save to Photos</strong> button if you want a copy alongside your
					other pictures.
				</p>
			</div>
		{/if}

		<p class="label" style="margin-top:6px">Your trees</p>
		<ul class="list">
			{#each trees.items as t (t.id)}
				{@const sp = speciesById(t.speciesId)}
				{@const latest = t.observations.filter((o) => o.photoKey).slice(-1)[0]}
				<li>
					<a class="treecard" href="{base}/trees/{t.id}/">
						<span class="pic">
							{#if latest?.photoKey}
								<ObsPhoto photoKey={latest.photoKey} alt="" height={104} />
							{:else if sp}
								<img class="fallback" src="{base}/images/species/{sp.id}-tree.webp" alt="" width="900" height="675" loading="lazy" />
							{/if}
						</span>
						<span class="tbody">
							<span class="tn">{t.name}</span>
							<span class="tl">{sp?.name ?? 'Unknown'}{t.place ? ` · ${t.place}` : ''}</span>
							<span class="tmeta">
								{t.observations.length}
								{t.observations.length === 1 ? 'note' : 'notes'}
								{#if t.observations.length}
									· last {pretty(t.observations[t.observations.length - 1].date)}
									({label(t.observations[t.observations.length - 1].event)})
								{/if}
							</span>
						</span>
					</a>
				</li>
			{/each}
		</ul>
	{/if}
</main>

<Modal open={adding} onclose={() => (adding = false)} labelledby="add-title">
	<h2 id="add-title">Add a tree</h2>
	{#if !chosenSpecies}
		<p>Which tree is it? Search the guide, or identify it first if you're not sure.</p>
		<label class="field">
			<span class="visually-hidden">Search species</span>
			<input type="search" bind:value={q} placeholder="oak, lime, rowan…" autocomplete="off" />
		</label>
		{#if q && results.length}
			<ul class="picks">
				{#each results as sp (sp.id)}
					<li>
						<button class="pickrow" onclick={() => pick(sp.id)}>
							<img src="{base}/images/species/{sp.id}-thumb.webp" alt="" width="80" height="80" loading="lazy" />
							<span><strong>{sp.name}</strong><br /><em>{sp.latin}</em></span>
						</button>
					</li>
				{/each}
			</ul>
		{:else if q}
			<p class="sub">Nothing by that name in the guide's {SPECIES.length} trees.</p>
		{/if}
		<div class="actions">
			<a class="btn ghost" href="{base}/identify/">Identify it first</a>
			<button class="btn ghost" onclick={() => (adding = false)}>Cancel</button>
		</div>
	{:else}
		<p><strong>{chosenSpecies.name}</strong> — now give it a name you'll recognise.</p>
		<label class="field">
			<span class="flabel">What do you call it?</span>
			<input type="text" bind:value={treeName} placeholder="The oak at the end of the road" />
		</label>
		<label class="field">
			<span class="flabel">Where is it? (optional)</span>
			<input type="text" bind:value={placeName} placeholder="Park gates, or just “home”" />
		</label>
		<p class="itf">
			Kept on your phone. Type whatever helps you find it again — we never ask for or store your
			location.
		</p>
		<div class="actions">
			<button class="btn" onclick={save}>Add this tree</button>
			<button class="btn ghost" onclick={() => (chosen = null)}>Back</button>
		</div>
	{/if}
</Modal>

<style>
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
		min-height: 44px;
	}
	.tab[aria-selected='true'] {
		background: var(--card);
		color: var(--ink);
		box-shadow: 0 1px 3px rgba(30, 30, 30, 0.18);
	}
	.stats {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
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
		font-size: 20px;
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
	.pic.sq {
		aspect-ratio: 1;
		width: auto;
		margin-bottom: 5px;
	}
	.pic.sq img {
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
	.starters {
		list-style: none;
		margin: 0;
		padding: 0;
		display: grid;
		gap: 9px;
	}
	.starter {
		display: flex;
		align-items: center;
		gap: 12px;
		background: var(--card);
		border: 1px solid var(--line);
		border-radius: 14px;
		padding: 9px 12px;
		min-height: 62px;
		text-decoration: none;
		color: inherit;
	}
	.starter:hover {
		border-color: var(--green);
	}
	.starter.met {
		background: var(--wash);
		border-color: var(--wash-line);
	}
	.starter img {
		width: 44px;
		height: 44px;
		border-radius: 10px;
		object-fit: cover;
		flex: none;
	}
	.stext {
		min-width: 0;
	}
	.sname {
		display: block;
		font-weight: 700;
		font-size: 14px;
	}
	.shint {
		display: block;
		font-size: 12px;
		color: var(--soft);
	}
	.list {
		list-style: none;
		margin: 0;
		padding: 0;
		display: grid;
		gap: 10px;
	}
	.treecard,
	.prompt {
		display: flex;
		align-items: center;
		gap: 12px;
		background: var(--card);
		border: 1px solid var(--line);
		border-radius: 15px;
		padding: 10px 12px;
		text-decoration: none;
		color: inherit;
		min-height: 66px;
		transition: border-color 0.12s ease, transform 0.12s ease;
	}
	.treecard:hover,
	.prompt:hover {
		border-color: var(--green);
	}
	.treecard:active,
	.prompt:active {
		transform: scale(0.99);
	}
	.pic {
		width: 104px;
		flex: none;
		border-radius: 12px;
		overflow: hidden;
		background: var(--stonewash);
	}
	.pic .fallback {
		width: 104px;
		height: 104px;
		object-fit: cover;
		display: block;
		opacity: 0.85;
	}
	.tbody {
		flex: 1;
		min-width: 0;
	}
	.tn {
		display: block;
		font-family: var(--display);
		font-size: 17px;
		line-height: 1.2;
	}
	.tl {
		display: block;
		font-size: 12.5px;
		color: var(--soft);
		margin-top: 2px;
	}
	.tmeta {
		display: block;
		font-size: 12px;
		color: var(--soft);
		margin-top: 5px;
	}
	.prompt {
		background: var(--wash);
		border-color: var(--wash-line);
	}
	.pthumb {
		width: 46px;
		height: 46px;
		border-radius: 50%;
		overflow: hidden;
		flex: none;
	}
	.pthumb img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		display: block;
	}
	.ptext {
		flex: 1;
		min-width: 0;
	}
	.pt {
		display: block;
		font-weight: 700;
		font-size: 13.5px;
		color: var(--deep);
	}
	.pb {
		display: block;
		font-size: 12.5px;
		color: var(--soft);
	}
	.chev {
		color: var(--soft);
		font-size: 20px;
		flex: none;
	}
	.field {
		display: block;
		margin-top: 10px;
	}
	.flabel {
		display: block;
		font-size: 12px;
		font-weight: 700;
		letter-spacing: 0.06em;
		text-transform: uppercase;
		color: var(--soft);
		margin-bottom: 4px;
	}
	.field input {
		width: 100%;
		font: inherit;
		font-size: 15px;
		color: var(--ink);
		background: var(--card);
		border: 1.5px solid var(--line);
		border-radius: 12px;
		padding: 11px 13px;
		min-height: 48px;
	}
	.field input:focus {
		outline: none;
		border-color: var(--green);
	}
	.picks {
		list-style: none;
		margin: 10px 0 0;
		padding: 0;
		display: grid;
		gap: 6px;
		max-height: 240px;
		overflow-y: auto;
	}
	.pickrow {
		display: flex;
		align-items: center;
		gap: 10px;
		width: 100%;
		background: var(--card);
		border: 1px solid var(--line);
		border-radius: 12px;
		padding: 8px 10px;
		min-height: 56px;
		font-size: 13.5px;
	}
	.pickrow:hover {
		border-color: var(--green);
	}
	.pickrow img {
		width: 40px;
		height: 40px;
		border-radius: 8px;
		object-fit: cover;
		flex: none;
	}
	.pickrow em {
		font-size: 12px;
		color: var(--soft);
	}
	@media (min-width: 700px) {
		.list,
		.starters {
			grid-template-columns: 1fr 1fr;
		}
		.grid {
			grid-template-columns: repeat(4, 1fr);
		}
	}
	@media (min-width: 900px) {
		.grid {
			grid-template-columns: repeat(6, 1fr);
		}
		.stats,
		.tabs {
			max-width: 620px;
		}
	}
</style>
