export interface Streak {
	last: string | null;
	count: number;
}

export const dateStr = (d: Date): string => {
	const y = d.getFullYear();
	const m = String(d.getMonth() + 1).padStart(2, '0');
	const day = String(d.getDate()).padStart(2, '0');
	return `${y}-${m}-${day}`;
};

/** Advance a streak given a visit on `today` (local date). Pure, for testability. */
export function advanceStreak(prev: Streak, today: Date): Streak {
	const t = dateStr(today);
	if (prev.last === t) return prev;
	const y = new Date(today);
	y.setDate(y.getDate() - 1);
	const consecutive = prev.last === dateStr(y);
	return { last: t, count: consecutive ? prev.count + 1 : 1 };
}
