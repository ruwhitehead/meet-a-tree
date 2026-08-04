<script lang="ts">
	import { base } from '$app/paths';
	import { page } from '$app/state';
	import { goto } from '$app/navigation';
	import Modal from '$lib/components/Modal.svelte';
	import ObsPhoto from '$lib/components/ObsPhoto.svelte';
	import { speciesById } from '$lib/content/species';
	import { EVENTS, putPhoto, trees, type EventId } from '$lib/trees.svelte';
	import { grove } from '$lib/grove.svelte';
	import { shareTreeYear } from '$lib/share';

	const tree = $derived(trees.byId(page.params.id ?? ''));
	const species = $derived(tree ? speciesById(tree.speciesId) : undefined);

	let recording: EventId | null = $state(null);
	let note = $state('');
	let pendingPhoto: File | null = $state(null);
	let pendingUrl: string | null = $state(null);
	let camInput: HTMLInputElement | undefined = $state();
	let editing = $state(false);
	let editName = $state('');
	let editPlace = $state('');
	let confirmDelete = $state(false);

	const month = new Date().getMonth();
	const inSeason = $derived(
		EVENTS.filter((e) => e.id === 'note' || (e.months as readonly number[]).includes(month))
	);
	const timeline = $derived(
		tree ? [...tree.observations].sort((a, b) => b.date.localeCompare(a.date)) : []
	);
	/** Same event, previous years — the comparison that makes this worth keeping. */
	const history = $derived(
		(() => {
			if (!tree) return [];
			const byEvent = new Map<string, { event: string; dates: string[] }>();
			for (const o of tree.observations) {
				const key = o.event;
				if (!byEvent.has(key))
					byEvent.set(key, { event: EVENTS.find((e) => e.id === key)?.label ?? key, dates: [] });
				byEvent.get(key)!.dates.push(o.date);
			}
			return [...byEvent.values()]
				.filter((g) => g.dates.length > 1)
				.map((g) => ({ ...g, dates: g.dates.sort() }));
		})()
	);

	function openRecord(event: EventId) {
		recording = event;
		note = '';
		clearPending();
	}
	function clearPending() {
		if (pendingUrl) URL.revokeObjectURL(pendingUrl);
		pendingUrl = null;
		pendingPhoto = null;
	}
	function onPhoto(e: Event) {
		const input = e.currentTarget as HTMLInputElement;
		const f = input.files?.[0];
		if (!f) return;
		clearPending();
		pendingPhoto = f;
		pendingUrl = URL.createObjectURL(f);
		input.value = '';
	}
	async function saveObservation() {
		if (!tree || !recording) return;
		let key: string | undefined;
		if (pendingPhoto) {
			try {
				key = await putPhoto(pendingPhoto);
			} catch {
				grove.toast('Couldn’t save the photo, but the note is recorded');
			}
		}
		trees.addObservation(tree.id, recording, note, key);
		grove.toast('Recorded 🌿');
		recording = null;
		clearPending();
	}
	function startEdit() {
		if (!tree) return;
		editName = tree.name;
		editPlace = tree.place ?? '';
		editing = true;
	}
	function saveEdit() {
		if (!tree) return;
		trees.rename(tree.id, editName, editPlace);
		editing = false;
	}
	async function doDelete() {
		if (!tree) return;
		await trees.remove(tree.id);
		confirmDelete = false;
		await goto(`${base}/trees/`);
	}

	function pretty(date: string) {
		return new Date(date + 'T12:00:00').toLocaleDateString('en-GB', {
			day: 'numeric',
			month: 'long',
			year: 'numeric'
		});
	}
	function shortDate(date: string) {
		return new Date(date + 'T12:00:00').toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
	}
	function label(id: string) {
		return EVENTS.find((e) => e.id === id)?.label ?? id;
	}
	function shift(dates: string[]) {
		const first = dates[0];
		const last = dates[dates.length - 1];
		const d1 = new Date(first + 'T12:00:00');
		const d2 = new Date(last + 'T12:00:00');
		const doy = (d: Date) =>
			Math.round((d.getTime() - new Date(d.getFullYear(), 0, 0).getTime()) / 86400000);
		const diff = doy(d2) - doy(first === last ? d1 : d1);
		if (Math.abs(diff) < 2) return 'about the same date';
		return `${Math.abs(diff)} days ${diff < 0 ? 'earlier' : 'later'}`;
	}
