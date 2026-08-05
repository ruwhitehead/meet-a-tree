import { EVENTS, type MyTree } from './trees.svelte';

/**
 * Rewards drawn from the user's own data rather than a streak counter. A number
 * that goes up is a chore; "nine days earlier than last year" is a finding.
 */
export interface Record {
	kind: 'earlier' | 'later' | 'years' | 'first';
	label: string;
	detail: string;
}

const dayOfYear = (iso: string): number => {
	const d = new Date(iso + 'T12:00:00');
	return Math.round((d.getTime() - new Date(d.getFullYear(), 0, 0).getTime()) / 86400000);
};

const pretty = (iso: string) =>
	new Date(iso + 'T12:00:00').toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });

export function recordsFor(tree: MyTree): Record[] {
	const out: Record[] = [];
	const byEvent = new Map<string, string[]>();
	for (const o of tree.observations) {
		if (o.event === 'note') continue;
		if (!byEvent.has(o.event)) byEvent.set(o.event, []);
		byEvent.get(o.event)!.push(o.date);
	}

	for (const [event, dates] of byEvent) {
		const label = EVENTS.find((e) => e.id === event)?.label ?? event;
		const sorted = [...dates].sort();
		const years = new Set(sorted.map((d) => d.slice(0, 4)));

		if (sorted.length === 1) {
			out.push({
				kind: 'first',
				// not `First ${label}`: the labels already begin with "First", which
				// read as "First first leaves on record"
				label: `${label} — your first record`,
				detail: `${pretty(sorted[0])} ${sorted[0].slice(0, 4)} — next year has something to beat.`
			});
			continue;
		}

		const latest = sorted[sorted.length - 1];
		const previous = sorted[sorted.length - 2];
		const shift = dayOfYear(latest) - dayOfYear(previous);
		if (Math.abs(shift) >= 2) {
			out.push({
				kind: shift < 0 ? 'earlier' : 'later',
				label: `${label} ${Math.abs(shift)} days ${shift < 0 ? 'earlier' : 'later'}`,
				detail: `${pretty(latest)} this year against ${pretty(previous)} in ${previous.slice(0, 4)}.`
			});
		}

		// the earliest ever, when there is enough history to mean something
		if (years.size >= 3) {
			const earliest = sorted.reduce((a, b) => (dayOfYear(b) < dayOfYear(a) ? b : a));
			if (earliest === latest)
				out.push({
					kind: 'earlier',
					label: `Earliest ${label.toLowerCase()} you have recorded`,
					detail: `Across ${years.size} years of watching this tree.`
				});
			out.push({
				kind: 'years',
				label: `${years.size} years of records`,
				detail: `You have recorded ${label.toLowerCase()} here ${years.size} times.`
			});
		}
	}
	return out.slice(0, 4);
}
