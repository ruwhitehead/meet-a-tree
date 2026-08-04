import type { Species } from './types';

/** Batch D: willows, poplars and the blossom trees. */
export const SPECIES_D: Species[] = [
	{
		id: 'goat-willow',
		name: 'Goat willow',
		latin: 'Salix caprea',
		aka: ['pussy willow', 'great sallow', 'sally'],
		family: 'Salicaceae (willow family)',
		co2: 10,
		colors: ['#B6C97A', '#6E8C44'],
		key: 'simple',
		key2: 'wavy',
		hint: 'Broad grey-woolly leaves; silver catkins in March',
		quick: [
			['Height', '8–10 m; often a large shrub'],
			['Lifespan', '40–100 years'],
			['Status', 'Native, very common'],
			['Where', 'Damp scrub, woodland edges, waste ground, ditches'],
			['Wildlife', 'Vital early nectar for bumblebees; food plant of purple emperor']
		],
		spot: [
			'Leaves are broad and oval — quite unlike the narrow ribbons of most willows — 5–12 cm, with a short twisted tip and a soft, grey, woolly underside you can feel like felt.',
			'Catkins are the famous "pussy willow": soft silver-grey ovals appearing on bare twigs in March, the males turning fluffy yellow with pollen, the females greener and longer.',
			'Male and female catkins are on separate trees, so a bush that produces fluffy yellow catkins will never set the cottony seed you see on others.',
			'Twigs are stout, grey-brown and slightly hairy when young; peel a sliver of bark and the wood beneath has fine ridges, a small feature that separates it from grey willow.',
			'Habitat and habit: an untidy, multi-stemmed, fast-growing shrub of damp neglected ground — railway sides, ditch banks, wet scrub — rather than a stately riverside tree.',
			'Grey willow (*Salix cinerea*) is the near-twin: narrower leaves, rustier hairs beneath, and generally wetter ground. The two hybridise constantly, so many bushes sit between them.'
		],
		season: [
			['Spring', 'The first big nectar event of the year: silver catkins in March turning gold, loud with bumblebees on the first warm day.'],
			['Summer', 'Female bushes release clouds of cottony seed; broad grey-green leaves, often galled or mined.'],
			['Autumn', 'Undistinguished yellow-brown, dropping early.'],
			['Winter', 'Stout grey twigs with plump single-scaled buds already showing the silver of next spring’s catkins.']
		],
		folklore: [
			[
				'Palm Sunday and the pussy willow',
				'Because true palms do not grow in northern Europe, willow catkins stood in for them on Palm Sunday across Britain, Ireland and Russia, where the day is still called *Verbnoye Voskresenye* — Willow Sunday. Branches were blessed, carried in procession and kept behind pictures for the year. "Palm" in English place names and customs — Palm Sunday fairs, palming expeditions — usually means goat willow, and the practice is why so many churchyards have one nearby.'
			]
		],
		science: [
			[
				'Aspirin’s ancestor, and the first food of spring',
				'Willow bark contains salicin, which the body converts to salicylic acid — the compound behind aspirin. Hippocrates recommended willow bark for pain and fever, and the Reverend Edward Stone’s 1763 trial of powdered willow bark on Oxfordshire parishioners is one of the first documented clinical experiments in England; Bayer synthesised acetylsalicylic acid in 1897. Ecologically, goat willow matters most for timing: it flowers when almost nothing else does, and queen bumblebees emerging from hibernation in March depend on it heavily. A single flowering sallow on a warm spring day can carry more insect life than anything else in the hedge.'
			]
		],
		tell: 'The "palms" carried on Palm Sunday in Britain were nearly always willow catkins.'
	},
	{
		id: 'white-willow',
		name: 'White willow',
		latin: 'Salix alba',
		aka: ['cricket-bat willow (var. caerulea)'],
		family: 'Salicaceae (willow family)',
		co2: 20,
		colors: ['#C3D18A', '#7E9B4E'],
		key: 'simple',
		key2: 'narrow',
		hint: 'Long narrow silvery leaves; riverside tree',
		quick: [
			['Height', 'Up to 25 m'],
			['Lifespan', '60–120 years; pollards longer'],
			['Status', 'Native, common by water'],
			['Where', 'River and stream banks, water meadows, wet lowland'],
			['Uses', 'Cricket bats, baskets, charcoal, riverbank stabilisation']
		],
		spot: [
			'Leaves are long, narrow and lance-shaped (5–10 cm, only about 1 cm wide), finely toothed, and covered in fine silky white hairs beneath so the whole tree flickers silver-grey when the wind turns them.',
			'The overall effect at distance is a pale, shimmering, slightly weeping crown by water — noticeably lighter in colour than any other big riverside tree.',
			'Bark is grey-brown with deep, coarse, criss-crossing ridges on old trunks; pollarded willows develop massive swollen boles with a crown of straight rods.',
			'Twigs are slender, flexible and olive-brown; they do not snap cleanly at the base like crack willow’s, which break off with an audible crack.',
			'Weeping willow, the familiar garden and park tree, is a different plant (*Salix × sepulcralis*) with strongly pendulous branches sweeping the ground — white willow only leans.',
			'The cricket-bat willow is a cultivated variety, *Salix alba* var. *caerulea*, grown in straight-trunked plantations in East Anglia and harvested at around 15 years.'
		],
		season: [
			['Spring', 'Slender yellow-green catkins open with the leaves in April; the crown flushes silvery.'],
			['Summer', 'Silver-backed leaves flashing in wind over water; heavy shade on the bank.'],
			['Autumn', 'Soft yellow, falling gradually and late.'],
			['Winter', 'Deeply ridged bark, whippy olive twigs, and the swollen heads of old pollards along the water meadows.']
		],
		folklore: [
			[
				'The tree of grief',
				'Willow’s association with mourning runs deep — "wearing the green willow" meant grieving a lost love in Elizabethan English, and Desdemona sings the Willow Song before her death in *Othello*. The weeping willow reinforced it, and became the standard tree of eighteenth- and nineteenth-century mourning imagery, carved on gravestones and embroidered on samplers. Psalm 137’s harps hung upon the willows of Babylon gave the image scriptural weight, though the tree in question was probably a poplar.'
			],
			[
				'The cricket bat',
				'Every serious cricket bat is made from the same tree: *Salix alba* var. *caerulea*, grown mainly in Essex and Suffolk. Willow is chosen because it is light, tough, and absorbs impact without shattering — the fibres compress rather than split, which is why new bats are "knocked in" to harden the surface. A single tree yields perhaps 30 to 40 bat blades, and the trade has been essentially unchanged for 150 years.'
			]
		],
		science: [
			[
				'Rooting from a stick, and cleaning the ground',
				'Willows root from cuttings with extraordinary ease — push a fresh rod into damp soil and it will grow, which is why willow is the standard material for living riverbank revetments, hurdles and living fences. That vigour, combined with a deep tolerance for waterlogging and a high transpiration rate, makes willow the workhorse of phytoremediation: plantations are used to strip nitrates and heavy metals from contaminated land and to treat sewage effluent in constructed wetlands. Short-rotation willow coppice is also a serious biomass crop, cut every three years for decades from the same stools.'
			]
		],
		tell: 'Every cricket bat in the world comes from one variety of one willow species.'
	},
	{
		id: 'aspen',
		name: 'Aspen',
		latin: 'Populus tremula',
		aka: ['quaking aspen', 'trembling poplar'],
		family: 'Salicaceae (willow family)',
		co2: 14,
		colors: ['#BFCB72', '#7A9440'],
		key: 'simple',
		key2: 'toothed',
		hint: 'Round leaves on flattened stalks — never still',
		quick: [
			['Height', 'Up to 25 m'],
			['Lifespan', '50–100 years per stem; clones far older'],
			['Status', 'Native; local, commonest in Scotland'],
			['Where', 'Damp woods, upland gullies, riverside, poor soils'],
			['Note', 'Spreads by suckers — a stand is often one organism']
		],
		spot: [
			'The leaves never stop moving. Aspen leaf stalks are **flattened at right angles to the blade**, so the slightest breeze sets every leaf twisting and clattering — you can identify an aspen with your eyes shut by the sound.',
			'Leaves are nearly circular, 3–8 cm, with shallow rounded teeth, dull grey-green above and paler beneath; young sucker leaves are much larger and more heart-shaped, which confuses people.',
			'Bark is smooth and pale grey-green with dark diamond-shaped lenticels, becoming dark and ridged only at the very base of old trunks.',
			'It rarely stands alone: aspen spreads by root suckers, so you usually find a clonal thicket of stems of similar age, all genetically identical and all coming into leaf and turning colour on the same day.',
			'Catkins appear in March on bare twigs, long and grey-furry, before the leaves; British aspen sets viable seed only rarely, which is why suckering matters so much.',
			'Poplar look-alikes: white poplar has lobed leaves with brilliant white felted undersides; black poplar has larger triangular leaves and a massively burred, leaning trunk.'
		],
		season: [
			['Spring', 'Grey furry catkins on bare twigs in March; leaves emerge coppery, and the clone flushes as one.'],
			['Summer', 'The characteristic sound — a dry, rain-like rustle from a still-looking wood.'],
			['Autumn', 'Superb clear yellow, occasionally amber, and the whole clone turns together within a day or two.'],
			['Winter', 'Pale greenish-grey smooth bark, dark lenticel diamonds, and thickets of straight suckers.']
		],
		folklore: [
			[
				'The tree that cannot keep still',
				'The trembling of aspen leaves demanded an explanation, and Christian tradition supplied a grim one: the cross was made of aspen, and the tree has shivered with shame ever since. Other versions have it refusing to bow at the Crucifixion, or gossiping about Christ. Celtic tradition read the sound differently — as the tree speaking, or as the voices of the dead — and aspen was used for shields and for the "fé", the measuring rod for graves, which made it deeply unlucky to bring into a house.'
			]
		],
		science: [
			[
				'Why the leaves tremble, and how big a clone can get',
				'The flattened petiole is not decorative: it lets the blade flutter in the lightest air, and the constant movement increases gas exchange and light penetration deep into the canopy, so lower leaves photosynthesise better than they would in still air. It may also deter herbivorous insects, which struggle to hold on. Aspen’s other trick is clonal spread — the famous Pando clone in Utah, of the closely related *Populus tremuloides*, covers 43 hectares with around 47,000 stems from one root system and may be tens of thousands of years old. Scottish aspen clones are far smaller but equally single-minded: because British aspen so rarely sets seed, conservation work now moves cuttings deliberately between clones to restore genetic mixing.'
			]
		],
		tell: 'Aspen leaf stalks are flattened sideways, which is why the tree is never silent.'
	},
	{
		id: 'wild-cherry',
		name: 'Wild cherry',
		latin: 'Prunus avium',
		aka: ['gean', 'mazzard'],
		family: 'Rosaceae (rose family)',
		co2: 16,
		colors: ['#C88C6A', '#9E5236'],
		key: 'simple',
		key2: 'toothed',
		hint: 'Glossy toothed leaves; banded shiny bark; white blossom',
		quick: [
			['Height', 'Up to 30 m'],
			['Lifespan', '60–150 years'],
			['Status', 'Native, common'],
			['Where', 'Woodland edges, hedgerows, chalk and loam; widely planted'],
			['Note', 'Ancestor of most cultivated sweet cherries']
		],
		spot: [
			'Bark is the year-round giveaway: shiny, reddish-brown to purple-grey, peeling in **horizontal papery bands** with prominent raised horizontal lenticel lines, unlike anything else in a British wood.',
			'Leaves are oval, pointed, 6–15 cm, with sharp forward-pointing teeth, drooping slightly, and — look closely — one or two small **red glands** on the leaf stalk where it meets the blade.',
			'Blossom in April is spectacular and unmistakable: clusters of white five-petalled flowers on long stalks, opening just before or with the leaves, so the whole crown turns white.',
			'Fruit is a true cherry, 1–2 cm, red to almost black, sweet or bitter depending on the tree, on a long stalk — usually gone within days, taken by blackbirds and starlings.',
			'The crown is often narrow and the trunk straight with regular whorls of branches; wild cherry suckers freely, so look for a ring of young stems around a parent.',
			'Bird cherry has smaller, duller, non-glossy leaves, upright or spreading spikes of many small flowers, and bitter black fruit — quite different once you have seen both.'
		],
		season: [
			['Spring', 'One of the great British blossom moments in April, and a critical early nectar source.'],
			['Summer', 'Cherries ripen in June and July and vanish fast; leaves are often marked by cherry blackfly curling the shoot tips.'],
			['Autumn', 'Excellent colour — deep crimson, orange and gold, among the best of any native tree.'],
			['Winter', 'The banded, shiny, peeling bark is unmistakable, with clustered buds at the twig tips.']
		],
		folklore: [
			[
				'Blossom, brief and deliberate',
				'The cherry’s cultural weight comes from its brevity — a week of blossom then nothing — and it carries that meaning in Europe as well as in Japan. Housman’s "Loveliest of trees, the cherry now" is explicitly about counting a life in blossom seasons. English cherry orchards, especially in Kent, had their own customs: cherry fairs marking the harvest gave rise to the phrase "life is a cherry fair", meaning briefly sweet and quickly over. Cherry gum was chewed, cherry stones were used in games and counting rhymes, and the wood was prized for pipes and furniture.'
			]
		],
		science: [
			[
				'Bird-planted, and the tree behind your fruit bowl',
				'*Prunus avium* means "bird cherry" in Latin, and the name is functional: birds swallow the fruit and pass the stone intact, which is why wild cherries turn up along hedgerows, fence lines and woodland edges where birds perch. Almost all cultivated sweet cherries derive from this species, domesticated in Anatolia and spread by the Romans — Pliny credits Lucullus with bringing the cherry to Rome in 74 BC. The gum that oozes from wounded cherry bark, once used as an adhesive and chewed as a hunger suppressant, is a defensive polysaccharide that seals injuries against fungal infection.'
			]
		],
		tell: 'Nearly every sweet cherry you have eaten descends from this wild woodland tree.'
	},
	{
		id: 'bird-cherry',
		name: 'Bird cherry',
		latin: 'Prunus padus',
		aka: ['hackberry', 'hagberry'],
		family: 'Rosaceae (rose family)',
		co2: 11,
		colors: ['#A5B67A', '#647F44'],
		key: 'simple',
		key2: 'toothed',
		hint: 'Spikes of many small flowers; bitter black fruit',
		quick: [
			['Height', '8–15 m'],
			['Lifespan', '50–80 years'],
			['Status', 'Native; commonest in the north and on limestone'],
			['Where', 'Damp woods, riverbanks, upland valleys, northern hedges'],
			['Note', 'Fruit is edible but astringent — the birds are welcome to it']
		],
		spot: [
			'Flowers are the clean separation from wild cherry: many small white flowers arranged along **elongated spikes** (racemes) 7–15 cm long, held upright or arching, rather than in tight stalked clusters.',
			'Leaves are matt rather than glossy, 5–10 cm, finely toothed, with a slightly wrinkled surface and a distinctly unpleasant sour smell when crushed — the "hag" in hagberry.',
			'Fruit is small, glossy black, bitter and astringent, hanging in spikes that follow the shape of the flower cluster — so a drooping row of black cherries, rather than the tight stalked bunch of a wild cherry, ripening in July and August.',
			'Bark is smooth, grey-brown and, when scratched, smells strongly and rankly of almonds or marzipan — a reliable field test.',
			'The habit is a small, often multi-stemmed, spreading tree of damp northern woodland; in the Highlands it is a common riverside tree where wild cherry is scarce.',
			'It frequently carries dense webs of bird-cherry ermine moth caterpillars in spring, which can strip a tree bare. It looks catastrophic and the tree almost always recovers.'
		],
		season: [
			['Spring', 'Arching spikes of white blossom in May, later than wild cherry, with a heavy sweet-sour scent.'],
			['Summer', 'Black fruit in hanging spikes; watch for ermine moth webbing on defoliated branches.'],
			['Autumn', 'Yellow to reddish, sometimes good but rarely as fine as wild cherry.'],
			['Winter', 'Grey bark that smells of marzipan when scratched; slender twigs and pointed brown buds.']
		],
		folklore: [
			[
				'The hagberry',
				'The northern English and Scots name — hagberry or hackberry — is old, and the "hag" element probably means hedge rather than witch, though folk belief did the rest: bird cherry was hung over doors in parts of Scotland to keep the plague and the evil eye away, and cutting one could bring bad luck. It also names places: Hagley, Hagworthingham and others. In Scandinavia the tree is *hägg*, deeply woven into folk song, and the flowering of bird cherry marked the point in spring when it was safe to sow.'
			]
		],
		science: [
			[
				'Cyanide in the bark',
				'The marzipan smell of scratched bird-cherry bark comes from benzaldehyde released when the plant’s cyanogenic glycosides — prunasin and amygdalin — break down. The same reaction releases hydrogen cyanide, which is a genuine chemical defence against browsing and infection, and the reason bird cherry’s leaves, bark and stones should not be eaten. Almonds, apricot kernels and cherry laurel use the same chemistry; the almond smell we find pleasant is, from the plant’s point of view, the smell of a loaded weapon.'
			]
		],
		tell: 'Scratch bird-cherry bark and it smells of marzipan — that is cyanide being released.'
	},
	{
		id: 'blackthorn',
		name: 'Blackthorn',
		latin: 'Prunus spinosa',
		aka: ['sloe', 'mother of the wood'],
		family: 'Rosaceae (rose family)',
		co2: 7,
		colors: ['#8FA57E', '#4A6340'],
		key: 'simple',
		key2: 'toothed',
		hint: 'Blossom on black bare twigs; savage thorns; sloes',
		quick: [
			['Height', '3–7 m; dense thicket-forming shrub'],
			['Lifespan', '60–100 years'],
			['Status', 'Native, extremely common'],
			['Where', 'Hedges, scrub, coastal thickets, woodland edge'],
			['Note', 'Flowers before the leaves — hawthorn does the opposite']
		],
		spot: [
			'The clinching test in spring: blackthorn flowers on **bare black twigs** in March, before any leaves appear, while hawthorn leafs out first and flowers in May. A hedge white with blossom in early spring is blackthorn.',
			'Thorns are long, straight, savage and often set at right angles; the bark is very dark, almost black, hence the name, and the twigs are dense and interlacing.',
			'Leaves are small (2–4 cm), oval, dull dark green and finely toothed, appearing only after the flowers have faded — so a blackthorn in full blossom has no leaves at all, which is the fastest way to name it from a moving car.',
			'Fruit is the sloe: a small round blue-black plum with a waxy bloom, intensely astringent raw, ripening from September and best picked after the first frosts.',
			'Growth habit is a suckering thicket, spreading outward from the parent to form impenetrable scrub — excellent nesting cover, and the reason it was used for stock-proof hedging and defensive barriers.',
			'Blackthorn wounds infect readily — the thorns carry bacteria and break off under the skin — which is why hedge-layers respect it more than hawthorn.'
		],
		season: [
			['Spring', 'A "blackthorn winter": clouds of white blossom on bare black wood in March, traditionally coinciding with a cold snap.'],
			['Summer', 'Dense dark thicket, small dull leaves, green sloes swelling.'],
			['Autumn', 'Blue-black sloes with a waxy bloom — the gin-making season, best after a frost softens them.'],
			['Winter', 'Black interlaced twigs and vicious thorns; sloes sometimes persist, shrivelled.']
		],
		folklore: [
			[
				'The blackthorn winter and the witch’s staff',
				'The cold spell that so often coincides with blackthorn blossom has its own name in English folk weather-lore — a blackthorn winter — and the tree carried an unlucky reputation to match. Blackthorn was the wood of the witch’s blasting rod and of the Irish shillelagh, and bringing the blossom indoors was thought to invite death. In Ireland the *bata* of blackthorn was a serious weapon, cured up a chimney to blacken and harden it. The tree’s dual reputation, protective in a hedge and sinister in the hand, matches its behaviour perfectly.'
			],
			[
				'Sloe gin',
				'Sloes are too astringent to eat but transform in alcohol and sugar, and sloe gin is one of the few genuinely old British country drinks still made at home in quantity. Tradition insists on picking after the first frost; the practical version is that freezing ruptures the cell walls and releases the juice, which is why a night in the freezer works just as well.'
			]
		],
		science: [
			[
				'Ancestor of the plum, and a suckering strategy',
				'Blackthorn is one of the parents of the domestic plum: *Prunus domestica* is generally regarded as a hybrid of *P. spinosa* and the cherry plum *P. cerasifera*, which is why sloes look like tiny plums. Its ecological strategy is clonal and defensive — suckering outward to form dense thorny thickets that exclude grazing animals and shelter regenerating trees inside, which is why old countrymen called it "mother of the wood". Sloe stones turn up in prehistoric settlement deposits across Europe, including at Ötzi the iceman’s site, so people have been gathering them for at least five thousand years.'
			]
		],
		tell: 'Blossom on bare black twigs means blackthorn; leaves first, then flowers, means hawthorn.'
	},
	{
		id: 'crab-apple',
		name: 'Crab apple',
		latin: 'Malus sylvestris',
		aka: ['wild apple', 'scrab'],
		family: 'Rosaceae (rose family)',
		co2: 9,
		colors: ['#C0C46A', '#87963A'],
		key: 'simple',
		key2: 'toothed',
		hint: 'Pink-white blossom; small hard sour apples',
		quick: [
			['Height', '5–10 m'],
			['Lifespan', '80–100 years'],
			['Status', 'Native; genuinely wild trees are scarcer than they look'],
			['Where', 'Hedges, woodland edges, ancient woodland, scrub'],
			['Note', 'One of the ancestors of the orchard apple']
		],
		spot: [
			'Blossom is the loveliest thing about it: five-petalled flowers in May, white inside and flushed deep pink outside, in small clusters, filling the tree.',
			'Fruit is a small apple, 2–4 cm, yellow-green often flushed red, hard and mouth-puckeringly sour, hanging on long stalks and persisting after leaf fall.',
			'Leaves are oval, 3–6 cm, finely toothed, with a pointed tip, and — the diagnostic for a truly wild crab — **hairless** beneath once mature. Domestic apples and hybrids keep downy undersides.',
			'The tree is small, spiny and often crooked, with twisted branches and short thorny side-shoots; bark is greyish-brown and cracks into small square plates.',
			'Most "crab apples" in hedges are actually feral seedlings of orchard apples (*Malus domestica*) — downy leaves, larger fruit, no thorns. The genuine article is fussier and rarer.',
			'Ornamental crabs in gardens and streets come in many cultivars with purple leaves or scarlet fruit; the native is subtler and greener.'
		],
		season: [
			['Spring', 'Pink-and-white blossom in May, later than cherry, and a valuable pollinator plant for orchards nearby.'],
			['Summer', 'Small hard green fruit swelling; leaves often marked with apple scab, which is harmless to the tree.'],
			['Autumn', 'Fruit ripens yellow-green and red; leaves turn yellow. Windfalls feed badgers, foxes, thrushes and wasps.'],
			['Winter', 'Twisted spiny outline with fruit often still hanging — a good winter food source.']
		],
		folklore: [
			[
				'Wassailing the apple',
				'Apple wassailing — going to the orchard in midwinter to sing to the trees, drink cider, hang toast in the branches for the robins and make noise to drive off bad spirits — survives in Somerset, Devon, Herefordshire and Kent, and has been enthusiastically revived. Old Twelfth Night, 17 January, is the traditional date. Crab apple also carried love divination: apple pips named for suitors, peel thrown over the shoulder to spell an initial, and the pomace used in charms. "Crabbed" for sour-tempered comes straight from the fruit.'
			]
		],
		science: [
			[
				'Ancestry of the orchard apple',
				'The domestic apple’s main ancestor is *Malus sieversii* from the Tian Shan mountains of Kazakhstan, but genomic work shows that European crab apple contributed substantially through repeated hybridisation as the apple travelled west along the Silk Road — many of the disease-resistance and hardiness traits in modern apples come from *M. sylvestris*. Apples are also famously self-incompatible and highly heterozygous, so a seed never breeds true, which is why every named variety must be grafted and why any pip you plant produces a new, usually sour, wild-type tree. That single fact explains both the existence of crab apples in hedges and the entire history of grafting.'
			]
		],
		tell: 'Plant an apple pip and you get a crab apple — every named variety has to be grafted.'
	}
];
