export type LeafKind = 'needle' | 'simple' | 'lobed' | 'compound';

export interface Species {
	id: string;
	name: string;
	latin: string;
	/** rough annual CO2 absorption for a mature specimen, kg/yr */
	co2: number;
	/** two gradient stops for the illustrated leaf card */
	colors: [string, string];
	key: LeafKind;
	key2: string;
	/** one-line distinguishing hint shown in key candidates */
	hint: string;
	spot: string[];
	folklore: [title: string, body: string][];
	science: [title: string, body: string][];
	/** "one to tell" — a fact written to be repeated aloud */
	tell: string;
}
