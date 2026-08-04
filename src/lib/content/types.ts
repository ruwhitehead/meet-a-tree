export type LeafKind = 'needle' | 'simple' | 'lobed' | 'compound';

export interface Species {
	id: string;
	name: string;
	latin: string;
	/** other names people actually use — also searched in Learn */
	aka?: string[];
	family: string;
	/** rough annual CO2 absorption for a mature specimen, kg/yr */
	co2: number;
	/** two gradient stops for the leaf motif where no photo is shown */
	colors: [string, string];
	key: LeafKind;
	key2: string;
	/** one-line distinguishing hint shown in key candidates */
	hint: string;
	/** at-a-glance reference rows: height, lifespan, status, where it grows */
	quick: [label: string, value: string][];
	/** how to be sure — each entry is a full identification note */
	spot: string[];
	/** what to look for right now, by season */
	season: [season: string, note: string][];
	folklore: [title: string, body: string][];
	science: [title: string, body: string][];
	/** "one to tell" — a fact written to be repeated aloud */
	tell: string;
}
