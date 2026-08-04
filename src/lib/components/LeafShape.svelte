<script lang="ts">
	/** Accurate leaf silhouettes for the field key, so the picture matches the
	 *  words. `shape` uses the key2 id, falling back to the leaf kind. */
	let { shape, size = 40 }: { shape: string; size?: number } = $props();
</script>

<span class="wrap" style="--s:{size}px" aria-hidden="true">
	<svg viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="4" stroke-linejoin="round" stroke-linecap="round">
		{#if shape === 'needle' || shape === 'flat'}
			<!-- flat needles in two rows (yew) -->
			<path d="M50 92V14" />
			{#each [24, 36, 48, 60, 72] as y (y)}
				<path d="M50 {y}L20 {y - 8}" /><path d="M50 {y}L80 {y - 8}" />
			{/each}
		{:else if shape === 'paired'}
			<!-- long needles in pairs (pine) -->
			<path d="M50 92V70" />
			<path d="M50 70L26 12" /><path d="M50 70L38 10" />
			<path d="M50 70L74 12" /><path d="M50 70L62 10" />
		{:else if shape === 'rosette'}
			<!-- needles in a tuft (larch) -->
			<path d="M50 92V56" />
			{#each [-70, -50, -30, -10, 10, 30, 50, 70] as a (a)}
				<path d="M50 56L{50 + 40 * Math.sin((a * Math.PI) / 180)} {56 - 40 * Math.cos((a * Math.PI) / 180)}" />
			{/each}
		{:else if shape === 'spiky'}
			<!-- short sharp needles all round the twig (spruce) -->
			<path d="M22 78L78 22" />
			{#each [0, 1, 2, 3, 4] as i (i)}
				<path d="M{30 + i * 12} {70 - i * 12}L{16 + i * 12} {56 - i * 12}" />
				<path d="M{30 + i * 12} {70 - i * 12}L{44 + i * 12} {84 - i * 12}" />
			{/each}
		{:else if shape === 'prickly-three'}
			<!-- prickly whorls of three plus a berry (juniper) -->
			<path d="M50 92V16" />
			{#each [30, 52, 74] as y (y)}
				<path d="M50 {y}L18 {y - 12}" /><path d="M50 {y}L82 {y - 12}" /><path d="M50 {y}L50 {y - 18}" />
			{/each}
			<circle cx="66" cy="66" r="8" />
		{:else if shape === 'simple'}
			<!-- step 1: one undivided blade, edge unbroken -->
			<path d="M50 94V30" />
			<path d="M50 8C24 26 16 50 22 66c6 14 18 22 28 24 10-2 22-10 28-24 6-16-2-40-28-58z" />
			<path d="M50 46L32 40M50 62L32 58M50 46l18-6M50 62l18-4" />
		{:else if shape === 'lobed'}
			<!-- step 1: still one blade, but cut deeply into lobes -->
			<path d="M50 94V50" />
			<path
				d="M50 6C42 10 39 18 42 26C36 21 28 23 26 29C23 36 28 42 34 44C26 47 20 53 22 61C25 70 35 73 43 68C41 77 45 85 50 90C55 85 59 77 57 68C65 73 75 70 78 61C80 53 74 47 66 44C72 42 77 36 74 29C72 23 64 21 58 26C61 18 58 10 50 6Z"
			/>
			<path d="M50 62L34 44M50 62l16-18" />
		{:else if shape === 'compound'}
			<!-- step 1: separate leaflets along one stalk -->
			<path d="M50 94V22" />
			<path d="M50 40L36 32M50 40l14-8M50 64L36 56M50 64l14-8" />
			<ellipse cx="30" cy="28" rx="8" ry="15" transform="rotate(-38 30 28)" />
			<ellipse cx="70" cy="28" rx="8" ry="15" transform="rotate(38 70 28)" />
			<ellipse cx="30" cy="52" rx="8" ry="15" transform="rotate(-38 30 52)" />
			<ellipse cx="70" cy="52" rx="8" ry="15" transform="rotate(38 70 52)" />
			<ellipse cx="50" cy="18" rx="8" ry="15" />
		{:else if shape === 'toothed'}
			<!-- oval, clearly toothed (birch, hazel, cherry) -->
			<path d="M50 94V30" />
			<path d="M50 8C22 26 16 50 22 66c6 14 18 22 28 24 10-2 22-10 28-24 6-16 0-40-28-58z" />
			<path d="M28 40l-8-3M26 54l-9-2M30 66l-9 1M72 40l8-3M74 54l9-2M70 66l9 1" />
		{:else if shape === 'wavy'}
			<!-- oval with a wavy edge and parallel veins (beech) -->
			<path d="M50 94V26" />
			<path d="M50 8C26 24 18 48 22 64c4 16 16 26 28 30 12-4 24-14 28-30 4-16-4-40-28-56z" />
			<path d="M50 40L30 34M50 52L26 48M50 64L28 62M50 40l20-6M50 52l24-4M50 64l22-2" />
		{:else if shape === 'spiny'}
			<!-- spiny evergreen (holly) -->
			<path d="M50 94V26" />
			<path d="M50 10l10 12 14-6-6 16 12 10-14 8 4 16-16-6-4 14-4-14-16 6 4-16-14-8 12-10-6-16 14 6z" />
		{:else if shape === 'narrow'}
			<!-- long ribbon leaf (willow) -->
			<path d="M50 96V72" />
			<path d="M50 72c-10-16-12-40-6-56 3-8 8-12 12-12s9 4 12 12c6 16 4 40-6 56-3 6-6 8-6 8s-3-2-6-8z" transform="translate(-6 0)" />
		{:else if shape === 'heart'}
			<!-- heart-shaped, lopsided base (lime) -->
			<path d="M50 94V34" />
			<path d="M50 12c-14-8-30 0-34 14-4 16 8 34 34 48 26-14 38-32 34-48-4-14-20-22-34-14z" />
		{:else if shape === 'rounded'}
			<!-- rounded wavy lobes (oak) -->
			<path d="M50 94V24" />
			<path d="M50 8c-6 0-8 6-14 6s-8-4-11 0 2 10-2 14-6 8-6 12 8 6 11 10 6 4 10 8 6 8 12 8 8-4 12-8 7-4 10-8 11-6 11-10-2-8-6-12-2-10-2-14-5-4-11 0-8-6-14-6z" />
		{:else if shape === 'hand'}
			<!-- five-lobed, hand-shaped (sycamore, maple, plane) -->
			<path d="M50 96V56" />
			<path d="M50 56L50 8M50 56L18 22M50 56L82 22M50 56L12 56M50 56L88 56" />
			<path d="M50 8l10 20 22-6-10 22 26 6-30 8 8 18-26-12-26 12 8-18-30-8 26-6-10-22 22 6z" />
		{:else if shape === 'cut'}
			<!-- small, deeply cut (hawthorn) -->
			<path d="M50 96V60" />
			<path d="M50 60l-4-16-16 4 10-16-18-8 20-2-6-14 14 8 4-16 6 16 14-8-6 14 20 2-18 8 10 16-16-4z" />
		{:else if shape === 'ladder'}
			<!-- pinnate, leaflets in ladder rows (ash, rowan, elder) -->
			<path d="M50 96V12" />
			{#each [22, 38, 54, 70] as y (y)}
				<ellipse cx="30" cy={y} rx="17" ry="7" /><ellipse cx="70" cy={y} rx="17" ry="7" />
			{/each}
			<ellipse cx="50" cy="12" rx="8" ry="9" />
		{:else if shape === 'fan'}
			<!-- palmate compound, leaflets from one point (horse chestnut) -->
			<path d="M50 96V70" />
			{#each [-72, -40, 0, 40, 72] as a (a)}
				<ellipse
					cx={50 + 32 * Math.sin((a * Math.PI) / 180)}
					cy={70 - 32 * Math.cos((a * Math.PI) / 180)}
					rx="9"
					ry="24"
					transform="rotate({a} {50 + 32 * Math.sin((a * Math.PI) / 180)} {70 - 32 * Math.cos((a * Math.PI) / 180)})"
				/>
			{/each}
		{:else}
			<!-- simple oval fallback -->
			<path d="M50 94V30" />
			<path d="M50 8C24 26 16 50 22 66c6 14 18 22 28 24 10-2 22-10 28-24 6-16-2-40-28-58z" />
		{/if}
	</svg>
</span>

<style>
	.wrap {
		display: block;
		width: var(--s);
		height: var(--s);
		color: var(--deep);
	}
	svg {
		width: 100%;
		height: 100%;
		display: block;
	}
</style>
