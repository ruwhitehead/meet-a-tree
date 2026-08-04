import { speciesById } from './species';
import type { Species } from './types';

/** Where a tree grows narrows the candidates before you look at a leaf.
 *  Lives beside the field key because that is where it is useful. */
export const PLACES: { place: string; blurb: string; ids: string[] }[] = [
		{
			place: 'A street or town park',
			blurb: 'Planted for shade and toughness. Look up at the crown shape first — street trees are usually pruned, so leaves and bark tell you more than outline.',
			ids: ['chestnut', 'sycamore', 'birch', 'rowan']
		},
		{
			place: 'An old churchyard',
			blurb: 'The most reliable place in lowland Britain to meet a genuinely ancient tree. Check the girth: anything over 5 m round is likely centuries old.',
			ids: ['yew', 'holly', 'ash']
		},
		{
			place: 'A hedgerow or field edge',
			blurb: 'Hedges were planted to be stock-proof, so expect thorns. Count woody species along thirty paces — roughly one per century of hedge age.',
			ids: ['hawthorn', 'elder', 'ash', 'oak']
		},
		{
			place: 'Chalk or limestone downland',
			blurb: 'Thin alkaline soil suits a particular set of trees. Beech hangers on scarp slopes are the signature of the southern chalk.',
			ids: ['beech', 'yew', 'hawthorn']
		},
		{
			place: 'Heath, sandy or acid ground',
			blurb: 'Poor, free-draining soil favours pioneers and conifers. Birch arrives first; pine follows and stays.',
			ids: ['birch', 'pine', 'rowan']
		},
		{
			place: 'Ancient or damp woodland',
			blurb: 'Look at the ground flora as well as the canopy — bluebells, dog’s mercury and ramsons all say the wood is old.',
			ids: ['oak', 'beech', 'ash', 'holly']
		},
		{
			place: 'Uplands, crags and mountainsides',
			blurb: 'Trees survive here where grazing animals cannot reach. A lone tree wedged in a crag is almost always rowan.',
			ids: ['rowan', 'birch', 'pine']
		}
	];

export const placeSpecies = (ids: string[]): Species[] =>
	ids.map((id) => speciesById(id)).filter((s): s is Species => Boolean(s));
