<script lang="ts">
	import '../app.css';
	import { onNavigate } from '$app/navigation';
	import Nav from '$lib/components/Nav.svelte';
	import TopBar from '$lib/components/TopBar.svelte';
	import Toast from '$lib/components/Toast.svelte';
	import Overlays from '$lib/components/Overlays.svelte';

	let { children } = $props();

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
	{@render children()}
	<Nav />
</div>
<Toast />
<Overlays />
