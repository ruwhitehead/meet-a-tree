/**
 * Tree citizen-science projects a user of this app could genuinely contribute
 * to, with what each one wants and what happens to a record once sent.
 *
 * Every factual claim here is quoted from the project's own pages, listed in
 * `source`. No figure is estimated or rounded up: the app's standing rule
 * against invented impact numbers applies to science as much as to fundraising.
 */
export interface Project {
	id: string;
	name: string;
	/** who runs it, in their own naming */
	run: string;
	/** the one-line reason to bother */
	wants: string;
	/** what it needs from you, as concretely as possible */
	needs: string[];
	/** what happens after you send it */
	then: string;
	url: string;
	source: string;
	/** does Meet a Tree prepare this record for you today? */
	supported: boolean;
}

export const PROJECTS: Project[] = [
	{
		id: 'natures-calendar',
		name: "Nature's Calendar",
		run: 'Woodland Trust, with the UK Centre for Ecology & Hydrology',
		wants: 'The date a tree first came into leaf, flowered, ripened fruit, turned or went bare.',
		needs: [
			'One of the 22 trees in this guide that they collect records for',
			'A date and a location — a postcode is enough',
			'A free account on their site'
		],
		then: 'It joins a database of 2.9 million records that the Trust believes is the longest written biological record of its kind in the UK.',
		url: 'https://naturescalendar.woodlandtrust.org.uk/',
		source: 'naturescalendar.woodlandtrust.org.uk/what-we-record-and-why/why-we-record/',
		supported: true
	},
	{
		id: 'ancient-tree-inventory',
		name: 'Ancient Tree Inventory',
		run: 'Woodland Trust',
		wants: 'The location of an old, fat or hollowing tree that nobody has mapped yet.',
		needs: [
			'The tree plotted on their map',
			'Species, girth and how accessible it is',
			'Decay features — hollowing trunk, dead limbs, fungi — for a veteran or ancient record'
		],
		then: 'A volunteer verifier checks it, and it appears on a public map of the oldest and most important trees in the UK.',
		url: 'https://ati.woodlandtrust.org.uk/add-a-tree/',
		source: 'ati.woodlandtrust.org.uk/add-a-tree/',
		supported: false
	},
	{
		id: 'treealert',
		name: 'TreeAlert',
		run: 'Forest Research, part of the Forestry Commission',
		wants: 'A tree that looks ill — dying crown, bleeding bark, stripped leaves, unfamiliar insects.',
		needs: [
			'Photographs of the symptoms and of the whole tree',
			'Where it is',
			'What you think is wrong, even if you are unsure'
		],
		then: 'It goes to the tree-health surveillance system as an early warning. Observatree volunteers have sent more than 20,000 such reports, and around three quarters turned out to be healthy trees — so a false alarm is a useful answer, not a wasted one.',
		url: 'https://treealert.forestresearch.gov.uk/',
		source: 'observatree.org.uk/blog/2023/10/10-highlights-from-the-past-10-years-of-observatree/',
		supported: false
	},
	{
		id: 'irecord',
		name: 'iRecord',
		run: 'Biological Records Centre, UK Centre for Ecology & Hydrology',
		wants: 'Anything else you identified and can date and place — including trees this guide does not carry.',
		needs: ['What you saw, when and where', 'A photograph helps a verifier agree with you'],
		then: 'Expert volunteers check it, then it reaches the national recording scheme for that group and your local environmental records centre. The Woodland Trust points people here for species records.',
		url: 'https://irecord.org.uk/',
		source: 'irecord.org.uk/about',
		supported: false
	}
];
