import type { Species } from './types';

/** Batch G: the ten that take the guide to fifty. Mostly the planted trees —
 *  the conifers of forestry and the Victorian lawn, the street and park trees —
 *  which people meet constantly and can rarely name. */
export const SPECIES_G: Species[] = [
	{
		id: 'sitka-spruce',
		name: 'Sitka spruce',
		latin: 'Picea sitchensis',
		aka: ['silver spruce', 'tideland spruce'],
		family: 'Pinaceae (pine family)',
		co2: 24,
		colors: ['#9FB6AC', '#4A6A5C'],
		key: 'needle',
		key2: 'spiky',
		hint: 'Needles sharp enough to hurt, with two chalky-blue bands beneath',
		quick: [
			['Height', 'To 55 m in Britain — among the tallest trees here'],
			['Lifespan', '300 years or more, though felled at 40–60'],
			['Status', 'Introduced 1831; the mainstay of British forestry'],
			['Where', 'Upland plantations on wet, acid ground — Scotland, Wales, northern England'],
			['Note', 'By area, the most planted forest tree in Britain']
		],
		spot: [
			'Take hold of a shoot. Sitka needles are **stiff, flattened and genuinely sharp** — the grab test hurts, and that alone separates it from Norway spruce, whose four-sided needles are blunter and kinder.',
			'Turn a needle over. There are **two chalky blue-white bands** of stomata underneath, which give a whole hillside of Sitka its cold, silvered cast on a bright day.',
			'Cones are papery and pale brown, 5–10 cm, with crinkled, wavy-edged scales. Norway spruce cones are much longer, 10–18 cm, with smooth stiff scales — the difference is obvious once you have held both.',
			'Pull a needle off and look at the twig: spruces leave a small raised peg behind, so an old shoot feels rough and knobbly. Firs leave a flat round scar and stay smooth.',
			'Bark is purplish grey, flaking away in thin rounded plates like scattered coins, and the whole tree gives off a sharp resinous smell that hangs over a plantation on a warm day.',
			'Habitat is the strongest hint of all. Rank on rank of dark, even-aged conifer on a wet upland slope, with almost nothing growing beneath, is Sitka until proved otherwise.'
		],
		season: [
			['Spring', 'New shoots break in bright acid green against the near-black of last year, the one moment a plantation looks soft.'],
			['Summer', 'Dense shade and deep needle litter; little grows below except moss where light breaks through.'],
			['Autumn', 'Cones ripen and hang down from the upper crown; goldcrests and crossbills work the tops.'],
			['Winter', 'Evergreen and unchanged — the tree that keeps the uplands dark all year.']
		],
		folklore: [
			[
				'A tree with a policy, not a legend',
				'Sitka has no British folklore, because it has only been here since 1831 and only mattered since 1919. The First World War consumed timber at a rate the country could not meet — pit props, trench boards, sleepers — and the Forestry Commission was created to make sure it never happened again. Sitka was the answer: it grew faster on poor wet upland than anything native. Tax reliefs in the 1970s and 1980s drove planting onto the deep peat of the Flow Country in Caithness and Sutherland, one of the largest blanket bogs in the world, and the resulting fight between forestry and conservation changed British land policy. Some of those plantations are now being felled and the bog deliberately restored. It is a young tree with a very loud recent history.'
			]
		],
		science: [
			[
				'Why this tree, on these hills',
				'Sitka spruce comes from the Pacific fog belt running from Alaska down to northern California — cool, wet, maritime, with mild winters. That is a close match for upland Britain, which is why it produces more timber per hectare per year here than any alternative. The wood has an exceptional strength-to-weight ratio: it framed early aircraft, including the de Havilland Mosquito, and straight-grained pieces are still cut for guitar and piano soundboards. The carbon argument is genuinely two-sided. A growing plantation locks up carbon fast, but ploughing and draining deep peat to establish one can release more than the trees recover for decades, which is why planting on deep peat is now restricted.'
			]
		],
		tell: 'Grab a spruce shoot — if it hurts, it is Sitka.'
	},
	{
		id: 'common-lime',
		name: 'Common lime',
		latin: 'Tilia × europaea',
		aka: ['European lime', 'linden'],
		family: 'Malvaceae (mallow family)',
		co2: 23,
		colors: ['#CFD98A', '#7C9440'],
		key: 'simple',
		key2: 'heart',
		hint: 'Shaggy burrs of sprouts round the base; sticky honeydew beneath',
		quick: [
			['Height', 'To 40 m — often the tallest broadleaf in a British town'],
			['Lifespan', '200–500 years'],
			['Status', 'Hybrid of small-leaved and large-leaved lime; planted everywhere'],
			['Where', 'Avenues, parks, churchyards, city streets'],
			['Note', 'The lime of the great avenue plantings, not the woodland lime']
		],
		spot: [
			'Look at the bottom of the trunk first. Common lime grows **dense burrs and thickets of twiggy sprouts around its base**, as though it is wearing bushy trousers. Nothing else common does this so reliably.',
			'Leaves are heart-shaped and lopsided at the base, 6–10 cm, sharply toothed, with a long drip tip; turn one over and the vein angles carry tufts of whitish hairs, where small-leaved lime has rusty ones.',
			'Turn a leaf over and find the tufts of hair where the veins fork: **whitish in common lime, rust-brown in small-leaved lime**. This is the clean separation between the two.',
			'In July it flowers in hanging clusters, each attached to a curious pale strap-shaped bract that later acts as a wing for the fruit.',
			'The ground underneath tells you before the tree does. A varnish of sticky honeydew on cars, benches and pavement, often blackened with sooty mould, means a lime is overhead.',
			'Bark is grey and shallowly ridged; twigs are reddish and zigzag between the buds, and the base of an old trunk is usually a dense thicket of sprouting shoots and burrs, which is the quickest way to name a common lime in an avenue.'
		],
		season: [
			['Spring', 'Late into leaf, then very fast; the fresh growth is a pale yellow-green.'],
			['Summer', 'Flowers in July with a heavy honey scent, and the tree roars with bees for a fortnight.'],
			['Autumn', 'Clear butter yellow, dropping early and leaving winged fruits hanging on.'],
			['Winter', 'The burry base and the red zigzag twigs identify it with no leaves at all.']
		],
		folklore: [
			[
				'The tree you stood under to be judged',
				'Across Germanic Europe the lime was the tree of the village assembly. Courts sat beneath the Gerichtslinde, the judgment lime, on the reasoning that no one could lie in its shade; villages were laid out around one and some of those trees still stand. Berlin’s great avenue, Unter den Linden, means simply "under the limes". In Britain the lime became the avenue tree of the seventeenth and eighteenth-century estate, planted in long formal double rows to draw the eye to a house. The inner bark had a practical life too: soaked and stripped into fibre, it made bast, the rope and matting whose name survives in the word bass for a woven mat.'
			]
		],
		science: [
			[
				'The stickiness is the point',
				'The honeydew is not sap from the tree. Aphids feed on phloem, which is rich in sugar but poor in the amino acids they need, so they must pump enormous volumes through themselves and excrete the surplus sugar as a fine rain. That rain feeds ants, wasps, hoverflies and, indirectly, the birds that eat them, and it grows the sooty mould that blackens everything below. A mature lime in July is one of the most productive insect feeding stations in a British town. The tree itself is a hybrid of small-leaved and large-leaved lime, and it inherits vigour from both, which is why it outgrows either parent and why it is the one that got planted.'
			]
		],
		tell: 'The film on your car under a lime is aphid honeydew — sugar the tree made, drunk and passed straight through.'
	},
	{
		id: 'crack-willow',
		name: 'Crack willow',
		latin: 'Salix × fragilis',
		aka: ['brittle willow'],
		family: 'Salicaceae (willow family)',
		co2: 15,
		colors: ['#A8BF7E', '#5C7B3A'],
		key: 'simple',
		key2: 'narrow',
		hint: 'Twigs snap off with an audible crack, then root where they land',
		quick: [
			['Height', 'To 25 m, usually broader and more collapsed than tall'],
			['Lifespan', '60–100 years, often splitting apart sooner'],
			['Status', 'Long naturalised; now usually treated as a hybrid'],
			['Where', 'Riverbanks, ditches, wet meadows, pond edges'],
			['Note', 'The commonest big waterside willow in lowland Britain']
		],
		spot: [
			'Do the test the tree is named for. Bend a young twig sharply where it joins the branch: it **snaps clean off with a distinct crack**, as though it were designed to. White willow bends and resists.',
			'Leaves are long and narrow, finely toothed, glossy green above and merely paler beneath — not the silvery, silky white of white willow.',
			'The shape is usually a wreck, and characteristically so: a leaning trunk, a split crown, torn limbs and half the tree lying in the water still growing.',
			'Very often pollarded, leaving a fat swollen bolling at head height with a crown of straight poles rising from it — a shape that keeps a riverside willow standing far longer than an unmanaged one.',
			'Look downstream. A line of similar willows spaced along one bank is frequently one tree many times over, grown from washed-up fragments.',
			'Twigs are olive to orange-brown and shine after rain; buds are pressed flat to the shoot, and a twig snapped at the base comes away with an audible crack, which is where the name comes from.'
		],
		season: [
			['Spring', 'Catkins open with the leaves, an important early nectar and pollen source for bees.'],
			['Summer', 'Heavy green shade over water, and the constant drift of broken twigs downstream.'],
			['Autumn', 'Dull yellow and early to drop; the leaf fall feeds the invertebrates of the stream bed.'],
			['Winter', 'Pollard heads and orange twig thickets stand out along every ditch and river.']
		],
		folklore: [
			[
				'The tree that was harvested, not felled',
				'Waterside willows were among the hardest-worked trees in the English landscape, and pollarding is why so many survive as grotesques. Cut above the browsing height of cattle, a willow throws up a crop of straight poles every few years, indefinitely — fencing, hurdles, rake handles, firewood. The pollard is therefore not a damaged tree but a managed one, and the swollen head is a record of centuries of cutting. One famous willow product is not this tree, though: cricket bats are cut from a particular variety of white willow, Salix alba var. caerulea, grown in rows on East Anglian farmland and felled young.'
			]
		],
		science: [
			[
				'Breaking as a way of breeding',
				'The crack is not a weakness but a dispersal mechanism. The twig has a built-in abscission zone at its base, and the clean fracture leaves a fragment that floats, lodges on a bank downstream and roots readily from the stem. A willow can therefore colonise a whole river without ever setting seed, and long stretches of bank are frequently a single clone. Willows also carry the compound that started modern pharmacology: salicin in the bark, known as a fever remedy since antiquity, was the chemical starting point for the synthesis of acetylsalicylic acid — aspirin — marketed by Bayer in 1899.'
			]
		],
		tell: 'Snap a crack willow twig and you have made a new tree — that is precisely how it spreads.'
	},
	{
		id: 'leylandii',
		name: 'Leyland cypress',
		latin: '× Cuprocyparis leylandii',
		aka: ['leylandii', 'leyland'],
		family: 'Cupressaceae (cypress family)',
		co2: 20,
		colors: ['#93B189', '#3D5C3A'],
		key: 'needle',
		key2: 'scale',
		hint: 'Flat sprays of tiny scales; a hedge that grows a metre a year',
		quick: [
			['Height', 'To 35 m if nobody stops it'],
			['Lifespan', '50–70 years in cultivation'],
			['Status', 'Accidental hybrid, first raised in Wales in 1888'],
			['Where', 'Hedges, screens, gardens, car parks — almost never woodland'],
			['Note', 'Probably the most planted and most resented tree in Britain']
		],
		spot: [
			'There are no needles. The leaves are **minute scales pressed against the shoot**, and the shoots themselves are arranged in flattened, fern-like sprays.',
			'Crush a spray and smell it. Leyland is faintly resinous and sharp; Western red cedar, which looks similar, smells strongly and unmistakably of pineapple or pear drops.',
			'Growth rate is diagnostic on its own. A metre a year is normal, and a hedge that has bolted to eight metres in a decade is almost certainly this.',
			'Cut into the brown interior and nothing happens. Leyland **will not regenerate from old bare wood**, which is why a hard reduction leaves a permanent brown wall and why hedges get abandoned rather than fixed.',
			'Cones, when they appear at all, are small, round and sparse — this is a hybrid and mostly sterile, so it spreads by being planted rather than by seeding itself into the countryside.',
			'The tell-tale planting pattern is a dead-straight line of identical trees along a boundary, because every one is a cutting.'
		],
		season: [
			['Spring', 'A flush of brighter green at the tips; this is when the year’s metre begins.'],
			['Summer', 'Dense, dry shade, and a hedge bottom where nothing grows.'],
			['Autumn', 'Little visible change beyond some interior browning as shaded foliage dies off.'],
			['Winter', 'Evergreen and wind-firm, which is exactly why it was planted, and why it now blocks the light.']
		],
		folklore: [
			[
				'The tree that made Parliament act',
				'Leylandii is the only British tree with its own legislation. As post-war suburbs filled with fast screening hedges, boundary disputes multiplied into a recognised social problem — years of correspondence, blocked light, soured streets and cases that reached the courts. Campaigners pressed for a remedy for two decades, and the result was Part 8 of the Anti-social Behaviour Act 2003, the "high hedges" provisions for England and Wales, which let a council intervene over an evergreen hedge more than two metres high that unreasonably blocks light. It is a remarkable distinction: a hybrid conifer barely a century old that changed the statute book.'
			]
		],
		science: [
			[
				'An accident between two strangers',
				'Leyland cypress is a cross between Monterey cypress and Nootka cypress — two species whose wild ranges lie several hundred miles apart on the Pacific coast of North America, and which would almost certainly never have met. They met at Leighton Hall in Powys, where both had been planted ornamentally, and the first seedlings appeared there in 1888. The hybrid inherited the Monterey parent’s speed and the Nootka parent’s hardiness, producing growth neither could manage alone. Because it rarely sets viable seed it is propagated from cuttings, so the millions of Leylandii in Britain are a handful of clones repeated endlessly — including the vigour, and the shallow, thirsty root system.'
			]
		],
		tell: 'Britain’s fastest tree is an accident from a Welsh estate in 1888, and it is the only one Parliament has passed a law about.'
	},
	{
		id: 'monkey-puzzle',
		name: 'Monkey puzzle',
		latin: 'Araucaria araucana',
		aka: ['Chile pine', 'pehuén'],
		family: 'Araucariaceae (monkey puzzle family)',
		co2: 15,
		colors: ['#84A47E', '#31502D'],
		key: 'needle',
		key2: 'plates',
		hint: 'Broad, spine-tipped leaves overlapping like armour plate',
		quick: [
			['Height', 'To 30 m here, 50 m in Chile'],
			['Lifespan', '700–1,000 years and more'],
			['Status', 'Endangered in the wild; national tree of Chile'],
			['Where', 'Victorian gardens, parks, front lawns, cemeteries'],
			['Note', 'Its family has been on Earth since the Jurassic']
		],
		spot: [
			'Nothing else in Britain looks remotely like it. The leaves are **broad, stiff, dark green triangles ending in a spine**, arranged in spirals and overlapping so completely that they clothe the branch and hide the wood.',
			'Branches come in whorls from a straight trunk and sweep upward at the tips, giving the tree a candelabra outline you can name from the far side of a park, and the lowest branches drop away with age to leave a bare column.',
			'The leaves stay put for ten to fifteen years and keep photosynthesising, so a branch is armoured along its whole length rather than only at the tip.',
			'Bark is grey and deeply wrinkled with horizontal rings, very like elephant hide, and marked all over with the scars of fallen leaves.',
			'Male and female cones grow on separate trees. Female cones are large and spherical, take two to three years, then break apart on the branch, dropping big edible seeds.',
			'Nearly every British specimen is a deliberate planting on a lawn or beside a grave — this tree never turns up by accident, so finding one tells you something about whoever owned the ground.'
		],
		season: [
			['Spring', 'New growth extends at the branch tips in a paler, softer green.'],
			['Summer', 'Male cones shed pollen; female cones swell on trees that carry them.'],
			['Autumn', 'Ripe cones disintegrate and the seeds fall — large, pale and genuinely good to eat roasted.'],
			['Winter', 'Unchanged, and at its most striking against a bare winter sky.']
		],
		folklore: [
			[
				'Pocketed at a dinner party',
				'Monkey puzzles reached Britain by theft, more or less. In 1795 Archibald Menzies, surgeon and naturalist aboard HMS Discovery, was served the seeds as a dessert at a dinner with the Spanish Governor of Chile. He put some in his pocket, sowed them on the voyage home and landed five living plants. The Victorians adored the result and planted it as a badge of wealth and reach. The name is traditionally traced to Pencarrow in Cornwall around 1850, where a guest is said to have remarked that climbing it would puzzle a monkey — the phrase stuck, despite there being no monkeys anywhere near its native range. In Chile it is the pehuén, sacred to the Pehuenche, whose name means people of the araucaria and whose staple food was its seed.'
			]
		],
		science: [
			[
				'Armour against something long gone',
				'The Araucariaceae go back to the Jurassic, and monkey puzzle is close to unchanged from fossils far older than any flowering tree. The obvious question is what all that armour is for, since nothing in modern Chile browses a mature araucaria. The usual explanation is that the spines evolved against very large herbivores that no longer exist — plausible, but hard to prove, and worth treating as a good hypothesis rather than a fact. What is certain is that the thick bark is a fire adaptation, letting mature trees survive the volcanic slopes they grow on. It is listed as Endangered: logging, fire and grazing have reduced the Chilean and Argentinian forests severely, and there are now a great many more monkey puzzles in British gardens than most people realise.'
			]
		],
		tell: 'The first monkey puzzles in Britain grew from seeds a ship’s surgeon pocketed at a dinner in Chile in 1795.'
	},
	{
		id: 'giant-redwood',
		name: 'Giant redwood',
		latin: 'Sequoiadendron giganteum',
		aka: ['wellingtonia', 'giant sequoia', 'big tree'],
		family: 'Cupressaceae (cypress family)',
		co2: 40,
		colors: ['#A5B584', '#5D6E40'],
		key: 'needle',
		key2: 'scale',
		hint: 'Thick spongy red bark you can press your fist into; a spire above everything',
		quick: [
			['Height', 'Over 50 m in Britain already; to 95 m in California'],
			['Lifespan', '3,000 years and more'],
			['Status', 'Introduced 1853; Endangered in its native groves'],
			['Where', 'Victorian estate avenues, parks, churchyards, arboreta'],
			['Note', 'By volume, the largest living thing on Earth']
		],
		spot: [
			'Push a fist gently into the trunk. The bark is **thick, fibrous, deep red-brown and genuinely spongy** — it gives, and it does not hurt. No other large British tree does this.',
			'Leaves are small, awl-shaped scales spiralling right round the shoot and pressed close to it, blue-green and slightly prickly to a sliding hand.',
			'The outline is a tall, tapering spire with a broad buttressed base, and it is very often the tallest thing for miles, which is exactly why Victorian landowners planted them as statements.',
			'Cones are absurdly small for the tree — barely 5–7 cm, egg-shaped, and they can stay green and closed on the branch for years.',
			'Do not confuse it with coast redwood, whose leaves are flat, yew-like and set in two neat rows either side of the shoot; giant redwood’s are short, scale-like awls that spiral right around it.',
			'Look for it in a line. Victorian landowners planted redwood avenues, so a row of enormous spires along a drive is the signature planting.'
		],
		season: [
			['Spring', 'Pollen released from the shoot tips in quantity; new growth barely alters the outline.'],
			['Summer', 'Unchanged — the tree operates on a scale where a season is nothing.'],
			['Autumn', 'Older interior foliage browns and sheds; some cones ripen after two years.'],
			['Winter', 'Snow shows off the spire, and the red bark is at its most vivid in low sun.']
		],
		folklore: [
			[
				'Named for a duke, planted for the view',
				'Seed reached Britain in 1853, the year after the Duke of Wellington died, and the British botanist John Lindley promptly named it Wellingtonia gigantea in his honour. American botanists were unimpressed and countered with Washingtonia. Neither name survived the rules of scientific priority, but Wellingtonia stuck fast in British usage and is still what most people call it. Landowners planted it down drives and along ridgelines as a straightforward display of wealth and imperial confidence, which is why the species is so strongly associated with country houses, and why so many British specimens are almost exactly the same age.'
			]
		],
		science: [
			[
				'Built for fire',
				'Almost everything odd about this tree is a fire adaptation. The bark is up to 60 cm thick, soft, fibrous and low in resin, so it chars rather than burns and insulates the living tissue beneath. The cones are serotinous: heat dries and opens them, releasing seed onto the ash bed that fire has just cleared of competitors. A century of fire suppression in the Sierra Nevada therefore did the groves no favours, allowing dense understorey to build up, and the extreme fires of 2020 and 2021 killed a substantial proportion of the large mature trees — a serious loss in a population of only around 80,000. British trees, planted since 1853, are seedlings by comparison, and research published in 2024 suggested the UK may now hold several times more giant redwoods than the native range does.'
			]
		],
		tell: 'Press your fist into a Wellingtonia — the bark is so thick and spongy it doesn’t hurt, and that is fireproofing.'
	},
	{
		id: 'cedar-of-lebanon',
		name: 'Cedar of Lebanon',
		latin: 'Cedrus libani',
		aka: ['cedar'],
		family: 'Pinaceae (pine family)',
		co2: 25,
		colors: ['#96AB8E', '#425A44'],
		key: 'needle',
		key2: 'rosette',
		hint: 'Massive level limbs holding flat tiers of foliage; needles in tufts',
		quick: [
			['Height', 'To 35 m, and often as wide as it is tall'],
			['Lifespan', '1,000 years and more'],
			['Status', 'Introduced in the 1600s; Vulnerable in its native range'],
			['Where', 'Country house lawns, parkland, churchyards, cemeteries'],
			['Note', 'The classic tree of the English landscape park']
		],
		spot: [
			'Read the silhouette. Cedar of Lebanon holds **huge horizontal branches carrying flat, table-like plates of foliage in distinct tiers** — a stack of dark green shelves, unmistakable at half a mile.',
			'Needles are short, 2–3 cm, dark green and stiff, borne in dense rosettes of thirty or more on woody short spurs, with a few singly along new shoots.',
			'Cones sit upright on the branch like small barrels, take two years to ripen, and then fall apart on the tree rather than dropping whole.',
			'The trunk very often forks low into several massive vertical stems, so an old cedar reads as a group rather than a single tree.',
			'Separate it from its relatives by branch direction: **Lebanon is level, Atlas ascends, Deodar droops** — including the leading shoot at the very top, which is the quickest check of the three.',
			'Bark is dark grey-brown, cracking into short scaly ridges on old trunks, and the lower limbs are often as thick as the trunk itself because the tree spreads outwards rather than upwards once mature.'
		],
		season: [
			['Spring', 'Little change; last year’s cones continue to swell.'],
			['Summer', 'Deep, dry shade beneath the tiers, and a resinous smell on hot days.'],
			['Autumn', 'This is when cedars flower — male cones shed clouds of pollen in September and October.'],
			['Winter', 'The architecture is at its best, and heavy snow sitting on the flat tiers is the classic image.']
		],
		folklore: [
			[
				'The most written-about tree in the ancient world',
				'The cedar forests of Lebanon are among the oldest recorded resources in human history. The Epic of Gilgamesh turns on a journey to the Cedar Forest and the killing of its guardian; the Hebrew Bible names the cedar dozens of times, and Solomon’s Temple was built with timber shipped from Tyre. Egyptians used cedar resin in embalming and its rot-resistant wood for ships. Millennia of that demand left only fragments, and the surviving groves at Bsharri — the Cedars of God — are a UNESCO World Heritage Site. The tree still stands at the centre of the Lebanese flag. In Britain it arrived in the seventeenth century and was seized on by landscape designers, who used its dark horizontal mass to set off the pale geometry of a classical house.'
			]
		],
		science: [
			[
				'Rot-proof, and running out of mountain',
				'Cedarwood is rich in aromatic oils that deter insects and resist fungal decay, which is exactly why it was worth shipping across the ancient Mediterranean for temples, coffins and boats, and why cedar chests still keep moths out of blankets. The species is now classed as Vulnerable. Its native range is a narrow altitude band in the mountains of Lebanon, Syria and Turkey, and a warming climate is pushing the zone it can tolerate upslope, where there is progressively less mountain to move on to; heavy goat browsing has meanwhile suppressed natural regeneration for centuries. There is an irony in the other direction: because it copes well with heat and drought, cedar of Lebanon is increasingly recommended for British planting as our own climate shifts.'
			]
		],
		tell: 'Level branches mean Lebanon, ascending means Atlas, drooping means Deodar.'
	},
	{
		id: 'weeping-willow',
		name: 'Weeping willow',
		latin: 'Salix × sepulcralis',
		aka: ['golden weeping willow'],
		family: 'Salicaceae (willow family)',
		co2: 16,
		colors: ['#CBD884', '#7A9440'],
		key: 'simple',
		key2: 'narrow',
		hint: 'Curtains of yellow shoots hanging to the water; always planted',
		quick: [
			['Height', 'To 20 m, usually wider than it is tall'],
			['Lifespan', '40–80 years — short, for a tree this size'],
			['Status', 'Hybrid, planted; never truly wild here'],
			['Where', 'Park lakes, riverside gardens, village ponds'],
			['Note', 'Probably the most recognisable tree outline in the world']
		],
		spot: [
			'Nothing else weeps like this. Long **yellow-green shoots hang dead vertical**, frequently to the ground or into the water, from branches that themselves arch outward.',
			'The colour of the twigs is the second check: a warm yellow, brightest in late winter, which is where the usual form gets its name, ‘Chrysocoma’, golden-haired.',
			'Leaves are narrow, 8–16 cm, finely toothed and tapering to a long point, dull green above and paler beneath, hanging from twigs so pendulous that they often trail into the water beneath.',
			'It is short-lived and structurally weak. Big limbs tear out, trunks split, and a mature weeping willow is usually carrying several old wounds.',
			'It is essentially always a planting, and nearly always beside water, because that is where people put it — a weeping willow far from a pond or river is the exception rather than the rule.',
			'The common British tree is a hybrid of white willow and the Chinese willow, so it will not match either parent exactly, and every specimen was struck from a cutting rather than grown from seed.'
		],
		season: [
			['Spring', 'Among the very first large trees to green up, in a startling pale acid yellow-green.'],
			['Summer', 'Full curtains, deep shade on the water and a distinctive movement in any breeze.'],
			['Autumn', 'Dull yellow and late to drop, often holding leaves into December.'],
			['Winter', 'Bare, and at its best — the hanging yellow twig curtain catches low sun.']
		],
		folklore: [
			[
				'Named after somebody else’s mistake',
				'"By the rivers of Babylon... we hanged our harps upon the willows" gave this tree its Latin name, Salix babylonica, when Linnaeus described it. The tree is Chinese, not Babylonian, and the plant in the psalm was most likely a poplar of the Euphrates. The association stuck anyway, and the weeping willow became the standard emblem of mourning on eighteenth and nineteenth-century gravestones and mourning jewellery, which is where the hybrid’s name sepulcralis comes from. A willow growing over Napoleon’s grave on St Helena became a relic in its own right, with cuttings taken by visitors and distributed around the world.'
			]
		],
		science: [
			[
				'A thirst with consequences',
				'Willows transpire prodigiously, and weeping willow is planted beside water because that is the only place it can sustain the habit. The same appetite makes its roots aggressively opportunistic: they follow moisture gradients and are notorious for finding and entering drains, soakaways and old clay pipework, which is why planting guidance keeps them well away from buildings. That thirst is also useful, and willows are widely used in phytoremediation, drawing water and dissolved contaminants out of polluted ground. Like most cultivated willows it is grown from cuttings and roots almost too easily, so the trees you see are close to genetically identical.'
			]
		],
		tell: 'The willow of "By the rivers of Babylon" was almost certainly a poplar — Linnaeus named this tree after a misreading.'
	},
	{
		id: 'lombardy-poplar',
		name: 'Lombardy poplar',
		latin: 'Populus nigra ‘Italica’',
		aka: ['Italian poplar'],
		family: 'Salicaceae (willow family)',
		co2: 18,
		colors: ['#BACB7E', '#6B8740'],
		key: 'simple',
		key2: 'heart',
		hint: 'A green exclamation mark — every branch held vertically against the trunk',
		quick: [
			['Height', 'To 30 m, but only 3–5 m across'],
			['Lifespan', '50–70 years'],
			['Status', 'A single male clone of black poplar; here since 1758'],
			['Where', 'Field boundaries, windbreaks, avenues, roadsides'],
			['Note', 'Planted for shelter and for the line it draws on a flat horizon']
		],
		spot: [
			'The shape settles it instantly and from any distance: an **extreme narrow column**, because every branch sweeps up almost parallel to the trunk instead of spreading.',
			'Leaves are triangular to diamond-shaped with fine, rounded teeth, on **flattened stalks** — which is why the whole tree hisses and flickers in the lightest wind.',
			'Every Lombardy poplar in Britain is male. There are red catkins in spring but never any of the cottony seed fluff that female poplars produce.',
			'It is short-lived and gets shabby: dead tops, shed limbs and bacterial canker are all normal in middle age, which is why so many are felled long before they look genuinely old.',
			'It is nearly always in a straight line or a tight group, because it was planted for shelter or for show rather than for itself — most often along a boundary, a drive or a motorway embankment.',
			'Compare it with black poplar, its own parent species — massive, leaning, broad-crowned and covered in burrs. Same species, opposite silhouette.'
		],
		season: [
			['Spring', 'Crimson male catkins appear before the leaves, then drop in quantity onto the road below.'],
			['Summer', 'The sound is the point — a continuous dry rustle audible well before you reach the tree.'],
			['Autumn', 'Yellow, and late; the column turns from the outside inward.'],
			['Winter', 'A bare vertical stroke on the skyline, identifiable from a train at speed.']
		],
		folklore: [
			[
				'One tree, planted a million times',
				'The Lombardy poplar is a sport — a chance mutation of ordinary black poplar noticed in Lombardy around 1700 — and every one since has been propagated from cuttings of that find. It reached Britain in 1758, brought from Turin by Lord Rochford, and spread across Europe as the emblem of formal landscape and straight roads. In revolutionary France it became a tree of Liberty, planted in town squares partly on the pun between peuplier and peuple, and Napoleon had avenues of it set along military roads for shade. In lowland England it became the field-boundary tree of the flat eastern counties, drawing lines across a landscape that had none.'
			]
		],
		science: [
			[
				'The flutter and the frailty',
				'The flattened leaf stalk is the same trick aspen uses. A petiole flattened at right angles to the blade lets the leaf twist and spill wind rather than resist it, which reduces drag on the whole crown and produces the characteristic restless sound. The narrow fastigiate habit is genetic, caused by branches held at a very acute angle, and it is the entire reason the tree was propagated. The catch is that a clone is a single genotype: every Lombardy poplar shares the same susceptibilities, which is why poplar canker moves through plantings so efficiently and why the tree is now much less planted than it was.'
			]
		],
		tell: 'Every Lombardy poplar is a cutting of one male tree found in Italy around 1700 — a single tree, planted a million times.'
	},
	{
		id: 'ornamental-cherry',
		name: 'Ornamental cherry',
		latin: 'Prunus ‘Kanzan’',
		aka: ['Japanese flowering cherry', 'Kanzan', 'sakura'],
		family: 'Rosaceae (rose family)',
		co2: 12,
		colors: ['#EDB9C6', '#B76A86'],
		key: 'simple',
		key2: 'toothed',
		hint: 'Fat double pink pom-poms in April, with bronze young leaves',
		quick: [
			['Height', '8–12 m'],
			['Lifespan', '30–50 years'],
			['Status', 'Japanese cultivar; the standard British street cherry'],
			['Where', 'Suburban streets, parks, front gardens, verges'],
			['Note', 'Sterile — the flowers are for show and set almost no fruit']
		],
		spot: [
			'The blossom is unmistakable: **very double, twenty or more petals, deep pink**, hanging in tight heavy clusters rather than the open sprays of a wild cherry.',
			'The young leaves open with the flowers and are a **coppery bronze**, which sets off the pink and is the fastest way to name the cultivar.',
			'Wild cherry, by contrast, has single white flowers with five petals and green young leaves — once you know that, the two never look alike again.',
			'Young trees have a stiff, upswept, vase-shaped crown that flattens and spreads with age, so a young street cherry and an old garden one can look like different trees entirely.',
			'Bark is glossy red-brown with prominent horizontal bands of breathing pores, the family signature shared with every other cherry.',
			'Look at the base for suckers that do not match the tree above. It is grafted onto a wild cherry rootstock, and the rootstock sometimes has other ideas.'
		],
		season: [
			['Spring', 'A fortnight of extraordinary pink in April, then a pavement of fallen petals.'],
			['Summer', 'Unremarkable green, with toothed, tapering leaves and no fruit to speak of.'],
			['Autumn', 'Genuinely good colour — orange, amber and red before an early fall.'],
			['Winter', 'Banded bark and a stiff, angular branch structure.']
		],
		folklore: [
			[
				'The Englishman who gave Japan a cherry back',
				'The Japanese flowering cherries are not wild species but sato-zakura, village cherries — ancient cultivated hybrids selected over centuries for blossom, and central to hanami, the practice of gathering to watch them flower. Collingwood Ingram, an English ornithologist turned cherry obsessive, collected cultivars in the 1920s and grew them in Kent. On a visit to Japan he was shown a painting of Taihaku, the great white cherry, and told it was extinct there; he realised he had it growing in his own garden and, after several failed attempts, succeeded in returning it to Japan in 1932. ‘Kanzan’ meanwhile became the workhorse of British post-war street planting, which is why so many ordinary roads put on a spectacular fortnight every April.'
			]
		],
		science: [
			[
				'Petals instead of stamens, and a 1,200-year record',
				'A double flower is not simply a flower with more petals. In cultivars like ‘Kanzan’ the stamens have been converted into petal tissue, so the display is built out of the reproductive organs themselves — which is why the tree sets almost no fruit and must be propagated by grafting. Beauty is bought with fertility. Cherry blossom also supplies one of the longest biological records anywhere: the dates of the Kyoto flowering festival have been noted in court diaries and temple records for over 1,200 years, and that series shows a clear recent shift towards earlier flowering, with some of the earliest dates ever recorded falling in the last few decades. It is the same measurement you are making when you note first flower on your own tree.'
			]
		],
		tell: 'A double cherry blossom is a flower that traded its stamens for petals — display in exchange for fruit.'
	}
];
