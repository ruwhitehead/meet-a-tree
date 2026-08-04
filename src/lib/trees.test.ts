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
