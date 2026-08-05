import { browser } from '$app/environment';
import { dateStr } from './streak';
import { speciesById } from './content/species';
import { install } from './install.svelte';
import type { Species } from './content/types';

/** A phenology event worth recording. These are the standard first-event dates
 *  that phenology networks (Nature's Calendar and the rest) actually collect. */
export const EVENTS = [
	{ id: 'budburst', label: 'First leaves', hint: 'Buds broken, first leaves unfolding', months: [2, 3, 4, 5] },
	{ id: 'flower', label: 'First flowers', hint: 'Blossom or catkins open', months: [1, 2, 3, 4, 5, 6] },
	{ id: 'fruit', label: 'First ripe fruit', hint: 'Berries, nuts, keys or cones ripe', months: [6, 7, 8, 9, 10] },
	{ id: 'tint', label: 'Leaves turning', hint: 'More than half the crown has changed colour', months: [8, 9, 10, 11] },
	{ id: 'bare', label: 'Bare', hint: 'Effectively no leaves left', months: [9, 10, 11, 0, 1] },
	{ id: 'note', label: 'Just a note', hint: 'Anything else worth remembering', months: [0,1,2,3,4,5,6,7,8,9,10,11] }
] as const;

export type EventId = (typeof EVENTS)[number]['id'];

export interface Observation {
	id: string;
	event: EventId;
	date: string;
	note?: string;
	/** object URL is not persisted; photos live in IndexedDB by key */
	photoKey?: string;
	/** the user told us they sent this to Nature's Calendar */
	submitted?: boolean;
}

export interface MyTree {
	id: string;
	speciesId: string;
	/** what the owner calls it: "the oak at the end of the road" */
	name: string;
	/** coarse place label, typed by the user — never coordinates */
	place?: string;
	/** optional, only for phenology submissions the user chooses to make */
	postcode?: string;
	planted: string;
	observations: Observation[];
}

const KEY = 'mat-trees-v1';

function load(): MyTree[] {
	if (!browser) return [];
	try {
		const raw = localStorage.getItem(KEY);
		const parsed = raw ? (JSON.parse(raw) as MyTree[]) : [];
		return Array.isArray(parsed) ? parsed : [];
	} catch {
		return [];
	}
}

/** Stable id without Math.random, so it is deterministic per millisecond+count. */
let seq = 0;
function newId(prefix: string): string {
	seq += 1;
	return `${prefix}-${Date.now().toString(36)}-${seq.toString(36)}`;
}

/** Photos are far too big for localStorage, so they go in IndexedDB as blobs. */
const DB = 'meet-a-tree';
const STORE = 'photos';

function openDb(): Promise<IDBDatabase> {
	return new Promise((resolve, reject) => {
		const req = indexedDB.open(DB, 1);
		req.onupgradeneeded = () => {
			const db = req.result;
			if (!db.objectStoreNames.contains(STORE)) db.createObjectStore(STORE);
		};
		req.onsuccess = () => resolve(req.result);
		req.onerror = () => reject(req.error);
	});
}

/** Downscale and re-encode as JPEG. Camera originals are 3–5 MB, which is slow
 *  to upload and wasteful to store, and iOS sometimes hands over HEIC that
 *  Pl@ntNet will not accept. Falls back to the original if the APIs are absent —
 *  an unshrunk photo beats no photo. */
export async function shrinkImage(file: Blob, maxEdge = 1600, quality = 0.82): Promise<Blob> {
	if (typeof createImageBitmap !== 'function' || typeof OffscreenCanvas !== 'function') return file;
	try {
		const bmp = await createImageBitmap(file);
		const scale = Math.min(1, maxEdge / Math.max(bmp.width, bmp.height));
		const w = Math.round(bmp.width * scale);
		const h = Math.round(bmp.height * scale);
		const canvas = new OffscreenCanvas(w, h);
		const ctx = canvas.getContext('2d');
		if (!ctx) {
			bmp.close();
			return file;
		}
		ctx.drawImage(bmp, 0, 0, w, h);
		bmp.close();
		const out = await canvas.convertToBlob({ type: 'image/jpeg', quality });
		// keep whichever is smaller, unless the original is a format we must convert
		const mustConvert = !/^image\/(jpe?g|png)$/.test(file.type);
		return mustConvert || out.size < file.size ? out : file;
	} catch {
		return file;
	}
}

export async function putPhoto(input: Blob): Promise<string> {
	const blob = await shrinkImage(input);
	const key = newId('photo');
	const db = await openDb();
	await new Promise<void>((resolve, reject) => {
		const tx = db.transaction(STORE, 'readwrite');
		tx.objectStore(STORE).put(blob, key);
		tx.oncomplete = () => resolve();
		tx.onerror = () => reject(tx.error);
	});
	db.close();
	return key;
}

export async function getPhoto(key: string): Promise<Blob | undefined> {
	const db = await openDb();
	const blob = await new Promise<Blob | undefined>((resolve, reject) => {
		const tx = db.transaction(STORE, 'readonly');
		const req = tx.objectStore(STORE).get(key);
		req.onsuccess = () => resolve(req.result as Blob | undefined);
		req.onerror = () => reject(req.error);
	});
	db.close();
	return blob;
}

export async function deletePhoto(key: string): Promise<void> {
	const db = await openDb();
	await new Promise<void>((resolve) => {
		const tx = db.transaction(STORE, 'readwrite');
		tx.objectStore(STORE).delete(key);
		tx.oncomplete = () => resolve();
		tx.onerror = () => resolve();
	});
	db.close();
}

