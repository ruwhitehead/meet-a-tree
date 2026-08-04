// Individual trees live only on the user's device, so this route cannot be
// prerendered per-id — it renders client-side from local storage.
export const prerender = false;
export const ssr = false;
