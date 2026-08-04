import type { Species } from './types';
import { SPECIES_A } from './species-a';
import { SPECIES_B } from './species-b';
import { SPECIES_C } from './species-c';
import { SPECIES_D } from './species-d';
import { SPECIES_E } from './species-e';
import { SPECIES_F } from './species-f';
import { SPECIES_G } from './species-g';

/** The guide covers trees you'll meet in Britain and Ireland. */
export const SPECIES: Species[] = [
	...SPECIES_A,
	...SPECIES_B,
	...SPECIES_C,
	...SPECIES_D,
	...SPECIES_E,
	...SPECIES_F,
	...SPECIES_G
].sort((a, b) => a.name.localeCompare(b.name));

export const speciesById = (id: string): Species | undefined => SPECIES.find((s) => s.id === id);

/** Free-text search over name, Latin name, other names, family and hint. */
export function searchSpecies(q: string): Species[] {
	const needle = q.trim().toLowerCase();
	if (!needle) return SPECIES;
	const words = needle.split(/\s+/);
	return SPECIES.map((s) => {
		const haystack = [s.name, s.latin, s.family, s.hint, ...(s.aka ?? [])].join(' ').toLowerCase();
		if (!words.every((w) => haystack.includes(w))) return null;
		const rank = s.name.toLowerCase().startsWith(needle)
			? 0
			: s.name.toLowerCase().includes(needle)
				? 1
				: (s.aka ?? []).some((a) => a.toLowerCase().includes(needle))
					? 2
					: 3;
		return { s, rank };
	})
		.filter((x): x is { s: Species; rank: number } => x !== null)
		.sort((a, b) => a.rank - b.rank || a.s.name.localeCompare(b.s.name))
		.map((x) => x.s);
}
