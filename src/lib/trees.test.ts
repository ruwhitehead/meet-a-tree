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
