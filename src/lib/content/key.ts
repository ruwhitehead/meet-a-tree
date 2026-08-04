import type { LeafKind, Species } from './types';
import { SPECIES } from './species';

export const KEY1: { id: LeafKind; title: string; desc: string }[] = [
	{ id: 'needle', title: 'Needles or scales', desc: 'Conifer-style foliage' },
	{ id: 'simple', title: 'Simple leaves', desc: 'One undivided blade per stalk' },
	{ id: 'lobed', title: 'Lobed leaves', desc: 'One blade cut into fingers or lobes' },
	{ id: 'compound', title: 'Compound leaves', desc: 'Separate leaflets on one stalk' }
];

export const KEY2: Record<LeafKind, { id: string; title: string }[]> = {
	needle: [
		{ id: 'flat', title: 'Flat and soft, in two rows' },
		{ id: 'paired', title: 'Long, in pairs' },
		{ id: 'rosette', title: 'Soft, in tufts or rosettes' },
		{ id: 'spiky', title: 'Short and sharp, all round the twig' },
		{ id: 'prickly-three', title: 'Prickly, in threes, with berries' }
	],
	simple: [
		{ id: 'toothed', title: 'Edges clearly toothed' },
		{ id: 'wavy', title: 'Edges wavy or almost smooth' },
		{ id: 'spiny', title: 'Spiny and evergreen' },
		{ id: 'narrow', title: 'Long and narrow, like a ribbon' },
		{ id: 'heart', title: 'Heart-shaped or triangular' }
	],
	lobed: [
		{ id: 'rounded', title: 'Rounded, wavy lobes' },
		{ id: 'hand', title: 'Hand-shaped, five points' },
		{ id: 'cut', title: 'Small and deeply cut' }
	],
	compound: [
		{ id: 'ladder', title: 'Leaflets in ladder rows' },
		{ id: 'fan', title: 'Leaflets fanning from one point' }
	]
};

export const keyCandidates = (key: LeafKind, key2: string): Species[] =>
	SPECIES.filter((s) => s.key === key && s.key2 === key2);
