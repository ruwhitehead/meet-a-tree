import { error } from '@sveltejs/kit';
import { SPECIES, speciesById } from '$lib/content/species';
import type { PageLoad, EntryGenerator } from './$types';

export const entries: EntryGenerator = () => SPECIES.map((s) => ({ id: s.id }));

export const load: PageLoad = ({ params }) => {
	const species = speciesById(params.id);
	if (!species) error(404, 'No such tree in the guide (yet)');
	return { species };
};
