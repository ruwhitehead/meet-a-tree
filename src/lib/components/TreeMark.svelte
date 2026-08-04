<script lang="ts">
	/** The app-icon tree (see scripts/icons.mjs) as an inline mark, for the two
	 *  places the brand appears: the mobile top bar and the desktop rail.
	 *
	 *  Masked rather than painted with a background colour, so the two bites out
	 *  of the canopy stay transparent and the mark can sit on paper, card or wash
	 *  without being told which. Takes its colour from `currentColor`.
	 *  The mask id is per-instance: both lockups are in the DOM at once, only
	 *  hidden from each other by breakpoint, so a fixed id would be a duplicate. */
	let { size = 26 }: { size?: number } = $props();
	const uid = $props.id();
</script>

<svg
	class="mark"
	style="width:{size}px;height:{size}px"
	viewBox="0 0 512 512"
	aria-hidden="true"
>
	<mask id="tree-{uid}" maskUnits="userSpaceOnUse" x="0" y="0" width="512" height="512">
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
	<rect width="512" height="512" fill="currentColor" mask="url(#tree-{uid})" />
</svg>

<style>
	.mark {
		display: block;
		flex: none;
	}
</style>
