import type { Species } from './types';

/** Species G–Z. */
export const SPECIES_B: Species[] = [
	{
		id: 'yew',
		name: 'Yew',
		latin: 'Taxus baccata',
		aka: ['common yew', 'English yew'],
		family: 'Taxaceae (yew family)',
		co2: 15,
		colors: ['#3E5C3E', '#26402A'],
		key: 'needle',
		key2: 'flat',
		hint: 'Flat dark needles in two rows; red arils',
		quick: [
			['Height', '10–20 m, broad and often multi-stemmed'],
			['Lifespan', '400–2,000+ years — Britain’s longest-lived tree'],
			['Status', 'Native, locally common; Britain holds most of Europe’s ancient yews'],
			['Where', 'Chalk and limestone, churchyards, ancient woodland, cliffs'],
			['Caution', 'All parts are highly toxic except the red flesh of the aril']
		],
		spot: [
			'Needles are flat, soft-tipped, dark glossy green above and paler beneath, arranged in two neat rows along the twig so the spray looks flattened. They are not sharp — you can run a hand along them, unlike spruce.',
			'The fruit is not a cone but an **aril**: a single hard seed sitting in a cup of soft, sweet, translucent scarlet flesh, open at the end. It looks like a tiny red olive with a hole.',
			'Bark is thin, reddish-brown to purple-grey, flaking in irregular scales to reveal patches of fresh coppery colour underneath. Trunks are strongly fluted and often hollow.',
			'Ancient yews are usually broader than they are tall, with vast low limbs, multiple fused stems and a hollow centre. Because the heartwood rots away, ring-counting fails, and age estimates for the oldest British yews are genuinely uncertain by centuries.',
			'Look in churchyards first — a large yew beside an old church is the commonest way to meet the species in lowland Britain, and there are more ancient yews in England and Wales than in the rest of Europe combined.',
			'Yew is usually dioecious: male trees shed clouds of pollen in early spring, female trees carry the red arils. Occasional trees change sex, or carry both.'
		],
		season: [
			['Spring', 'Male trees release pollen in February and March — a shaken branch produces a visible cloud. New growth is a bright yellow-green against the old dark needles.'],
			['Summer', 'Deep, dry shade beneath; almost nothing grows under an old yew. Green immature arils begin to form on female trees.'],
			['Autumn', 'Scarlet arils ripen and are taken by blackbirds and thrushes, which pass the seed unharmed while avoiding the toxic kernel.'],
			['Winter', 'The most obvious season: solid dark green mass among bare trees, with the flaking red-brown trunk clear to see.']
		],
		folklore: [
			[
				'Older than the church beside it',
				'Many British churchyard yews substantially pre-date their churches — the Fortingall Yew in Perthshire and the Llangernyw Yew in Conwy are both credibly over 2,000 years old, and dozens more exceed a thousand. The likeliest explanation is that early Christian sites were deliberately founded at places already sacred, and a great yew was exactly such a marker. The alternative and duller explanation — that yews were planted in enclosed ground to keep toxic foliage away from livestock, and to supply bow timber — is probably also true in some cases. Both can be right; churchyard yews are not one phenomenon.'
			],
			[
				'The tree of death and return',
				'Yew’s association with mortality is unusually well earned: it is highly poisonous, it grows in burial grounds, it lives longer than any other native tree, and it regenerates from apparently dead hollow trunks by dropping branches that root, so a single organism can renew itself indefinitely. Shakespeare has the witches use "slips of yew" in *Macbeth*; the "double fatal yew" of *Richard II* refers both to its poison and to the longbows made from it. Yew branches were carried at funerals and, in some parishes, laid in the grave.'
			],
			[
				'The longbow question',
				'The English longbow was made of yew, ideally with heartwood and sapwood in the same stave to combine compression and tension strength. Domestic yew was often too knotty, so vast quantities were imported — a 1472 statute required every ship trading into England to bring bow staves, and Venetian and Alpine yew stocks were seriously depleted supplying the trade. The often-repeated claim that English churchyard yews were planted specifically to supply bows is largely a later story; the imports tell the real tale.'
			]
		],
		science: [
			[
				'The chemotherapy tree',
				'Paclitaxel, sold as Taxol, is one of the most important cancer drugs ever developed, used against ovarian, breast and lung cancers. It was first isolated in 1967 from the bark of the Pacific yew, *Taxus brevifolia*, and works by jamming the microtubule machinery that cells use to divide. The original supply problem was severe — treating one patient took the bark of several mature trees, killing them. The solution came partly from *Taxus baccata*: 10-deacetylbaccatin III, extracted from the clippings of ordinary European yew hedges, can be converted semi-synthetically into paclitaxel. Yew hedge trimmings from British gardens and churchyards have been collected commercially for exactly this purpose.'
			],
			[
				'Poisonous in every part but one',
				'Yew contains taxine alkaloids, which are cardiotoxic and can stop the heart; foliage, bark and seed are all dangerous, and dried clippings remain toxic. The single exception is the fleshy red aril, which is sweet and harmless — an elegant piece of evolutionary engineering, since the plant needs a bird to eat the flesh and either drop or excrete the seed without chewing it. Horses and cattle are highly susceptible, which is the practical reason not to throw yew clippings over a field wall.'
			],
			[
				'Why we cannot count the rings',
				'Yews hollow from the centre as heartwood decays, and they can also fuse multiple stems, lose whole sections and regrow. That destroys the standard dendrochronological record, so ages are estimated from girth growth rates, historical records and comparison — methods that diverge wildly for very old trees. Claims of 4,000 or 5,000 years for the Fortingall Yew are unverifiable; 2,000 to 3,000 is the cautious range most specialists accept.'
			]
		],
		tell: 'A hedge clipping of yew can end up in a chemotherapy drip.'
	},
	{
		id: 'pine',
		name: 'Scots pine',
		latin: 'Pinus sylvestris',
		aka: ['Scotch pine', 'Scots fir'],
		family: 'Pinaceae (pine family)',
		co2: 22,
		colors: ['#6E9B6B', '#3E6B4A'],
		key: 'needle',
		key2: 'paired',
		hint: 'Long blue-green needles in pairs; orange upper bark',
		quick: [
			['Height', 'Up to 35 m'],
			['Lifespan', '150–300 years; some Caledonian pines over 500'],
			['Status', 'Native — Britain’s only native pine'],
			['Where', 'Sandy and acid soils, Caledonian pinewoods, heaths, plantations'],
			['Wildlife', 'Crossbill, crested tit, capercaillie, red squirrel, pine marten']
		],
		spot: [
			'Needles come in **pairs**, 4–7 cm, stiff, slightly twisted and blue-green, held in a sheath at the base. Counting needles per bundle is the fastest way into any pine: two means Scots pine in Britain, three suggests Corsican or Monterey, five means one of the white pines.',
			'The upper trunk and larger branches glow warm orange-red, especially in low sun — the single best long-distance identification. The lower trunk is greyer and deeply fissured into plates.',
			'The mature outline is distinctive: a long clean trunk with a flat or domed crown of heavy branches near the top, like a broccoli head on a pole. Young trees are conical and much less characteristic.',
			'Cones are 3–7 cm, pointed, grey-brown, with a small raised boss on each scale. They take two years to ripen and sit singly or in pairs, hanging back along the twig.',
			'In the Highlands, look for "granny pines" — vast, low-branched, open-grown veterans in the Caledonian remnants at Rothiemurchus, Glen Affric and Abernethy, which are the closest thing Britain has to primeval forest.',
			'Don’t confuse it with plantation conifers: spruce has single sharp needles on woody pegs; larch is deciduous with needles in rosettes; Douglas fir has soft single needles and a sweet grapefruit smell when crushed.'
		],
		season: [
			['Spring', 'New shoots — "candles" — extend upright in May, and small red-purple female cones sit at the tips while yellow male clusters shed pollen.'],
			['Summer', 'Second-year cones swell and turn woody. Resin scent is strongest on hot days.'],
			['Autumn', 'Older needles yellow and drop; a pine keeps each needle two to four years, so autumn shedding is normal and not a problem.'],
			['Winter', 'Orange bark against snow or grey sky. Crossbills feed on cones, and shredded cone scales beneath a tree are a good sign of squirrels.']
		],
		folklore: [
			[
				'The waymarking tree',
				'Lone Scots pines on hilltops and along old routes are often not accidental. They were used as landmarks on drove roads, visible for miles, and tradition holds that pines were planted at drovers’ stances and at some burial sites and boundary points. In parts of Scotland a pine by a house was said to mark a place of shelter or safe passage. Whether or not every lone pine is deliberate, the pattern is real enough that landscape historians use them as clues to lost routes.'
			],
			[
				'Emblem of a clan and a nation',
				'Scots pine is the badge of Clan MacGregor and, in effect, the national tree of Scotland — the Great Wood of Caledon, the Roman *Caledonia silva*, was pine forest, and its remnants carry heavy cultural weight. The Yule log was traditionally pine in the Highlands, and pine torches split from resinous heartwood ("candle fir") lit crofts before paraffin.'
			]
		],
		science: [
			[
				'Two needles, one machine',
				'Each pair of needles in a Scots pine grows from a single short shoot and is semicircular in section, so the two together form a cylinder. That geometry sheds water and snow, presents a small surface area to drying wind, and creates turbulence that helps gas exchange around the shoot. The thick waxy cuticle and sunken stomata reduce water loss so effectively that pines can photosynthesise in cold, dry conditions when broadleaves cannot afford to open at all — which is how the species survives from Spain to the Arctic Circle, the widest range of any pine.'
			],
			[
				'Fire, seed and a two-year cone',
				'Scots pine is adapted to disturbance: thick insulating bark on the lower trunk survives light ground fires, seed germinates readily on bare mineral soil and burnt ground, and cones take two full years to ripen before releasing winged seed in dry spring weather. Suppressing fire and grazing heavily by deer has been the main reason Caledonian pinewood has failed to regenerate — the trees are willing; the seedlings get eaten.'
			],
			[
				'Reading the resin',
				'Pine resin is a defence: a physical seal and a chemical deterrent, rich in terpenes that are toxic to insects and fungi. It has also been an economic product for millennia — pitch and tar for waterproofing ships, turpentine, rosin for violin bows and gymnasts’ hands. Amber is fossilised conifer resin, and the insects trapped in it are the best window we have into ancient forest ecosystems.'
			]
		],
		tell: 'Lone pines on hilltops are often 300-year-old road signs.'
	},
	{
		id: 'hawthorn',
		name: 'Hawthorn',
		latin: 'Crataegus monogyna',
		aka: ['may', 'quickthorn', 'whitethorn', 'bread and cheese'],
		family: 'Rosaceae (rose family)',
		co2: 9,
		colors: ['#A4B85C', '#6B8A34'],
		key: 'lobed',
		key2: 'cut',
		hint: 'Small, deeply cut leaves; May blossom; thorns',
		quick: [
			['Height', '5–14 m; usually kept as hedge'],
			['Lifespan', '100–400 years'],
			['Status', 'Native, extremely common — the classic hedge tree'],
			['Where', 'Hedges, scrub, field corners, upland edges; almost any soil'],
			['Wildlife', 'Over 300 insect species; haws feed thrushes and small mammals']
		],
		spot: [
			'Leaves are small (2–4 cm) and **deeply cut** into three to seven lobes that reach more than halfway to the midrib, with the lobes toothed near the tip. Fresh spring leaves were eaten by children as "bread and cheese".',
			'Thorns are real thorns — hard, sharp, 1–2 cm, growing straight from the shoots rather than from the bark surface. That distinguishes them from the prickles of a rose or bramble.',
			'Blossom smothers the tree in May: five-petalled white (sometimes pink-flushed) flowers in dense clusters, each with a **single** style, and later a single seed inside the haw. Midland hawthorn, the other native, has two or three styles, shallower leaf lobes, and flowers a fortnight earlier.',
			'Haws are deep red, oval and about a centimetre long, each holding one hard seed. They ripen from August and often hang on well into winter, going soft and dark — an important late food when everything else has been stripped.',
			'Bark is grey-brown, becoming finely fissured and often flaking into small oblong plates; old hedgerow trees develop gnarled, twisted, leaning trunks.',
			'A dense, twiggy, thorny structure makes hawthorn the best nesting cover in a British hedge — which is exactly why it was planted for the enclosures.']
		,
		season: [
			['Spring', 'Bright fresh leaves come early, in March, well before the flowers. Blossom peaks in mid-May — the reason the tree is simply called "may".'],
			['Summer', 'Green haws form; hedges hum with insects. Hawthorn shield bugs and countless moth larvae feed on the leaves.'],
			['Autumn', 'Haws turn crimson in generous quantity; leaves go dull yellow-bronze.'],
			['Winter', 'Thorny black tracery, often still holding shrivelled haws — an important late food source for fieldfares and redwings.']
		],
		folklore: [
			[
				'The fairy tree',
				'A lone hawthorn standing in a field, especially on a mound or beside a spring, is in Irish tradition a fairy tree, and interfering with it invites serious trouble. This is not a museum belief: road schemes in Ireland have been re-routed around lone thorns within living memory, and contractors have refused to cut them. The same tree in a hedge is unremarkable — it is the solitary, unexplained thorn that carries the weight, and the tradition acts as a rough conservation mechanism for exactly the veteran trees ecologists most value.'
			],
			[
				'May blossom must not come indoors',
				'Of all British plant superstitions this is among the most tenacious: hawthorn blossom brought into a house foretells illness or death. Bringing it in on May Day, or wearing it, was fine outdoors — the may garlands, may queens and maypoles of English village custom used it freely. Indoors was the line. Along with the taboo goes the calendar problem: the switch to the Gregorian calendar in 1752 shifted the dates by eleven days, which is why "may" blossom often is not out on the first of May.'
			],
			[
				'The Glastonbury thorn',
				'The Holy Thorn at Glastonbury, said to have grown from Joseph of Arimathea’s staff, flowers twice — in spring and again around midwinter. That much is botanically real: the cultivar *Crataegus monogyna* "Biflora" does flower twice, and a sprig is still sent to the monarch at Christmas. The original tree was cut down by a Puritan soldier in the seventeenth century; its descendants have been repeatedly vandalised, most recently in 2010.'
			]
		],
		science: [
			[
				'The chemistry behind the superstition',
				'The reason hawthorn blossom "shouldn’t come indoors" is that it smells, faintly but unmistakably, of decay. Hawthorn flowers emit trimethylamine, the same volatile compound produced by decomposing animal tissue, because their pollinators are flies and midges that are drawn to carrion. In the open air the scent reads as sweet and almondy; in a warm enclosed room the trimethylamine dominates. In an age when the dead were laid out at home, the association with the smell of a corpse needed no further explanation.'
			],
			[
				'Britain’s hedgerow engineer',
				'Hawthorn is the backbone of the British hedge because it grows fast, tolerates cutting and laying, and knits into a stock-proof barrier — hence "quickthorn", from "quick" meaning living. The Enclosure Acts of the eighteenth and nineteenth centuries drove the planting of an estimated 200,000 miles of new hedge, overwhelmingly hawthorn, in a landscape change so vast that it is what most people now think of as timeless English countryside. Dating a hedge by counting woody species per 30-yard stretch — Hooper’s rule, roughly one species per century — works because hawthorn hedges accumulate colonists over time.'
			],
			[
				'Heart medicine',
				'Hawthorn leaf, flower and fruit extracts are among the better-studied herbal cardiovascular preparations, containing flavonoids and oligomeric procyanidins with measurable effects on coronary blood flow and cardiac contractility. Standardised extracts are licensed in Germany for mild heart failure, and clinical trials show modest symptomatic benefit as an adjunct — a rare case where a folk use for the heart survived scientific scrutiny reasonably well.'
			]
		],
		tell: 'The "never bring may blossom indoors" rule is real chemistry — it smells faintly of death to a fly.'
	},
	{
		id: 'chestnut',
		name: 'Horse chestnut',
		latin: 'Aesculus hippocastanum',
		aka: ['conker tree'],
		family: 'Sapindaceae (soapberry family)',
		co2: 24,
		colors: ['#8FAF52', '#567F2E'],
		key: 'compound',
		key2: 'fan',
		hint: 'Fan of 5–7 big leaflets; conkers in autumn',
		quick: [
			['Height', 'Up to 39 m; commonly 20–30 m'],
			['Lifespan', '150–300 years'],
			['Status', 'Introduced from the Balkans around 1600; now everywhere'],
			['Where', 'Parks, avenues, village greens, big gardens'],
			['Threat', 'Leaf-miner moth and bleeding canker are widespread']
		],
		spot: [
			'Leaves are huge and **palmate** — five to seven big leaflets radiating from a single point like fingers from a palm, each leaflet widest near the tip and tapering to the base. No other common British tree does this.',
			'Sticky buds: large, glossy, red-brown, resinous and opposite, held at the twig tips through winter. The stickiness is real and diagnostic — it traps insects and deters browsing.',
			'Flowers stand in upright conical "candles", 20–30 cm, white with a yellow blotch that turns pink-red once the flower has been pollinated and no longer needs bee traffic.',
			'Fruit is a thick green case with short, stout spines, splitting to release one or two glossy red-brown conkers. Sweet chestnut, unrelated, has densely bristly cases with several small flattened nuts and long single toothed leaves.',
			'Leaf scars on the twig look strikingly like a horseshoe complete with nail holes — the likeliest source of the name "horse chestnut", along with a Turkish practice of feeding ground conkers to broken-winded horses.',
			'By August, many trees look scorched and brown, as though the summer has killed them. That is almost always the horse-chestnut leaf-miner moth, whose larvae tunnel between the leaf surfaces — disfiguring, but not usually fatal.'
		],
		season: [
			['Spring', 'Sticky buds burst dramatically in April, and the flower candles follow in May — one of the great British street-tree moments.'],
			['Summer', 'Deep shade, and increasingly the tell-tale brown blotching of leaf-miner damage from July onwards.'],
			['Autumn', 'Conkers. Cases split on the tree or on impact with the ground, and leaves turn yellow-brown, often already tattered.'],
			['Winter', 'Stout twigs, horseshoe leaf scars and big sticky red buds; a broad domed crown with branch tips that sweep down then up.']
		],
		folklore: [
			[
				'Conquerors',
				'The game of conkers is older than the horse chestnut’s arrival in Britain — it was played with hazelnuts and snail shells, and the name most likely comes from "conquer" (or possibly from *conch*, the shells). The first recorded game using horse chestnuts was on the Isle of Wight in 1848. The World Conker Championships have been held in Northamptonshire since 1965, with rules covering lace length, strikes and the vexed question of baked or vinegared conkers, which are cheating.'
			],
			[
				'The banned-conkers myth',
				'The recurring newspaper story that schools have banned conkers, or made children wear goggles, has been investigated repeatedly by the Health and Safety Executive, which lists it as one of its top health-and-safety myths. A handful of individual schools have restricted the game; there has never been a rule. The HSE’s own response was to point out that the risk is "so low as to be insignificant".'
			]
		],
		science: [
			[
				'Not a chestnut, and inedible for a reason',
				'Horse chestnut is no relation to sweet chestnut (*Castanea sativa*, in the beech family) — the shared name reflects the superficially similar nut. Conkers are loaded with saponins, soap-like compounds that are bitter, mildly toxic to humans and horses, and lethal to fish. That is why almost nothing eats them, apart from deer and wild boar in their native range. Saponins foam in water, and conkers were genuinely used as a soap substitute; in the First World War they were collected in vast quantities by British schoolchildren as a source of starch for acetone production in cordite manufacture, a scheme that mostly failed because the conkers rotted at railway stations before they could be processed.'
			],
			[
				'The leaf-miner and the bleeding canker',
				'Two problems dominate the species in Britain. *Cameraria ohridella*, the horse-chestnut leaf-miner moth, arrived in 2002 and now blotches leaves brown across the country by late summer; it is disfiguring but rarely fatal, as the damage comes after most of the year’s growth. More serious is bleeding canker, caused by the bacterium *Pseudomonas syringae* pv. *aesculi*, which produces rusty weeping lesions on the trunk and can kill. Surveys in the late 2000s found around half of Britain’s horse chestnuts affected to some degree, though many trees recover.'
			],
			[
				'Pink means "stop"',
				'The yellow blotch at the base of each white petal turns pink-red once a flower has been successfully pollinated. Bees can see and learn the difference and preferentially visit the yellow-marked flowers, which still hold nectar. The tree therefore keeps its whole display standing — attractive from a distance — while directing pollinators only to the flowers that still need them. It is a signalling system, and one of the neatest demonstrations of plant–pollinator communication you can watch in a city park.'
			]
		],
		tell: 'Conkers was first played with snail shells and hazelnuts — the chestnut only took over in 1848.'
	},
	{
		id: 'sycamore',
		name: 'Sycamore',
		latin: 'Acer pseudoplatanus',
		aka: ['great maple', 'plane (in Scotland)'],
		family: 'Sapindaceae (maple family)',
		co2: 26,
		colors: ['#7FA85A', '#4E7A36'],
		key: 'lobed',
		key2: 'hand',
		hint: 'Hand-shaped five-pointed leaves; helicopter seeds',
		quick: [
			['Height', 'Up to 35 m'],
			['Lifespan', '150–400 years'],
			['Status', 'Introduced (probably 1500s); naturalised and abundant'],
			['Where', 'Almost anywhere — woods, cities, exposed coasts, uplands'],
			['Note', 'Tolerates wind, salt and pollution better than most broadleaves']
		],
		spot: [
			'Leaves are large (10–20 cm) with **five** toothed lobes arranged like a spread hand, on a long stalk that is often reddish. The lobes are separated by sharp angles, and the underside is dull rather than glossy.',
			'Seeds are paired winged samaras — the "helicopters" — set at roughly a 90-degree angle to each other. Norway maple’s wings spread almost flat in a straight line, which is the quickest way to separate the two.',
			'Bark starts smooth and grey, then flakes irregularly into small squarish plates revealing pinkish-brown beneath, a bit like a jigsaw. Old trunks look scaly rather than fissured.',
			'Black tar spot fungus produces large, black, yellow-ringed blotches on the leaves by late summer. It is harmless, it is extremely common, and it is a good confirmation of sycamore.',
			'London plane is the other confusion in cities: it has similar-shaped leaves but bark that peels in big camouflage patches and hangs bobble-like fruit balls on strings.',
			'Sycamore seedlings are everywhere — dense carpets of them under a parent tree are one of the reasons the species is treated as invasive in some ancient woodlands.'
		],
		season: [
			['Spring', 'Leaves emerge bronze-pink, and drooping green-yellow flower spikes hang down in April and May, heavy with nectar for bees.'],
			['Summer', 'Dense shade, aphid-covered leaves that drip honeydew onto anything parked beneath, and the first black tar spots.'],
			['Autumn', 'Helicopters spin down in quantity; leaves turn a muddy yellow-brown, rarely spectacular.'],
			['Winter', 'Grey-brown scaly bark, stout opposite green buds, and a broad domed crown; often the last tree standing in an exposed farmyard.']
		],
		folklore: [
			[
				'The meeting tree',
				'Sycamores mark gathering places out of proportion to their number, probably because they grow fast, cast good shade and survive being planted in the open. The Tolpuddle Martyrs met under a sycamore on the village green in Dorset in 1834 to found what became one of the earliest agricultural trade unions — the tree still stands and is a listed monument. Preaching trees, market trees and mustering trees across Britain are frequently sycamore.'
			],
			[
				'Sycamore Gap',
				'A single sycamore growing in a dip on Hadrian’s Wall became one of the most photographed trees in Britain, and appeared in *Robin Hood: Prince of Thieves*. It was deliberately felled overnight in September 2023, an act that produced national grief entirely disproportionate to the tree’s ecological value and revealed how much cultural weight a single specimen can carry. Shoots have since regrown from the stump, and seeds and grafts have been propagated.'
			]
		],
		science: [
			[
				'Nature’s helicopter',
				'A sycamore samara autorotates as it falls: the wing generates a stable leading-edge vortex that halves the descent speed and lets a light breeze carry the seed a hundred metres or more from the parent. The aerodynamics are genuinely useful to engineers — the same vortex behaviour informs work on autorotating micro air vehicles and on how insects and helicopters generate lift at low Reynolds numbers. Wind-tunnel studies of maple samaras are a standard reference in that literature.'
			],
			[
				'Loved and loathed',
				'Sycamore is a genuine ecological argument. It supports far fewer invertebrate species than oak and shades out woodland ground flora, so it is often removed from ancient semi-natural woodland as a non-native invader. But it also carries enormous aphid populations that feed blue tits and other birds, hosts a rich lichen and moss flora on its bark, tolerates urban pollution and coastal salt where nothing else will grow, and locks up carbon fast. Conservation policy has softened accordingly: aggressive removal is now usually reserved for high-value ancient woodland rather than applied on principle.'
			],
			[
				'Atypical myopathy',
				'Sycamore seeds and seedlings contain hypoglycin A, which causes atypical myopathy, a frequently fatal muscle disease in horses. Outbreaks cluster in autumn and spring when seeds or seedlings are abundant in grazed pasture, and awareness among horse owners has risen sharply since the link was confirmed in 2013. Fencing off sycamores, clearing seed and providing supplementary forage are the standard precautions.'
			]
		],
		tell: 'Drone engineers still study how sycamore seeds fall.'
	},
	{
		id: 'elder',
		name: 'Elder',
		latin: 'Sambucus nigra',
		aka: ['elderberry', 'bourtree', 'judas tree'],
		family: 'Adoxaceae (moschatel family)',
		co2: 7,
		colors: ['#93A85E', '#5E7A3A'],
		key: 'compound',
		key2: 'ladder',
		hint: 'Ladder leaflets with a strong smell; flat cream flower plates',
		quick: [
			['Height', '3–10 m; shrubby and often multi-stemmed'],
			['Lifespan', '30–60 years — short-lived and fast-growing'],
			['Status', 'Native, very common'],
			['Where', 'Nitrogen-rich ground: farmyards, rabbit warrens, badger setts, waste ground'],
			['Uses', 'Flowers for cordial, berries for wine — both must be cooked']
		],
		spot: [
			'Leaves are pinnate with five to seven toothed leaflets in ladder rows. Crush one: elder leaves have a strong, rank, slightly bitter smell that is unmistakable once learned and is the fastest confirmation in the field.',
			'Flowers form flat-topped plates (corymbs) 10–25 cm across, of tiny creamy-white five-petalled flowers, in June, with a heady muscat scent on a warm evening.',
			'Berries hang in drooping purple-black sprays on distinctly **red-purple** stalks from late August, heavy enough to bow the branch.',
			'Bark on older stems is grey-brown, corky and deeply grooved, looking older than the tree really is. Young shoots are green, and snapping one reveals a wide core of soft white pith — the single most diagnostic feature.',
			'Growth habit is scruffy: arching, brittle, often leaning stems, frequently growing straight out of a hedge bank, wall or farmyard muck heap where the soil is rich in nitrogen.',
			'Both flowers and berries must be cooked. Raw berries, leaves, bark and stems contain cyanogenic glycosides and cause nausea and vomiting.'
		],
		season: [
			['Spring', 'Early into leaf; the rank smell of crushed foliage is strongest now.'],
			['Summer', 'Peak elderflower in June — the cordial and fritter season. Pick in dry sun for the best scent, and take only a fraction of the plates from each bush.'],
			['Autumn', 'Elderberries ripen glossy black on red stalks through September; superb for cooked syrups, and stripped fast by blackbirds and warblers fattening for migration.'],
			['Winter', 'Corky grooved bark, opposite purple buds, brittle hollow-pithed twigs; often the untidiest thing in the hedge.']
		],
		folklore: [
			[
				'The Elder Mother',
				'Elder is the one British tree you were supposed to ask permission from. The Elder Mother — *Hylde-Moer* in Danish tradition, and widely known in England — inhabited the tree, and cutting it without asking (the formula ran roughly "Old Girl, give me some of thy wood and I will give thee some of mine when I grow into a tree") invited real misfortune. Elder was never burned indoors, never used for a cradle, and never made into a butcher’s skewer. J.K. Rowling’s Elder Wand, most powerful and most treacherous of wands, sits squarely in this tradition.'
			],
			[
				'The guardian and the gallows',
				'Elder’s reputation is double-edged: planted by the dairy and the back door to protect the house, yet also the tree Judas was said to have hanged himself from, and the wood of the cross in some tellings. Both stories may reflect the same underlying observation — elder grows on disturbed, dunged, unclean ground, close to human mess, and so sits at the boundary between the domestic and the wild. English medicine leaned on it heavily: John Evelyn called it a remedy "against all infirmities whatever", and elder features in more folk prescriptions than any other native plant.'
			]
		],
		science: [
			[
				'The fire tree',
				'Elder stems have a wide core of soft pith that pushes out easily, leaving a natural tube. Those tubes were used as blowpipes to breathe life into a fire, as pop-guns and whistles by children, and as pipe stems — the Latin *Sambucus* derives from *sambuca*, a musical instrument. One plausible etymology traces "elder" itself to Anglo-Saxon *æld*, fire. The same hollow stems are now recommended as ready-made nesting tubes for solitary bees.'
			],
			[
				'Elderberry and the immune claims',
				'Elderberry extracts are among the most commercially successful herbal remedies for colds and influenza, and the evidence is real but modest: several small randomised trials report symptoms resolving a couple of days sooner, and the anthocyanins involved do have measurable antiviral activity in vitro. The trials are mostly small, industry-funded and heterogeneous, so the honest summary is "promising, not proven". Cooking matters more than branding — raw berry preparations risk cyanogenic glycoside toxicity, so all traditional recipes boil them.'
			],
			[
				'A tree that follows people and badgers',
				'Elder is a nitrogen-loving colonist, which makes it a reliable indicator of enrichment: it springs up on muck heaps, rabbit warrens, badger setts, gull colonies, ruins and abandoned farmyards. Archaeologists and ecologists use stands of elder as a marker of past human or animal occupation — a line of elders in scrub is often the ghost of a farmyard. Its seed is spread abundantly by birds, and it grows fast enough to fruit within four or five years before being shaded out by longer-lived trees.'
			]
		],
		tell: 'Elder’s hollow stems were the medieval fire-blower — its name may literally mean "fire tree".'
	}
];
