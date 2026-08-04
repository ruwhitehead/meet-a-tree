<script lang="ts">
	import { page } from '$app/state';
	import { base } from '$app/paths';
	import { speciesById } from '$lib/content/species';
	import { shareApp, shareGrove, shareSpecies } from '$lib/share';
	import TreeMark from '$lib/components/TreeMark.svelte';

	/** Share is always one tap away, top right — the app spreads by link, so the
	 *  affordance should never be more than a thumb-reach from wherever you are. */
	const speciesMatch = $derived(page.url.pathname.match(/\/species\/([^/]+)\/?$/));
	const current = $derived(speciesMatch ? speciesById(speciesMatch[1]) : undefined);
	const onGrove = $derived(page.url.pathname.startsWith(`${base}/grove`));

	async function share() {
		if (current) return shareSpecies(current);
		if (onGrove) return shareGrove();
		return shareApp();
	}
</script>

<div class="topbar">
	<a class="brand" href="{base}/">
		<TreeMark size={26} />
		<span class="name">Meet a Tree</span>
	</a>
	<button class="sharebtn" onclick={share} aria-label="Share Meet a Tree">
		<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" aria-hidden="true">
			<circle cx="18" cy="5" r="2.6" /><circle cx="6" cy="12" r="2.6" /><circle cx="18" cy="19" r="2.6" />
			<path d="M8.3 10.7l7.4-4.3M8.3 13.3l7.4 4.3" />
		</svg>
		<span>Share</span>
	</button>
</div>

<style>
	.topbar {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 10px;
		padding: 10px 14px;
		border-bottom: 1px solid var(--line);
		background: var(--paper);
		flex: none;
	}
	.brand {
		display: inline-flex;
		align-items: center;
		gap: 9px;
		text-decoration: none;
		/* one colour for mark and word, so the pair reads as a single lockup.
		   --deep is the token the field-key leaves use, and it survives the dark
		   theme flipping the paper underneath. */
		color: var(--deep);
		min-height: 44px;
	}
	/* Tracked capitals rather than the page title's face at a smaller size: set
	   the same way, the wordmark reads as a lesser heading and the app name goes
	   unnoticed. Caslon also takes a bold cut far better in caps than lowercase. */
	.name {
		font-family: var(--display);
		font-weight: 700;
		font-size: 12px;
		text-transform: uppercase;
		letter-spacing: 0.14em;
	}
	.sharebtn {
		display: inline-flex;
		align-items: center;
		gap: 7px;
		font-size: 13px;
		font-weight: 700;
		color: var(--deep);
		background: var(--wash);
		border: 1px solid var(--wash-line);
		border-radius: 999px;
		padding: 8px 14px;
		min-height: 44px;
		transition: transform 0.12s ease;
	}
	.sharebtn:active {
		transform: scale(0.96);
	}
	.sharebtn svg {
		width: 17px;
		height: 17px;
	}
	@media (min-width: 900px) {
		.topbar {
			border-bottom: none;
			padding: 28px 48px 0;
			background: none;
			grid-column: 2;
			grid-row: 1;
		}
		.brand {
			display: none;
		}
		.sharebtn {
			margin-left: auto;
		}
	}
</style>
