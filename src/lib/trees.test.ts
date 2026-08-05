import { describe, expect, it } from 'vitest';
import { EVENTS } from './trees.svelte';
import { SPECIES } from './content/species';

describe('phenology events', () => {
	it('every event has a season window and a hint', () => {
		for (const e of EVENTS) {
			expect(e.label.length, e.id).toBeGreaterThan(0);
			expect(e.hint.length, e.id).toBeGreaterThan(10);
			expect(e.months.length, e.id).toBeGreaterThan(0);
			for (const m of e.months) {
				expect(m).toBeGreaterThanOrEqual(0);
				expect(m).toBeLessThanOrEqual(11);
			}
		}
	});

	it('has a recordable event in every month of the year', () => {
		for (let m = 0; m < 12; m++) {
			const available = EVENTS.filter((e) => (e.months as readonly number[]).includes(m));
			expect(available.length, `month ${m}`).toBeGreaterThan(0);
		}
	});

	it('"just a note" is always available as a fallback', () => {
		const note = EVENTS.find((e) => e.id === 'note');
		expect(note?.months.length).toBe(12);
	});

	it('every species can host a tree — ids are stable slugs', () => {
		for (const s of SPECIES) expect(s.id).toMatch(/^[a-z][a-z-]*[a-z]$/);
	});
});

describe('seasonal missions', () => {
	it('windows cover every month of the year between them', async () => {
		const { MISSIONS, inWindow } = await import('./content/missions');
		for (let m = 0; m < 12; m++) {
			const mid = new Date(2026, m, 15);
			const live = MISSIONS.filter((mi) => inWindow(mi, mid));
			expect(live.length, `month ${m}`).toBeGreaterThan(0);
		}
	});

	it('handles a window that wraps the new year', async () => {
		const { MISSIONS, inWindow } = await import('./content/missions');
		const winter = MISSIONS.find((m) => m.id === 'evergreens')!;
		expect(inWindow(winter, new Date(2026, 11, 20))).toBe(true); // December
		expect(inWindow(winter, new Date(2026, 0, 10))).toBe(true); // January
		expect(inWindow(winter, new Date(2026, 5, 10))).toBe(false); // June
	});

	it('every mission is winnable from the species it lists', async () => {
		const { MISSIONS } = await import('./content/missions');
		const { speciesById } = await import('./content/species');
		for (const m of MISSIONS) {
			const real = m.ids.filter((id) => speciesById(id));
			expect(real.length, `${m.id} has unknown species ids`).toBe(m.ids.length);
			expect(real.length, `${m.id} target unreachable`).toBeGreaterThanOrEqual(m.target);
		}
	});
});

describe('what a tree is prompted for', () => {
	const tree = (id: string, obs: { event: string; date: string }[]) =>
		({
			id,
			speciesId: 'oak',
			name: 'The oak',
			planted: '2024-01-01',
			observations: obs.map((o, i) => ({ id: `${id}-o${i}`, ...o }))
		}) as never;

	it('asks for a note, not a named event, when nothing is recorded yet', async () => {
		const { trees } = await import('./trees.svelte');
		trees.items = [tree('t1', [])];
		// early August: "first ripe fruit" is the only event in window, and an oak
		// that month has green acorns — so naming it would be wrong
		const p = trees.prompts(new Date(2026, 7, 5));
		expect(p).toHaveLength(1);
		expect(p[0].first).toBe(true);
		expect(p[0].event.id).toBe('note');
	});

	it('treats a plain note as no season date, since records ignore them', async () => {
		const { trees } = await import('./trees.svelte');
		trees.items = [tree('t3', [{ event: 'note', date: '2026-08-02' }])];
		const p = trees.prompts(new Date(2026, 7, 5));
		expect(p).toHaveLength(1);
		expect(p[0].first).toBe(true);
	});

	it('names the event once there is a date to compare against', async () => {
		const { trees } = await import('./trees.svelte');
		trees.items = [tree('t2', [{ event: 'fruit', date: '2025-09-20' }])];
		const p = trees.prompts(new Date(2026, 7, 5));
		expect(p.some((x) => x.first)).toBe(false);
		expect(p.find((x) => x.event.id === 'fruit')?.lastYear).toBe('2025-09-20');
	});
});

