<script lang="ts">
	import { base } from '$app/paths';
	import { browser } from '$app/environment';
	import { SPECIES } from '$lib/content/species';

	/** Three screens, then the camera. Without this a new arrival faces a fact, a
	 *  featured tree, four cards and an install bar with no idea what the app is
	 *  for — everything else only pays off after the first success. */
	const KEY = 'mat-seen-intro';
	let step = $state(0);
	let open = $state(browser ? localStorage.getItem(KEY) !== '1' : false);

	function done() {
		open = false;
		if (browser) localStorage.setItem(KEY, '1');
	}

	const screens = [
		{
			eyebrow: 'Meet a Tree',
			title: 'Learn the trees you already walk past',
			body: `A field guide to ${SPECIES.length} British and Irish trees — how to spot each one, the stories people told about it, and the science underneath. Free, no ads, works with no signal.`
		},
		{
			eyebrow: 'The useful bit',
			title: 'Follow one tree through a year',
			body: 'Pick a tree on your route and note when it comes into leaf, flowers and turns. Next spring it tells you whether it is early or late — the same measurement Britain has recorded since 1736.'
		},
		{
			eyebrow: 'Why it is free',
			title: 'If you fall for trees, plant one',
			body: 'Nothing is locked and nothing is sold. When it has earned it, the app points you at the International Tree Foundation, who plant real trees. Registered charity 1106269.'
		}
	];
</script>

{#if open}
	<div class="scrim" role="dialog" aria-modal="true" aria-labelledby="intro-title">
		<div class="sheet">
			<div class="art" aria-hidden="true">
				<span class="leaf l1"></span><span class="leaf l2"></span><span class="leaf l3"></span>
			</div>

			<p class="eyebrow">{screens[step].eyebrow}</p>
			<h2 id="intro-title">{screens[step].title}</h2>
			<p class="body">{screens[step].body}</p>

			<div class="dots" aria-hidden="true">
				{#each screens as _, i (i)}
					<span class="dot" class:on={i === step}></span>
				{/each}
			</div>

			<div class="actions">
				{#if step < screens.length - 1}
					<button class="btn" onclick={() => (step += 1)}>Next</button>
					<button class="btn ghost" onclick={done}>Skip</button>
				{:else}
					<a class="btn" href="{base}/identify/" onclick={done}>Identify a tree</a>
					<button class="btn ghost" onclick={done}>Have a look round</button>
				{/if}
			</div>
		</div>
	</div>
{/if}

<style>
	.scrim {
		position: fixed;
		inset: 0;
		z-index: 70;
		display: grid;
		place-items: end center;
		background: rgba(18, 27, 20, 0.55);
		padding: 16px;
	}
	.sheet {
		background: var(--paper);
		border-radius: 22px;
		padding: 22px 22px 20px;
		width: 100%;
		max-width: 420px;
		box-shadow: var(--shadow);
	}
	.art {
		height: 74px;
		position: relative;
		margin-bottom: 14px;
	}
	.leaf {
		position: absolute;
		border-radius: 0 60% 0 60%;
		background: linear-gradient(135deg, #4fa372, var(--green));
	}
	.l1 {
		width: 52px;
		height: 52px;
		left: 0;
		top: 12px;
		transform: rotate(-12deg);
	}
	.l2 {
		width: 38px;
		height: 38px;
		left: 46px;
		top: 30px;
		opacity: 0.75;
		transform: rotate(14deg);
	}
	.l3 {
		width: 26px;
		height: 26px;
		left: 84px;
		top: 6px;
		opacity: 0.5;
		transform: rotate(-24deg);
	}
	.eyebrow {
		margin: 0;
		font-size: 11px;
		font-weight: 700;
		letter-spacing: 0.12em;
		text-transform: uppercase;
		color: var(--deep);
	}
	h2 {
		font-family: var(--display);
		font-weight: 400;
		font-size: 25px;
		line-height: 1.15;
		margin: 6px 0 10px;
		text-wrap: balance;
	}
	.body {
		margin: 0;
		font-size: 14.5px;
		line-height: 1.6;
		color: var(--soft);
	}
	.dots {
		display: flex;
		gap: 6px;
		margin: 16px 0 14px;
	}
	.dot {
		width: 7px;
		height: 7px;
		border-radius: 50%;
		background: var(--line);
	}
	.dot.on {
		background: var(--green);
		width: 20px;
		border-radius: 999px;
	}
	.actions {
		display: flex;
		gap: 10px;
		flex-wrap: wrap;
	}
</style>
