<script lang="ts">
	import { base } from '$app/paths';
	import { SPECIES } from '$lib/content/species';

	let shelf: 'folklore' | 'science' = $state('folklore');
</script>

<svelte:head>
	<title>Learn · Meet a Tree</title>
</svelte:head>

<main class="view">
	<div class="vhead"><h1>Learn</h1></div>

	<div class="tabs" role="tablist" aria-label="Learn sections">
		<button class="tab" role="tab" aria-selected={shelf === 'folklore'} onclick={() => (shelf = 'folklore')}>
			Folklore
		</button>
		<button class="tab" role="tab" aria-selected={shelf === 'science'} onclick={() => (shelf = 'science')}>
			Science
		</button>
	</div>

	{#each SPECIES as sp (sp.id)}
		{#each sp[shelf] as [title, body] (title)}
			<a class="card shelfcard" href="{base}/species/{sp.id}/">
				<p class="label">{sp.name}</p>
				<p class="serif" style="font-size:15.5px">{title}</p>
				<p class="sub">{body.slice(0, 92)}…</p>
			</a>
		{/each}
	{/each}
</main>

<style>
	.tabs {
		display: flex;
		gap: 4px;
		background: var(--stonewash);
		border-radius: 12px;
		padding: 4px;
	}
	.tab {
		flex: 1;
		text-align: center;
		font-size: 12.5px;
		font-weight: 700;
		padding: 9px 0;
		border-radius: 9px;
		color: var(--soft);
		min-height: 40px;
	}
	.tab[aria-selected='true'] {
		background: var(--card);
		color: var(--ink);
		box-shadow: 0 1px 3px rgba(30, 30, 30, 0.18);
	}
	.shelfcard {
		display: block;
		text-decoration: none;
		color: inherit;
	}
</style>
