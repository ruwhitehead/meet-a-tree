import type { Species } from './types';

export const SPECIES: Species[] = [
	{
		id: 'oak',
		name: 'English oak',
		latin: 'Quercus robur',
		co2: 30,
		colors: ['#4FA372', '#167E3C'],
		key: 'lobed',
		key2: 'rounded',
		hint: 'Rounded, wavy lobes; acorns on stalks',
		spot: [
			'Leaves with deep rounded lobes, almost no stalk',
			'Acorns sit on long stalks ("peduncles")',
			'Broad, spreading crown; deeply fissured grey-brown bark'
		],
		folklore: [
			[
				'The doorway tree',
				'Across Europe, oaks marked thresholds — courts met under them, marriages were sealed under them, and "gospel oaks" marked parish bounds walked once a year.'
			],
			[
				'Thunder’s favourite',
				'Sacred to Thor, Zeus and Perun — oaks really are struck by lightning more than most trees. The gods, it turns out, had good data.'
			]
		],
		science: [
			[
				'Mast years',
				'An oak can drop 10,000 acorns one autumn, then almost none for years. Whole regions synchronise these "mast years" — predators can’t eat everything, so more acorns survive.'
			],
			[
				'A city of one',
				'A single mature oak supports over 2,300 other species — more than any other tree in Britain.'
			]
		],
		tell: 'Hollow oaks were said to shelter anyone the forest approved of.'
	},
	{
		id: 'birch',
		name: 'Silver birch',
		latin: 'Betula pendula',
		co2: 12,
		colors: ['#C9D96A', '#8FA83C'],
		key: 'simple',
		key2: 'toothed',
		hint: 'Small triangular leaves, doubly toothed; white bark',
		spot: [
			'Papery white bark with black fissures',
			'Small triangular leaves with double-toothed edges',
			'Fine, drooping twigs — "pendula"'
		],
		folklore: [
			[
				'Lady of the woods',
				'Birch besoms swept out the old year; maypoles were often birch. A tree of beginnings, brooms and spring cleaning in the oldest sense.'
			]
		],
		science: [
			[
				'The pioneer',
				'Birch is a pioneer species — first into open ground, feeding and sheltering the slower trees that replace it. Its white bark (betulin) reflects winter sun to stop the trunk cracking.'
			],
			[
				'Ancient chewing gum',
				'Lumps of chewed birch tar, complete with 10,000-year-old tooth marks, still carry the DNA of the people who chewed them.'
			]
		],
		tell: 'Stone-age people chewed birch tar gum — we’ve found the tooth marks.'
	},
	{
		id: 'rowan',
		name: 'Rowan',
		latin: 'Sorbus aucuparia',
		co2: 10,
		colors: ['#D97B4A', '#B9502A'],
		key: 'compound',
		key2: 'ladder',
		hint: 'Ladder-like leaflets, toothed; red berries',
		spot: [
			'5–8 pairs of toothed leaflets in ladder rows',
			'Clusters of bright red berries from late summer',
			'Smooth grey bark; often planted by doors'
		],
		folklore: [
			[
				'The witch-ward',
				'Rowan by the door kept ill-wishing out; a cross of rowan twigs tied with red thread protected the byre. Scots planted one by every croft.'
			]
		],
		science: [
			[
				'E200, from a berry',
				'Sorbic acid — the preservative on half the labels in your kitchen — was first isolated from rowan berries in 1859. The berry’s own anti-mould trick, bottled.'
			]
		],
		tell: 'The preservative E200 in your bread began as rowan-berry juice.'
	},
	{
		id: 'beech',
		name: 'Beech',
		latin: 'Fagus sylvatica',
		co2: 25,
		colors: ['#8CBB5E', '#4E8534'],
		key: 'simple',
		key2: 'wavy',
		hint: 'Silky oval leaves with wavy edges; smooth grey bark',
		spot: [
			'Oval leaves with wavy (not toothed) edges, silky when young',
			'Smooth, elephant-grey bark',
			'Deep leaf litter; little grows beneath'
		],
		folklore: [
			[
				'The first book',
				'"Book" and "beech" grow from the same old Germanic root — early runes were cut into beech tablets. Every book you’ve read carries this tree’s name.'
			]
		],
		science: [
			[
				'The shade-maker',
				'Beech casts shade so deep it engineers its own forest — out-competing rivals’ seedlings while its own wait decades for a gap in the canopy.'
			]
		],
		tell: 'The word "book" is the word "beech", ten centuries on.'
	},
	{
		id: 'ash',
		name: 'Ash',
		latin: 'Fraxinus excelsior',
		co2: 20,
		colors: ['#9BC08A', '#5E8A4E'],
		key: 'compound',
		key2: 'ladder',
		hint: 'Smooth-edged leaflets; jet-black velvet buds',
		spot: [
			'Leaflets in ladder rows, edges almost smooth',
			'Unmistakable jet-black velvety buds in winter',
			'Bunches of single-wing "keys" that spin down'
		],
		folklore: [
			[
				'The world tree',
				'Yggdrasil, the tree that holds the nine Norse worlds together, was an ash. Sick children were once passed through split ash trunks, then the tree was bound — as it healed, so would they.'
			]
		],
		science: [
			[
				'Dieback and the survivors',
				'Ash dieback may claim most of Britain’s ash — but a small percentage carry natural tolerance, and their seedlings are the recovery plan.'
			]
		],
		tell: 'The Norse universe hung on the branches of an ash tree.'
	},
	{
		id: 'holly',
		name: 'Holly',
		latin: 'Ilex aquifolium',
		co2: 8,
		colors: ['#2E6B3A', '#1C4A26'],
		key: 'simple',
		key2: 'spiny',
		hint: 'Glossy evergreen, spiny below, smooth up high',
		spot: [
			'Glossy evergreen leaves, spiny on low branches',
			'Higher leaves are often smooth-edged',
			'Red berries on female trees only'
		],
		folklore: [
			[
				'The midwinter guest',
				'Holly came indoors at midwinter centuries before Christmas trees — protection through the darkest nights. Felling a whole holly was unlucky; a hedgerow holly was left standing when everything else was cut.'
			]
		],
		science: [
			[
				'Armoured where it matters',
				'Holly grows spiny leaves only where browsing mouths can reach — the same tree grows smooth leaves higher up. Botanists call it heterophylly; the holly calls it economics.'
			]
		],
		tell: 'Holly only bothers being spiky as high as a deer can reach.'
	},
	{
		id: 'yew',
		name: 'Yew',
		latin: 'Taxus baccata',
		co2: 15,
		colors: ['#3E5C3E', '#26402A'],
		key: 'needle',
		key2: 'flat',
		hint: 'Flat dark needles in two rows; red arils',
		spot: [
			'Flat, dark needles in two neat rows',
			'Red berry-like arils (the only non-toxic part)',
			'Fluted, hollow trunks of great age'
		],
		folklore: [
			[
				'Older than the church',
				'Many churchyard yews pre-date their churches by centuries — the church was built beside the sacred tree, not the other way round. Some may be 2,000 years old.'
			]
		],
		science: [
			[
				'The chemotherapy tree',
				'Paclitaxel (Taxol), one of the most-used cancer drugs in the world, was developed from yew. Clippings from ordinary hedges have gone to make it.'
			]
		],
		tell: 'A hedge clipping of yew can end up in a chemotherapy drip.'
	},
	{
		id: 'pine',
		name: 'Scots pine',
		latin: 'Pinus sylvestris',
		co2: 22,
		colors: ['#6E9B6B', '#3E6B4A'],
		key: 'needle',
		key2: 'paired',
		hint: 'Long blue-green needles in pairs; orange upper bark',
		spot: [
			'Needles in pairs, slightly twisted, blue-green',
			'Upper trunk glows orange-red',
			'Britain’s only native pine'
		],
		folklore: [
			[
				'The waymark',
				'Lone Scots pines were planted as waymarks for drovers and, some say, to mark safe houses and burial grounds — a signpost you could read from a valley away.'
			]
		],
		science: [
			[
				'Two needles, one propeller',
				'Each pair of twisted needles sheds rain, shakes snow and stirs the air around the shoot — a design so good it barely changed in 100 million years.'
			]
		],
		tell: 'Lone pines on hilltops are often 300-year-old road signs.'
	},
	{
		id: 'hawthorn',
		name: 'Hawthorn',
		latin: 'Crataegus monogyna',
		co2: 9,
		colors: ['#A4B85C', '#6B8A34'],
		key: 'lobed',
		key2: 'cut',
		hint: 'Small, deeply cut leaves; May blossom; thorns',
		spot: [
			'Small leaves, deeply cut into lobes',
			'Masses of white "may" blossom in spring',
			'Long thorns; dense, twisted growth'
		],
		folklore: [
			[
				'The fairy tree',
				'A lone hawthorn in a field is a fairy tree — cutting one still gets contractors in trouble in Ireland. And may blossom must never come indoors.'
			]
		],
		science: [
			[
				'The reason for the rule',
				'May blossom releases trimethylamine — a faint note of decay. The superstition against bringing it inside has a molecular basis; to spring flies, it smells like lunch.'
			]
		],
		tell: 'The "never bring may blossom indoors" rule is real chemistry.'
	},
	{
		id: 'chestnut',
		name: 'Horse chestnut',
		latin: 'Aesculus hippocastanum',
		co2: 24,
		colors: ['#8FAF52', '#567F2E'],
		key: 'compound',
		key2: 'fan',
		hint: 'Fan of 5–7 big leaflets; conkers in autumn',
		spot: [
			'Huge leaves — a fan of 5–7 leaflets from one point',
			'White "candle" flower spikes in May',
			'Spiky green cases hiding conkers'
		],
		folklore: [
			[
				'Conquerors',
				'The game was played with snail shells and hazelnuts long before chestnuts — "conker" likely comes from "conqueror". The first recorded conkers match: Isle of Wight, 1848.'
			]
		],
		science: [
			[
				'Not a chestnut at all',
				'Horse chestnuts arrived from the Balkans in the 1600s and are no relation to sweet chestnuts — conkers are packed with soap-like saponins, which is why nothing eats them.'
			]
		],
		tell: 'Conkers was first played with snail shells — the chestnut came later.'
	},
	{
		id: 'sycamore',
		name: 'Sycamore',
		latin: 'Acer pseudoplatanus',
		co2: 26,
		colors: ['#7FA85A', '#4E7A36'],
		key: 'lobed',
		key2: 'hand',
		hint: 'Hand-shaped five-pointed leaves; helicopter seeds',
		spot: [
			'Large five-lobed leaves like an open hand',
			'Winged seeds in pairs — the "helicopters"',
			'Bark flakes into squares with age'
		],
		folklore: [
			[
				'The meeting tree',
				'Sycamores mark meeting places — preachers’ trees, market trees, the Tolpuddle Martyrs’ tree where farm workers founded a union under the branches in 1834.'
			]
		],
		science: [
			[
				'Nature’s helicopter',
				'A sycamore seed autorotates as it falls, cutting its descent speed enough to ride the wind. Engineers studying drone descent still copy its wing.'
			]
		],
		tell: 'Drone engineers still study how sycamore seeds fall.'
	},
	{
		id: 'elder',
		name: 'Elder',
		latin: 'Sambucus nigra',
		co2: 7,
		colors: ['#93A85E', '#5E7A3A'],
		key: 'compound',
		key2: 'ladder',
		hint: 'Ladder leaflets with a strong smell; flat cream flowers',
		spot: [
			'5–7 toothed leaflets; leaves smell odd when crushed',
			'Flat plates of cream flowers in June',
			'Berries hang in dark purple sprays'
		],
		folklore: [
			[
				'The Elder Mother',
				'You asked the Elder Mother’s leave before cutting her tree, or trouble followed. Elder guarded the dairy, and an elder wand — as any Harry Potter reader knows — was not to be trifled with.'
			]
		],
		science: [
			[
				'The fire tree',
				'Elder stems are hollow — medieval kitchens used them to blow life into embers. The name may come from Anglo-Saxon "aeld", fire.'
			]
		],
		tell: 'Elder’s hollow stems were the medieval fire-blower — its name may literally mean "fire tree".'
	}
];

export const speciesById = (id: string): Species | undefined => SPECIES.find((s) => s.id === id);
