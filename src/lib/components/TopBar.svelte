<script lang="ts">
	import { page } from '$app/state';
	import { base } from '$app/paths';
	import { speciesById } from '$lib/content/species';
	import { shareApp, shareGrove, shareSpecies } from '$lib/share';

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
		<!-- the app-icon tree (scripts/icons.mjs), drawn straight on the page rather
		     than in a green tile: at 24px a tile leaves too little room for the
		     crown to read. Masked, so the canopy bites are transparent, not paper. -->
		<svg class="mark" viewBox="0 0 512 512" aria-hidden="true">
			<mask id="mat-tree" maskUnits="userSpaceOnUse" x="0" y="0" width="512" height="512">
				<rect width="512" height="512" fill="#000" />
				<g fill="#fff">
					<circle cx="256" cy="206" r="108" /><circle cx="140" cy="240" r="82" />
					<circle cx="372" cy="236" r="86" /><circle cx="198" cy="138" r="64" />
					<circle cx="316" cy="142" r="62" /><circle cx="256" cy="152" r="66" />
				</g>
				<g fill="#000">
					<circle cx="146" cy="352" r="84" /><circle cx="362" cy="348" r="86" />
				</g>
				<path d="M231 258C231 334 225.8 372 205 424L307 424C286.2 372 281 334 281 258Z" fill="#fff" />
			</mask>
			<rect width="512" height="512" fill="currentColor" mask="url(#mat-tree)" />
		</svg>
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
		gap: 8px;
		text-decoration: none;
		color: var(--forest);
		min-height: 44px;
	}
	.mark {
		width: 26px;
		height: 26px;
		display: block;
		flex: none;
		/* --deep, not --green: the same token the field-key leaves use, so the
		   mark stays legible when the dark theme flips the paper underneath */
		color: var(--deep);
	}
	.name {
		font-family: var(--display);
		font-size: 16px;
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