/** What this tree did on this date last year — the reason to come back. */
export interface DuePrompt {
	tree: MyTree;
	species: Species;
	event: (typeof EVENTS)[number];
	/** last year's date for the same event, if we have one */
	lastYear?: string;
	/** days between last year's date and today (negative = still to come) */
	drift?: number;
	/** nothing recorded yet, so this is an invitation rather than a due date */
	first?: boolean;
}

const NOTE_EVENT = EVENTS.find((e) => e.id === 'note')!;

function daysBetween(a: Date, b: Date): number {
	return Math.round((a.getTime() - b.getTime()) / 86400000);
}

class Trees {
	items = $state<MyTree[]>([]);

	constructor() {
		this.items = load();
	}

	save() {
		if (!browser) return;
		try {
			localStorage.setItem(KEY, JSON.stringify(this.items));
		} catch {
			/* quota — the session still works in memory */
		}
	}

	get count(): number {
		return this.items.length;
	}

	byId(id: string): MyTree | undefined {
		return this.items.find((t) => t.id === id);
	}

	add(speciesId: string, name: string, place?: string, postcode?: string): MyTree {
		const tree: MyTree = {
			id: newId('tree'),
			speciesId,
			name: name.trim() || (speciesById(speciesId)?.name ?? 'My tree'),
			place: place?.trim() || undefined,
			// asked here only for species whose dates a national scheme can use;
			// discovering the requirement at submission time wasted the effort
			postcode: postcode?.trim().toUpperCase() || undefined,
			planted: dateStr(new Date()),
			observations: []
		};
		this.items = [...this.items, tree];
		this.save();
		install.celebrate();
		return tree;
	}

	rename(id: string, name: string, place?: string, postcode?: string) {
		this.items = this.items.map((t) =>
			t.id === id
				? {
						...t,
						name: name.trim() || t.name,
						place: place?.trim() || undefined,
						postcode: postcode?.trim().toUpperCase() || t.postcode
					}
				: t
		);
		this.save();
	}

	/** Records that the user submitted this observation onwards themselves. */
	markSubmitted(treeId: string, obsId: string) {
		this.items = this.items.map((t) =>
			t.id === treeId
				? {
						...t,
						observations: t.observations.map((o) => (o.id === obsId ? { ...o, submitted: true } : o))
					}
				: t
		);
		this.save();
	}

	async remove(id: string) {
		const tree = this.byId(id);
		if (tree) {
			for (const o of tree.observations) if (o.photoKey) await deletePhoto(o.photoKey);
		}
		this.items = this.items.filter((t) => t.id !== id);
		this.save();
	}

	addObservation(treeId: string, event: EventId, note?: string, photoKey?: string) {
		const obs: Observation = {
			id: newId('obs'),
			event,
			date: dateStr(new Date()),
			note: note?.trim() || undefined,
			photoKey
		};
		this.items = this.items.map((t) =>
			t.id === treeId ? { ...t, observations: [...t.observations, obs] } : t
		);
		this.save();
		return obs;
	}

	async removeObservation(treeId: string, obsId: string) {
		const tree = this.byId(treeId);
		const obs = tree?.observations.find((o) => o.id === obsId);
		if (obs?.photoKey) await deletePhoto(obs.photoKey);
		this.items = this.items.map((t) =>
			t.id === treeId ? { ...t, observations: t.observations.filter((o) => o.id !== obsId) } : t
		);
		this.save();
	}

	get photoCount(): number {
		return this.items.reduce(
			(n, t) => n + t.observations.filter((o) => o.photoKey).length,
			0
		);
	}

	get observationCount(): number {
		return this.items.reduce((n, t) => n + t.observations.length, 0);
	}

	/** Prompts for today: events in season for each tree, with last year's date
	 *  where we have it. This is the engine that makes the app worth reopening. */
	prompts(now = new Date()): DuePrompt[] {
		const month = now.getMonth();
		const out: DuePrompt[] = [];
		for (const tree of this.items) {
			const species = speciesById(tree.speciesId);
			if (!species) continue;
			// No season dates yet, so there is no drift to report and no honest way
			// to name an event: "first ripe fruit" in early August is the calendar
			// talking, not the tree, and an oak that month has green acorns. Ask for
			// a note instead and let the tree tell us where it is. Plain notes carry
			// no season meaning (records ignore them), so they do not count here.
			if (!tree.observations.some((o) => o.event !== 'note')) {
				out.push({ tree, species, event: NOTE_EVENT, first: true });
				continue;
			}
			for (const event of EVENTS) {
				if (event.id === 'note') continue;
				if (!(event.months as readonly number[]).includes(month)) continue;
				// already recorded this calendar year? then it is not due
				const thisYear = tree.observations.find(
					(o) => o.event === event.id && o.date.slice(0, 4) === String(now.getFullYear())
				);
				if (thisYear) continue;
				const prior = tree.observations
					.filter((o) => o.event === event.id)
					.sort((a, b) => b.date.localeCompare(a.date))[0];
				let drift: number | undefined;
				if (prior) {
					const [, m, d] = prior.date.split('-');
					const anniversary = new Date(now.getFullYear(), Number(m) - 1, Number(d));
					drift = daysBetween(now, anniversary);
				}
				out.push({ tree, species, event, lastYear: prior?.date, drift });
			}
		}
		// trees with history first, then by how overdue they are
		return out.sort((a, b) => (b.drift ?? -999) - (a.drift ?? -999));
	}
}

export const trees = new Trees();
