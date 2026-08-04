import type { Species } from './types';

/** Batch C: the other common broadleaves of hedge and wood. */
export const SPECIES_C: Species[] = [
	{
		id: 'sessile-oak',
		name: 'Sessile oak',
		latin: 'Quercus petraea',
		aka: ['durmast oak', 'Welsh oak'],
		family: 'Fagaceae (beech family)',
		co2: 28,
		colors: ['#5FA55A', '#2F6B2A'],
		key: 'lobed',
		key2: 'rounded',
		hint: 'Lobed leaves on a long stalk; acorns with no stalk',
		quick: [
			['Height', 'Up to 40 m'],
			['Lifespan', '400–1,000 years'],
			['Status', 'Native; dominant oak of the north and west'],
			['Where', 'Acid soils, upland valleys, Atlantic oakwoods'],
			['Note', 'The oak of Welsh, Cumbrian and Highland woods']
		],
		spot: [
			'The rule is a straight swap with English oak: sessile has **long leaf stalks (1–2 cm) and stalkless acorns**, English oak has almost no leaf stalk and long-stalked acorns. "Sessile" means sitting — the acorns sit directly on the twig.',
			'Leaves are slightly larger and more evenly wedge-shaped at the base than English oak, without the little auricle flaps, and the lobes are shallower and more regular.',
			'Leaf undersides carry fine pale hairs along the veins, which you can feel as a slight softness; English oak leaves are effectively smooth beneath.',
			'The trunk is often straighter and the branches less contorted than English oak, giving a tidier, more upright tree — one reason it was favoured for building timber in the west.',
			'Habitat is a strong hint. Sessile oak dominates the steep, wet, acid, mossy Atlantic oakwoods of Wales, Cumbria and western Scotland, where it grows festooned with lichens, ferns and epiphytic mosses.',
			'The two oaks hybridise freely, and intermediate trees are common — if the stalk lengths give a mixed answer, you have probably found a hybrid rather than made a mistake.'
		],
		season: [
			['Spring', 'Leaf burst is a touch earlier than English oak; catkins hang in tassels as the bronze leaves open.'],
			['Summer', 'Rich mid-green canopy; upland sessile oakwoods are at their most atmospheric, dripping with moss and fern.'],
			['Autumn', 'Stalkless acorns ripen tight against the twig; leaves turn a soft yellow-brown.'],
			['Winter', 'Straighter limbs and a more regular crown than English oak, with clustered buds at the twig tips.']
		],
		folklore: [
			[
				'The oak of the western woods',
				'Where English oak carries the folklore of court and parish, sessile oak carries the folklore of the wild wood. The Atlantic oakwoods of Wales and western Scotland — Coed Felinrhyd, Ariundle, the woods of Killarney — were sacred groves, charcoal reserves and cattle shelters in turn, and the Welsh word *derw* sits behind place names all over the country. These woods are also the setting for much of the Mabinogion, whose forests of oak and hazel are more than scenery.'
			]
		],
		science: [
			[
				'Two oaks, one gene pool',
				'English and sessile oak hybridise readily and share so much genetic material that whether they are truly separate species has been argued for a century. Modern genomics gives a satisfying answer: the two remain distinct at a relatively small number of genomic regions under strong selection — the ones controlling drought tolerance and soil chemistry — while freely swapping the rest. Sessile oak tolerates acid, thin, well-drained upland soils; English oak prefers deep, heavy, base-rich lowland clays. They are ecological specialists held apart by habitat rather than by reproductive isolation.'
			]
		],
		tell: 'Sessile oak means "sitting oak" — the acorns sit right on the twig, no stalk at all.'
	},
	{
		id: 'hazel',
		name: 'Hazel',
		latin: 'Corylus avellana',
		aka: ['cobnut', 'filbert'],
		family: 'Betulaceae (birch family)',
		co2: 8,
		colors: ['#A8C46A', '#6E9033'],
		key: 'simple',
		key2: 'toothed',
		hint: 'Round, soft, hairy leaves; catkins in February',
		quick: [
			['Height', '6–12 m; usually a multi-stemmed shrub'],
			['Lifespan', '70 years as a tree; coppice stools 700+ years'],
			['Status', 'Native, very common'],
			['Where', 'Woodland understorey, hedges, scrub — especially on chalk'],
			['Uses', 'Coppiced for hurdles, thatching spars, bean poles, walking sticks']
		],
		spot: [
			'Leaves are almost circular, 6–12 cm, with a short abrupt point, a heart-shaped base, doubly toothed edges and a soft, downy, slightly furry feel on both sides — the softest common leaf in a British hedge.',
			'Catkins are the winter signature: pale yellow "lamb’s tails" 5–7 cm long, hanging in numbers from January, well before any leaves. The female flowers are tiny red tufts on the same bush.',
			'Nuts sit in a ragged, leafy green cup with a torn edge, one to four together, ripening brown by September. If the cup is longer than the nut and tubular, you have a cultivated filbert.',
			'Growth form is diagnostic: many straight stems rising from one base, because hazel has been coppiced for millennia and readily regrows from the stool. A single stem is the exception.',
			'Bark is smooth, shiny coppery brown with distinct horizontal lines of lenticels, peeling slightly in fine papery strips on older stems.',
			'Look for nuts opened by wildlife: a neat round hole with tooth marks means dormouse or wood mouse; a clean split in half means squirrel; a jagged hole with the nut wedged in bark means nuthatch.'
		],
		season: [
			['Spring', 'Catkins from January to March are one of the first signs of the year; leaves follow in April.'],
			['Summer', 'Dense soft-leaved understorey shade; green nuts swelling in their leafy cups.'],
			['Autumn', 'Cobnuts ripen and are stripped fast by squirrels, often while still green. Leaves turn a plain yellow.'],
			['Winter', 'Bare zig-zag twigs with rounded hairy buds, coppery bark, and catkins already forming for the new year.']
		],
		folklore: [
			[
				'Wisdom, water and the hazel rod',
				'Hazel is the tree of knowledge in Irish tradition: the salmon of wisdom gained its knowledge by eating hazelnuts that fell into the well of Segais, and whoever ate the salmon gained it in turn. Hazel rods were the standard tool of the water diviner, and forked hazel is still what most British dowsers cut today. A hazel rod also carried legal authority — it was the wand of office of some medieval officials, and the "rod" of measurement.'
			],
			[
				'The most useful shrub in Britain',
				'Hazel coppice underpinned rural life for thousands of years: split hazel rods made wattle for walls, hurdles for penning sheep, spars for thatching, bean poles, pea sticks, barrel hoops and charcoal. A coppice was cut on a seven-to-fifteen-year rotation, and the stools live almost indefinitely under that treatment — some in ancient woods have been cut continuously since the Middle Ages, making them among the oldest living things in the landscape.'
			]
		],
		science: [
			[
				'The tree that recolonised Britain',
				'Hazel arrived early and fast after the last glaciation, and pollen records show it dominating British woodland around 9,000 years ago to an extent it has never matched since. Its abundance in Mesolithic deposits, together with vast middens of burnt shells, has led archaeologists to argue that people were actively encouraging it — burning to promote nut-bearing thickets. Hazelnuts are 60 per cent fat and store well, which made them one of the most important wild foods in prehistoric Europe.'
			],
			[
				'Coppicing and the light cycle',
				'Cutting hazel to the ground triggers vigorous regrowth from dormant buds on the stool, and the sudden flood of light onto the woodland floor produces the spectacular flushes of bluebell, primrose and violet that follow a fresh cut, along with fritillary butterflies and nightingales that need young scrubby growth. When coppicing stopped across Britain in the twentieth century, those species declined sharply — a reminder that some of our richest habitats are the product of intensive human work, not its absence.'
			]
		],
		tell: 'Some hazel coppice stools have been cut and regrown continuously since the Middle Ages.'
	},
	{
		id: 'alder',
		name: 'Alder',
		latin: 'Alnus glutinosa',
		aka: ['common alder', 'black alder'],
		family: 'Betulaceae (birch family)',
		co2: 14,
		colors: ['#7FA86E', '#3E6B3A'],
		key: 'simple',
		key2: 'toothed',
		hint: 'Round leaves with a notched tip; little woody cones',
		quick: [
			['Height', 'Up to 28 m'],
			['Lifespan', '60–150 years'],
			['Status', 'Native, common'],
			['Where', 'Wet ground — riverbanks, carr, fen, lakesides, ditches'],
			['Note', 'Fixes its own nitrogen; timber hardens under water']
		],
		spot: [
			'Leaves are rounded to slightly pear-shaped, leathery, dark green, and — the giveaway — usually **notched or blunt at the tip** rather than pointed, sometimes almost dented inwards. No other common British tree does this.',
			'Female catkins ripen into small, hard, woody cone-like structures about 1.5 cm long that stay on the tree all winter, black and open. They look like tiny pine cones on a broadleaf, which is unmistakable.',
			'Habitat is nearly diagnostic: alder grows with its roots in water, lining rivers and streams, colonising fen and wet woodland (alder carr). If a broadleaf is standing in a marsh, start here.',
			'Cut or damaged wood turns a startling orange-red on exposure to air, which is one reason the tree acquired a sinister reputation — it appears to bleed.',
			'Buds and young twigs are purple-tinged and slightly sticky (*glutinosa*), and the buds sit on short stalks, which is unusual and useful in winter.',
			'Roots often show as an exposed tangle at the water’s edge, holding the bank together, frequently with a chamber of air and root beneath undercut soil.'
		],
		season: [
			['Spring', 'Purple-brown male catkins lengthen and yellow in February and March, before the leaves; tiny red female flowers sit above them.'],
			['Summer', 'Dark green, dense, and often the last green thing along a dried-out summer stream.'],
			['Autumn', 'Little cones ripen and blacken; leaves fall late and go straight to brown-green without much colour.'],
			['Winter', 'The clearest season: bare twigs hung with last year’s black cones and next year’s catkins together.']
		],
		folklore: [
			[
				'The tree that bleeds',
				'Because cut alder turns from white to bright orange-red within minutes, it was widely believed to bleed, and the tree acquired an uneasy reputation — in Irish tradition, felling one could bring a house fire. Alder was also the wood of the whistle and the pipe, which linked it to music and to summoning, and in Ireland it was associated with the smith and with charcoal. Its habitat added to the mood: alder carr is dark, waterlogged, hard to walk through and full of insects.'
			],
			[
				'Venice stands on it',
				'Alder timber is nearly rot-proof once permanently waterlogged, and much of Venice is built on alder piles driven into the lagoon mud, some over a thousand years old. The same property made it the wood of choice for water pipes, sluice gates, canal lock timbers, clogs and bridge foundations across northern Europe. Above water it decays quickly, which is why it never became a general-purpose building timber.'
			]
		],
		science: [
			[
				'It makes its own fertiliser',
				'Alder roots carry nodules containing *Frankia*, an actinobacterium that fixes atmospheric nitrogen in exchange for sugars — the same trick as legumes, evolved independently. That is why alder can colonise raw gravel, mine spoil and flooded silt where nothing else will grow, and why the ground beneath an alder stand is measurably richer in nitrogen. Foresters and restoration ecologists plant it deliberately as a nurse species to build soil fertility for slower trees, and it is a standard tool in post-industrial land reclamation.'
			],
			[
				'The riverbank engineer',
				'Alder is the keystone tree of British riparian habitat. Its roots armour banks against erosion and create submerged cavities used by fish and invertebrates; its leaf litter, which decomposes fast because of the high nitrogen content, is a primary energy source for stream food webs. The main threat is *Phytophthora alni*, a hybrid water-borne pathogen that appeared in the 1990s and causes dieback along whole river systems, spreading in the water itself.'
			]
		],
		tell: 'Cut an alder and it appears to bleed — the pale wood turns orange-red within minutes.'
	},
	{
		id: 'hornbeam',
		name: 'Hornbeam',
		latin: 'Carpinus betulus',
		aka: ['ironwood', 'yoke elm'],
		family: 'Betulaceae (birch family)',
		co2: 18,
		colors: ['#94B96A', '#4E7A36'],
		key: 'simple',
		key2: 'toothed',
		hint: 'Toothed oval leaves; fluted sinewy trunk; winged nuts',
		quick: [
			['Height', 'Up to 30 m'],
			['Lifespan', '150–300 years; pollards much longer'],
			['Status', 'Native to south-east England; planted widely'],
			['Where', 'Heavy clay woodland, ancient pollards, hedges, formal avenues'],
			['Note', 'The hardest, heaviest timber of any British tree']
		],
		spot: [
			'The trunk is the tell: **fluted and sinewy**, like twisted rope or a flexed muscle, with smooth pale grey bark marked by fine vertical silvery streaks. Once you have seen it you cannot mistake it for beech.',
			'Leaves look like beech at a glance but are clearly and regularly **toothed** all round, with 10–13 pairs of deeply impressed parallel veins that make the leaf look pleated.',
			'Fruit is unlike anything else: small nuts each held at the base of a three-lobed papery green wing, hanging in loose clusters that catch the light and spin as they fall.',
			'Buds are slender, pointed and pressed close against the twig — a subtle but reliable contrast with beech, whose long buds stick out at an angle.',
			'Ancient hornbeam pollards, cut repeatedly at head height for firewood and charcoal, are a speciality of Epping and Hatfield forests; they look like squat, bulbous, many-headed monsters and are centuries old.',
			'Hornbeam hedges, like beech, hold dead brown leaves through winter — check the toothed edge and fluted stems to tell which you are looking at.'
		],
		season: [
			['Spring', 'Fresh pleated leaves in April, with drooping yellow-green catkins.'],
			['Summer', 'Dense shade; the winged fruit clusters develop and hang conspicuously.'],
			['Autumn', 'Clear yellow to orange, holding late; papery wings spin down through the wood.'],
			['Winter', 'Fluted grey trunks are at their most sculptural, and clipped hornbeam keeps a screen of brown leaves.']
		],
		folklore: [
			[
				'The tree of yokes and cogs',
				'Hornbeam’s name says what it was for: "horn" for hardness and "beam" for tree, in the old sense preserved in whitebeam and quickbeam. Its timber is so hard and dense that it was the standard wood for ox yokes, cart axles, butchers’ blocks, mill cogs, piano actions and skittles. Because it dulls tools and cannot easily be worked or split, it never became a joiner’s wood — it was the wood you used when nothing else would survive the wear.'
			]
		],
		science: [
			[
				'Britain’s hardest timber, and pollard longevity',
				'Hornbeam has the highest density and hardness of any native British tree, which is why it was used for machine parts before metal was cheap, and why it burns hotter and longer than almost anything else — it was the preferred charcoal wood for London’s domestic fuel. Repeated pollarding, counter-intuitively, extends life dramatically: cutting the crown reduces wind loading and the tree’s need to support heavy limbs, so the ancient pollards of Epping and Hatfield are often far older than any unmanaged hornbeam nearby. That makes pollarding a conservation tool, not just a historical curiosity.'
			]
		],
		tell: 'Hornbeam is the hardest wood in Britain — it was used for mill cogs before metal was cheap.'
	},
	{
		id: 'field-maple',
		name: 'Field maple',
		latin: 'Acer campestre',
		aka: ['common maple', 'hedge maple'],
		family: 'Sapindaceae (maple family)',
		co2: 12,
		colors: ['#BCC85E', '#7E9B36'],
		key: 'lobed',
		key2: 'hand',
		hint: 'Small five-lobed leaves with blunt tips; corky twigs',
		quick: [
			['Height', '15–20 m; usually much smaller in hedges'],
			['Lifespan', '150–350 years'],
			['Status', 'Native — our only native maple'],
			['Where', 'Hedgerows, chalk and limestone woodland edges, scrub'],
			['Note', 'Butter-yellow autumn colour, the best of any native tree']
		],
		spot: [
			'Leaves are small (4–7 cm — about half the size of sycamore), with five lobes whose tips are **rounded and blunt** rather than pointed, and the leaf stalk bleeds a milky sap when snapped.',
			'Seeds are paired samaras set almost in a **straight horizontal line**, wing-tip to wing-tip, unlike sycamore’s narrower V.',
			'Twigs on older growth develop distinctive corky ridges and wings running along their length, a feature no other British maple has and one you can feel with a thumbnail in winter.',
			'Autumn colour is the giveaway at distance: a clear, glowing butter-yellow to gold, far brighter than sycamore’s muddy brown, lighting up hedgerows in October.',
			'Growth habit is usually shrubby and dense because it is repeatedly cut in hedges; a free-standing field maple is a modest, rounded, twiggy tree rather than a forest giant.',
			'Norway maple is the confusion in towns: much bigger leaves with long-pointed lobes ending in a fine hair-like tip, and milky sap too — but its samaras spread almost flat and its leaves are twice the size.'
		],
		season: [
			['Spring', 'Leaves emerge reddish-bronze; small upright yellow-green flower clusters open with them.'],
			['Summer', 'Dense mid-green hedgerow foliage, often with black tar-spot-like blotches (a different, harmless fungus).'],
			['Autumn', 'The star turn: brilliant butter-yellow, sometimes flushed orange-red, one of the finest native autumn displays.'],
			['Winter', 'Slender twigs with corky wings, small opposite buds, and a dense twiggy outline in the hedge.']
		],
		folklore: [
			[
				'The wood of harps and bowls',
				'Field maple was the most prized turnery wood in medieval England — close-grained, pale, and beautiful when figured. Mazers, the shallow drinking bowls of the Middle Ages, were turned from maple and often mounted in silver; harps and lutes used it for its acoustic properties, as violin makers still use its European cousins. Because a large field maple is uncommon, good timber was scarce enough to be valuable, and maple bowls appear in wills and inventories as items worth listing.'
			]
		],
		science: [
			[
				'A hedge specialist',
				'Field maple is unusually tolerant of hard cutting, shade, drought and lime-rich soil, which is why it survives so well as a hedge component alongside hawthorn. Ecologically it punches above its size: its flowers are an important early nectar source, it hosts numerous aphid species that feed birds, and its leaves decompose quickly to enrich hedge-bottom soil. It is also one of the species used to date hedges — a field maple in the mix suggests an older hedge, because it colonises slowly.'
			]
		],
		tell: 'Medieval drinking bowls — mazers — were turned from field maple and mounted in silver.'
	},
	{
		id: 'lime',
		name: 'Small-leaved lime',
		latin: 'Tilia cordata',
		aka: ['linden', 'pry'],
		family: 'Malvaceae (mallow family)',
		co2: 22,
		colors: ['#A9C86A', '#5E8A36'],
		key: 'simple',
		key2: 'heart',
		hint: 'Heart-shaped leaves with rusty tufts beneath',
		quick: [
			['Height', 'Up to 32 m'],
			['Lifespan', '500+ years; coppice stools far older'],
			['Status', 'Native; an indicator of ancient woodland'],
			['Where', 'Ancient woods on limestone and rich soils; planted in avenues'],
			['Note', 'Nothing to do with the citrus fruit']
		],
		spot: [
			'Leaves are neatly **heart-shaped**, 3–8 cm, with a lopsided base, fine even teeth and an abrupt point. Turn one over: small **rust-coloured tufts of hair** sit in the vein angles, which is the clinching detail.',
			'Flowers hang in small clusters of five to ten, creamy yellow, each cluster attached to a narrow pale papery bract like a ribbon — a structure unique to limes — and they are powerfully, sweetly scented in late June and July.',
			'Bark is grey and smooth when young, becoming finely ridged; the base of an old lime is often a mass of dense twiggy shoots and burrs, which is very characteristic.',
			'The crown is dense and domed, and the tree suckers freely from the base, so old limes often stand at the centre of a ring of their own offspring — a good clue that the wood is old.',
			'Common lime (*Tilia × europaea*), the hybrid planted in most avenues, is far more frequent in towns: bigger leaves, white hairs rather than rust in the vein angles, and huge bosses of shoots round the trunk base.',
			'Aphids on lime produce so much honeydew that the leaves shine, drip, and coat pavements and cars beneath — sticky ground under a big avenue tree is a strong hint.'
		],
		season: [
			['Spring', 'Leaves open early, a fresh yellow-green, quickly reaching full size.'],
			['Summer', 'Heavy sweet scent in late June and July, with bees working the flowers in numbers; honeydew drip at its worst.'],
			['Autumn', 'Soft butter-yellow, dropping early, with the little nutlets and their pale bracts spinning down.'],
			['Winter', 'Reddish twigs with plump red-brown buds, dense twiggy shoots round the trunk base, and a domed crown.']
		],
		folklore: [
			[
				'The tree of assembly',
				'Across Germany and central Europe the lime — *Linde* — was the village tree, planted at the centre of the settlement, and the place where courts sat, dances were held and treaties were sworn. "Under the lime" (*unter der Linden*) appears in medieval German poetry as the setting for both justice and love; Walther von der Vogelweide’s famous lyric uses it exactly that way. Berlin’s Unter den Linden takes its name from the avenue, and countless German villages still have a *Dorflinde* centuries old at the crossroads.'
			],
			[
				'Bast: the forgotten rope',
				'The inner bark of lime — bast — separates into long, strong, flexible fibres when soaked, and was the standard cordage of prehistoric and medieval Europe: rope, netting, matting, shoes, baskets, harness. The Sweet Track in Somerset, built in 3807 BC, used lime bast. The word survives in "bast fibre" and, indirectly, in the Russian *bast* shoes worn into the twentieth century. Lime coppice was managed specifically for it.'
			]
		],
		science: [
			[
				'A relic of a warmer Britain',
				'Small-leaved lime pollen dominates British records from the warm mid-Holocene, around 6,000 years ago, when it was one of the commonest trees in lowland England. It has declined ever since, partly through climate cooling and partly through clearance, and now sets viable seed only in exceptionally warm summers — most British populations reproduce by suckering and layering instead. That makes a stand of small-leaved lime a strong indicator of continuous ancient woodland: the trees are effectively survivors of a warmer past rather than recent colonists.'
			],
			[
				'Bees, honeydew and lime tea',
				'Lime flowers are among the richest nectar sources in the British flora, and lime honey is a distinct, prized product. Lime blossom tea (tilleul) is a long-standing European mild sedative, and there is reasonable evidence for the calming effect of the flavonoids involved. One caveat worth knowing: bumblebees are sometimes found dead beneath flowering limes, which was long blamed on toxic mannose in the nectar — the current explanation is simpler and sadder, that late-season bees exhaust the nectar supply of a hugely attractive tree and starve.'
			]
		],
		tell: 'The Sweet Track, built in 3807 BC, was tied together with rope made from lime bark.'
	},
	{
		id: 'wych-elm',
		name: 'Wych elm',
		latin: 'Ulmus glabra',
		aka: ['Scotch elm', 'mountain elm'],
		family: 'Ulmaceae (elm family)',
		co2: 18,
		colors: ['#9DBA5E', '#5E7F30'],
		key: 'simple',
		key2: 'toothed',
		hint: 'Big rough asymmetric leaves; papery seed discs',
		quick: [
			['Height', 'Up to 40 m'],
			['Lifespan', '250–400 years — if disease allows'],
			['Status', 'Native; the elm most likely to survive Dutch elm disease'],
			['Where', 'Northern and western Britain, upland stream sides, limestone'],
			['Threat', 'Dutch elm disease killed ~25 million British elms from the 1970s']
		],
		spot: [
			'Leaves are large (8–16 cm), broad, rough as sandpaper above, hairy beneath, and strikingly **asymmetric at the base** — one side of the leaf runs much further down the stalk than the other. All elms do this; wych elm does it most dramatically.',
			'The leaf tip is often drawn out into three points, and the leaf stalk is so short it is almost absent, which separates wych elm from the field elms.',
			'Seeds are unmistakable: flat, papery, pale green discs about 2 cm across with the seed set in the middle, hanging in dense bunches in spring **before the leaves** and often smothering the tree.',
			'Flowers appear in February and March as dense reddish tufts on bare twigs, giving the whole crown a purple haze at a distance.',
			'Unlike other British elms, wych elm does not sucker from its roots — it regenerates from seed, which is one reason it has survived better than the suckering field elms.',
			'Signs of Dutch elm disease: yellowing and wilting leaves in summer on individual branches, brown streaking in the sapwood under the bark, and the small pinhole galleries of the elm bark beetle.'
		],
		season: [
			['Spring', 'Purple-red flower tufts in February on bare wood, then a mass of pale green papery seed discs in April before the leaves catch up.'],
			['Summer', 'Big rough dark green leaves; watch for a single branch wilting, the first sign of disease.'],
			['Autumn', 'Dull yellow, falling early and without ceremony.'],
			['Winter', 'Grey ridged bark, zig-zag twigs and dark pointed buds; a broad spreading crown where the tree has been allowed to reach size.']
		],
		folklore: [
			[
				'The elm and the vanished landscape',
				'Elm was so much a part of the English lowland scene — Constable’s and Gainsborough’s hedgerow giants, the "Elm Country" of the Midlands — that its loss to Dutch elm disease from the late 1960s changed the look of England within a decade. Elm timber, like alder, resists rot under water and was used for water mains, ships’ keels, wheel hubs and, notoriously, coffins, which gave the tree a funereal reputation. In folklore elm was associated with elves (the words may be related) and with the passage between worlds.'
			]
		],
		science: [
			[
				'Dutch elm disease, and why wych elm fared better',
				'Dutch elm disease is caused by the fungi *Ophiostoma ulmi* and the far more aggressive *O. novo-ulmi*, spread by elm bark beetles and, critically, through the interconnected root systems of suckering elms. English and field elms clone themselves by root suckers, so a whole hedgerow of genetically identical trees could be infected through its roots and die together. Wych elm reproduces by seed, is genetically variable, and does not share roots — so it survives in scattered pockets, especially in the north and in Brighton, where an isolated population is protected by geography and rigorous sanitation felling. Britain still has millions of young elms in hedges; they simply die back once they grow big enough for the beetle to breed in.'
			]
		],
		tell: 'Elm resists rot under water — London’s first water mains were hollowed elm trunks.'
	}
];
