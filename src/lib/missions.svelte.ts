import { grove } from './grove.svelte';
import { trees } from './trees.svelte';
import { inWindow, type Mission } from './content/missions';
import { speciesById } from './content/species';
import type { Species } from './content/types';

export interface MissionProgress {
	mission: Mission;
	/** species found inside this window, this year */
	done: Species[];
	/** species on the board still to find */
	todo: Species[];
	complete: boolean;
	/** 0–1 */
	fraction: number;
}

/** Was this species recorded during the mission's window in the current cycle?
 *  Counts a grove find or a tree observation — noticing the tree is the point,
 *  and both routes prove you were out looking. */
function foundInWindow(id: string, m: Mission, now: Date): boolean {
	const cycleOk = (iso: string) => {
		const d = new Date(iso + 'T12:00:00');
		if (Number.isNaN(d.getTime()) || !inWindow(m, d)) return false;
		// a window that wraps the new year spans two calendar years
		const wraps = m.from[0] > m.to[0];
		const y = d.getFullYear();
		const nowY = now.getFullYear();
		if (!wraps) return y === nowY;
		return y === nowY || y === nowY - 1 || y === nowY + 1;
	};

	if (grove.finds.some((f) => f.id === id && cycleOk(f.date))) return true;
	return trees.items.some(
		(t) => t.speciesId === id && t.observations.some((o) => cycleOk(o.date))
	);
}

export function progressFor(m: Mission, now = new Date()): MissionProgress {
	const species = m.ids
		.map((id) => speciesById(id))
		.filter((s): s is Species => Boolean(s));
	const done = species.filter((s) => foundInWindow(s.id, m, now));
	const todo = species.filter((s) => !done.includes(s));
	return {
		mission: m,
		done,
		todo,
		complete: done.length >= m.target,
		fraction: Math.min(1, done.length / m.target)
	};
}
