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
	import { detectSaveCapability, saveToPhotos } from '$lib/photos';
	import { recordsFor } from '$lib/records';
	import {
		NATURES_CALENDAR_URL,
		draftSubmission,
		eventName,
		isRecordable
	} from '$lib/phenology';

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
	let editPostcode = $state('');
	let submitting: string | null = $state(null);
	let copied = $state(false);
	const savecap = detectSaveCapability();
	const records = $derived(tree ? recordsFor(tree) : []);
	const GHOST: [string, string][] = [
		['Spring', 'First leaves'],
		['Summer', 'First ripe fruit'],
		['Autumn', 'Leaves turning']
	];

	/** Season colour for the timeline spine, so a year reads at a glance. */
	function seasonOf(iso: string): 'spring' | 'summer' | 'autumn' | 'winter' {
		const m = Number(iso.slice(5, 7)) - 1;
		if (m <= 1 || m === 11) return 'winter';
		if (m <= 4) return 'spring';
		if (m <= 7) return 'summer';
		return 'autumn';
	}

	/** Share straight from the click with the File already in hand — WebKit
	 *  revokes the gesture if you await anything first. */
	async function savePending() {
		if (!pendingPhoto) return;
		const outcome = await saveToPhotos(pendingPhoto);
		if (outcome === 'shared') grove.toast('Choose “Save Image” to keep it in Photos');
		else if (outcome === 'unsupported')
			grove.toast('Press and hold the photo, then “Add to Photos”');
	}

	const submitObs = $derived(
		submitting && tree ? tree.observations.find((o) => o.id === submitting) : undefined
	);
	const draft = $derived(
		submitObs && species
			? draftSubmission({
					speciesName: species.name,
					latin: species.latin,
					event: submitObs.event,
					date: submitObs.date,
					place: tree?.place,
					postcode: tree?.postcode
				})
			: undefined
	);

	async function copyDraft() {
		if (!draft) return;
		try {
			await navigator.clipboard.writeText(draft.text);
			copied = true;
			setTimeout(() => (copied = false), 2200);
		} catch {
			grove.toast('Couldn’t copy — select the text and copy it by hand');
		}
	}
	function confirmSubmitted() {
		if (tree && submitting) trees.markSubmitted(tree.id, submitting);
		submitting = null;
		copied = false;
		grove.toast('Marked as submitted 🌿');
	}

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
		editPostcode = tree.postcode ?? '';
		editing = true;
	}
	function saveEdit() {
		if (!tree) return;
		trees.rename(tree.id, editName, editPlace, editPostcode);
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
	<a class="backlink" href="{base}/trees/">
		<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
			<path d="M19 12H6" /><path d="M11.5 6.5L6 12l5.5 5.5" />
		</svg>
		My Trees
	</a>

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

		{#if records.length}
			<p class="label" style="margin-top:6px">What your records show</p>
			<div class="records">
				{#each records as r (r.label)}
					<div class="record" class:earlier={r.kind === 'earlier'}>
						<p class="rl">{r.label}</p>
						<p class="rd">{r.detail}</p>
					</div>
				{/each}
			</div>
		{/if}

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
			<div class="ghost" aria-hidden="true">
				{#each GHOST as [season, ev] (season)}
					<div class="gentry">
						<span class="gspine {season.toLowerCase()}"></span>
						<span class="gbody">
							<span class="gtag">{season}</span>
							<span class="gname">{ev}</span>
							<span class="gpic"></span>
						</span>
					</div>
				{/each}
			</div>
			<p class="sub" style="margin-top:-4px">
				This is what a year looks like. Photograph it today and you have the first frame.
			</p>
		{:else}
			<ol class="timeline">
				{#each timeline as o (o.id)}
					<li class="entry {seasonOf(o.date)}">
						<div class="ehead">
							<span class="ename">{label(o.event)}</span>
							<span class="edate">{pretty(o.date)}</span>
						</div>
						{#if o.photoKey}
							<ObsPhoto photoKey={o.photoKey} alt="{tree.name} on {pretty(o.date)}" height={170} savable />
						{/if}
						{#if o.note}
							<p class="enote">{o.note}</p>
						{/if}
						<div class="erow">
							{#if o.submitted}
								<span class="sent">✓ Sent to Nature’s Calendar</span>
							{:else if isRecordable(species.id, o.event)}
								<button class="sendobs" onclick={() => { submitting = o.id; copied = false; }}>
									Send to Nature’s Calendar
								</button>
							{/if}
							<button class="removeobs" onclick={() => trees.removeObservation(tree.id, o.id)}>
								Remove
							</button>
						</div>
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
		{#if savecap.offer}
			<p class="reality">
				On iPhone, a photo taken in a browser <strong>isn’t added to your Photos library</strong> — it
				lives in this app only. Save a copy if you want it alongside your other pictures.
			</p>
			<div class="actions">
				<button class="btn small" onclick={savePending}>Save to Photos</button>
				<button class="btn ghost small" onclick={() => camInput?.click()}>Retake</button>
				<button class="btn ghost small" onclick={clearPending}>Remove</button>
			</div>
		{:else}
			<div class="actions">
				<button class="btn ghost small" onclick={() => camInput?.click()}>Retake</button>
				<button class="btn ghost small" onclick={clearPending}>Remove photo</button>
			</div>
		{/if}
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
	<label class="field">
		<span class="flabel">Postcode (only if you plan to submit records)</span>
		<input type="text" bind:value={editPostcode} placeholder="OX1 2JD" autocomplete="postal-code" />
	</label>
	<p class="itf">
		Nature’s Calendar needs a location for a record to be usable. Stored on this device only, and
		only used when you choose to submit.
	</p>
	<div class="actions">
		<button class="btn" onclick={saveEdit}>Save</button>
		<button class="btn ghost" onclick={() => (editing = false)}>Cancel</button>
	</div>
</Modal>

<Modal open={submitting !== null} onclose={() => (submitting = null)} labelledby="sub-title">
	<h2 id="sub-title">Send to Nature’s Calendar</h2>
	{#if draft && submitObs}
		<p>
			The Woodland Trust has collected first-leaf and first-flower dates since 1736. Your record is
			the same measurement — here it is, ready to paste into their form.
		</p>
		<ul class="draft">
			{#each draft.lines as line (line)}
				<li>{line}</li>
			{/each}
		</ul>
		{#if !tree?.postcode}
			<p class="warn">
				Add a postcode first (Rename → Postcode) or their form won’t accept the record.
			</p>
		{/if}
		<p class="itf">
			Nothing is uploaded from this app. You submit it yourself, on their site, and we just remember
			that you did.
		</p>
		<div class="actions">
			<button class="btn" onclick={copyDraft}>{copied ? '✓ Copied' : 'Copy the details'}</button>
			<a class="btn ghost" href={NATURES_CALENDAR_URL} target="_blank" rel="noopener">
				Open their form ↗
			</a>
		</div>
		<div class="actions">
			<button class="btn ghost small" onclick={confirmSubmitted}>I’ve submitted it</button>
			<button class="btn ghost small" onclick={() => (submitting = null)}>Cancel</button>
		</div>
	{/if}
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
		gap: 5px;
		text-decoration: none;
	}
	/* an SVG arrow, not a "←" glyph: the character sits below the optical centre
	   of the label, and flexbox can't correct it inside a single text node */
	.backlink svg {
		width: 15px;
		height: 15px;
		flex: none;
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
	/* the season reads as a coloured spine down the left of each entry, so a
	   year of records is legible without reading a single date */
	.entry {
		background: var(--card);
		border: 1px solid var(--line);
		border-left: 4px solid var(--line);
		border-radius: 15px;
		padding: 12px;
	}
	.entry.spring {
		border-left-color: #8fbf5a;
	}
	.entry.summer {
		border-left-color: var(--green);
	}
	.entry.autumn {
		border-left-color: #c8862f;
	}
	.entry.winter {
		border-left-color: #6b7f8a;
	}
	.entry :global(img) {
		aspect-ratio: 4 / 3;
		height: auto !important;
	}
	.records {
		display: grid;
		gap: 9px;
	}
	.record {
		background: var(--card);
		border: 1px solid var(--line);
		border-left: 4px solid var(--wash-line);
		border-radius: 13px;
		padding: 11px 13px;
	}
	.record.earlier {
		border-left-color: var(--green);
	}
	.rl {
		margin: 0;
		font-weight: 700;
		font-size: 14px;
	}
	.rd {
		margin: 3px 0 0;
		font-size: 12.5px;
		color: var(--soft);
	}
	.ghost {
		display: grid;
		gap: 9px;
		opacity: 0.75;
	}
	.gentry {
		display: flex;
		gap: 10px;
		border: 1px dashed var(--line);
		border-radius: 15px;
		padding: 11px;
	}
	.gspine {
		width: 4px;
		border-radius: 999px;
		flex: none;
	}
	.gspine.spring {
		background: #8fbf5a;
	}
	.gspine.summer {
		background: var(--green);
	}
	.gspine.autumn {
		background: #c8862f;
	}
	.gbody {
		flex: 1;
		min-width: 0;
	}
	.gtag {
		display: block;
		font-size: 10px;
		font-weight: 700;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		color: var(--soft);
	}
	.gname {
		display: block;
		font-weight: 700;
		font-size: 13.5px;
		color: var(--soft);
		margin-top: 2px;
	}
	.gpic {
		display: block;
		margin-top: 8px;
		aspect-ratio: 4 / 3;
		border-radius: 10px;
		border: 1px dashed var(--line);
	}
	@media (min-width: 700px) {
		.records {
			grid-template-columns: 1fr 1fr;
		}
		.ghost {
			grid-template-columns: repeat(3, 1fr);
		}
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
	.erow {
		display: flex;
		align-items: center;
		gap: 12px;
		flex-wrap: wrap;
		margin-top: 8px;
	}
	.sendobs {
		font-size: 12.5px;
		font-weight: 700;
		color: var(--deep);
		min-height: 44px;
		display: inline-flex;
		align-items: center;
		text-decoration: underline;
	}
	.sent {
		font-size: 12px;
		font-weight: 700;
		color: var(--deep);
		background: var(--wash);
		border: 1px solid var(--wash-line);
		border-radius: 999px;
		padding: 5px 11px;
	}
	.draft {
		margin: 10px 0 0;
		padding: 12px 14px;
		list-style: none;
		background: var(--stonewash);
		border: 1px solid var(--line);
		border-radius: 12px;
		font-size: 13.5px;
		display: grid;
		gap: 5px;
	}
	.warn {
		margin-top: 10px;
		font-size: 13px;
		color: var(--ink);
		background: var(--wash);
		border: 1px solid var(--wash-line);
		border-radius: 10px;
		padding: 9px 11px;
	}
	.removeobs {
		font-size: 12px;
		color: var(--soft);
		text-decoration: underline;
		min-height: 44px;
		display: inline-flex;
		align-items: center;
	}
	.reality {
		margin: 10px 0 0;
		font-size: 12.5px;
		line-height: 1.5;
		color: var(--soft);
		background: var(--stonewash);
		border: 1px solid var(--line);
		border-radius: 10px;
		padding: 9px 11px;
	}
	.reality strong {
		color: var(--ink);
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
