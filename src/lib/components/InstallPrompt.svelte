<script lang="ts">
	import { browser } from '$app/environment';
	import { grove } from '$lib/grove.svelte';

	interface BeforeInstallPromptEvent extends Event {
		prompt: () => Promise<void>;
		userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
	}

	let deferred: BeforeInstallPromptEvent | null = $state(null);
	let dismissed = $state(browser ? localStorage.getItem('grove-install-dismissed') === '1' : true);
	let isIos =
		browser && /iphone|ipad|ipod/i.test(navigator.userAgent) && !('standalone' in navigator && (navigator as { standalone?: boolean }).standalone);
	let iosHint = $state(false);

	// Earned, not ambushed: only offer after a 2nd visit or a 3rd identification.
	const earned = $derived(grove.visits >= 2 || grove.finds.length >= 3);

	function onBeforeInstall(e: Event) {
		e.preventDefault();
		deferred = e as BeforeInstallPromptEvent;
	}

	async function install() {
		if (!deferred) {
			iosHint = true;
			return;
		}
		await deferred.prompt();
		deferred = null;
		dismiss();
	}
	function dismiss() {
		dismissed = true;
		if (browser) localStorage.setItem('grove-install-dismissed', '1');
	}
</script>

<svelte:window onbeforeinstallprompt={onBeforeInstall} />

{#if earned && !dismissed && (deferred || isIos)}
	<div class="installbar" role="region" aria-label="Install Grove">
		{#if iosHint}
			<p>On iPhone: tap the <strong>Share</strong> button, then <strong>Add to Home Screen</strong>.</p>
			<button class="btn ghost small" onclick={dismiss}>Got it</button>
		{:else}
			<p><strong>Keep Grove in your pocket</strong> — install it like an app, works offline.</p>
			<div class="row">
				<button class="btn small" onclick={install}>Install</button>
				<button class="btn ghost small" onclick={dismiss}>Not now</button>
			</div>
		{/if}
	</div>
{/if}

<style>
	.installbar {
		position: sticky;
		bottom: 78px;
		margin: 0 16px;
		background: var(--card);
		border: 1px solid var(--wash-line);
		border-radius: 14px;
		padding: 12px 14px;
		box-shadow: var(--shadow);
		z-index: 15;
		display: flex;
		flex-direction: column;
		gap: 8px;
	}
	.installbar p {
		margin: 0;
		font-size: 13px;
		color: var(--soft);
	}
	.installbar p strong {
		color: var(--ink);
	}
</style>
