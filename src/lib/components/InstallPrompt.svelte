<script lang="ts">
	import { base } from '$app/paths';
	import { install } from '$lib/install.svelte';
	import { grove } from '$lib/grove.svelte';
	import { trees } from '$lib/trees.svelte';
	import { SPECIES } from '$lib/content/species';

	/** Sits in the page flow directly under the top bar, on every screen — a
	 *  floating bar would cover content and fail the touch-target audit. */
	let steps = $state(false);

	const p = install.platform;

	// Copy earns its keep by naming what the user already has to lose.
	const reason = $derived(
		trees.count > 0
			? `You're following ${trees.count === 1 ? 'a tree' : `${trees.count} trees`}. Keep ${trees.count === 1 ? 'it' : 'them'} one tap away.`
			: grove.speciesCount > 0
				? `Your grove holds ${grove.speciesCount} ${grove.speciesCount === 1 ? 'species' : 'species'}. Keep it in your pocket.`
				: `All ${SPECIES.length} trees, pictures included, work with no signal once it’s on your home screen.`
	);

	async function act() {
		if (install.prompt) {
			await install.prompt.prompt();
			const choice = await install.prompt.userChoice.catch(() => null);
			install.prompt = null;
			if (choice?.outcome === 'accepted') install.markInstalled();
			else install.snooze();
			return;
		}
		steps = true;
	}

	interface BeforeInstallPromptEvent extends Event {
		prompt: () => Promise<void>;
		userChoice: Promise<{ outcome: string }>;
	}

	function onBeforeInstall(e: Event) {
		e.preventDefault();
		const evt = e as BeforeInstallPromptEvent;
		install.prompt = { prompt: () => evt.prompt(), userChoice: evt.userChoice };
	}

	$effect(() => {
		const installed = () => install.markInstalled();
		window.addEventListener('appinstalled', installed);
		return () => window.removeEventListener('appinstalled', installed);
	});
</script>

<svelte:window onbeforeinstallprompt={onBeforeInstall} />

{#if install.shouldAsk}
	<aside class="bar" aria-labelledby="install-title">
		<div class="head">
			<!-- the generated icon itself, not a re-creation of it: this is a preview
			     of what lands on the home screen, so it must not be able to drift -->
			<img class="icon" src="{base}/icons/icon-192.png" alt="" width="40" height="40" />
			<div class="copy">
				<p class="t" id="install-title">Add Meet a Tree to your home screen</p>
				<p class="b">{reason}</p>
			</div>
		</div>

		{#if steps}
			{#if p.ios}
				<ol class="steps">
					{#if p.iosOtherBrowser}
						<li>Open this page in <strong>Safari</strong> — on iPhone only Safari can do this.</li>
					{/if}
					<li>
						Tap
						<span class="glyph" aria-hidden="true">
							<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9"><path d="M12 16V4" /><path d="M8 8l4-4 4 4" /><rect x="4" y="12" width="16" height="9" rx="2" /></svg>
						</span>
						<strong>Share</strong>, in the bar at the bottom of Safari.
					</li>
					<li>Scroll the list and tap <strong>Add to Home Screen</strong>.</li>
					<li>Tap <strong>Add</strong>. Look for the green tree.</li>
				</ol>
			{:else}
				<ol class="steps">
					<li>Tap the <strong>⋮</strong> menu, top right of Chrome.</li>
					<li>Tap <strong>Add to Home screen</strong> (or <strong>Install app</strong>).</li>
					<li>Confirm <strong>Install</strong>. Look for the green tree.</li>
				</ol>
			{/if}
			<div class="row">
				<button class="btn small" onclick={() => install.markInstalled()}>Done — it's added</button>
				<button class="btn ghost small" onclick={() => install.snooze()}>Close</button>
			</div>
		{:else}
			<div class="row">
				<button class="btn small" onclick={act}>
					{install.prompt ? 'Install' : p.ios ? 'How to add it' : 'Add it'}
				</button>
				<button class="btn ghost small" onclick={() => install.snooze()}>Not now</button>
			</div>
		{/if}
	</aside>
{/if}

<style>
	.bar {
		margin: 0 16px;
		background: var(--card);
		border: 1.5px solid var(--green);
		border-radius: 16px;
		padding: 13px 14px;
		display: flex;
		flex-direction: column;
		gap: 10px;
		flex: none;
	}
	.head {
		display: flex;
		align-items: flex-start;
		gap: 12px;
	}
	.icon {
		width: 40px;
		height: 40px;
		display: block;
		flex: none;
		/* the PNG carries its own rounded corners, so none are added here */
	}
	.copy {
		min-width: 0;
	}
	.t {
		margin: 0;
		font-weight: 700;
		font-size: 14.5px;
		line-height: 1.3;
	}
	.b {
		margin: 3px 0 0;
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
		.bar {
			margin: 0 48px;
			max-width: 520px;
		}
	}
</style>
