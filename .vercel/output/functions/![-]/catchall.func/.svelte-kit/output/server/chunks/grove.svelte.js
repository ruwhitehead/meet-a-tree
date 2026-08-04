import "clsx";
import { s as speciesById, S as SPECIES } from "./species.js";
const dateStr = (d) => {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
};
function advanceStreak(prev, today) {
  const t = dateStr(today);
  if (prev.last === t) return prev;
  const y = new Date(today);
  y.setDate(y.getDate() - 1);
  const consecutive = prev.last === dateStr(y);
  return { last: t, count: consecutive ? prev.count + 1 : 1 };
}
const MILESTONES = [5, 10];
function load() {
  return {
    finds: [],
    streak: { last: null, count: 1 },
    milestones: [],
    visits: 0
  };
}
const BADGES = [
  { id: "first", name: "First Find", test: (c) => c >= 1 },
  { id: "handful", name: "A Handful (5)", test: (c) => c >= 5 },
  { id: "ten", name: "Ten Trees (10)", test: (c) => c >= 10 },
  {
    id: "all",
    name: "The Full Grove",
    test: (c) => c >= SPECIES.length
  }
];
class Grove {
  finds = [];
  streak = { last: null, count: 1 };
  milestones = [];
  visits = 0;
  /* transient UI state */
  pendingMilestone = null;
  toastMsg = null;
  sharePreview = null;
  #toastTimer;
  constructor() {
    const p = load();
    this.finds = p.finds;
    this.milestones = p.milestones;
    this.streak = advanceStreak(p.streak, /* @__PURE__ */ new Date());
    this.visits = p.visits + 0;
    this.save();
  }
  save() {
    return;
  }
  get speciesIds() {
    return new Set(this.finds.map((f) => f.id));
  }
  get speciesCount() {
    return this.speciesIds.size;
  }
  get co2() {
    let total = 0;
    for (const id of this.speciesIds) total += speciesById(id)?.co2 ?? 0;
    return total;
  }
  has(id) {
    return this.finds.some((f) => f.id === id);
  }
  addFind(id) {
    const sp = speciesById(id);
    if (!sp) return;
    this.finds = [
      ...this.finds,
      { id, date: dateStr(/* @__PURE__ */ new Date()) }
    ];
    const count = this.speciesCount;
    if (MILESTONES.includes(count) && !this.milestones.includes(count)) {
      this.milestones = [...this.milestones, count];
      this.pendingMilestone = count;
    }
    this.save();
    this.toast(`${sp.name} added to your Grove 🌿`);
  }
  removeFind(id) {
    const sp = speciesById(id);
    this.finds = this.finds.filter((f) => f.id !== id);
    this.save();
    this.toast(`${sp?.name ?? "Tree"} removed from your grove`);
  }
  toast(msg) {
    this.toastMsg = msg;
    clearTimeout(this.#toastTimer);
    this.#toastTimer = setTimeout(() => this.toastMsg = null, 2600);
  }
}
const grove = new Grove();
export {
  BADGES as B,
  grove as g
};