describe('a hunt counts sightings, not species already met', () => {
	it('ignores a grove entry dated before the window, and counts one inside it', async () => {
		const { progressFor } = await import('./missions.svelte');
		const { MISSIONS } = await import('./content/missions');
		const { grove } = await import('./grove.svelte');
		const { trees } = await import('./trees.svelte');
		const summer = MISSIONS.find((m) => m.id === 'summer-shade')!;
		const july = new Date(2026, 6, 1);
		trees.items = [];

		grove.finds = [{ id: 'oak', date: '2026-04-02' }];
		expect(progressFor(summer, july).done).toHaveLength(0);
		expect(progressFor(summer, july).todo.map((s) => s.id)).toContain('oak');

		// this is what the "Seen it" button does: a second, dated sighting
		grove.finds = [...grove.finds, { id: 'oak', date: '2026-07-01' }];
		expect(progressFor(summer, july).done.map((s) => s.id)).toEqual(['oak']);
		expect(grove.speciesCount, 'a re-sighting must not double-count').toBe(1);
	});
});

describe("Nature's Calendar mapping", () => {
	it('maps our events to their vocabulary, and refuses notes', async () => {
		const { eventName, isRecordable } = await import('./phenology');
		expect(eventName('budburst')).toBe('First leaf');
		expect(eventName('tint')).toBe('Full autumn tint');
		expect(eventName('note')).toBeNull();
		expect(isRecordable('oak', 'budburst')).toBe(true);
		expect(isRecordable('oak', 'note')).toBe(false);
		// box is not on their recording list
		expect(isRecordable('box', 'budburst')).toBe(false);
	});

	it('counts the dates a tree has ready to send, and stops counting sent ones', async () => {
		const { readyToSend, isRecordedSpecies, RECORDED_COUNT } = await import('./phenology');
		expect(isRecordedSpecies('oak')).toBe(true);
		expect(isRecordedSpecies('box')).toBe(false);
		expect(RECORDED_COUNT).toBeGreaterThan(0);
		const oak = {
			speciesId: 'oak',
			observations: [
				{ event: 'budburst' as const, date: '2026-04-14' },
				{ event: 'flower' as const, date: '2026-04-20', submitted: true },
				{ event: 'note' as const, date: '2026-08-01' }
			]
		};
		expect(readyToSend(oak)).toBe(1);
		expect(readyToSend({ ...oak, speciesId: 'box' })).toBe(0);
	});

	it('drafts a submission with species, event, date and location', async () => {
		const { draftSubmission } = await import('./phenology');
		const d = draftSubmission({
			speciesName: 'English oak',
			latin: 'Quercus robur',
			event: 'budburst',
			date: '2026-04-14',
			place: 'Park gates',
			postcode: 'OX1 2JD'
		});
		expect(d.text).toContain('English oak');
		expect(d.text).toContain('First leaf');
		expect(d.text).toContain('14 April 2026');
		expect(d.text).toContain('OX1 2JD');
	});
});

describe('install nudging', () => {
	const base = {
		installed: false,
		mobile: true,
		hasBrowserPrompt: false,
		snoozes: 0,
		snoozeUntil: null as string | null,
		visits: 2,
		earned: false,
		today: '2026-08-04'
	};

	it('stays quiet on a first visit, then asks on the second', async () => {
		const { shouldPrompt } = await import('./install.svelte');
		expect(shouldPrompt({ ...base, visits: 1 })).toBe(false);
		expect(shouldPrompt({ ...base, visits: 2 })).toBe(true);
	});

	it('asks immediately after a delight moment, even on visit one', async () => {
		const { shouldPrompt } = await import('./install.svelte');
		expect(shouldPrompt({ ...base, visits: 1, earned: true })).toBe(true);
	});

	it('never nags an installed app', async () => {
		const { shouldPrompt } = await import('./install.svelte');
		expect(shouldPrompt({ ...base, installed: true, earned: true })).toBe(false);
	});

	it('respects a snooze, then returns when it expires', async () => {
		const { shouldPrompt } = await import('./install.svelte');
		expect(shouldPrompt({ ...base, snoozes: 1, snoozeUntil: '2026-08-08' })).toBe(false);
		expect(shouldPrompt({ ...base, snoozes: 1, snoozeUntil: '2026-08-04' })).toBe(true);
	});

	it('takes three refusals as a final no', async () => {
		const { shouldPrompt } = await import('./install.svelte');
		expect(shouldPrompt({ ...base, snoozes: 3, snoozeUntil: null })).toBe(false);
	});

	it('is silent on desktop unless the browser offers an install', async () => {
		const { shouldPrompt } = await import('./install.svelte');
		expect(shouldPrompt({ ...base, mobile: false })).toBe(false);
		expect(shouldPrompt({ ...base, mobile: false, hasBrowserPrompt: true })).toBe(true);
	});
});

