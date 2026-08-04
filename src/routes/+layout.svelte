<script lang="ts">
	import '../app.css';
	import { onNavigate } from '$app/navigation';
	import Nav from '$lib/components/Nav.svelte';
	import TopBar from '$lib/components/TopBar.svelte';
	import InstallPrompt from '$lib/components/InstallPrompt.svelte';
	import Toast from '$lib/components/Toast.svelte';
	import Overlays from '$lib/components/Overlays.svelte';
	import { requestPersistence } from '$lib/photos';
	import { base } from '$app/paths';
	import { page } from '$app/state';
	import { SPECIES } from '$lib/content/species';
	import Onboarding from '$lib/components/Onboarding.svelte';

	let { children } = $props();

	// Ask the browser not to evict this site's storage. Chrome grants it quietly
	// for installed or well-used sites; it only ever helps, and photos are the
	// thing worth protecting.
	$effect(() => {
		void requestPersistence();
	});

	// App-like cross-fade between views (skipped for reduced-motion users)
	onNavigate((navigation) => {
		if (!document.startViewTransition) return;
		if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
		return new Promise((resolve) => {
			document.startViewTransition(async () => {
				resolve();
				await navigation.complete;
			});
		});
	});
</script>

<svelte:head>
	<!-- Link previews had no Open Graph data at all, so a shared link unfurled
	     with no picture and whatever text the platform guessed. Page-level tags
	     override these where they say something more specific. -->
	<meta property="og:site_name" content="Meet a Tree" />
	<meta property="og:type" content="website" />
	<meta property="og:title" content="Meet a Tree" />
	<meta
		property="og:description"
		content="A free pocket field guide to {SPECIES.length} trees of Britain and Ireland — how to spot them, their folklore and their science. In support of the International Tree Foundation."
	/>
	<meta property="og:image" content="{page.url.origin}{base}/images/og-card.jpg" />
	<meta property="og:image:type" content="image/jpeg" />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	<meta property="og:url" content={page.url.href} />
	<meta name="twitter:card" content="summary_large_image" />
</svelte:head>

<div class="frame">
	<TopBar />
	<InstallPrompt />
	{@render children()}
	<Nav />
</div>
<Onboarding />
<Toast />
<Overlays />
