/**
 * Pl@ntNet response mapping, kept separate from the endpoint so it can be
 * tested without a key or a network.
 *
 * Contract (my.plantnet.org/doc/api/identify, checked 2026-08):
 *   POST https://my-api.plantnet.org/v2/identify/{project}?api-key=…
 *   multipart: `images` (up to 5, JPG/PNG), `organs` (one per image)
 *   organs ∈ leaf | flower | fruit | bark | auto
 *   project: use a KT project — legacy projects run an outdated model
 *   response: { results: [{ score, species }], bestMatch, remainingIdentificationRequests }
 */

export const PLANTNET_PROJECT = 'k-world-flora';
export const ORGANS = ['leaf', 'flower', 'fruit', 'bark', 'auto'] as const;
export type Organ = (typeof ORGANS)[number];

export const isOrgan = (v: string): v is Organ => (ORGANS as readonly string[]).includes(v);

/** Scientific name (lower case, no author) → our species id. */
export const KNOWN: Record<string, string> = {
	'quercus robur': 'oak',
	'quercus petraea': 'sessile-oak',
	'quercus ilex': 'holm-oak',
	'betula pendula': 'birch',
	'betula pubescens': 'downy-birch',
	'sorbus aucuparia': 'rowan',
	'sorbus aria': 'whitebeam',
	'sorbus torminalis': 'wild-service',
	'fagus sylvatica': 'beech',
	'carpinus betulus': 'hornbeam',
	'fraxinus excelsior': 'ash',
	'ilex aquifolium': 'holly',
	'taxus baccata': 'yew',
	'pinus sylvestris': 'pine',
	'larix decidua': 'larch',
	'picea abies': 'spruce',
	'pseudotsuga menziesii': 'douglas-fir',
	'juniperus communis': 'juniper',
	'crataegus monogyna': 'hawthorn',
	'prunus spinosa': 'blackthorn',
	'prunus avium': 'wild-cherry',
	'prunus padus': 'bird-cherry',
	'malus sylvestris': 'crab-apple',
	'aesculus hippocastanum': 'chestnut',
	'castanea sativa': 'sweet-chestnut',
	'acer pseudoplatanus': 'sycamore',
	'acer platanoides': 'norway-maple',
	'acer campestre': 'field-maple',
	'platanus × hispanica': 'london-plane',
	'platanus x hispanica': 'london-plane',
	'platanus hispanica': 'london-plane',
	'platanus acerifolia': 'london-plane',
	'tilia cordata': 'lime',
	'sambucus nigra': 'elder',
	'corylus avellana': 'hazel',
	'alnus glutinosa': 'alder',
	'ulmus glabra': 'wych-elm',
	'salix caprea': 'goat-willow',
	'salix alba': 'white-willow',
	'populus tremula': 'aspen',
	'populus nigra': 'black-poplar',
	'juglans regia': 'walnut',
	'buxus sempervirens': 'box'
};

export interface Match {
	latin: string;
	common: string;
	score: number;
	/** our species id, when the guide carries it */
	id: string | null;
}

interface PlantNetResponse {
	results?: {
		score?: number;
		species?: {
			scientificNameWithoutAuthor?: string;
			commonNames?: string[];
			genus?: { scientificNameWithoutAuthor?: string };
		};
	}[];
	remainingIdentificationRequests?: number;
}

/** Look an id up by full binomial, falling back to a genus-level guess so a
 *  "Quercus sp." style answer still lands somewhere useful. */
export function idFor(latin: string): string | null {
	const key = latin.trim().toLowerCase();
	if (KNOWN[key]) return KNOWN[key];
	const genus = key.split(/\s+/)[0];
	// only guess when the genus is unambiguous in our guide
	const hits = [...new Set(Object.entries(KNOWN).filter(([k]) => k.startsWith(genus + ' ')).map(([, v]) => v))];
	return hits.length === 1 ? hits[0] : null;
}

export function mapResults(
	data: PlantNetResponse,
	limit = 5
): { matches: Match[]; remaining: number | null } {
	const matches = (data.results ?? [])
		.slice(0, limit)
		.map((r) => {
			const latin = (r.species?.scientificNameWithoutAuthor ?? '').trim();
			if (!latin) return null;
			return {
				latin,
				common: r.species?.commonNames?.[0] ?? '',
				score: Math.round(Math.max(0, Math.min(1, r.score ?? 0)) * 100),
				id: idFor(latin)
			} satisfies Match;
		})
		.filter((m): m is Match => m !== null);

	const remaining =
		typeof data.remainingIdentificationRequests === 'number'
			? data.remainingIdentificationRequests
			: null;
	return { matches, remaining };
}
