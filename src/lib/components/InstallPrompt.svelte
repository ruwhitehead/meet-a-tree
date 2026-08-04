<script lang="ts">
	import { browser } from '$app/environment';

	interface BeforeInstallPromptEvent extends Event {
		prompt: () => Promise<void>;
		userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
	}

	const KEY = 'mat-install-dismissed';

	let deferred: BeforeInstallPromptEvent | null = $state(null);
	let dismissed = $state(browser ? localStorage.getItem(KEY) === '1' : true);
	let showHow = $state(false);

	// Already installed? Never nag.
	const standalone =
		browser &&
		(window.matchMedia('(display-mode: standalone)').matches ||
			(navigator as { standalone?: boolean }).standalone === true);

	const ua = browser ? navigator.userAgent : '';
	const isIos =
		/iphone|ipad|ipod/i.test(ua) || (/Macintosh/.test(ua) && browser && navigator.maxTouchPoints > 1);
	const isAndroid = /android/i.test(ua);
	const isMobile = isIos || isAndroid;
	// On iOS only Safari can install; Chrome/Firefox/Edge for iOS cannot.
	const iosOtherBrowser = isIos && /crios|fxios|edgios|opt\//i.test(ua);

	// Shown from the first visit on mobile — installing early is the point.
	// Chromium fires beforeinstallprompt; iOS never does, so we teach the gesture.
	const show = $derived(!standalone && !dismissed && (isMobile || deferred !== null));

	function onBeforeInstall(e: Event) {
		e.preventDefault();
		deferred = e as BeforeInstallPromptEvent;
	}

	async function install() {
		if (deferred) {
			await deferred.prompt();
			const choice = await deferred.userChoice.catch(() => null);
			deferred = null;
			if (choice?.outcome === 'accepted') dismiss();
			return;
		}
		showHow = true; // iOS, or Android before/without the event
	}

	function dismiss() {
		dismissed = true;
		if (browser) localStorage.setItem(KEY, '1');
	}

	// appinstalled isn't in Svelte's window attribute types, so bind it directly.
	$effect(() => {
		const onInstalled = () => dismiss();
		window.addEventListener('appinstalled', onInstalled);
		return () => window.removeEventListener('appinstalled', onInstalled);
	});
</script>

<svelte:window onbeforeinstallprompt={onBeforeInstall} />

{#if show}
	<aside class="installbar" aria-labelledby="install-title">
		<div class="row top">
			<span class="badge" aria-hidden="true">
				<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9"><path d="M6 21c0-9 3-15 12-17-1 9-4 14-12 17z" /><path d="M6 21c2-5 5-9 9-12" /></svg>
			</span>
			<div>
				<p class="it" id="install-title">Add Meet a Tree to your home screen</p>
				<p class="ib">One tap to open in the field, and it works with no signal.</p>
			</div>
		</div>

		{#if showHow && isIos}
			<ol class="steps">
				{#if iosOtherBrowser}
					<li>
						First open this page in <strong>Safari</strong> — on iPhone only Safari can add to the
						home screen.
					</li>
				{/if}
				<li>
					Tap the <strong>Share</strong> button
					<span class="glyph" aria-hidden="true">
						<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9"><path d="M12 16V4" /><path d="M8 8l4-4 4 4" /><rect x="4" y="12" width="16" height="9" rx="2" /></svg>
					</span>
					in Safari's bottom bar.
				</li>
				<li>Scroll down the list and tap <strong>Add to Home Screen</strong>.</li>
				<li>Tap <strong>Add</strong> — the leaf icon appears on your home screen.</li>
			</ol>
			<div class="row"><button class="btn small" onclick={dismiss}>Done</button></div>
		{:else if showHow}
			<ol class="steps">
				<li>Tap the <strong>⋮</strong> menu at the top-right of Chrome.</li>
				<li>Tap <strong>Add to Home screen</strong>, or <strong>Install app</strong> if you see it.</li>
				<li>Confirm <strong>Install</strong> — the leaf icon appears with your apps.</li>
			</ol>
			<div class="row"><button class="btn small" onclick={dismiss}>Done</button></div>
		{:else}
			<div class="row">
				<button class="btn small" onclick={install}>{deferred ? 'Install' : 'Show me how'}</button>
				<button class="btn ghost small" onclick={dismiss}>Not now</button>
			</div>
		{/if}
	</aside>
{/if}

<style>
	.installbar {
		position: sticky;
		bottom: 74px;
		margin: 0 12px 8px;
		background: var(--card);
		border: 1.5px solid var(--green);
		border-radius: 16px;
		padding: 14px 15px;
		box-shadow: 0 -6px 26px rgba(28, 59, 35, 0.16);
		z-index: 25;
		display: flex;
		flex-direction: column;
		gap: 10px;
	}
	.top {
		align-items: flex-start;
		gap: 12px;
	}
	.badge {
		width: 38px;
		height: 38px;
		border-radius: 11px;
		background: var(--wash);
		color: var(--deep);
		display: grid;
		place-items: center;
		flex: none;
	}
	.badge svg {
		width: 22px;
		height: 22px;
	}
	.it {
		margin: 0;
		font-weight: 700;
		font-size: 14.5px;
		color: var(--ink);
		line-height: 1.3;
	}
	.ib {
		margin: 2px 0 0;
		font-size: 12.5px;
		color: var(--soft);
	}
	.steps {
		margin: 0;
		padding-left: 20px;
		font-size: 13px;
		color: var(--soft);
		display: flex;
		flex-direction: column;
		gap: 7px;
	}
	.steps strong {
		color: var(--ink);
	}
	.glyph {
		display: inline-grid;
		place-items: center;
		width: 22px;
		height: 22px;
		border-radius: 5px;
		background: var(--wash);
		color: var(--deep);
		vertical-align: -5px;
	}
	.glyph svg {
		width: 14px;
		height: 14px;
	}
	@media (min-width: 900px) {
		.installbar {
			position: static;
			margin: 0 0 8px;
			max-width: 480px;
		}
	}
</style>
