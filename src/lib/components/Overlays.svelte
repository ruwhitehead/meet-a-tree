<script lang="ts">
	import Modal from './Modal.svelte';
	import { grove } from '$lib/grove.svelte';
	import Give from './Give.svelte';

	let copied = $state(false);

	function closeMilestone() {
		grove.pendingMilestone = null;
	}
	function closeShare() {
		if (grove.sharePreview) URL.revokeObjectURL(grove.sharePreview.url);
		grove.sharePreview = null;
		copied = false;
	}
	async function copyLink() {
		const p = grove.sharePreview;
		if (!p) return;
		const payload = `${p.text} ${p.link}`;
		try {
			await navigator.clipboard.writeText(payload);
			copied = true;
			setTimeout(() => (copied = false), 2200);
		} catch {
			grove.toast('Couldn’t copy — select the link and copy it by hand');
		}
	}
</script>

<Modal open={grove.pendingMilestone !== null} onclose={closeMilestone} labelledby="milestone-title">
	<h2 id="milestone-title">You’ve met {grove.pendingMilestone} trees 🌳</h2>
	<Give tone="earned" reason="That’s {grove.pendingMilestone} species you can name." />
	<div class="actions">
		<button class="btn ghost" onclick={closeMilestone}>Maybe later</button>
	</div>
</Modal>

<Modal open={grove.sharePreview !== null} onclose={closeShare} labelledby="share-title">
	<h2 id="share-title">Share this</h2>
	{#if grove.sharePreview}
		<img class="shareprev" alt="Preview of your share card" src={grove.sharePreview.url} />
		<p class="msg">{grove.sharePreview.text}</p>
		<!-- A real https link, not the blob: URL of the image. A blob URL only
		     exists inside this page — pasted anywhere else it is dead. -->
		<p class="linkrow"><a href={grove.sharePreview.link}>{grove.sharePreview.link.replace(/^https?:\/\//, '')}</a></p>
		<div class="actions">
			<button class="btn" onclick={copyLink}>{copied ? '✓ Copied' : 'Copy message & link'}</button>
			<a class="btn ghost" href={grove.sharePreview.url} download={grove.sharePreview.filename}>
				Save image
			</a>
			<button class="btn ghost" onclick={closeShare}>Done</button>
		</div>
		<p class="hint">
			On a phone this opens your normal share sheet. Here, copy the message or save the picture and
			post it wherever you like.
		</p>
	{/if}
</Modal>

<style>
	.shareprev {
		width: 100%;
		border-radius: 14px;
		border: 1px solid var(--line);
		display: block;
	}
	.msg {
		margin-top: 12px;
		font-size: 14px;
		color: var(--ink);
	}
	.linkrow {
		margin: 6px 0 0;
		font-size: 13px;
		word-break: break-all;
	}
	.linkrow a {
		color: var(--deep);
		font-weight: 600;
	}
	.hint {
		margin-top: 10px;
		font-size: 12px;
	}
</style>
