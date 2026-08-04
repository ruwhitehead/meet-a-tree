/**
 * Seasonal missions: time-boxed hunts that give the calendar teeth.
 *
 * Progress is derived from data the app already holds (grove finds and tree
 * observations dated inside the window), never a parallel state machine — so a
 * mission can never disagree with your grove.
 *
 * Windows are month/day pairs so they repeat every year without a hard-coded
 * year, and a window may wrap the new year.
 */
export interface Mission {
	id: string;
	title: string;
	blurb: string;
	/** inclusive start and end, as [month (0-11), day] */
	from: [number, number];
	to: [number, number];
	/** species ids that count towards it */
	ids: string[];
	/** how many of them are needed to finish */
	target: number;
	/** what the user is actually looking for */
	looking: string;
}

export const MISSIONS: Mission[] = [
	{
		id: 'blossom',
		title: 'Blossom Watch',
		blurb:
			'Spring blossom lasts a fortnight and then it is gone for a year. Find five trees in flower before it goes.',
		looking: 'trees in flower',
		from: [2, 1],
		to: [4, 31],
		ids: ['blackthorn', 'hawthorn', 'wild-cherry', 'bird-cherry', 'crab-apple', 'rowan', 'elder', 'chestnut', 'goat-willow', 'field-maple'],
		target: 5
	},
	{
		id: 'conkers',
		title: 'Conker Hunt',
		blurb:
			'Autumn is the one season when trees hand you the answer. Collect five kinds of nut, key or berry.',
		looking: 'fruit, nuts and keys',
		from: [8, 1],
		to: [10, 15],
		ids: ['chestnut', 'sweet-chestnut', 'oak', 'sessile-oak', 'hazel', 'beech', 'ash', 'sycamore', 'rowan', 'hawthorn', 'blackthorn', 'crab-apple', 'walnut'],
		target: 5
	},
	{
		id: 'colours',
		title: 'Autumn Colours',
		blurb:
			'Every tree turns at its own pace and in its own colour. Catch five of them mid-change.',
		looking: 'leaves turning',
		from: [9, 1],
		to: [10, 30],
		ids: ['beech', 'oak', 'sessile-oak', 'field-maple', 'norway-maple', 'sycamore', 'birch', 'downy-birch', 'hornbeam', 'wild-cherry', 'lime', 'aspen', 'larch', 'wild-service'],
		target: 5
	},
	{
		id: 'evergreens',
		title: 'Midwinter Evergreens',
		blurb:
			'In the dead of winter, the trees still in leaf are the easiest identification of the year — and the oldest midwinter tradition there is.',
		looking: 'trees still in leaf',
		from: [11, 1],
		to: [0, 31],
		ids: ['holly', 'yew', 'pine', 'juniper', 'box', 'holm-oak', 'spruce', 'douglas-fir'],
		target: 4
	},
	{
		id: 'winter-twigs',
		title: 'Winter Twigs',
		blurb:
			'No leaves, no excuses. Name four trees from bark, buds and outline alone — the skill that separates the curious from the confident.',
		looking: 'buds, bark and shape',
		from: [0, 1],
		to: [1, 28],
		ids: ['ash', 'beech', 'oak', 'sessile-oak', 'chestnut', 'sycamore', 'birch', 'alder', 'hazel', 'lime', 'wych-elm', 'black-poplar'],
		target: 4
	},
	{
		id: 'summer-shade',
		title: 'Summer Shade',
		blurb:
			'High summer is the hardest season for identification — everything is green. Work out five by leaf shape alone.',
		looking: 'leaf shapes in full green',
		from: [5, 1],
		to: [7, 31],
		ids: ['oak', 'beech', 'lime', 'sycamore', 'hornbeam', 'ash', 'elder', 'hazel', 'alder', 'white-willow', 'london-plane', 'walnut', 'sweet-chestnut', 'whitebeam'],
		target: 5
	}
];

/** Is `date` inside the mission window (ignoring year, wrapping if needed)? */
export function inWindow(m: Mission, date: Date): boolean {
	const md = (date.getMonth() + 1) * 100 + date.getDate();
	const from = (m.from[0] + 1) * 100 + m.from[1];
	const to = (m.to[0] + 1) * 100 + m.to[1];
	return from <= to ? md >= from && md <= to : md >= from || md <= to;
}

/** Missions running now, then the ones coming next, so the page is never empty. */
export function missionsFor(date: Date): { current: Mission[]; next: Mission[] } {
	const current = MISSIONS.filter((m) => inWindow(m, date));
	const next = MISSIONS.filter((m) => !inWindow(m, date)).sort((a, b) => {
		const days = (m: Mission) => {
			const start = new Date(date.getFullYear(), m.from[0], m.from[1]);
			if (start < date) start.setFullYear(start.getFullYear() + 1);
			return start.getTime() - date.getTime();
		};
		return days(a) - days(b);
	});
	return { current, next: next.slice(0, 2) };
}

/** Human window, e.g. "March to May". */
export function windowLabel(m: Mission): string {
	const name = (mo: number) =>
		new Date(2000, mo, 1).toLocaleDateString('en-GB', { month: 'long' });
	return m.from[0] === m.to[0] ? name(m.from[0]) : `${name(m.from[0])} to ${name(m.to[0])}`;
}