</script>

<svelte:head>
	<title>{tree?.name ?? 'Tree'} · Meet a Tree</title>
</svelte:head>

<main class="view">
	<a class="backlink" href="{base}/trees/">← My Trees</a>

	{#if !tree || !species}
		<div class="card tint">
			<p class="serif" style="font-size:15.5px">That tree isn’t on this device.</p>
			<p class="sub">
				Your trees are stored locally, so they don’t follow you between phones or browsers.
			</p>
			<a class="btn small" style="margin-top:10px" href="{base}/trees/">Back to My Trees</a>
		</div>
	{:else}
		<div>
			<h1>{tree.name}</h1>
			<p class="sub">
				<a href="{base}/species/{species.id}/">{species.name}</a>
				<em>({species.latin})</em>{tree.place ? ` · ${tree.place}` : ''} · following since {pretty(tree.planted)}
			</p>
		</div>

		<div class="row" style="flex-wrap:wrap; gap:8px">
			<button class="pill" onclick={startEdit}>Rename</button>
			{#if tree.observations.length > 1}
				<button class="pill" onclick={() => shareTreeYear(tree, species)}>Share its year</button>
			{/if}
			<button class="pill danger" onclick={() => (confirmDelete = true)}>Remove</button>
		</div>

		<p class="label" style="margin-top:6px">Record what it’s doing</p>
		<div class="events">
			{#each inSeason as e (e.id)}
				<button class="event" onclick={() => openRecord(e.id)}>
					<span class="et">{e.label}</span>
					<span class="eh">{e.hint}</span>
				</button>
			{/each}
		</div>

		{#if history.length}
			<div class="card">
				<p class="label">Year on year</p>
				{#each history as h (h.event)}
					<p class="hist">
						<strong>{h.event}</strong>
						{#each h.dates as d, i (d)}<span class="hdate">{shortDate(d)} {d.slice(0, 4)}</span>{#if i < h.dates.length - 1}<span class="arrow" aria-hidden="true">→</span>{/if}{/each}
						<span class="hshift">{shift(h.dates)}</span>
					</p>
				{/each}
				<p class="sub" style="margin-top:8px">
					These are the dates phenology networks collect. Britain has kept them since 1736 — yours
					are the same measurement, for your own patch.
				</p>
			</div>
		{/if}

		<p class="label" style="margin-top:6px">
			Timeline{timeline.length ? ` · ${timeline.length}` : ''}
		</p>
		{#if timeline.length === 0}
			<div class="card tint">
				<p class="serif" style="font-size:15px">
					Nothing recorded yet. Take a photo of it today — even a plain one — and you have the first
					frame of its year.
				</p>
			</div>
		{:else}
			<ol class="timeline">
				{#each timeline as o (o.id)}
					<li class="entry">
						<div class="ehead">
							<span class="ename">{label(o.event)}</span>
							<span class="edate">{pretty(o.date)}</span>
						</div>
						{#if o.photoKey}
							<ObsPhoto photoKey={o.photoKey} alt="{tree.name} on {pretty(o.date)}" height={170} />
						{/if}
						{#if o.note}
							<p class="enote">{o.note}</p>
						{/if}
						<button class="removeobs" onclick={() => trees.removeObservation(tree.id, o.id)}>
							Remove this entry
						</button>
					</li>
				{/each}
			</ol>
		{/if}
	{/if}
</main>

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

<Modal open={recording !== null} onclose={() => { recording = null; clearPending(); }} labelledby="rec-title">
	<h2 id="rec-title">{recording ? label(recording) : ''}</h2>
	<p>{EVENTS.find((e) => e.id === recording)?.hint}</p>
	{#if pendingUrl}
		<img class="pending" src={pendingUrl} alt="What you just captured" />
		<div class="actions">
			<button class="btn ghost small" onclick={() => camInput?.click()}>Retake</button>
			<button class="btn ghost small" onclick={clearPending}>Remove photo</button>
		</div>
	{:else}
		<button class="btn ghost" onclick={() => camInput?.click()}>📷 Add a photo</button>
	{/if}
	<label class="field">
		<span class="flabel">Note (optional)</span>
		<textarea bind:value={note} rows="2" placeholder="Half the crown has turned already"></textarea>
	</label>
	<div class="actions">
		<button class="btn" onclick={saveObservation}>Record it</button>
		<button class="btn ghost" onclick={() => { recording = null; clearPending(); }}>Cancel</button>
	</div>
</Modal>

<Modal open={editing} onclose={() => (editing = false)} labelledby="edit-title">
	<h2 id="edit-title">Rename this tree</h2>
	<label class="field">
		<span class="flabel">Name</span>
		<input type="text" bind:value={editName} />
	</label>
	<label class="field">
		<span class="flabel">Where is it? (optional)</span>
		<input type="text" bind:value={editPlace} />
	</label>
	<div class="actions">
		<button class="btn" onclick={saveEdit}>Save</button>
		<button class="btn ghost" onclick={() => (editing = false)}>Cancel</button>
	</div>
</Modal>

<Modal open={confirmDelete} onclose={() => (confirmDelete = false)} labelledby="del-title">
	<h2 id="del-title">Remove {tree?.name}?</h2>
	<p>
		This deletes its whole timeline and photos from this device. The species stays in your grove.
	</p>
	<div class="actions">
		<button class="btn" onclick={doDelete}>Remove it</button>
		<button class="btn ghost" onclick={() => (confirmDelete = false)}>Keep it</button>
	</div>
</Modal>

<style>
	h1 {
		font-family: var(--display);
		font-weight: 400;
		font-size: 26px;
		margin: 0;
		line-height: 1.15;
	}
	.sub a {
		color: var(--deep);
		font-weight: 600;
		text-decoration: none;
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
	.pill.danger {
		color: var(--soft);
		background: var(--stonewash);
		border-color: var(--line);
	}
	.events {
		display: grid;
		gap: 8px;
		grid-template-columns: 1fr 1fr;
	}
	.event {
		background: var(--card);
		border: 1px solid var(--line);
		border-radius: 13px;
		padding: 11px 12px;
		min-height: 62px;
		text-align: left;
		transition: border-color 0.12s ease, transform 0.12s ease;
	}
	.event:hover {
		border-color: var(--green);
	}
	.event:active {
		transform: scale(0.98);
	}
	.et {
		display: block;
		font-weight: 700;
		font-size: 13.5px;
		color: var(--deep);
	}
	.eh {
		display: block;
		font-size: 11.5px;
		color: var(--soft);
		margin-top: 2px;
	}
	.hist {
		margin: 0 0 8px;
		font-size: 13px;
		color: var(--soft);
		display: flex;
		align-items: baseline;
		gap: 7px;
		flex-wrap: wrap;
	}
	.hist strong {
		color: var(--ink);
	}
	.hdate {
		font-variant-numeric: tabular-nums;
	}
	.arrow {
		color: var(--line);
	}
	.hshift {
		font-weight: 700;
		color: var(--deep);
	}
	.timeline {
		list-style: none;
		margin: 0;
		padding: 0;
		display: grid;
		gap: 12px;
	}
	.entry {
		background: var(--card);
		border: 1px solid var(--line);
		border-radius: 15px;
		padding: 12px;
	}
	.ehead {
		display: flex;
		justify-content: space-between;
		align-items: baseline;
		gap: 10px;
		margin-bottom: 8px;
	}
	.ename {
		font-weight: 700;
		font-size: 13.5px;
		color: var(--deep);
	}
	.edate {
		font-size: 12px;
		color: var(--soft);
		font-variant-numeric: tabular-nums;
	}
	.enote {
		margin: 8px 0 0;
		font-size: 14px;
		line-height: 1.55;
	}
	.removeobs {
		margin-top: 8px;
		font-size: 12px;
		color: var(--soft);
		text-decoration: underline;
		min-height: 44px;
		display: inline-flex;
		align-items: center;
	}
	.pending {
		width: 100%;
		max-height: 220px;
		object-fit: cover;
		border-radius: 12px;
		display: block;
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
	.field input,
	.field textarea {
		width: 100%;
		font: inherit;
		font-size: 15px;
		color: var(--ink);
		background: var(--card);
		border: 1.5px solid var(--line);
		border-radius: 12px;
		padding: 11px 13px;
		min-height: 48px;
		resize: vertical;
	}
	.field input:focus,
	.field textarea:focus {
		outline: none;
		border-color: var(--green);
	}
	@media (min-width: 700px) {
		.events {
			grid-template-columns: repeat(3, 1fr);
		}
		.timeline {
			grid-template-columns: 1fr 1fr;
		}
	}
</style>
