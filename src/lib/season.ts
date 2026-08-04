export type Season = 'spring' | 'summer' | 'autumn' | 'winter';

/** One definition of season, used by the timeline spine, the species calendar,
 *  the seasonal hunts and the guide, so the colour always means the same thing. */
export function seasonOfMonth(month: number): Season {
	if (month <= 1 || month === 11) return 'winter';
	if (month <= 4) return 'spring';
	if (month <= 7) return 'summer';
	return 'autumn';
}

export const seasonOfDate = (iso: string): Season => seasonOfMonth(Number(iso.slice(5, 7)) - 1);
