<script lang="ts">
	import Modal from './Modal.svelte';
	import { grove } from '$lib/grove.svelte';

	function closeMilestone() {
		grove.pendingMilestone = null;
	}
	function closeShare() {
		if (grove.sharePreview) URL.revokeObjectURL(grove.sharePreview.url);
		grove.sharePreview = null;
	}
</script>

<Modal open={grove.pendingMilestone !== null} onclose={closeMilestone} labelledby="milestone-title">
	<h2 id="milestone-title">You’ve met {grove.pendingMilestone} trees 🌳</h2>
	<p>
		That’s {grove.pendingMilestone} species you can now greet by name. Mark the milestone by planting
		a real one?
	</p>
	<p class="itf">
		Your gift goes to the <strong>International Tree Foundation</strong> — community tree-planting
		since 1922. Registered charity no. 1106269.
	</p>
	<div class="actions">
		<a class="btn" href="https://internationaltreefoundation.org/donate/" target="_blank" rel="noopener">
			Plant a real tree ↗
		</a>
		<button class="btn ghost" onclick={closeMilestone}>Maybe later</button>
	</div>
</Modal>

<Modal open={grove.sharePreview !== null} onclose={closeShare} labelledby="share-title">
	<h2 id="share-title">Your share card</h2>
	{#if grove.sharePreview}
		<img class="shareprev" alt="Preview of your generated share card" src={grove.sharePreview.url} />
		<p style="margin-top:10px">
			On a phone this hands straight to the share sheet. Here, save the image and share it anywhere.
		</p>
		<div class="actions">
			<a class="btn" href={grove.sharePreview.url} download={grove.sharePreview.filename}>Save image</a>
			<button class="btn ghost" onclick={closeShare}>Done</button>
		</div>
	{/if}
</Modal>

<style>
	.shareprev {
		width: 100%;
		border-radius: 14px;
		border: 1px solid var(--line);
		display: block;
	}
</style>
