export const FACTS: string[] = [
	'An oak can drop 10,000 acorns in a single autumn — then almost none for years. It’s called a mast year, and nobody fully knows how oaks agree on the timing.',
	'Trees in a wood trade sugar through shared fungal networks — older trees have been measured supporting shaded seedlings.',
	'Britain has around three billion trees — roughly 47 for each of us.',
	'The word "book" and the word "beech" are the same word, ten centuries apart.',
	'A single mature oak supports more than 2,300 other species.',
	'Holly grows spiky leaves only as high as browsing deer can reach — above that, it doesn’t bother.',
	'One of the world’s most-used cancer drugs, paclitaxel, was developed from yew trees.',
	'Sycamore seeds autorotate like helicopter blades — drone engineers still study them.',
	'The preservative E200 on your bread label was first made from rowan berries.',
	'Stone-age chewing gum — birch tar with 10,000-year-old tooth marks — still carries its chewers’ DNA.',
	'Many churchyard yews are older than their churches; the church came to the tree.',
	'Two hours a week among trees measurably improves reported health and wellbeing — the dose, oddly, seems to matter.'
];

export const factForDate = (d: Date): string =>
	FACTS[Math.floor(d.getTime() / 86400000) % FACTS.length];

export const SEASONS = [
	'Deep winter',
	'Late winter',
	'Early spring',
	'Spring',
	'Late spring',
	'Early summer',
	'High summer',
	'Late summer',
	'Early autumn',
	'Autumn',
	'Late autumn',
	'Early winter'
];
