<script lang="ts">
	import type { Snippet } from 'svelte';

	let {
		open,
		onclose,
		labelledby,
		children
	}: { open: boolean; onclose: () => void; labelledby: string; children: Snippet } = $props();

	let box: HTMLDivElement | undefined = $state();
	let restoreFocus: Element | null = null;

	$effect(() => {
		if (open && box) {
			restoreFocus = document.activeElement;
			const first = box.querySelector<HTMLElement>('a, button, [tabindex]');
			first?.focus();
		} else if (!open && restoreFocus instanceof HTMLElement) {
			restoreFocus.focus();
			restoreFocus = null;
		}
	});

	function onkeydown(e: KeyboardEvent) {
		if (e.key === 'Escape' && open) onclose();
	}
</script>

<svelte:window {onkeydown} />

{#if open}
	<div class="modal" role="dialog" aria-modal="true" aria-labelledby={labelledby}>
		<button class="scrim" aria-label="Close dialog" onclick={onclose}></button>
		<div class="mbox" bind:this={box}>
			{@render children()}
		</div>
	</div>
{/if}

<style>
	.modal {
		position: fixed;
		inset: 0;
		z-index: 50;
		display: grid;
		place-items: center;
		padding: 22px;
	}
	.scrim {
		position: absolute;
		inset: 0;
		background: rgba(18, 27, 20, 0.6);
		cursor: default;
	}
	.mbox {
		position: relative;
		background: var(--paper);
		border-radius: 20px;
		padding: 24px 22px;
		max-width: 360px;
		width: 100%;
		box-shadow: var(--shadow);
		max-height: 86dvh;
		overflow-y: auto;
	}
	.mbox :global(h2) {
		font-family: var(--display);
		font-weight: 400;
		font-size: 22px;
		margin: 0 0 8px;
	}
	.mbox :global(p) {
		margin: 0 0 8px;
		font-size: 14.5px;
		color: var(--soft);
	}
	.mbox :global(.itf) {
		font-size: 12px;
		margin-top: 10px;
	}
	.mbox :global(.actions) {
		display: flex;
		gap: 10px;
		flex-wrap: wrap;
		margin-top: 14px;
	}
</style>
