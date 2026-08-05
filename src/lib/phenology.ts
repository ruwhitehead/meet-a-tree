import type { EventId } from './trees.svelte';

/**
 * Nature's Calendar (Woodland Trust) submission support.
 *
 * There is no public submission API, so this does the honest thing: it prepares
 * exactly what their form asks for, hands it to the user, and lets them submit
 * it themselves. Nothing is uploaded from here, and the app records only that
 * you said you'd done it.
 */
export const NATURES_CALENDAR_URL = 'https://naturescalendar.woodlandtrust.org.uk/';

/** Their event vocabulary, mapped from ours. `null` means they don't collect it. */
const EVENT_NAMES: Record<EventId, string | null> = {
	budburst: 'First leaf',
	flower: 'First flowering',
	fruit: 'First ripe fruit',
	tint: 'Full autumn tint',
	bare: 'Bare tree',
	note: null
};

/**
 * Species Nature's Calendar records. Their recording list is deliberately
 * short — a handful of well-known trees observed consistently beats a long list
 * observed badly — so most of the guide is not eligible, and we say so rather
 * than encouraging junk records.
 */
const RECORDED_SPECIES = new Set([
	'oak',
	'sessile-oak',
	'ash',
	'beech',
	'birch',
	'downy-birch',
	'hawthorn',
	'blackthorn',
	'elder',
	'hazel',
	'rowan',
	'chestnut',
	'sycamore',
	'field-maple',
	'lime',
	'holly',
	'wild-cherry',
	'bird-cherry',
	'larch',
	'alder',
	'hornbeam',
	'crab-apple'
]);

export const eventName = (e: EventId): string | null => EVENT_NAMES[e];

export const isRecordable = (speciesId: string, event: EventId): boolean =>
	RECORDED_SPECIES.has(speciesId) && EVENT_NAMES[event] !== null;

/** Is this species on their recording list at all? Worth saying before someone
 *  spends a year on a tree whose dates they cannot use. */
export const isRecordedSpecies = (speciesId: string): boolean => RECORDED_SPECIES.has(speciesId);

/** How many trees they collect — quoted in the UI, so it must not drift. */
export const RECORDED_COUNT = RECORDED_SPECIES.size;

/** Which of their events this species can be recorded for, in their words. */
export function recordableEvents(speciesId: string): string[] {
	if (!RECORDED_SPECIES.has(speciesId)) return [];
	return Object.values(EVENT_NAMES).filter((n): n is string => n !== null);
}

/** Dates already noted that could go to Nature's Calendar but have not. The
 *  count is the whole point: an unsent record is a record nobody else can use. */
export function readyToSend(tree: {
	speciesId: string;
	observations: { event: EventId; submitted?: boolean }[];
}): number {
	return tree.observations.filter((o) => !o.submitted && isRecordable(tree.speciesId, o.event))
		.length;
}

/** Records the user has told us they submitted. The only number in the app that
 *  says what someone has contributed, rather than what they have collected. */
export function sentCount(tree: { observations: { submitted?: boolean }[] }): number {
	return tree.observations.filter((o) => o.submitted).length;
}

export interface SubmissionDraft {
	lines: string[];
	text: string;
}

/** The block a user copies into the Nature's Calendar form. */
export function draftSubmission(opts: {
	speciesName: string;
	latin: string;
	event: EventId;
	date: string;
	place?: string;
	postcode?: string;
}): SubmissionDraft {
	const pretty = new Date(opts.date + 'T12:00:00').toLocaleDateString('en-GB', {
		day: 'numeric',
		month: 'long',
		year: 'numeric'
	});
	const lines = [
		`Species: ${opts.speciesName} (${opts.latin})`,
		`Event: ${eventName(opts.event) ?? opts.event}`,
		`Date seen: ${pretty}`,
		`Location: ${[opts.place, opts.postcode].filter(Boolean).join(', ') || '(add your location)'}`
	];
	return { lines, text: lines.join('\n') };
}
