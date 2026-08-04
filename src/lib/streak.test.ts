import { describe, expect, it } from 'vitest';
import { advanceStreak, dateStr } from './streak';
import { keyCandidates } from './content/key';
import { SPECIES } from './content/species';
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

describe('content integrity', () => {
	it('species have unique ids and complete content', () => {
		expect(new Set(SPECIES.map((s) => s.id)).size).toBe(SPECIES.length);
		for (const s of SPECIES) {
			expect(s.spot.length).toBeGreaterThan(0);
			expect(s.folklore.length).toBeGreaterThan(0);
			expect(s.science.length).toBeGreaterThan(0);
			expect(s.tell.length).toBeGreaterThan(0);
			expect(s.co2).toBeGreaterThan(0);
		}
	});
	it('daily fact is stable within a day and cycles the list', () => {
		const d = new Date(2026, 7, 4, 9);
		expect(factForDate(d)).toBe(factForDate(new Date(2026, 7, 4, 23)));
		expect(FACTS).toContain(factForDate(d));
	});
});
