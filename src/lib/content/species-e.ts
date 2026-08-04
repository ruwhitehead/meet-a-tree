import type { Species } from './types';

/** Batch E: conifers, town trees and the ones worth knowing. */
export const SPECIES_E: Species[] = [
	{
		id: 'larch',
		name: 'European larch',
		latin: 'Larix decidua',
		aka: ['common larch'],
		family: 'Pinaceae (pine family)',
		co2: 18,
		colors: ['#C6CE72', '#8A9B3E'],
		key: 'needle',
		key2: 'rosette',
		hint: 'Soft needles in rosettes; a conifer that turns gold and drops',
		quick: [
			['Height', 'Up to 45 m'],
			['Lifespan', '150–250 years'],
			['Status', 'Introduced (1620s); widely planted in forestry'],
			['Where', 'Plantations, upland estates, shelterbelts'],
			['Note', 'Our commonest deciduous conifer']
		],
		spot: [
			'A conifer with **soft needles that fall in winter** — if you find a bare "dead" conifer in January covered in small cones, it is a larch and it is fine.',
			'Needles are light green, soft to the touch, 2–4 cm, arranged in dense rosettes of 30 to 40 on short woody knobs along the twig, with single needles on the current year’s growth.',
			'Cones are small (2–4 cm), upright, egg-shaped, with scales that stay closed at the tip; they remain on the twigs for years, blackening with age.',
			'Spring shoots carry small crimson-pink female flowers, sometimes called larch roses, which are one of the prettiest things in a March plantation.',
			'The crown is conical and open with distinctly drooping branch tips and a pale, airy look — quite unlike the dense dark mass of spruce.',
			'Japanese larch has broader, greyer needles and cones with scales turned back like a rosette; the hybrid Dunkeld larch is intermediate and very widely planted.'
		],
		season: [
			['Spring', 'Vivid fresh green needle rosettes with crimson female cones — the most cheerful thing in a conifer wood.'],
			['Summer', 'Light, airy pale-green canopy that lets ground flora survive beneath, unlike spruce.'],
			['Autumn', 'Clear butter-gold, then needle fall — the only common conifer that does this in Britain.'],
			['Winter', 'Bare, twiggy, apparently dead, hung with small old cones; pale grey-brown scaly bark.']
		],
		folklore: [
			[
				'The fireproof tree',
				'Alpine tradition credits larch with resisting fire, and there is something to it — larch heartwood is dense and resinous and chars rather than flaring, which is why Alpine chalets, shingles and bridges were built from it for centuries. Larch was also said to protect against enchantment, and in Alpine folklore the *Salige Fräulein*, benevolent tree-women, lived in larch woods. Its introduction to Britain in the seventeenth century, and the great larch plantings of the Dukes of Atholl at Dunkeld — reputedly 14 million trees — changed the look of Highland Perthshire.'
			]
		],
		science: [
			[
				'Why a conifer would drop its needles',
				'Being deciduous looks like a step backwards for a conifer, but at altitude it pays. Larch grows where winters are severe and the growing season short; shedding needles avoids winter desiccation and snow loading, and building cheap, thin, soft needles each spring allows very high photosynthetic rates during a brief summer. The strategy also explains larch’s intolerance of shade and its usefulness in forestry as a fast, light-casting nurse crop. British larch now faces *Phytophthora ramorum*, which has forced large-scale felling in the south-west and Wales since 2009 — statutory plant health notices routinely require whole compartments to be cleared.'
			]
		],
		tell: 'Larch is a conifer that goes gold and drops its needles — a bare one in winter is not dead.'
	},
	{
		id: 'spruce',
		name: 'Norway spruce',
		latin: 'Picea abies',
		aka: ['Christmas tree'],
		family: 'Pinaceae (pine family)',
		co2: 20,
		colors: ['#6E9464', '#3A5F38'],
		key: 'needle',
		key2: 'spiky',
		hint: 'Sharp single needles all round the twig; hanging cones',
		quick: [
			['Height', 'Up to 40 m'],
			['Lifespan', '200–400 years'],
			['Status', 'Introduced (1500s); ubiquitous in plantations'],
			['Where', 'Forestry plantations, shelterbelts, gardens'],
			['Note', 'The traditional Christmas tree, and the tree that drops needles indoors']
		],
		spot: [
			'Needles are **single** — not in pairs or rosettes — short (1–2 cm), stiff, four-sided and sharply pointed, set all round the twig on tiny woody pegs that stay behind when a needle falls, leaving the twig rough.',
			'Cones hang downward, are long (10–18 cm), cigar-shaped and papery, and drop whole. Fir cones stand upright and disintegrate on the tree, which is the fastest way to separate the two.',
			'Bark is thin, coppery to greyish-brown, flaking in small round scales; the trunk is straight with regular whorls of branches.',
			'The outline is a narrow, dark, dense spire with branches sweeping down then curving up at the tips — the classic Christmas-tree shape, and the reason it was chosen.',
			'Sitka spruce, the great commercial timber tree of British forestry, has flatter, bluer, even sharper needles, smaller cones with crinkled scales, and is far more common in modern plantations.',
			'Crush a needle: spruce smells resinous and sharp, while Douglas fir smells sweetly of grapefruit and Nordmann fir of citrus and pine.'
		],
		season: [
			['Spring', 'Pale green new shoots at the branch tips, soft and bright against the old dark needles; red female cones stand upright before turning down.'],
			['Summer', 'Dense dark canopy with almost bare, needle-carpeted ground beneath.'],
			['Autumn', 'Cones ripen and hang down, pale brown; a good year drops them in quantity.'],
			['Winter', 'Unchanged dark spire — and, in millions of houses, indoors dropping needles on the carpet.']
		],
		folklore: [
			[
				'How the Christmas tree arrived',
				'The decorated evergreen is a German custom, recorded from the sixteenth century and popularised in Britain by Queen Charlotte and then decisively by Prince Albert, whose 1848 illustration in the *Illustrated London News* made it a national fashion within a decade. Norway spruce was the tree used, and remains the traditional choice — Trafalgar Square’s tree, given annually by the city of Oslo since 1947 in thanks for wartime support, is always a Norway spruce. Nordmann fir has largely taken over the domestic market for one reason: it holds its needles.'
			]
		],
		science: [
			[
				'The oldest clonal tree, and the resonance of wood',
				'A Norway spruce in Sweden nicknamed Old Tjikko has a root system radiocarbon-dated to around 9,550 years, making it one of the oldest known clonal organisms — the visible trunk is young, but it has regenerated from the same roots since shortly after the ice retreated. Spruce timber is also the standard soundboard wood for violins, guitars and pianos, because its strength-to-weight ratio and regular grain transmit vibration exceptionally well. The Alpine spruces cut for Stradivari’s instruments grew during the Maunder Minimum, a period of cold summers that produced unusually dense, even growth rings — one plausible contributor to their sound.'
			]
		],
		tell: 'A Norway spruce in Sweden has regrown from the same roots for about 9,500 years.'
	},
	{
		id: 'douglas-fir',
		name: 'Douglas fir',
		latin: 'Pseudotsuga menziesii',
		aka: ['Oregon pine'],
		family: 'Pinaceae (pine family)',
		co2: 26,
		colors: ['#77A06E', '#3F6640'],
		key: 'needle',
		key2: 'flat',
		hint: 'Soft flat needles smelling of grapefruit; three-pronged cones',
		quick: [
			['Height', 'Over 60 m in Britain — our tallest trees'],
			['Lifespan', '500–1,000 years in its native range'],
			['Status', 'Introduced from North America, 1827'],
			['Where', 'Plantations, Highland estates, sheltered valleys'],
			['Note', 'Britain’s tallest tree is a Douglas fir at Reelig Glen']
		],
		spot: [
			'Crush a few needles and smell them: Douglas fir gives a distinct sweet **grapefruit or tangerine** scent, which is the single best identification and delights children.',
			'Needles are soft, flat, 2–3 cm, blunt-tipped, arranged in two ranks along the twig with two pale bands beneath, and they leave a smooth twig when pulled (no woody pegs, unlike spruce).',
			'Cones are unmistakable: hanging, 5–10 cm, with distinctive **three-pronged papery bracts** sticking out between the scales, often described as mouse tails or the back legs of hiding mice.',
			'Buds are slender, sharply pointed and reddish-brown, sitting tight against the shoot — quite unlike the fat, rounded, resin-smeared buds of the true firs, and another quick way to separate the two.',
			'Bark on mature trees is thick, corky, deeply furrowed and reddish-brown, protecting against fire — very different from the smooth grey of a young tree.',
			'It is not a true fir (*Abies*) nor a hemlock, hence *Pseudotsuga*, "false hemlock" — a genus of its own, and a Victorian introduction that transformed British forestry.'
		],
		season: [
			['Spring', 'Bright apple-green new needles at the shoot tips, strongly citrus-scented, with small reddish female cones.'],
			['Summer', 'Deep green, immensely tall, casting dense shade in plantation but supporting good moss and fern flora in western glens.'],
			['Autumn', 'Cones ripen and drop, mouse-tail bracts intact — worth picking up.'],
			['Winter', 'Thick furrowed bark and a spire crown; the tallest thing in most British landscapes.']
		],
		folklore: [
			[
				'The mouse in the cone, and the man who died for it',
				'The story told to children is that the three-pronged bracts on the cone are the back legs and tail of a mouse hiding from a fire — an explanation good enough to remember the species by forever. The tree is named for David Douglas, the Scots botanist who introduced its seed to Britain in 1827 and who died in Hawaii in 1834 at 35, found in a pit trap with a wild bull; whether it was an accident has never been settled. Douglas introduced over 240 plant species to Britain, reshaping British gardens and plantations more than almost anyone.'
			]
		],
		science: [
			[
				'How tall a tree can get',
				'Douglas fir is one of the tallest tree species on earth — the record is over 100 m in North America, and Britain’s tallest tree, "Dùghall Mòr" at Reelig Glen near Inverness, is a Douglas fir over 66 m. Height is limited by hydraulics: water must be pulled up under tension through the xylem, and beyond about 120 m the column cannot resist cavitation. Douglas fir manages its extraordinary height partly by absorbing fog directly through its needles, reducing the load on the roots. Its wood, strong and straight-grained, is the standard structural timber of the Pacific Northwest and increasingly of British construction.'
			]
		],
		tell: 'Crush Douglas fir needles and they smell of grapefruit — and the cones look like hiding mice.'
	},
	{
		id: 'juniper',
		name: 'Juniper',
		latin: 'Juniperus communis',
		aka: ['common juniper'],
		family: 'Cupressaceae (cypress family)',
		co2: 5,
		colors: ['#7E9C8E', '#41604F'],
		key: 'needle',
		key2: 'prickly-three',
		hint: 'Prickly needles in threes; blue-black berries',
		quick: [
			['Height', '1–10 m; often a sprawling shrub'],
			['Lifespan', '100–200 years'],
			['Status', 'Native; one of only three native British conifers'],
			['Where', 'Chalk downland, upland heath, Highland moor, dunes'],
			['Status note', 'Declining — poor regeneration is a serious conservation concern']
		],
		spot: [
			'Needles are stiff, sharply prickly, 8–20 mm, in **whorls of three** around the twig, dark green with a single broad silvery-white band on the upper surface.',
			'Fruit is a fleshy berry-like cone, green in its first year and ripening blue-black with a waxy bloom in its second or third — so you often see both colours on one bush.',
			'Crush a berry between your fingers: the smell is unmistakably gin, because gin is flavoured with precisely this — the fastest and most memorable identification of any British conifer.',
			'Form is extremely variable: a low sprawling mat on exposed moorland, a neat column on chalk downland, a scruffy shrub in between — all the same species.',
			'It is dioecious, so only female plants carry berries; male plants shed pollen in spring and never fruit, which explains why half the junipers you find look barren.',
			'Look-alikes are cultivated conifers — most garden junipers and cypresses have scale-like adpressed leaves rather than sharp needles in threes.'
		],
		season: [
			['Spring', 'Small yellow male cones shed pollen; new growth is a softer green.'],
			['Summer', 'Green first-year berries alongside ripening blue-black ones from previous years.'],
			['Autumn', 'Berries at their best for gathering — traditionally after the first frosts.'],
			['Winter', 'Evergreen, prickly, blue-berried; the silvery needle bands show up well in low light.']
		],
		folklore: [
			[
				'Smoke, protection and gin',
				'Juniper was the great fumigant of northern Europe: burned to purify houses against plague and infection, to bless cattle at Beltane in the Highlands, and to smoke fish and meat. Juniper smoke is nearly invisible, which reputedly made it the wood of choice for illicit whisky stills. And gin exists because of it — the name descends through Dutch *genever* from Latin *juniperus*, and by law a spirit can only be called gin if juniper is the predominant flavour.'
			]
		],
		science: [
			[
				'A conifer in trouble',
				'Juniper is one of Britain’s three native conifers, with Scots pine and yew, and it is in real difficulty. Most surviving populations are old, single-sex or too widely spaced to pollinate, and seedlings are eaten by rabbits, sheep and deer before they establish — surveys have found many downland colonies with no successful regeneration for decades. The arrival of *Phytophthora austrocedri*, which kills juniper outright, has made matters worse. Conservation work now involves fencing, scarifying ground to expose bare soil for germination, and growing plants from local seed, because juniper populations are genetically distinct valley by valley.'
			]
		],
		tell: 'Gin is legally required to taste mainly of these berries — that is where the name comes from.'
	},
	{
		id: 'london-plane',
		name: 'London plane',
		latin: 'Platanus × hispanica',
		aka: ['plane tree'],
		family: 'Platanaceae (plane family)',
		co2: 30,
		colors: ['#A9BC66', '#6E8A3A'],
		key: 'lobed',
		key2: 'hand',
		hint: 'Camouflage flaking bark; bobble fruit on strings',
		quick: [
			['Height', 'Up to 44 m'],
			['Lifespan', '300+ years; the oldest British ones date from the 1680s'],
			['Status', 'Hybrid, introduced around 1650'],
			['Where', 'City streets and squares — over half of London’s big trees'],
			['Note', 'The tree that made Victorian cities habitable']
		],
		spot: [
			'Bark is the signature: it flakes off in irregular plates to leave a **camouflage patchwork** of olive, cream, grey and buff, so no two square metres look alike.',
			'Fruit hangs in spherical bristly bobbles, usually two to four on a long string, persisting all winter and breaking up into itchy fluff in spring.',
			'Leaves are large (12–25 cm), palmate with five coarsely toothed lobes, leathery and glossier than sycamore’s, with a swollen base to the leaf stalk that hides next year’s bud.',
			'Sycamore is the usual confusion: its bark flakes in small squares rather than big camouflage plates, its seeds are winged helicopters not bobbles, and its leaf lobes are separated by sharper angles.',
			'The trunk of a street plane is often heavily pollarded, producing knobbly, club-headed limbs — a management style adopted specifically to keep huge trees in narrow streets.',
			'If you are in a London square, a Parisian boulevard or an Italian piazza and the tree is enormous with jigsaw bark, it is almost certainly this hybrid.'
		],
		season: [
			['Spring', 'Late into leaf, with clusters of small greenish flowers and — for hay-fever sufferers — irritant fluff from the breaking fruit balls.'],
			['Summer', 'Dense shade over pavements; leaves stay glossy in city dust because the tree sheds bark to clean itself.'],
			['Autumn', 'Yellow-brown and late, often hanging on into December.'],
			['Winter', 'Camouflage bark at its most obvious, and rows of bobble fruit hanging on bare knobbly limbs.']
		],
		folklore: [
			[
				'The tree that survived the smoke',
				'London plane is a hybrid of oriental and American plane that appeared in Europe in the seventeenth century, and it became the defining tree of the Victorian city because it tolerated conditions that killed everything else: coal smoke, compacted soil, root confinement, hard pruning and drought. Berkeley Square’s planes, planted in 1789, are among the most valuable trees in Britain. The Cheapside plane in the City is protected by a covenant said to make it one of the most legally defended trees anywhere — and there is a persistent London story that its preservation blocks the redevelopment of the building beside it.'
			]
		],
		science: [
			[
				'How a tree cleans itself',
				'Plane thrives in polluted air by shedding its bark in plates, taking the accumulated soot, grime and blocked pores with it, and its large glossy leaves shed particulates in rain. Modern air-quality research has confirmed the practical value: street trees, planes included, measurably reduce particulate concentrations at pavement level. There is a trade-off — plane leaf litter and the fine hairs from its fruit are respiratory irritants, and "plane tree fluff" is a recognised seasonal complaint in cities from London to Rome. Massaria disease, a fungal condition that causes sudden limb drop, has become a significant management problem in British cities since the 2000s.'
			]
		],
		tell: 'Plane trees survive city air by peeling off their own bark, soot and all.'
	},
	{
		id: 'sweet-chestnut',
		name: 'Sweet chestnut',
		latin: 'Castanea sativa',
		aka: ['Spanish chestnut', 'marron'],
		family: 'Fagaceae (beech family)',
		co2: 24,
		colors: ['#B5B858', '#7F8A2E'],
		key: 'simple',
		key2: 'toothed',
		hint: 'Long saw-toothed leaves; spiny burrs of edible nuts',
		quick: [
			['Height', 'Up to 35 m'],
			['Lifespan', '500–1,000+ years'],
			['Status', 'Introduced, probably by the Romans'],
			['Where', 'Sandy acid soils, coppice woodland in Kent and Sussex, parkland'],
			['Note', 'The nuts you roast — no relation to horse chestnut']
		],
		spot: [
			'Leaves are long and narrow (10–25 cm), leathery, glossy, with a distinctive regular row of **bristle-tipped saw teeth** along each edge and prominent parallel veins ending in each tooth.',
			'Fruit cases are densely covered in fine, long, sharp spines like a green sea urchin, splitting to release two or three flattened, genuinely edible brown nuts.',
			'Bark on mature trees develops deep fissures that spiral around the trunk, sometimes dramatically, which is a good long-distance identification for old trees.',
			'Flowers are long creamy-yellow catkins in July, much later than most British trees, with a heavy sweet smell that fills a whole wood on a warm afternoon.',
			'Horse chestnut is unrelated and quite different: palmate compound leaves, stout spines on a thick case, and one big inedible conker.',
			'In Kent and Sussex, look for chestnut coppice — dense stands of straight poles cut on a 12- to 20-year cycle, the raw material for cleft chestnut paling fence.'
		],
		season: [
			['Spring', 'Late into leaf; long glossy leaves unfold a fresh yellow-green in May.'],
			['Summer', 'Cream catkins in July, sweetly scented and busy with insects — one of the latest-flowering trees.'],
			['Autumn', 'Spiny burrs split on the tree and drop; nuts ripen in October, best after a warm summer. Leaves turn a rich yellow-brown.'],
			['Winter', 'Spiralling fissured bark on veterans, stout twigs, and empty spiny cases underfoot.']
		],
		folklore: [
			[
				'Roman imports and chestnut coppice',
				'Sweet chestnut is native to southern Europe and Asia Minor and was almost certainly brought to Britain by the Romans, who valued the nuts as a staple — chestnut flour was bread for whole mountain regions of Italy and France well into the twentieth century. British summers are usually too cool to ripen good nuts reliably, so the tree found a different role here: coppiced for cleft paling, hop poles and fencing, an industry that still supports thousands of hectares of Kentish woodland. The Tortworth Chestnut in Gloucestershire was already famous as an ancient tree in the sixteenth century.'
			]
		],
		science: [
			[
				'Chestnut blight and the American lesson',
				'Chestnut blight (*Cryphonectria parasitica*) destroyed an estimated four billion American chestnuts in the first half of the twentieth century — one of the greatest ecological catastrophes in recorded history, and the reason the American species survives mostly as suckering stumps. The fungus reached Europe in 1938 but has been partly checked by a naturally occurring virus that weakens it, an early example of biological control by hypovirulence. Blight was confirmed in Britain in 2011 and is under statutory eradication; sweet chestnut here also faces oriental chestnut gall wasp, first found in 2015. It is a good example of why plant-health import controls matter.'
			]
		],
		tell: 'Sweet chestnut is no relation to horse chestnut — one you roast, the other is soap.'
	},
	{
		id: 'whitebeam',
		name: 'Whitebeam',
		latin: 'Sorbus aria',
		aka: ['common whitebeam', 'chess-apple'],
		family: 'Rosaceae (rose family)',
		co2: 11,
		colors: ['#B9C293', '#7E8C5A'],
		key: 'simple',
		key2: 'toothed',
		hint: 'Leaves brilliant white beneath; red berries',
		quick: [
			['Height', '10–15 m'],
			['Lifespan', '80–150 years'],
			['Status', 'Native to southern England on chalk; planted widely'],
			['Where', 'Chalk and limestone downs, scrub, streets and car parks'],
			['Note', 'Britain has dozens of rare apomictic Sorbus species']
		],
		spot: [
			'Turn a leaf over: the underside is covered in dense, brilliant **white felt**, so the whole tree flashes silver-white when the wind lifts the leaves. Nothing else in a British hedge does this so strongly.',
			'Leaves are simple, oval, 5–12 cm, with irregular shallow teeth and neat parallel veins — not divided into leaflets, which is the clean separation from rowan.',
			'Spring growth is startling: the emerging leaves stand upright and look like white candles or magnolia buds before they flatten out.',
			'Berries are scarlet to orange-red and oval, carried in loose clusters from September, faintly speckled and much mealier than rowan’s — which is why they were eaten only after over-ripening.',
			'Bark is smooth pale grey, staying smooth; the crown is neat, compact and domed, which is why it is planted so much in streets and car parks.',
			'Swedish whitebeam, extremely common in towns, has shallowly lobed leaves — halfway between whitebeam and rowan — and is a different plant.'
		],
		season: [
			['Spring', 'The white candle stage in April is the best moment: upright silvery new leaves, then clusters of white flowers in May.'],
			['Summer', 'Green above, silver-white beneath, flickering in wind.'],
			['Autumn', 'Red-orange berries and leaves turning russet-gold; the white undersides still show.'],
			['Winter', 'Smooth grey bark, neat domed outline, plump green-brown buds.']
		],
		folklore: [
			[
				'Chess-apples and the chalk downs',
				'Whitebeam’s northern name, chess-apple, refers to the mealy fruit, which was eaten "bletted" — allowed to over-ripen almost to rotting, like a medlar — and used in country wines. The tree belongs to the chalk: the beech-and-whitebeam scrub of the North and South Downs is a signature British habitat, and whitebeam’s flashing white leaves in a summer wind are one of the recognisable sights of chalk country. Wood was used for cogs, wheels and tool handles, being hard and fine-grained.'
			]
		],
		science: [
			[
				'The genus that keeps inventing species',
				'*Sorbus* is a taxonomic wonderland. Many whitebeams reproduce apomictically — producing seed without fertilisation — so a hybrid individual can clone itself into a stable population that behaves like a species. Britain has an exceptional concentration of these, over 40 endemic *Sorbus* species, many confined to a single gorge or cliff: the Bristol whitebeam of the Avon Gorge, Ley’s whitebeam with fewer than 20 known wild trees in the Brecon Beacons, the Arran whitebeams. This makes Britain internationally important for the genus and makes *Sorbus* one of the hardest groups in the British flora to identify — several species are known from a handful of individuals.'
			]
		],
		tell: 'Britain has over 40 whitebeam species found nowhere else — some grow in a single gorge.'
	},
	{
		id: 'wild-service',
		name: 'Wild service tree',
		latin: 'Sorbus torminalis',
		aka: ['chequer tree', 'chequers'],
		family: 'Rosaceae (rose family)',
		co2: 12,
		colors: ['#AFBE6A', '#75893C'],
		key: 'lobed',
		key2: 'cut',
		hint: 'Maple-like lobed leaves; brown speckled fruit',
		quick: [
			['Height', '15–25 m'],
			['Lifespan', '100–200 years'],
			['Status', 'Native and genuinely scarce — an ancient woodland indicator'],
			['Where', 'Old woods on clay and limestone, mainly southern England'],
			['Note', 'Real, if unfamiliar: the "Chequers" pub name comes from it']
		],
		spot: [
			'Leaves look more like a maple than a *Sorbus*: deeply and sharply **lobed**, 5–10 cm, glossy dark green, with the lower pair of lobes spreading widest and pointing backwards.',
			'The clean separation from maple is arrangement — service tree leaves are **alternate** along the twig, while all maples and sycamores are strictly opposite.',
			'Fruit is unlike any other British tree: oval, 1.5 cm, greenish-brown ripening to russet-brown and heavily speckled with pale dots — a "chequer" — edible only once bletted to a soft brown mush.',
			'Bark is dark grey-brown and cracks into distinctly square or oblong plates that lift at the edges, sometimes described as crocodile-like.',
			'It is a scarce tree of long-established woodland, spreading mostly by suckers, so finding one is a reasonable sign that the wood has been there for centuries.',
			'Autumn colour is exceptional — deep coppery crimson and bronze — which is often how people first notice one they have walked past all year.'
		],
		season: [
			['Spring', 'Late into leaf; clusters of white flowers open in May and June.'],
			['Summer', 'Glossy dark maple-like leaves; fruit developing green and speckled.'],
			['Autumn', 'Brilliant coppery-crimson foliage and russet speckled chequers — the tree’s best moment by far.'],
			['Winter', 'Grey plated bark and a neat crown; often overlooked entirely.']
		],
		folklore: [
			[
				'Chequers, and the drink before hops',
				'The chequer fruit was gathered, bletted and used to flavour a fermented drink long before hopped beer, and it is the likeliest origin of the many English pubs called The Chequers — though the chequerboard sign has competing explanations. The species epithet *torminalis* means "good for colic", and the fruit was a standard remedy for stomach complaints. Because the tree is scarce, suckering and slow to colonise, foresters and ecologists treat it as one of the more reliable indicators of ancient woodland in southern England, and it appears in medieval charters as a boundary marker.'
			]
		],
		science: [
			[
				'A real species, and a rare one',
				'Wild service tree is entirely genuine — *Sorbus torminalis*, native to England and much of Europe — but it is uncommon enough that many people who love trees have never knowingly seen one, and it is easily dismissed as an invention. It is scattered through old woods on heavy clay and limestone, mainly south of a line from the Wash to the Severn, and it rarely regenerates from seed in Britain because our summers seldom ripen the fruit fully; most spread is by root suckers, so populations are small, clonal and static. Its timber, hard and fine-grained, was valued for musical instruments and precision tools.'
			]
		],
		tell: 'Pubs called The Chequers may be named after this tree’s speckled fruit, brewed before hops.'
	}
];
