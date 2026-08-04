import { browser } from '$app/environment';
import { advanceStreak, dateStr, type Streak } from './streak';
import { speciesById } from './content/species';

export interface Find {
	id: string;
	date: string;
}

interface Persisted {
	finds: Find[];
	streak: Streak;
	milestones: number[];
	visits: number;
}

const KEY = 'grove-v1';
const MILESTONES = [5, 10];

function load(): Persisted {
	if (!browser) return { finds: [], streak: { last: null, count: 1 }, milestones: [], visits: 0 };
	try {
		const raw = localStorage.getItem(KEY);
		const p = raw ? (JSON.parse(raw) as Partial<Persisted>) : {};
		return {
			finds: p.finds ?? [],
			streak: p.streak ?? { last: null, count: 1 },
			milestones: p.milestones ?? [],
			visits: p.visits ?? 0
		};
	} catch {
		return { finds: [], streak: { last: null, count: 1 }, milestones: [], visits: 0 };
	}
}

import { SPECIES } from './content/species';
import { install } from './install.svelte';

export const BADGES: { id: string; name: string; test: (speciesCount: number) => boolean }[] = [
	{ id: 'first', name: 'First Find', test: (c) => c >= 1 },
	{ id: 'handful', name: 'A Handful (5)', test: (c) => c >= 5 },
	{ id: 'ten', name: 'Ten Trees (10)', test: (c) => c >= 10 },
	{ id: 'all', name: 'The Full Grove', test: (c) => c >= SPECIES.length }
];

class Grove {
	finds = $state<Find[]>([]);
	streak = $state<Streak>({ last: null, count: 1 });
	milestones = $state<number[]>([]);
	visits = $state(0);

	/* transient UI state */
	pendingMilestone = $state<number | null>(null);
	toastMsg = $state<string | null>(null);
	sharePreview = $state<{
		url: string;
		filename: string;
		link: string;
		text: string;
	} | null>(null);

	#toastTimer: ReturnType<typeof setTimeout> | undefined;

	constructor() {
		const p = load();
		this.finds = p.finds;
		this.milestones = p.milestones;
		this.streak = advanceStreak(p.streak, new Date());
		this.visits = p.visits + (browser && p.streak.last !== dateStr(new Date()) ? 1 : 0);
		this.save();
	}

	save() {
		if (!browser) return;
		try {
			localStorage.setItem(
				KEY,
				JSON.stringify({
					finds: this.finds,
					streak: this.streak,
					milestones: this.milestones,
					visits: this.visits
				} satisfies Persisted)
			);
		} catch {
			/* storage full or blocked — the session still works in memory */
		}
	}

	get speciesIds(): Set<string> {
		return new Set(this.finds.map((f) => f.id));
	}
	get speciesCount(): number {
		return this.speciesIds.size;
	}
	get co2(): number {
		let total = 0;
		for (const id of this.speciesIds) total += speciesById(id)?.co2 ?? 0;
		return total;
	}
	has(id: string): boolean {
		return this.finds.some((f) => f.id === id);
	}

	addFind(id: string) {
		const sp = speciesById(id);
		if (!sp) return;
		this.finds = [...this.finds, { id, date: dateStr(new Date()) }];
		const count = this.speciesCount;
		if (MILESTONES.includes(count) && !this.milestones.includes(count)) {
			this.milestones = [...this.milestones, count];
			this.pendingMilestone = count;
		}
		this.save();
		this.toast(`${sp.name} added to your Grove 🌿`);
		install.celebrate();
	}

	removeFind(id: string) {
		const sp = speciesById(id);
		this.finds = this.finds.filter((f) => f.id !== id);
		this.save();
		this.toast(`${sp?.name ?? 'Tree'} removed from your grove`);
	}

	toast(msg: string) {
		this.toastMsg = msg;
		clearTimeout(this.#toastTimer);
		this.#toastTimer = setTimeout(() => (this.toastMsg = null), 2600);
	}
}

export const grove = new Grove();
