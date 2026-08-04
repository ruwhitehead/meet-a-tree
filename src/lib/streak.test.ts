import { existsSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { advanceStreak, dateStr } from './streak';
import { keyCandidates } from './content/key';
import { SPECIES, searchSpecies } from './content/species';
import { KEY1, KEY2 } from './content/key';
import { factForDate, FACTS } from './content/facts';

describe('advanceStreak', () => {
	it('starts at 1 on first visit', () => {
		expect(advanceStreak({ last: null, count: 1 }, new Date(2026, 7, 4))).toEqual({
			last: '2026-08-04',
			count: 1
		});
	});
	it('is idempotent within the same day', () => {
		const s = { last: '2026-08-04', count: 3 };
		expect(advanceStreak(s, new Date(2026, 7, 4))).toEqual(s);
	});
	it('increments on consecutive days', () => {
		expect(advanceStreak({ last: '2026-08-03', count: 3 }, new Date(2026, 7, 4)).count).toBe(4);
	});
	it('resets after a gap', () => {
		expect(advanceStreak({ last: '2026-08-01', count: 9 }, new Date(2026, 7, 4)).count).toBe(1);
	});
	it('handles month boundaries', () => {
		expect(advanceStreak({ last: '2026-07-31', count: 2 }, new Date(2026, 7, 1)).count).toBe(3);
	});
	it('uses local dates, zero-padded', () => {
		expect(dateStr(new Date(2026, 0, 5))).toBe('2026-01-05');
	});
});

describe('field key', () => {
	it('every species is reachable through the key', () => {
		const reachable = new Set<string>();
		for (const k1 of KEY1)
			for (const k2 of KEY2[k1.id])
				for (const sp of keyCandidates(k1.id, k2.id)) reachable.add(sp.id);
		expect(reachable.size).toBe(SPECIES.length);
	});
	it('every key2 branch has at least one candidate', () => {
		for (const k1 of KEY1)
			for (const k2 of KEY2[k1.id])
				expect(keyCandidates(k1.id, k2.id).length, `${k1.id}/${k2.id}`).toBeGreaterThan(0);
	});
});

describe('search', () => {
	it('finds by common name, Latin name and folk name', () => {
		expect(searchSpecies('oak')[0].id).toBe('oak');
		expect(searchSpecies('Quercus')[0].id).toBe('oak');
		expect(searchSpecies('mountain ash')[0].id).toBe('rowan');
		expect(searchSpecies('conker')[0].id).toBe('chestnut');
	});
	it('is case- and space-insensitive, and returns everything when empty', () => {
		expect(searchSpecies('  ROWAN ')[0].id).toBe('rowan');
		expect(searchSpecies('').length).toBe(SPECIES.length);
	});
	it('returns nothing for a tree we do not carry', () => {
		expect(searchSpecies('baobab')).toEqual([]);
	});
	it('ranks an exact name above a mere mention', () => {
		const ash = searchSpecies('ash');
		expect(ash[0].id).toBe('ash');
		expect(ash.map((s) => s.id)).toContain('rowan'); // "mountain ash"
	});
});

describe('content integrity', () => {
	it('species have unique ids and complete content', () => {
		expect(new Set(SPECIES.map((s) => s.id)).size).toBe(SPECIES.length);
		for (const s of SPECIES) {
			expect(s.spot.length, s.id).toBeGreaterThanOrEqual(5);
			expect(s.folklore.length, s.id).toBeGreaterThan(0);
			expect(s.science.length, s.id).toBeGreaterThan(0);
			expect(s.season.length, s.id).toBe(4);
			expect(s.quick.length, s.id).toBeGreaterThanOrEqual(4);
			expect(s.tell.length).toBeGreaterThan(0);
			expect(s.co2).toBeGreaterThan(0);
			expect(s.family).toMatch(/\(/);
		}
	});

	it('reference entries are substantial, not one-liners', () => {
		for (const s of SPECIES) {
			for (const note of s.spot) expect(note.length, `${s.id} spot`).toBeGreaterThan(120);
			for (const [, body] of [...s.folklore, ...s.science])
				expect(body.length, `${s.id} entry`).toBeGreaterThan(300);
		}
	});
	it('every species has both photos and a thumbnail on disk', () => {
		for (const s of SPECIES)
			for (const suffix of ['tree', 'leaf', 'thumb'])
				expect(
					existsSync(`static/images/species/${s.id}-${suffix}.webp`),
					`${s.id}-${suffix}.webp`
				).toBe(true);
	});

	it('daily fact is stable within a day and cycles the list', () => {
		const d = new Date(2026, 7, 4, 9);
		expect(factForDate(d)).toBe(factForDate(new Date(2026, 7, 4, 23)));
		expect(FACTS).toContain(factForDate(d));
	});
});
