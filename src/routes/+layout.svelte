<script lang="ts">
	import '../app.css';
	import { onNavigate } from '$app/navigation';
	import Nav from '$lib/components/Nav.svelte';
	import TopBar from '$lib/components/TopBar.svelte';
	import InstallPrompt from '$lib/components/InstallPrompt.svelte';
	import Toast from '$lib/components/Toast.svelte';
	import Overlays from '$lib/components/Overlays.svelte';
	import { requestPersistence } from '$lib/photos';

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

<div class="frame">
	<TopBar />
	<InstallPrompt />
	{@render children()}
	<Nav />
</div>
<Toast />
<Overlays />