describe('Pl@ntNet mapping', () => {
	it('maps a response to ranked matches with our species ids', async () => {
		const { mapResults } = await import('./plantnet');
		const { matches, remaining } = mapResults({
			results: [
				{ score: 0.90734, species: { scientificNameWithoutAuthor: 'Quercus robur', commonNames: ['Pedunculate oak'] } },
				{ score: 0.0421, species: { scientificNameWithoutAuthor: 'Quercus petraea', commonNames: ['Sessile oak'] } }
			],
			remainingIdentificationRequests: 498
		});
		expect(matches).toHaveLength(2);
		expect(matches[0]).toEqual({ latin: 'Quercus robur', common: 'Pedunculate oak', score: 91, id: 'oak' });
		expect(matches[1].id).toBe('sessile-oak');
		expect(remaining).toBe(498);
	});

	it('keeps species we do not carry, with a null id', async () => {
		const { mapResults } = await import('./plantnet');
		const { matches } = mapResults({
			results: [{ score: 0.5, species: { scientificNameWithoutAuthor: 'Eucalyptus globulus' } }]
		});
		expect(matches[0].latin).toBe('Eucalyptus globulus');
		expect(matches[0].id).toBeNull();
	});

	it('falls back to genus only when it is unambiguous in our guide', async () => {
		const { idFor } = await import('./plantnet');
		expect(idFor('Aesculus indica')).toBe('chestnut'); // one Aesculus in the guide
		expect(idFor('Quercus cerris')).toBeNull(); // three oaks — refuse to guess
		expect(idFor('Tilia platyphyllos')).toBe('lime');
	});

	it('handles the London plane hybrid spellings', async () => {
		const { idFor } = await import('./plantnet');
		for (const n of ['Platanus × hispanica', 'Platanus x hispanica', 'Platanus acerifolia'])
			expect(idFor(n), n).toBe('london-plane');
	});

	it('survives an empty or malformed response', async () => {
		const { mapResults } = await import('./plantnet');
		expect(mapResults({}).matches).toEqual([]);
		expect(mapResults({ results: [{ score: 0.5, species: {} }] }).matches).toEqual([]);
		expect(mapResults({ results: [] }).remaining).toBeNull();
	});

	it('clamps scores into 0–100', async () => {
		const { mapResults } = await import('./plantnet');
		const { matches } = mapResults({
			results: [{ score: 1.4, species: { scientificNameWithoutAuthor: 'Quercus robur' } }]
		});
		expect(matches[0].score).toBe(100);
	});

	it('accepts only the organs Pl@ntNet documents', async () => {
		const { isOrgan } = await import('./plantnet');
		for (const o of ['leaf', 'flower', 'fruit', 'bark', 'auto']) expect(isOrgan(o), o).toBe(true);
		expect(isOrgan('whole-tree')).toBe(false);
		expect(isOrgan('trunk')).toBe(false);
	});
});

