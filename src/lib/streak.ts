/** Local calendar date as YYYY-MM-DD. Used for every dated record in the app. */
export const dateStr = (d: Date): string => {
	const p = (n: number) => String(n).padStart(2, '0');
	return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
};
