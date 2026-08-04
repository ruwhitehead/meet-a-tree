import type { LeafKind, Species } from './types';
import { SPECIES } from './species';

export const KEY1: { id: LeafKind; title: string; desc: string }[] = [
	{ id: 'needle', title: 'Needles', desc: 'Evergreen needles or scales' },
	{ id: 'simple', title: 'Simple leaves', desc: 'One blade per stalk' },
	{ id: 'lobed', title: 'Lobed leaves', desc: 'Deep fingers or rounded lobes' },
	{ id: 'compound', title: 'Compound leaves', desc: 'Many leaflets on one stalk' }
];

export const KEY2: Record<LeafKind, { id: string; title: string }[]> = {
	needle: [
		{ id: 'flat', title: 'Flat needles in two rows' },
		{ id: 'paired', title: 'Long needles in pairs' }
	],
	simple: [
		{ id: 'toothed', title: 'Edges clearly toothed' },
		{ id: 'wavy', title: 'Edges wavy or smooth' },
		{ id: 'spiny', title: 'Spiny and evergreen' }
	],
	lobed: [
		{ id: 'rounded', title: 'Rounded, wavy lobes' },
		{ id: 'hand', title: 'Hand-shaped, 5 points' },
		{ id: 'cut', title: 'Small and deeply cut' }
	],
	compound: [
		{ id: 'ladder', title: 'Leaflets in ladder rows' },
		{ id: 'fan', title: 'A fan from one point' }
	]
};

export const keyCandidates = (key: LeafKind, key2: string): Species[] =>
	SPECIES.filter((s) => s.key === key && s.key2 === key2);
