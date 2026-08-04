<script lang="ts">
	import { base } from '$app/paths';
	import TreeMark from '$lib/components/TreeMark.svelte';
	import { factForDate, SEASONS } from '$lib/content/facts';
	import { SPECIES, speciesById } from '$lib/content/species';
	import { grove } from '$lib/grove.svelte';
	import { trees } from '$lib/trees.svelte';
	import { missionsFor } from '$lib/content/missions';
	import { progressFor } from '$lib/missions.svelte';

	const now = new Date();
	const dateLine = `${now.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' })} · ${SEASONS[now.getMonth()]}`;
	const greeting =
		now.getHours() < 12 ? 'Good morning' : now.getHours() < 18 ? 'Good afternoon' : 'Good evening';
	const fact = factForDate(now);

	/** Tree of the day — stable for the whole day, and never one you've met. */
	const dayIndex = Math.floor(now.getTime() / 86400000);
	const featured = $derived(
		(() => {
			const unmet = SPECIES.filter((s) => !grove.has(s.id));
			const pool = unmet.length ? unmet : SPECIES;
			return pool[dayIndex % pool.length];
		})()
	);

	const treePrompts = $derived(trees.prompts(now));
	const liveMission = $derived(
		(() => {
			const { current } = missionsFor(now);
			return current.length ? progressFor(current[0], now) : undefined;
		})()
	);

	/** What's worth looking at this month, drawn from the species calendars. */
	const seasonNow = $derived(
		(() => {
			const m = now.getMonth();
			const label = m <= 1 || m === 11 ? 'Winter' : m <= 4 ? 'Spring' : m <= 7 ? 'Summer' : 'Autumn';
			const picks = ['oak', 'hawthorn', 'rowan', 'beech']
				.map((id) => speciesById(id))
				.filter((s): s is NonNullable<typeof s> => Boolean(s))
				.map((s) => ({ s, note: s.season.find(([k]) => k === label)?.[1] ?? '' }))
				.filter((x) => x.note);
			return { label, picks: picks.slice(0, 2) };
		})()
	);
</script>

<svelte:head>
	<title>Meet a Tree — the trees near you, by name</title>
	<meta
		name="description"
		content="A free pocket field guide to 40 British and Irish trees — how to spot them, their folklore and their science. In support of the International Tree Foundation."
	/>
</svelte:head>

