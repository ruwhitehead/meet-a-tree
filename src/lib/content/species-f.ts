import type { Species } from './types';

/** Batch F: the last of the forty. */
export const SPECIES_F: Species[] = [
	{
		id: 'downy-birch',
		name: 'Downy birch',
		latin: 'Betula pubescens',
		aka: ['white birch', 'moor birch'],
		family: 'Betulaceae (birch family)',
		co2: 11,
		colors: ['#B9C87E', '#7E9448'],
		key: 'simple',
		key2: 'toothed',
		hint: 'Hairy twigs, duller bark, wetter ground than silver birch',
		quick: [
			['Height', 'Up to 25 m; often smaller and scrubbier'],
			['Lifespan', '60–90 years'],
			['Status', 'Native, very common — dominant in the north'],
			['Where', 'Wet heath, moorland, bog edges, Highland birchwoods'],
			['Note', 'The birch of Scotland; hybridises freely with silver birch']
		],
		spot: [
			'Feel the twig. Downy birch has **finely hairy twigs and leaf stalks**; silver birch is smooth and often slightly warty. This is the reliable separation and it works all year.',
			'Bark is duller — greyish or pinkish white, more uniform, and lacking the rough black diamond-shaped fissures that silver birch develops at the base.',
			'Leaves are more rounded at the base and more evenly single-toothed, whereas silver birch leaves are markedly triangular with double teeth — large teeth with smaller ones set between them.',
			'The outline is less weeping: branches are more upright and the fine twigs do not hang down in the same shaggy curtain that silver birch trails against the sky.',
			'Habitat is the strongest hint — downy birch takes the wetter, colder, more acid ground: bog margins, wet moorland and the great Highland birchwoods, where silver birch prefers drier sand.',
			'The two hybridise readily and hybrids are common, so a tree with slightly hairy twigs and slightly diamond bark is doing exactly what birches do.'
		],
		season: [
			['Spring', 'Early leaf and heavy pollen; catkins lengthen in April, later than silver birch in the far north.'],
			['Summer', 'Light dappled shade over a rich ground flora of blaeberry, moss and fern in Highland birchwoods.'],
			['Autumn', 'Clear yellow, often the dominant autumn colour of Scottish glens.'],
			['Winter', 'Grey-white trunks in stands, upright twig structure, no black diamonds at the base.']
		],
		folklore: [
			[
				'The birch of the north',
				'Where southern England has oak, the Highlands have birch, and Gaelic tradition treats it accordingly: *beith* is the first letter of the ogham alphabet, the tree of beginnings. Highland birchwoods supplied everything — fuel, bark for tanning, sap for wine, besoms, creels, roof timbers, and the smoke for curing herring. The nineteenth-century clearance of these woods for sheep and iron smelting stripped whole glens, and their slow recovery is now a major focus of Scottish rewilding.'
			]
		],
		science: [
			[
				'Two species, one shifting boundary',
				'Downy and silver birch are separated by ploidy as well as habitat: downy birch is usually tetraploid (four sets of chromosomes) while silver birch is diploid, which limits but does not prevent hybridisation. Downy birch tolerates waterlogging and cold far better, which is why it dominates from the Highlands to Iceland and Lapland while silver birch takes the drier south and east. Because British birchwoods regenerate readily wherever grazing pressure drops, birch is the front line of natural woodland expansion in upland Britain — deer control is essentially all it takes.'
			]
		],
		tell: 'Rub the twig: hairy means downy birch, smooth means silver birch.'
	},
	{
		id: 'norway-maple',
		name: 'Norway maple',
		latin: 'Acer platanoides',
		aka: ['plane-leaved maple'],
		family: 'Sapindaceae (maple family)',
		co2: 22,
		colors: ['#C6C860', '#8A9330'],
		key: 'lobed',
		key2: 'hand',
		hint: 'Big five-lobed leaves with hair-fine tips; flat wings',
		quick: [
			['Height', 'Up to 30 m'],
			['Lifespan', '150–250 years'],
			['Status', 'Introduced (1683); common in streets and parks'],
			['Where', 'Streets, parks, gardens; naturalising in some woodland'],
			['Note', 'The purple-leaved street trees are usually this species']
		],
		spot: [
			'Leaves are large, thin and glossy with five lobes, each lobe drawn out into a fine **hair-like point** — run a finger along the edge and the tips are almost whiskery. Sycamore lobes end bluntly.',
			'Snap the leaf stalk: Norway maple bleeds a **milky white sap** within a second or two, while sycamore’s sap runs clear. This is the definitive test and it works on any leaf, any time in the growing season.',
			'Seeds are paired samaras whose wings spread almost **horizontally in a straight line**, like a moustache, where sycamore’s sit in a much narrower V of about ninety degrees.',
			'Flowers are conspicuous and unusual for a maple: erect clusters of bright acid-yellow-green flowers in April, opening **before the leaves**, so the whole tree glows yellow-green for a fortnight.',
			'Bark is grey-brown with fine, shallow, regular ridges, staying tidy into old age rather than flaking off in the small squarish plates that make a mature sycamore look scaly.',
			'Many street specimens are the cultivar "Crimson King" with deep purple-black leaves all summer — same species, same milky sap and whiskery tips.'
		],
		season: [
			['Spring', 'A remarkable acid-yellow flowering before leaf burst, and an important early nectar source.'],
			['Summer', 'Dense glossy canopy, casting shade heavy enough to suppress ground flora.'],
			['Autumn', 'Reliable clear yellow, sometimes orange — better than sycamore, worse than field maple.'],
			['Winter', 'Neat regular ridged bark, stout opposite reddish buds, and a rounded crown.']
		],
		folklore: [
			[
				'The urban maple, and a warning from abroad',
				'Norway maple arrived in Britain in the 1680s and became a favourite street tree for the same reasons as plane: tolerance of pollution, compaction and pruning. Its reputation elsewhere is much worse. In north-eastern North America it is a serious invasive, shading out sugar maple regeneration and forming dense monocultures, and it is banned from sale in several states. In Britain it naturalises locally without yet causing that scale of problem — a useful reminder that "invasive" is a statement about a place, not a plant.'
			]
		],
		science: [
			[
				'Winning by shade and by timing',
				'Norway maple’s competitive edge comes from two traits. It leafs out early and holds its leaves late, extending its growing season past most competitors, and its dense canopy transmits very little light — measurements in North American forests show ground light beneath Norway maple at a fraction of that under native maples, suppressing seedlings of everything including its own rivals. It also produces abundant, wind-dispersed, readily germinating seed. Those same qualities make it an excellent street tree in a hostile city and a menace in a fragile forest.'
			]
		],
		tell: 'Snap the leaf stalk — milky sap means Norway maple, clear means sycamore.'
	},
	{
		id: 'black-poplar',
		name: 'Black poplar',
		latin: 'Populus nigra subsp. betulifolia',
		aka: ['water poplar', 'Manchester poplar'],
		family: 'Salicaceae (willow family)',
		co2: 24,
		colors: ['#A8BE6E', '#6B8236'],
		key: 'simple',
		key2: 'heart',
		hint: 'Leaning burred trunk; triangular leaves; crimson catkins',
		quick: [
			['Height', 'Up to 30 m'],
			['Lifespan', '150–250 years'],
			['Status', 'Native and critically scarce — around 7,000 trees, few female'],
			['Where', 'Floodplains, river meadows, ditch sides in the Midlands and Vale of Aylesbury'],
			['Note', 'Britain’s most endangered native timber tree']
		],
		spot: [
			'The silhouette is the thing: a massive, **leaning trunk covered in burrs and bosses**, with heavy arching lower limbs whose tips turn up. An old black poplar looks like it is about to fall over and has looked that way for a century.',
			'Leaves are triangular to diamond-shaped with a finely toothed edge and a long stalk, glossy on both sides, and they rustle audibly in wind (though not like aspen’s clatter).',
			'Male catkins in March are a striking **crimson-red**, opening before the leaves, and are one of the best sights of early spring; female catkins are green and release cottony seed.',
			'Bark is dark grey-brown, deeply and irregularly fissured, and the trunk usually carries large woody burrs — the single most reliable feature.',
			'Habitat is diagnostic: floodplain, wet meadow, ditch and riverside on heavy soil. It needs bare wet silt to germinate, which is why it almost never regenerates naturally now.',
			'Hybrid black poplars and Lombardy poplars are far commoner: straighter, tidier, without heavy burrs, often in rows. The native subspecies is scruffy, leaning and burred.'
		],
		season: [
			['Spring', 'Crimson male catkins on bare branches in March; leaves follow, opening with a balsam scent.'],
			['Summer', 'Rustling glossy canopy; female trees shed drifts of white cottony seed in June.'],
			['Autumn', 'Yellow, dropping quickly.'],
			['Winter', 'The classic leaning, burr-covered trunk is unmistakable, with knuckled arching branches.']
		],
		folklore: [
			[
				'Constable’s tree, and the Manchester poplar',
				'Native black poplar is all over English landscape painting — Constable painted them repeatedly in the Stour valley — because they were once a normal part of the wet lowland scene, pollarded for timber and cut for cart-bottoms, clogs and, famously, the shock-absorbing floors of factories. A clone known as the Manchester poplar was planted in huge numbers in industrial cities for its tolerance of smoke, and most were lost to a leaf-spot epidemic in the 2000s. The tree’s decline is a landscape story: it needs flooding, and we drained the floodplains.'
			]
		],
		science: [
			[
				'Why it cannot breed',
				'Black poplar’s predicament is a textbook case of reproductive failure in a fragmented population. It is dioecious, and British survivors are overwhelmingly male — of an estimated 7,000 native trees, perhaps 600 are female — because males were preferred for planting to avoid the nuisance of cottony seed. Even where both sexes occur, seed is only viable for a few days and needs bare, wet, freshly deposited silt to germinate, a habitat that river engineering has almost eliminated. Almost every surviving tree is therefore a cutting of a cutting, and genetic surveys have found very few distinct clones. Conservation now means deliberately planting known female clones near males on restored floodplains.'
			]
		],
		tell: 'Most of Britain’s native black poplars are male — we planted them that way, and now they cannot breed.'
	},
	{
		id: 'holm-oak',
		name: 'Holm oak',
		latin: 'Quercus ilex',
		aka: ['holly oak', 'evergreen oak'],
		family: 'Fagaceae (beech family)',
		co2: 20,
		colors: ['#6E8A5E', '#3E5A38'],
		key: 'simple',
		key2: 'spiny',
		hint: 'Evergreen oak; grey-felted leaf undersides; acorns',
		quick: [
			['Height', 'Up to 28 m'],
			['Lifespan', '200–500 years'],
			['Status', 'Introduced from the Mediterranean, 1500s'],
			['Where', 'Coastal southern England, parks, shelterbelts, churchyards'],
			['Note', 'An evergreen oak — the acorns give the genus away']
		],
		spot: [
			'An **evergreen tree bearing acorns** is a holm oak; nothing else in Britain does both. The acorns are small, narrow, and sit in a scaly cup.',
			'Leaves are leathery, dark glossy green above and covered in dense **grey-white felt beneath**, 4–8 cm, and variable: young or low leaves are spiny like holly, higher ones smooth-edged.',
			'The crown is dense, dark and rounded, giving very deep shade — a mature holm oak reads almost black at distance among deciduous trees.',
			'Bark is dark grey-black and finely cracked into small square plates, quite unlike the deep vertical fissures of our native oaks — closer in texture to an old holly than to an English oak.',
			'Holly is the confusion for young plants: holly leaves are hairless and shiny beneath and bear red berries, while holm oak leaves are grey-felted beneath and bear acorns.',
			'It is thoroughly naturalised on the south coast, where its seedlings can invade dune and heath — the Isle of Wight and Devon have substantial self-sown populations.'
		],
		season: [
			['Spring', 'Long yellow catkins in May and June, and a flush of paler new leaves that make the tree look two-tone.'],
			['Summer', 'Dark, dense, dusty-looking evergreen canopy that shrugs off drought and salt wind.'],
			['Autumn', 'Small acorns ripen; leaf fall happens continuously rather than seasonally.'],
			['Winter', 'One of very few big broadleaf evergreens in Britain — solid dark green among bare branches.']
		],
		folklore: [
			[
				'The Mediterranean oak in an English park',
				'Holm oak was introduced in the sixteenth century and became a fashionable eighteenth-century park and avenue tree, valued for evergreen structure and for its resemblance to the trees of Italy — an aesthetic import as much as a botanical one. "Holm" is an old word for holly, from the leaf shape. In its native range it is the tree of the dehesa and montado, the wood-pasture systems of Spain and Portugal where holm-oak acorns fatten the pigs that become jamón ibérico, one of the oldest continuously managed agroforestry landscapes in Europe.'
			]
		],
		science: [
			[
				'Built for drought, and a truffle partner',
				'Holm oak is a Mediterranean specialist: small thick leaves with a waxy cuticle and dense hairs beneath reduce water loss, and it can shut down photosynthesis through summer drought and resume in autumn. That physiology, plus salt tolerance, is why it thrives on British coasts and why it is expected to do better here as summers warm. It also forms mycorrhizal partnerships with *Tuber* species, making it one of the principal host trees of the black truffle — including in recent successful British truffle cultivation trials in Wales and southern England.'
			]
		],
		tell: 'An evergreen tree with acorns can only be a holm oak — and it hosts black truffles.'
	},
	{
		id: 'walnut',
		name: 'Common walnut',
		latin: 'Juglans regia',
		aka: ['English walnut', 'Persian walnut'],
		family: 'Juglandaceae (walnut family)',
		co2: 18,
		colors: ['#B5AE62', '#847F32'],
		key: 'compound',
		key2: 'ladder',
		hint: 'Big smooth leaflets smelling of polish; green fruit husks',
		quick: [
			['Height', 'Up to 35 m'],
			['Lifespan', '150–250 years'],
			['Status', 'Introduced, probably Roman'],
			['Where', 'Parks, old gardens, farmyards, field corners'],
			['Note', 'Suppresses plants beneath it with its own herbicide']
		],
		spot: [
			'Leaves are pinnate with five to nine large, smooth-edged, glossy leaflets, the terminal one usually the biggest — and crushing them releases a sharp, distinctive smell like shoe polish or turpentine that stains fingers brown.',
			'Fruit is a smooth green plum-like husk containing the familiar wrinkled nut; the husk blackens and rots away, staining everything it touches.',
			'Bark is smooth and pale silvery-grey when young, developing wide, deep, dark fissures with age — a striking contrast between old and young parts of the same tree.',
			'Twigs are stout with a chambered pith — slice one lengthways and the centre shows a ladder of hollow chambers, which is diagnostic for walnuts.',
			'The ground beneath is often noticeably bare or thin, and nearby tomatoes and apples sulk: walnut roots release juglone, a compound that inhibits many other plants outright.',
			'Black walnut (*Juglans nigra*), occasionally planted, has many more leaflets (11–23), a toothed edge, and a rougher, darker, deeply ridged bark.'
		],
		season: [
			['Spring', 'Very late into leaf, often not until May; leaves emerge bronze-pink, with drooping green male catkins.'],
			['Summer', 'Open airy canopy of large glossy leaflets; green fruits swelling.'],
			['Autumn', 'Nuts drop in September and October, husks blackening; leaves turn yellow and fall early, often shedding leaflets first.'],
			['Winter', 'Silvery young bark against dark fissured old bark, stout twigs with chambered pith and large blunt buds.']
		],
		folklore: [
			[
				'Jupiter’s nut, and the beating',
				'*Juglans* comes from *Jovis glans*, "Jupiter’s acorn" — the nut of the gods, as against the ordinary acorn of men. Because the kernel resembles a brain, walnut was a classic doctrine-of-signatures remedy for head ailments. Old orchard practice held that walnuts fruited better if beaten with poles, which was partly self-fulfilling: knocking the nuts down and pruning the long shoots did encourage fruiting spurs, giving rise to the grim rhyme about a woman, a dog and a walnut tree all being the better for beating.'
			]
		],
		science: [
			[
				'Chemical warfare in the root zone',
				'Walnut roots, leaves and husks release juglone, a compound that inhibits the growth of many other plants — a genuine case of allelopathy, and one of the best-documented. Tomatoes, potatoes, apples, birches and rhododendrons are notably sensitive and will decline within the root spread of a mature walnut, while grasses, maples and many bulbs tolerate it. Black walnut is markedly more toxic than common walnut. Gardeners have known the effect for centuries; Pliny recorded that walnut shade "is heavy and causes headache", which was not quite right about the mechanism but entirely right about the outcome.'
			]
		],
		tell: 'Walnut poisons the soil around it — that is why so little grows beneath one.'
	},
	{
		id: 'box',
		name: 'Box',
		latin: 'Buxus sempervirens',
		aka: ['common box', 'boxwood'],
		family: 'Buxaceae (box family)',
		co2: 4,
		colors: ['#8CA36E', '#4E6440'],
		key: 'simple',
		key2: 'wavy',
		hint: 'Tiny paired evergreen leaves; the densest wood in Europe',
		quick: [
			['Height', '2–9 m; slow-growing shrub or small tree'],
			['Lifespan', '400–600 years'],
			['Status', 'Native but genuinely wild in only a handful of places'],
			['Where', 'Chalk slopes (Box Hill, Chequers); hedges and topiary everywhere'],
			['Threat', 'Box blight and box tree moth are devastating garden box']
		],
		spot: [
			'Leaves are tiny (1–3 cm), oval, leathery, glossy dark green, **opposite each other** in neat pairs, notched at the tip, and densely packed so the whole plant reads as a solid green mass.',
			'Crush the foliage: box has a distinctive sharp, musty, slightly feline smell that people either recognise instantly or dislike intensely.',
			'Twigs are green, square in cross-section, and the growth is extremely dense and slow — which is exactly why box is the classic hedging and topiary plant.',
			'Flowers are tiny, green-yellow, scentless to most noses but rich in nectar, clustered in leaf axils in spring and loud with insects.',
			'Wild box grows on steep chalk: Box Hill in Surrey is named for it, and the ancient box wood at Chequers in Buckinghamshire is another of the few genuinely native sites.',
			'Watch for damage: box blight strips leaves and blackens stems, while box tree moth caterpillars spin webbing and can defoliate a hedge in weeks.'
		],
		season: [
			['Spring', 'Small nectar-rich green flowers in March and April, surprisingly busy with early insects; fresh pale growth follows.'],
			['Summer', 'Dense evergreen structure — the backbone of formal gardens; watch for webbing from box tree moth.'],
			['Autumn', 'Little change; older leaves may bronze in exposed positions.'],
			['Winter', 'Solid glossy green in the cold, holding its shape under snow, which is why it defines winter garden structure.']
		],
		folklore: [
			[
				'Box Hill, boxwood and the engraver’s block',
				'Box gave its name to Box Hill in Surrey, where wild box has grown on the chalk since at least the medieval period and was cut commercially for centuries. Its wood is so dense and fine-grained that it was the standard material for wood-engraving blocks — every illustration in a Victorian newspaper or a Bewick natural history was cut into end-grain box — as well as for rulers, chess pieces, flutes, recorders, mathematical instruments and inlay. Roman and medieval combs of box survive in archaeological deposits. Box was also used as a substitute for palm on Palm Sunday in some parishes.'
			]
		],
		science: [
			[
				'The densest wood in Europe, and a plant under siege',
				'Box has the highest density of any European timber — around 900 to 1,000 kg per cubic metre, dense enough to sink in water — which comes from extremely slow growth and tiny, tightly packed cells, and is precisely what made it the only wood fine enough to hold engraved lines at printing scale. British box is now in serious trouble on two fronts: box blight (*Calonectria pseudonaviculata*) and the box tree moth (*Cydalima perspectalis*), which arrived in 2007 and has spread across southern England, defoliating hedges and topiary faster than they can regrow. Many historic gardens have replaced centuries-old box with yew or *Ilex crenata* as a result.'
			]
		],
		tell: 'Box is so dense it sinks in water — every Victorian newspaper engraving was cut into it.'
	}
];
