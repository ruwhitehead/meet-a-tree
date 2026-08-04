import type { Species } from './types';

/** Species A–F. Split across files purely to keep each readable. */
export const SPECIES_A: Species[] = [
	{
		id: 'oak',
		name: 'English oak',
		latin: 'Quercus robur',
		aka: ['pedunculate oak', 'common oak'],
		family: 'Fagaceae (beech family)',
		co2: 30,
		colors: ['#4FA372', '#167E3C'],
		key: 'lobed',
		key2: 'rounded',
		hint: 'Rounded, wavy lobes; acorns on stalks',
		quick: [
			['Height', 'Up to 40 m, usually 20–30 m'],
			['Lifespan', '400–1,000 years; a few far older'],
			['Status', 'Native, common'],
			['Where', 'Deep soils, parkland, hedgerows, ancient woods'],
			['Wildlife', '2,300+ associated species — the UK record']
		],
		spot: [
			'Leaves are 7–14 cm long with three to six pairs of deep, **rounded** lobes and almost no stalk (under 5 mm). Two small flaps called auricles sit either side of where the blade meets the twig — a detail that separates it from sessile oak in seconds.',
			'Acorns sit on a long stalk, or peduncle, 2–8 cm long, usually two or three together. This is the origin of "pedunculate oak", and it is the single most reliable difference from sessile oak, whose acorns sit tight against the twig with no stalk at all.',
			'Bark is grey-brown and, on mature trees, deeply and irregularly fissured into hard vertical plates. Young bark is smoother and can look almost silvery in a wet winter.',
			'The crown is broad, domed and heavily branched, with large lower limbs that often twist and reach almost horizontally. A field oak grown in the open will be as wide as it is tall — a woodland oak drawn up by competition looks like a different tree.',
			'Twigs are grey-brown with buds clustered at the tip. In winter, look for those clustered blunt buds and the persistent brown leaves on lower branches.',
			'Beware the ringers: Turkey oak has whiskery scales on its acorn cups; red oak has pointed, bristle-tipped lobes; sessile oak has longer leaf stalks but stalkless acorns.'
		],
		season: [
			['Spring', 'Leaf burst is late — often early May, weeks after birch. Fresh leaves are bronze-pink before they green up, and long yellow-green catkins hang from the twigs.'],
			['Summer', 'Acorns swell green on their stalks. Look for spangle galls on the leaf undersides and marble galls on twigs — both are wasp nurseries, not disease.'],
			['Autumn', 'Acorns ripen and drop, brown to russet. Leaves turn a dull yellow-brown late in the season, often hanging on into winter.'],
			['Winter', 'The crown architecture is the whole show: heavy, sinuous limbs and a wide dome. Clustered buds at twig tips confirm oak.']
		],
		folklore: [
			[
				'The doorway tree',
				'Across northern Europe the oak marked thresholds — legal, sacred and physical. Manorial courts met beneath particular oaks, oaths were sworn under them, and "gospel oaks" marked parish boundaries walked once a year at Rogationtide, with the gospel read aloud beneath the branches. Many English place names still carry those trees: Gospel Oak in London, Sevenoaks in Kent. The habit is ancient. Roman writers describe druidic rites in oak groves, and the word "druid" may itself descend from a root meaning oak-knower.'
			],
			[
				'Thunder’s favourite',
				'The oak was sacred to the thunder gods of at least four traditions — Thor in Scandinavia, Zeus at Dodona in Greece, Jupiter in Rome and Perun among the Slavs. At Dodona, priests read the future in the rustling of a sacred oak’s leaves. This is not arbitrary: oaks genuinely are struck by lightning more often than most trees, being tall, often standing alone in open ground, and holding a great deal of water in their tissues. The proverb "beware the oak, it draws the stroke" is folk meteorology with a grain of physics.'
			],
			[
				'Hearts of oak',
				'Oak built the English navy, and the phrase "hearts of oak" carried a national self-image for centuries. A single 74-gun ship of the line consumed around 2,000 mature oaks — roughly 40 hectares of woodland. The Royal Oak of Boscobel, where Charles II hid in 1651, gave its name to Oak Apple Day and to more pubs than any other tree in Britain.'
			]
		],
		science: [
			[
				'Mast years',
				'An oak can drop tens of thousands of acorns in one autumn and almost none for several years afterwards. These synchronised "mast years" run across whole regions, and the leading explanation is predator satiation: by flooding the market at unpredictable intervals, oaks ensure that jays, mice, squirrels and boar cannot possibly eat every acorn, and that their populations crash in the lean years between. How the trees coordinate is still argued over — weather cues, particularly a warm spring two years earlier, plus internal resource cycles, appear to combine. Trees may also share the signal through pollen: a heavy pollen year favours heavy fruiting across a whole population.'
			],
			[
				'A city in one organism',
				'A mature English oak supports more life than any other tree in Britain — over 2,300 recorded species, of which several hundred are found on oak and nowhere else. That includes 326 species entirely dependent on it. The reason is partly age and size, partly chemistry: oak leaves are rich in tannins that many insects have specialised to defeat, and every specialist herbivore brings its own parasites and predators. Dead oak matters as much as living: veteran trees with rot holes, dead limbs and loose bark host invertebrates that cannot survive anywhere else, which is why an ancient oak with a hollow trunk is more valuable ecologically than a dozen healthy young ones.'
			],
			[
				'Galls: outsourced architecture',
				'The bumps, discs and marbles on oak leaves and twigs are galls — plant tissue that a wasp, midge or mite has chemically hijacked into building a nursery. The oak apple, knopper gall and silk-button spangle gall are each the work of a different species, and each induces the tree to grow a structure it would never otherwise make. Oak gall wasps have famously complex life cycles, alternating between a sexual generation on one part of the tree and an asexual one elsewhere. Iron gall ink, made from crushed oak galls, wrote most of European history from the Roman period to the nineteenth century.'
			]
		],
		tell: 'Hollow oaks were said to shelter anyone the forest approved of.'
	},
	{
		id: 'birch',
		name: 'Silver birch',
		latin: 'Betula pendula',
		aka: ['lady of the woods', 'warty birch'],
		family: 'Betulaceae (birch family)',
		co2: 12,
		colors: ['#C9D96A', '#8FA83C'],
		key: 'simple',
		key2: 'toothed',
		hint: 'Small triangular leaves, doubly toothed; white bark',
		quick: [
			['Height', 'Up to 30 m, often 15–20 m'],
			['Lifespan', '60–90 years; short-lived by tree standards'],
			['Status', 'Native, very common'],
			['Where', 'Light sandy or acid soils, heaths, birch woods, urban edges'],
			['Role', 'Pioneer — first tree onto open ground']
		],
		spot: [
			'Bark is the giveaway: chalk-white and papery, peeling in horizontal ribbons, breaking into rough black diamond-shaped fissures near the base of older trees. Young trees start out coppery brown and whiten from about five years old.',
			'Leaves are small (2–5 cm), roughly triangular with a long tapering point, and **doubly toothed** — large teeth with smaller teeth between them. Feel the leaf stalk and young twigs: in silver birch they are smooth and hairless.',
			'The whole outline weeps. Fine twigs hang down from arching branches, giving the species its epithet *pendula* and a distinctly shaggy silhouette against the sky.',
			'Downy birch (*Betula pubescens*) is the confusion. It has hairy twigs and leaf stalks, more rounded leaf bases, a duller greyer bark without the black diamonds, and it prefers wetter ground. The two hybridise, so some trees sit annoyingly in between.',
			'Catkins appear before or with the leaves: yellow-brown male catkins 3–6 cm long hanging in pairs, and shorter, upright green female catkins that thicken and droop as seed ripens.'
		],
		season: [
			['Spring', 'One of the first into leaf — a haze of acid green in April. Male catkins lengthen and shed clouds of pollen; this is a significant hay-fever tree.'],
			['Summer', 'Deep, dappled shade that lets grass and bluebells grow beneath — quite unlike beech. Look for witch’s broom, dense twiggy growths caused by a fungus.'],
			['Autumn', 'Clear butter-yellow, one of the best autumn colours in Britain, and early — often turning in September.'],
			['Winter', 'The white trunks and purple-brown twig haze are unmistakable at distance. Seed catkins break up and scatter tiny winged nutlets over snow.']
		],
		folklore: [
			[
				'Lady of the woods',
				'Coleridge’s phrase stuck because it fits: birch is slender, pale and associated throughout northern Europe with beginnings, purification and spring. Birch besoms swept out the old year and, in the witch trials, the same broom became evidence. Maypoles were frequently birch, cradles were made from it, and in parts of Wales a birch wreath given to a suitor meant yes. In Russia and Finland birch is a national emblem, and the *vihta* — a bundle of leafy birch twigs used to beat the skin in a sauna — is still in everyday use.'
			],
			[
				'Driving out the old',
				'Birch twigs carried a double meaning of cleansing and punishment. "Birching" was a judicial and school punishment in Britain into the twentieth century, formally abolished as a court sentence in 1948 but surviving on the Isle of Man until 1976. The same association made birch the tree of the spring cleaning festivals, when houses were swept with birch and the sweepings burned.'
			]
		],
		science: [
			[
				'The pioneer strategy',
				'Birch is the classic pioneer: it produces enormous quantities of tiny wind-borne seed, germinates on bare mineral soil, grows fast in full light and dies young. A single mature tree can release over a million seeds in a good year. That strategy makes it the first tree onto burnt ground, abandoned quarries, railway sidings and heath. It also seals its own fate — birch cannot regenerate in its own shade, so the woodland it creates is gradually replaced by oak, beech or pine. Foresters use it deliberately as a nurse crop, sheltering slower hardwoods that will eventually overtop it.'
			],
			[
				'Why the bark is white',
				'The whiteness comes from betulin, a compound deposited in the outer bark in crystalline form. It reflects sunlight, and the leading explanation is thermal: a dark trunk in late winter can warm enough on the sunny side to break dormancy or crack as it refreezes at night, and reflective bark reduces that risk. Betulin is also strongly water-repellent and antimicrobial, which is why birch bark survives in archaeological deposits when everything else has rotted, and why it makes such superb tinder even when wet.'
			],
			[
				'Ten-thousand-year-old chewing gum',
				'Heating birch bark without oxygen produces a sticky black tar, one of the oldest manufactured materials known — European examples date back over 100,000 years, to Neanderthals. It was used as an adhesive for hafting stone tools and as a chewing gum. Chewed lumps recovered from Mesolithic sites in Scandinavia still carry tooth impressions and enough human DNA to reconstruct the genome of an individual chewer, along with the bacteria in their mouth and traces of their last meal.'
			]
		],
		tell: 'Stone-age people chewed birch tar gum — we’ve found the tooth marks, and read their DNA.'
	},
	{
		id: 'rowan',
		name: 'Rowan',
		latin: 'Sorbus aucuparia',
		aka: ['mountain ash', 'quickbeam', 'witch wiggin'],
		family: 'Rosaceae (rose family)',
		co2: 10,
		colors: ['#D97B4A', '#B9502A'],
		key: 'compound',
		key2: 'ladder',
		hint: 'Ladder-like leaflets, toothed; scarlet berries',
		quick: [
			['Height', '8–15 m; often much smaller on mountains'],
			['Lifespan', '80–200 years'],
			['Status', 'Native, common — especially in the north and west'],
			['Where', 'Uplands to 1,000 m, acid soils, crags, gardens, streets'],
			['Wildlife', 'Berries feed redwings, fieldfares, blackbirds, waxwings']
		],
		spot: [
			'Leaves are pinnate: five to eight pairs of narrow, sharply toothed leaflets in neat ladder rows, plus a single leaflet at the tip. Each leaflet is toothed almost to its base — a useful contrast with ash, whose leaflets are nearly smooth-edged.',
			'Berries are the signature: dense flat-topped clusters of round, glossy scarlet fruit from August, often weighing the branch tips down. Some cultivated rowans have orange or yellow berries.',
			'Flowers are creamy white, five-petalled and borne in dense flat-topped clusters in May, with a heavy, slightly sour scent that flies find more attractive than we do. Each flower becomes a berry, so the shape of the flower cluster predicts the shape of the fruit cluster.',
			'Bark is smooth, silvery grey and often has a slight sheen, with horizontal lines of small lenticels. It stays smooth into old age, unlike ash which becomes ridged.',
			'It is not an ash at all, despite "mountain ash" — the pinnate leaf is a coincidence. Rowan is in the rose family, which the flowers and pome fruits give away. Ash has black buds and winged keys; rowan has purple-brown hairy buds and berries.',
			'Look for it high: rowan grows further up British mountains than almost any other tree, often as a single stunted specimen wedged in a crag where sheep cannot reach it.'
		],
		season: [
			['Spring', 'Fresh pinnate leaves unfold with a reddish tinge; creamy flower clusters open in May.'],
			['Summer', 'Green berries swell and colour through July and August. Leaves stay a clean mid-green.'],
			['Autumn', 'Peak rowan: scarlet berry clusters against leaves turning yellow, orange and deep red. Berries are usually stripped by thrushes within weeks.'],
			['Winter', 'Slender silvery trunk and upswept branches; purple-brown buds are hairy at the tip.']
		],
		folklore: [
			[
				'The witch-ward',
				'No British tree carries more protective folklore. A rowan by the door kept ill-wishing out of the house; a cross of two rowan twigs bound with red thread was tucked above the byre door, sewn into coat linings, or tied to a cow’s tail to protect the milk. In Scotland, cutting down a rowan growing by a croft was seriously unlucky, which is why old crofts so often still have one. The Gaelic and Norse traditions agree on this to a striking degree — in the Norse Edda, a rowan bends over a river to save Thor from drowning.'
			],
			[
				'Quickbeam and the berry mark',
				'One old explanation for rowan’s protective power is the tiny five-pointed star at the base of each berry, opposite the stalk — a pentagram, an ancient protective sign. Another name, quickbeam or quicken tree, comes from "quick" meaning living, as in the quick and the dead. Rowan wood was preferred for tools that needed luck: spindles, walking sticks, cattle goads and divining rods.'
			]
		],
		science: [
			[
				'The preservative in your kitchen',
				'Sorbic acid — E200, one of the most widely used food preservatives in the world — was first isolated in 1859 from rowan berries by distilling unripe fruit, and is named after the genus *Sorbus*. It inhibits moulds and yeasts, which is precisely what the berry needs while it hangs on the tree waiting for a bird. The industrial version is now synthesised rather than extracted, but the chemistry started here. Rowan berries also contain parasorbic acid, which upsets human stomachs raw; cooking converts it to harmless sorbic acid, which is why rowan jelly is safe and a handful of raw berries is not.'
			],
			[
				'Built for birds, and for altitude',
				'Rowan’s bright red, high-sugar, low-fat berries are aimed squarely at thrushes, which swallow them whole and pass the seeds intact, often kilometres away. Waxwings arriving from Scandinavia in irruption years can strip a street of rowans in days. The species tolerates cold, wind, thin acid soils and short growing seasons, letting it colonise ledges and gullies above the treeline where seed has been dropped by a perching bird — botanists call these "flying trees", because their distribution maps the flight paths of birds rather than the spread of a parent tree.'
			]
		],
		tell: 'The preservative E200 in your bread began as rowan-berry juice — and every berry has a tiny five-pointed star on its base.'
	},
	{
		id: 'beech',
		name: 'Beech',
		latin: 'Fagus sylvatica',
		aka: ['common beech', 'queen of the woods'],
		family: 'Fagaceae (beech family)',
		co2: 25,
		colors: ['#8CBB5E', '#4E8534'],
		key: 'simple',
		key2: 'wavy',
		hint: 'Silky oval leaves with wavy edges; smooth grey bark',
		quick: [
			['Height', 'Up to 45 m; commonly 25–35 m'],
			['Lifespan', '150–300 years; pollards far longer'],
			['Status', 'Native to southern England, planted everywhere'],
			['Where', 'Chalk and limestone, free-draining soils, hangers and beechwoods'],
			['Note', 'Casts the deepest shade of any British broadleaf']
		],
		spot: [
			'Leaves are oval, 4–9 cm, pointed, with a **wavy** (not toothed) margin and five to nine pairs of neat parallel veins. Young leaves are lime green and silkily hairy round the edge — run one between finger and thumb in May and the fringe of hairs is unmistakable.',
			'Bark is smooth, thin and pale elephant-grey, staying smooth into great age. It scars permanently, which is why old beeches carry a century of carved initials.',
			'Buds are long, slender, pointed and copper-brown, held at a sharp angle to the twig, arranged alternately — one of the most elegant winter buds in Britain and diagnostic on its own.',
			'The ground beneath tells you as much as the tree: deep, slow-rotting leaf litter and almost nothing growing, because beech shade is too dense for most plants. Bluebells and wood anemone get round it by flowering before the canopy closes.',
			'Fruit is a woody, four-lobed prickly husk holding two triangular nuts — beech mast. Good mast years are irregular, as with oak.',
			'Hornbeam is the classic confusion: similar oval leaf, but hornbeam leaves are clearly **toothed**, its bark is fluted and sinewy rather than smooth, and its fruit hangs in leafy winged clusters.'
		],
		season: [
			['Spring', 'Translucent lime-green leaf burst in late April — the "beech green" light inside a beechwood is a distinct phenomenon worth standing in.'],
			['Summer', 'Dense shade, dark green canopy, bare brown floor. Beech roots run shallow and wide, so the ground is often knotted with them.'],
			['Autumn', 'Copper, gold and russet, holding colour for weeks; beech is the backbone of most British autumn woodland displays.'],
			['Winter', 'Smooth grey trunks and slender copper buds. Young beech and beech hedges keep dead brown leaves all winter — marcescence.']
		],
		folklore: [
			[
				'The first books',
				'The words "book" and "beech" descend from the same Germanic root — Old English *bōc* meant both. The connection is generally explained by early runic inscriptions cut into beech tablets or bark; the German *Buch* and *Buche* preserve the same pair. Beech was the tree of writing and record long before paper, and mature beech bark remains the most tempting surface in any wood for anyone with a penknife.'
			],
			[
				'Under the beeches',
				'Because beech casts such deep shade and grows on thin chalk soils where little else thrives, beech hangers became meeting places and boundary markers, and later the object of a peculiarly English kind of reverence — the Chiltern beechwoods, the Burnham Beeches, Selborne’s hanger described by Gilbert White as "the most lovely of all forest trees". White’s eighteenth-century notes on beech phenology are still cited by climate scientists tracking leaf-burst dates.'
			]
		],
		science: [
			[
				'Engineering its own forest',
				'Beech is the textbook shade-tolerant dominant, the opposite of birch. Its seedlings survive in as little as two per cent of full daylight, waiting decades in the understorey for a gap to open, while its own canopy denies that light to almost everything else. Given time and no disturbance, beech therefore replaces most competitors on suitable soils and forms near-monocultures. Its shallow root plate is the trade-off: beech is notably vulnerable to drought and to windthrow, and the great storm of 1987 flattened beech hangers across southern England.'
			],
			[
				'Marcescence: keeping dead leaves',
				'Young beech and clipped beech hedges hold their dead brown leaves through winter instead of shedding them, a habit called marcescence. The favoured explanations are protective: a screen of dead leaves may deter deer browsing on the buds beneath, trap snow and leaf litter to enrich the soil around a young tree, and buffer the buds against cold and desiccation. Mature beech, out of reach of deer, drops its leaves normally — the same tree can do both at different heights.'
			],
			[
				'Beech mast and the fungal web',
				'Beech is heavily dependent on mycorrhizal fungi, and beechwoods are among the best places in Britain to see autumn fungi precisely because so many species trade sugar with beech roots. Much of the research behind the popular idea of a "wood-wide web" was done in temperate forests of this kind: fungal networks demonstrably move carbon, water and nutrients between roots, though how much benefit flows to seedlings, and whether trees "cooperate" in any meaningful sense, remains genuinely contested among scientists.'
			]
		],
		tell: 'The word "book" is the word "beech" — early runes were cut into beech tablets.'
	},
	{
		id: 'ash',
		name: 'Ash',
		latin: 'Fraxinus excelsior',
		aka: ['common ash', 'European ash'],
		family: 'Oleaceae (olive family)',
		co2: 20,
		colors: ['#9BC08A', '#5E8A4E'],
		key: 'compound',
		key2: 'ladder',
		hint: 'Smooth-edged leaflets; jet-black velvet buds',
		quick: [
			['Height', 'Up to 35 m'],
			['Lifespan', '200–400 years; coppice stools far older'],
			['Status', 'Native, common — but in steep decline from ash dieback'],
			['Where', 'Base-rich and calcareous soils, limestone pavement, hedgerows'],
			['Threat', 'Ash dieback (*Hymenoscyphus fraxineus*), arrived 2012']
		],
		spot: [
			'Buds are the fastest identification in British botany: **jet black**, velvety, opposite each other, with a big conical one at the twig tip. Nothing else looks like it, and it works all winter.',
			'Leaves are pinnate with three to six pairs of leaflets plus a terminal one. Leaflet edges are only very finely toothed, appearing almost smooth at arm’s length — the practical contrast with rowan’s sharply toothed leaflets.',
			'Seeds hang in bunches of single-winged "keys" that twist as they fall and often stay on the tree deep into winter, rattling.',
			'Bark is pale grey and smooth when young, developing a regular network of interlacing ridges and furrows with age — more orderly than oak’s.',
			'The crown is open and airy with upswept branch ends that curve up like a candelabra, so ash woods feel light and grassy underfoot. Ash comes into leaf late and drops early, giving a short shade season.',
			'Dieback signs to note: diamond-shaped dark lesions where a side shoot meets the trunk, blackened wilting leaves in summer, dead twig tips, and a thinning crown with bushy epicormic tufts lower down.'
		],
		season: [
			['Spring', 'Very late into leaf, often not until May. Purple-black flower clusters open before the leaves; ash can be male, female, or both, and can switch between years.'],
			['Summer', 'Light dappled shade; green keys hang in bunches. Watch for wilting black leaf tips, the clearest dieback symptom.'],
			['Autumn', 'Leaves drop early and often go straight from green to brown-yellow, shedding leaflets separately and leaving bare stalks.'],
			['Winter', 'Black buds, pale ridged bark, upswept twigs and rattling bunches of dry keys.']
		],
		folklore: [
			[
				'The world tree',
				'Yggdrasil, the tree that holds the nine worlds of Norse cosmology together, is usually described as an ash. Its roots reach the wells of fate, a squirrel runs messages up and down its trunk, and the first man, Ask, is made from ash wood. Whether the medieval Icelandic sources preserve genuinely old belief or literary invention is debated, but the association of ash with the axis of the world runs through Germanic and Scandinavian material and into English usage — the "ash-tree of the world" is one of the great images in European myth.'
			],
			[
				'Passing through the tree',
				'British ash folklore is dominated by healing. A young ash was split lengthways, a sick or ruptured child passed naked through the gap, and the tree bound up again — as the wound healed, so, it was believed, would the child, and the two fates stayed linked for life. Gilbert White described these "shrew-ashes" and split ashes around Selborne in the 1770s as still in use. Ash sap was also given to newborns in the Highlands, and ash twigs used against adders, which folklore insisted would never cross ash wood.'
			]
		],
		science: [
			[
				'Dieback, and the survivors',
				'*Hymenoscyphus fraxineus*, a fungus native to east Asia where local ashes tolerate it, reached Britain in 2012, probably on imported nursery stock, and is expected to kill a large majority of the country’s ash — one of the biggest changes to the British landscape since Dutch elm disease. The critical detail is that resistance is partial, heritable and already present: a small percentage of trees show much lower susceptibility, controlled by many genes of small effect rather than one. That makes recovery through natural selection plausible over decades, which is why the current advice is often to leave standing ash and let seedlings compete rather than fell healthy trees pre-emptively.'
			],
			[
				'The most useful timber in Britain',
				'Ash is strong, elastic, and shock-absorbent — it bends far before it breaks and does not splinter easily. That combination made it the wood of tool handles, cart shafts, oars, hockey sticks, snooker cues, ladder rungs, wheel felloes and early aircraft frames; the Morgan car still uses an ash frame. It also burns green better than any other British timber, hence the old rhyme that ash wood wet or ash wood dry, a king shall warm his slippers by.'
			],
			[
				'Ash as habitat',
				'Because ash casts light shade and grows on base-rich soils, ash woodland has an exceptionally rich ground flora — dog’s mercury, ramsons, bluebell, orchids — and its rough bark supports over 500 species of lichen, more than most other trees. Around 45 species are thought to depend on ash entirely, which is why dieback is a cascade rather than the loss of a single species.'
			]
		],
		tell: 'The Norse universe hung on the branches of an ash tree.'
	},
	{
		id: 'holly',
		name: 'Holly',
		latin: 'Ilex aquifolium',
		aka: ['common holly', 'English holly', 'hulver'],
		family: 'Aquifoliaceae (holly family)',
		co2: 8,
		colors: ['#2E6B3A', '#1C4A26'],
		key: 'simple',
		key2: 'spiny',
		hint: 'Glossy evergreen, spiny below, smooth up high',
		quick: [
			['Height', 'Usually 5–15 m; occasionally 25 m'],
			['Lifespan', '100–300 years'],
			['Status', 'Native, common; our only native broadleaf evergreen tree'],
			['Where', 'Woodland understorey, hedges, gardens; tolerates deep shade'],
			['Note', 'Male and female trees are separate — only females fruit']
		],
		spot: [
			'Leaves are thick, glossy dark green, leathery, and edged with hard spines — but only where it matters. Look up: leaves above roughly two metres are often nearly spineless with a smooth wavy edge, on the very same tree.',
			'Berries are scarlet, in tight clusters against the twig, and appear only on **female** trees. If a holly never fruits, it is not failing; it is male.',
			'Bark is smooth, thin and pale grey, often with scattered warty bumps. Young twigs are green and stay green for a year or two.',
			'Flowers are small, white or pink-flushed, four-petalled and sweetly scented, in May to June, clustered where leaf meets twig. Male flowers show four obvious stamens; female flowers a green central ovary.',
			'Holly regenerates readily from seed dropped by thrushes and is a common woodland understorey shrub — a dense holly thicket under oak is one of the darkest habitats in Britain.',
			'Look-alikes are mostly garden plants: holm oak has spiny leaves when young but grey-felted undersides and acorns; Oregon-grape (*Berberis*) has spiny compound leaves and blue-black fruit.'
		],
		season: [
			['Spring', 'Fresh glossy growth in May, with clusters of small scented white flowers working hard for bees.'],
			['Summer', 'Green berries; the holly blue butterfly’s spring generation lays on the flower buds.'],
			['Autumn', 'Berries redden. Leaf fall happens quietly and continuously — holly is evergreen, not eternal, and each leaf lasts two to three years.'],
			['Winter', 'The most conspicuous season: red berries and dark glossy leaves against bare wood. Berries are a critical late-winter food for thrushes.']
		],
		folklore: [
			[
				'The midwinter guest',
				'Holly came indoors at midwinter centuries before the Christmas tree arrived from Germany, and the practice appears to be pre-Christian: an evergreen with red fruit, brought inside at the darkest point of the year, is a straightforward statement of survival. Christianity absorbed it, reading the spines as the crown of thorns and the berries as blood, and the carol "The Holly and the Ivy" preserves both layers. The old rules were specific: holly in before Christmas Eve was unlucky, and it had to be out again by Twelfth Night or trouble followed.'
			],
			[
				'The tree you do not fell',
				'Across Britain and Ireland, cutting down a whole holly was widely held to be unlucky, while cutting sprigs was fine. The result is visible in the landscape today: hedgerow hollies left standing as "standards" when everything around them was laid, and old holly trees marking boundaries on moorland. In parts of northern England holly was pollarded deliberately as winter fodder for sheep and deer — "holly hags" survive in Cumbria and the Pennines.'
			]
		],
		science: [
			[
				'Armoured only where it matters',
				'Holly grows spiny leaves where browsing animals can reach and smooth ones higher up — heterophylly, a within-plant response to damage. Experiments show that browsing itself triggers it: leaves grown after heavy nibbling are spinier, and the change is mediated by epigenetic modification, chemical marking of DNA rather than any change to the genes themselves. Since spines cost the plant resources and reduce photosynthetic area, only building them within reach of a deer’s mouth is straightforward economics.'
			],
			[
				'Separate sexes and the berry economy',
				'Holly is dioecious: individual trees are male or female, so a female needs a male within pollinating distance to fruit. Berries persist deep into winter because they are relatively unpalatable at first, becoming acceptable to birds only after repeated frosts break down the bitter compounds — a strategy that saves the fruit for the season when nothing else is available and thrushes are desperate enough to disperse it. Mistle thrushes will defend a single berry-laden holly aggressively for weeks against all comers.'
			]
		],
		tell: 'Holly only bothers being spiky as high as a deer can reach.'
	}
];
