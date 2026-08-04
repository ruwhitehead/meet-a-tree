<script lang="ts">
	import '../app.css';
	import Nav from '$lib/components/Nav.svelte';
	import Toast from '$lib/components/Toast.svelte';
	import Overlays from '$lib/components/Overlays.svelte';
	import InstallPrompt from '$lib/components/InstallPrompt.svelte';

	let { children } = $props();
</script>

<div class="frame">
	{@render children()}
	<InstallPrompt />
	<Nav />
</div>
<Toast />
<Overlays />