describe('saving photos to the library', () => {
	it('offers the button on iPhone when file sharing is available', async () => {
		const { saveCapability } = await import('./photos');
		const iphone =
			'Mozilla/5.0 (iPhone; CPU iPhone OS 17_5 like Mac OS X) AppleWebKit/605.1.15 Version/17.5 Mobile/15E148 Safari/604.1';
		expect(saveCapability({ ua: iphone, maxTouchPoints: 5, canShareFiles: true })).toEqual({
			offer: true,
			ios: true
		});
	});

	it('recognises iPadOS, which lies about being a Mac', async () => {
		const { saveCapability } = await import('./photos');
		const ipad = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 Safari/605.1.15';
		expect(saveCapability({ ua: ipad, maxTouchPoints: 5, canShareFiles: true }).ios).toBe(true);
		// a real Mac has no touch points
		expect(saveCapability({ ua: ipad, maxTouchPoints: 0, canShareFiles: true }).ios).toBe(false);
	});

	it('stays out of the way on Android, which already saved a copy', async () => {
		const { saveCapability } = await import('./photos');
		const android = 'Mozilla/5.0 (Linux; Android 14; Pixel 8) AppleWebKit/537.36 Chrome/120 Mobile Safari/537.36';
		expect(saveCapability({ ua: android, maxTouchPoints: 5, canShareFiles: true }).offer).toBe(false);
	});

	it('hides the button when the browser cannot share files', async () => {
		const { saveCapability } = await import('./photos');
		const iphone = 'Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15 Safari/604.1';
		const cap = saveCapability({ ua: iphone, maxTouchPoints: 5, canShareFiles: false });
		expect(cap.offer).toBe(false);
		expect(cap.ios).toBe(true); // still iOS, so the honest note still shows
	});

	it('treats every iOS browser as WebKit', async () => {
		const { saveCapability } = await import('./photos');
		for (const ua of [
			'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) CriOS/120 Mobile Safari/604.1',
			'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) FxiOS/121 Mobile Safari/604.1'
		])
			expect(saveCapability({ ua, maxTouchPoints: 5, canShareFiles: true }).offer, ua).toBe(true);
	});
});

describe('records drawn from your own history', () => {
	const tree = (obs: { event: string; date: string }[]) =>
		({
			id: 't',
			speciesId: 'oak',
			name: 'The oak',
			planted: '2023-01-01',
			observations: obs.map((o, i) => ({ id: `o${i}`, ...o }))
		}) as never;

	it('sets a baseline from a single record', async () => {
		const { recordsFor } = await import('./records');
		const r = recordsFor(tree([{ event: 'budburst', date: '2026-04-14' }]));
		expect(r[0].kind).toBe('first');
		expect(r[0].detail).toContain('2026');
	});

	it('reports the shift against last year, in the right direction', async () => {
		const { recordsFor } = await import('./records');
		const earlier = recordsFor(
			tree([
				{ event: 'budburst', date: '2025-04-23' },
				{ event: 'budburst', date: '2026-04-14' }
			])
		);
		expect(earlier[0].kind).toBe('earlier');
		expect(earlier[0].label).toContain('9 days earlier');

		const later = recordsFor(
			tree([
				{ event: 'budburst', date: '2025-04-10' },
				{ event: 'budburst', date: '2026-04-20' }
			])
		);
		expect(later[0].kind).toBe('later');
		expect(later[0].label).toContain('10 days later');
	});

	it('stays quiet about a shift of a day or two', async () => {
		const { recordsFor } = await import('./records');
		const r = recordsFor(
			tree([
				{ event: 'budburst', date: '2025-04-14' },
				{ event: 'budburst', date: '2026-04-15' }
			])
		);
		expect(r.filter((x) => x.kind === 'earlier' || x.kind === 'later')).toEqual([]);
	});

	it('only claims a personal earliest once there are three years', async () => {
		const { recordsFor } = await import('./records');
		const two = recordsFor(
			tree([
				{ event: 'budburst', date: '2025-04-20' },
				{ event: 'budburst', date: '2026-04-10' }
			])
		);
		expect(two.some((r) => r.label.includes('Earliest'))).toBe(false);

		const three = recordsFor(
			tree([
				{ event: 'budburst', date: '2024-04-20' },
				{ event: 'budburst', date: '2025-04-18' },
				{ event: 'budburst', date: '2026-04-08' }
			])
		);
		expect(three.some((r) => r.label.includes('Earliest'))).toBe(true);
		expect(three.some((r) => r.label.includes('3 years of records'))).toBe(true);
	});

	it('ignores plain notes, which carry no season meaning', async () => {
		const { recordsFor } = await import('./records');
		expect(recordsFor(tree([{ event: 'note', date: '2026-08-04' }]))).toEqual([]);
	});
});