<main class="view">
	<div class="vhead">
		<div>
			<p class="vsub">{dateLine}</p>
			<h1>{greeting}</h1>
		</div>
	</div>

	<div class="card tint">
		<p class="label">Today's tree fact</p>
		<p class="serif">{fact}</p>
	</div>

	<a class="card featured" href="{base}/species/{featured.id}/">
		<span class="fpic">
			<img
				src="{base}/images/species/{featured.id}-tree.webp"
				srcset="{base}/images/species/{featured.id}-tree-480.webp 480w, {base}/images/species/{featured.id}-tree.webp 900w"
				sizes="(min-width: 700px) 420px, 100vw"
				alt="A {featured.name}"
				width="900"
				height="675"
				loading="eager"
				fetchpriority="high"
				decoding="async"
			/>
		</span>
		<span class="fbody">
			<span class="label">Meet this tree</span>
			<span class="fname">{featured.name}</span>
			<span class="flatin">{featured.latin}</span>
			<span class="fhint">{featured.hint}</span>
			<span class="ftell">{featured.tell}</span>
		</span>
	</a>

	{#if liveMission}
		<a class="card linkcard mission" href="{base}/missions/">
			<p class="label forest">In season now</p>
			<p class="serif small">
				<strong>{liveMission.mission.title}</strong> — {liveMission.done.length} of {liveMission.mission
					.target} found. Looking for {liveMission.mission.looking}. →
			</p>
			<span class="meter" aria-hidden="true">
				<span class="fill" style="width:{Math.round(liveMission.fraction * 100)}%"></span>
			</span>
		</a>
	{/if}

	<div class="row two">
		<a class="card linkcard" href="{base}/identify/">
			<p class="label">Identify</p>
			<p class="serif small">Found a leaf? Three questions and the guide narrows it down. →</p>
		</a>
		<a class="card linkcard" href="{base}/learn/">
			<p class="label">Field guide</p>
			<p class="serif small">{SPECIES.length} British trees, with folklore and science. →</p>
		</a>
	</div>

	<div class="card">
		<p class="label forest">{seasonNow.label} · what to look for</p>
		{#each seasonNow.picks as p (p.s.id)}
			<p class="seasonline">
				<a href="{base}/species/{p.s.id}/">{p.s.name}</a> — {p.note}
			</p>
		{/each}
	</div>

	{#if treePrompts.length}
		<div class="card tint">
			<p class="label">Your trees, this week</p>
			{#each treePrompts.slice(0, 2) as p (p.tree.id + p.event.id)}
				<p class="seasonline">
					<a href="{base}/trees/{p.tree.id}/">{p.tree.name}</a> — {p.event.label.toLowerCase()}
					{#if p.lastYear}(last year {new Date(p.lastYear + 'T12:00:00').toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}){/if}
				</p>
			{/each}
			<a class="btn small ghost" style="margin-top:8px" href="{base}/trees/">Open My Trees</a>
		</div>
	{:else}
		<a class="card linkcard" href="{base}/trees/">
			<p class="label">Follow one tree</p>
			<p class="serif small">
				Pick a tree you walk past often and note when it leafs, flowers and turns. In a year you have
				its calendar. →
			</p>
		</a>
	{/if}

	<div class="card">
		<p class="label">Your grove</p>
		<p class="serif small">
			{#if grove.speciesCount === 0}
				Nothing in it yet. The first tree is the hard one — after that you start noticing them
				everywhere.
			{:else}
				{grove.speciesCount} of {SPECIES.length} species met, absorbing about {grove.co2} kg of CO₂ a
				year between them.
			{/if}
		</p>
		<a class="btn small ghost" style="margin-top:10px" href="{base}/trees/">Open my grove</a>
	</div>

	<div class="give">
		<p class="gt">Enjoying Meet a Tree? Plant a real one.</p>
		<p class="gb">
			Meet a Tree is free forever, with no ads and no paywall. If it makes you love trees a little
			more, the International Tree Foundation plants them for real — registered charity 1106269.
		</p>
		<a
			class="btn small"
			style="margin-top:10px"
			href="https://internationaltreefoundation.org/donate/"
			target="_blank"
			rel="noopener">Donate to ITF ↗</a
		>
	</div>

	<a
		class="itf"
		href="https://internationaltreefoundation.org"
		target="_blank"
		rel="noopener"
	>
		<img
			src="{base}/images/itf-logo.png"
			alt="International Tree Foundation"
			width="168"
			height="88"
			loading="lazy"
		/>
		<span class="itftext">
			<strong>Meet a Tree is made in support of the International Tree Foundation</strong>
			Registered charity no. 1106269. Free forever · no ads · your trees stay on your phone. Tap the
			logo to visit them ↗
		</span>
	</a>
</main>

<style>
	.itf {
		display: flex;
		align-items: center;
		gap: 14px;
		background: var(--card);
		border: 1px solid var(--line);
		border-radius: 16px;
		padding: 14px 15px;
		text-decoration: none;
		color: inherit;
		transition: border-color 0.12s ease;
	}
	.itf:hover {
		border-color: var(--green);
	}
	.itf img {
		width: 96px;
		height: auto;
		flex: none;
	}
	/* their mark is dark green artwork on transparency, so it needs a light
	   ground to stay legible in dark mode */
	@media (prefers-color-scheme: dark) {
		.itf img {
			background: #fbfaf7;
			border-radius: 8px;
			padding: 6px 8px;
		}
	}
	.itftext {
		font-size: 11.5px;
		line-height: 1.45;
		color: var(--soft);
	}
	.itftext strong {
		display: block;
		color: var(--ink);
		font-size: 12.5px;
		margin-bottom: 2px;
	}
	.vhead h1 {
		font-size: 27px;
		line-height: 1.15;
		text-wrap: balance;
	}
	.linkcard {
		text-decoration: none;
		color: inherit;
		display: block;
		transition: border-color 0.12s ease;
	}
	.linkcard:hover {
		border-color: var(--green);
	}
	.serif.small {
		font-size: 15px;
	}
	.row.two {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 12px;
		align-items: stretch;
	}
	.featured {
		display: flex;
		flex-direction: column;
		gap: 0;
		padding: 0;
		overflow: hidden;
		text-decoration: none;
		color: inherit;
		transition: border-color 0.12s ease;
	}
	.featured:hover {
		border-color: var(--green);
	}
	.fpic {
		display: block;
		aspect-ratio: 16 / 9;
		background: var(--stonewash);
	}
	.fpic img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		display: block;
	}
	.fbody {
		display: block;
		padding: 12px 15px 14px;
	}
	.fname {
		display: block;
		font-family: var(--display);
		font-size: 20px;
		line-height: 1.2;
	}
	.flatin {
		display: block;
		font-size: 12.5px;
		font-style: italic;
		color: var(--soft);
	}
	.fhint {
		display: block;
		font-size: 13px;
		color: var(--soft);
		margin-top: 6px;
	}
	.ftell {
		display: block;
		font-family: var(--display);
		font-style: italic;
		font-size: 13.5px;
		color: var(--forest);
		margin-top: 8px;
	}
	.seasonline {
		margin: 0 0 8px;
		font-size: 13.5px;
		line-height: 1.55;
		color: var(--soft);
	}
	.seasonline:last-child {
		margin-bottom: 0;
	}
	.seasonline a {
		color: var(--deep);
		font-weight: 700;
		text-decoration: none;
	}
	.mission .meter {
		display: block;
		height: 7px;
		border-radius: 999px;
		background: var(--stonewash);
		overflow: hidden;
		margin-top: 10px;
	}
	.mission .fill {
		display: block;
		height: 100%;
		background: var(--green);
		border-radius: 999px;
	}
	@media (min-width: 900px) {
		.row.two {
			grid-template-columns: 1fr 1fr 1fr;
		}
		.featured {
			flex-direction: row;
			align-items: stretch;
		}
		.fpic {
			width: 300px;
			flex: none;
			aspect-ratio: auto;
		}
	}
</style>
