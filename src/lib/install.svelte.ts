import { browser } from '$app/environment';

/**
 * Install nudging, deliberately patient.
 *
 * The old version asked once on the home page and, if dismissed, never asked
 * again — which meant anyone arriving on a shared species link (the main way
 * this app spreads) never saw it at all. This tracks visits and snoozes instead:
 * "Not now" hides it for a few days rather than forever, and a delight moment
 * (a tree tagged, a species added) can bring it forward, because that is when
 * someone actually wants the app on their home screen.
 */

interface Persisted {
	/** how many separate days the app has been opened */
	visits: number;
	lastVisit: string | null;
	/** ISO date before which we stay quiet */
	snoozeUntil: string | null;
	/** how many times they've pushed it away — three is a no */
	snoozes: number;
	installed: boolean;
}

const KEY = 'mat-install-v2';
const SNOOZE_DAYS = 4;
const MAX_SNOOZES = 3;

function today(): string {
	const d = new Date();
	const p = (n: number) => String(n).padStart(2, '0');
	return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
}

function load(): Persisted {
	const empty: Persisted = {
		visits: 0,
		lastVisit: null,
		snoozeUntil: null,
		snoozes: 0,
		installed: false
	};
	if (!browser) return empty;
	try {
		const raw = localStorage.getItem(KEY);
		// migrate the old one-shot flag: a previous hard dismiss becomes one snooze
		if (!raw) {
			const legacy = localStorage.getItem('mat-install-dismissed') === '1';
			return legacy ? { ...empty, snoozes: 1, snoozeUntil: null } : empty;
		}
		return { ...empty, ...(JSON.parse(raw) as Partial<Persisted>) };
	} catch {
		return empty;
	}
}

export interface Platform {
	standalone: boolean;
	ios: boolean;
	android: boolean;
	mobile: boolean;
	/** iOS browsers other than Safari cannot add to the home screen at all */
	iosOtherBrowser: boolean;
}

function detect(): Platform {
	if (!browser)
		return { standalone: true, ios: false, android: false, mobile: false, iosOtherBrowser: false };
	const ua = navigator.userAgent;
	const ios = /iphone|ipad|ipod/i.test(ua) || (/Macintosh/.test(ua) && navigator.maxTouchPoints > 1);
	const android = /android/i.test(ua);
	return {
		standalone:
			window.matchMedia('(display-mode: standalone)').matches ||
			(navigator as { standalone?: boolean }).standalone === true,
		ios,
		android,
		mobile: ios || android,
		iosOtherBrowser: ios && /crios|fxios|edgios|opt\//i.test(ua)
	};
}

/** The whole decision, as a pure function so it can be tested without a phone. */
export function shouldPrompt(s: {
	installed: boolean;
	mobile: boolean;
	hasBrowserPrompt: boolean;
	snoozes: number;
	snoozeUntil: string | null;
	visits: number;
	earned: boolean;
	today: string;
}): boolean {
	if (s.installed) return false;
	if (!s.mobile && !s.hasBrowserPrompt) return false; // desktop without an install offer
	if (s.snoozes >= MAX_SNOOZES) return false; // three refusals is a no
	if (s.snoozeUntil && s.today < s.snoozeUntil) return false;
	return s.earned || s.visits >= 2;
}

class Install {
	visits = $state(0);
	snoozeUntil = $state<string | null>(null);
	snoozes = $state(0);
	installed = $state(false);
	/** set when a success moment happens, to jump the queue once */
	earned = $state(false);
	/** the browser's own install event, when it offers one */
	prompt = $state<{ prompt: () => Promise<void>; userChoice: Promise<{ outcome: string }> } | null>(
		null
	);
	platform: Platform = detect();

	constructor() {
		const p = load();
		this.snoozeUntil = p.snoozeUntil;
		this.snoozes = p.snoozes;
		this.installed = p.installed || this.platform.standalone;
		this.visits = p.lastVisit === today() ? p.visits : p.visits + 1;
		this.save(p.lastVisit === today() ? p.lastVisit : today());
	}

	save(lastVisit = today()) {
		if (!browser) return;
		try {
			localStorage.setItem(
				KEY,
				JSON.stringify({
					visits: this.visits,
					lastVisit,
					snoozeUntil: this.snoozeUntil,
					snoozes: this.snoozes,
					installed: this.installed
				} satisfies Persisted)
			);
		} catch {
			/* storage blocked — nudging just won't persist */
		}
	}

	/** Quiet if installed, snoozed, refused three times, or not on a phone. */
	get eligible(): boolean {
		return shouldPrompt({
			installed: this.installed || this.platform.standalone,
			mobile: this.platform.mobile,
			hasBrowserPrompt: this.prompt !== null,
			snoozes: this.snoozes,
			snoozeUntil: this.snoozeUntil,
			visits: 99, // eligibility ignores visit count; shouldAsk applies it
			earned: true,
			today: today()
		});
	}

	/** Second visit onwards, or immediately after something worth keeping. */
	get shouldAsk(): boolean {
		return shouldPrompt({
			installed: this.installed || this.platform.standalone,
			mobile: this.platform.mobile,
			hasBrowserPrompt: this.prompt !== null,
			snoozes: this.snoozes,
			snoozeUntil: this.snoozeUntil,
			visits: this.visits,
			earned: this.earned,
			today: today()
		});
	}

	/** Called when the user has just done something they'd want to keep. */
	celebrate() {
		if (this.eligible) this.earned = true;
	}

	snooze() {
		const d = new Date();
		d.setDate(d.getDate() + SNOOZE_DAYS);
		const p = (n: number) => String(n).padStart(2, '0');
		this.snoozeUntil = `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
		this.snoozes += 1;
		this.earned = false;
		this.save();
	}

	markInstalled() {
		this.installed = true;
		this.earned = false;
		this.save();
	}
}

export const install = new Install();
