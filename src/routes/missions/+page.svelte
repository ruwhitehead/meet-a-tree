<script lang="ts">
	import { base } from '$app/paths';
	import { missionsFor, windowLabel } from '$lib/content/missions';
	import { progressFor } from '$lib/missions.svelte';
	import { shareMission } from '$lib/share';
	import { seasonOfMonth } from '$lib/season';
	import { speciesById } from '$lib/content/species';
	import { grove } from '$lib/grove.svelte';

	const now = new Date();
	const { current, next } = missionsFor(now);
	const running = $derived(current.map((m) => progressFor(m, now)));
	const upcoming = next.map((m) => ({ mission: m }));

	/** Two species at their most recognisable right now, with the note from their
	 *  own calendar. Moved here from Today, which had four cards doing a tab's job. */
	const seasonPicks = (() => {
		const season = seasonOfMonth(now.getMonth());
		const label = season[0].toUpperCase() + season.slice(1);
		return ['oak', 'hawthorn', 'rowan', 'beech']
			.map((id) => speciesById(id))
			.filter((sp): sp is NonNullable<typeof sp> => Boolean(sp))
			.map((sp) => ({ sp, season, note: sp.season.find(([k]) => k === label)?.[1] ?? '' }))
			.filter((x) => x.note)
			.slice(0, 2);
	})();
</script>

<svelte:head>
	<title>Seasons · Meet a Tree</title>
	<meta
		name="description"
		content="Time-boxed seasonal hunts — Blossom Watch, Conker Hunt, Autumn Colours, Midwinter Evergreens — using the trees you meet."
	/>
</svelte:head>

<main class="view">
	<div class="vhead"><h1>Seasons</h1></div>

	{#if running.length === 0}
		<div class="card tint">
			<p class="serif" style="font-size:15.5px">Nothing running this week — the next one is below.</p>
		</div>
	{/if}

	{#each running as p (p.mission.id)}
		<section class="mission {seasonOfMonth(p.mission.from[0])}" class:done={p.complete}>
			<div class="mhead">
				<div>
					<h2>{p.mission.title}</h2>
					<p class="when">{windowLabel(p.mission)} · looking for {p.mission.looking}</p>
				</div>
				<span class="count nums">{p.done.length}/{p.mission.target}</span>
			</div>
			<p class="blurb">{p.mission.blurb}</p>

			<div class="meter" role="img" aria-label="{p.done.length} of {p.mission.target} found">
				<span class="fill" style="width:{Math.round(p.fraction * 100)}%"></span>
			</div>

			<!-- 0/5 with no visible way to move it was the whole problem: the board
			     counts a sighting dated inside its window, which is not the same as
			     having the species in your grove already. Say so, and put the action
			     next to each tree. -->
			<p class="how">
				Two ways to move this on: identify a tree from a photo, or tap <strong>Seen it</strong> beside
				one below. It has to be a fresh sighting between the dates above, so trees you met earlier in
				the year still count as out there until you find one again.
			</p>

			{#if p.complete}
				<div class="finished">
					<p class="ft">Finished 🌿</p>
					<p class="fb">
						{p.done.length} species this season. Worth marking — the International Tree Foundation
						plants real ones.
					</p>
					<div class="row" style="gap:8px; flex-wrap:wrap; margin-top:8px">
						<button class="btn small" onclick={() => shareMission(p.mission.title, p.done.length, p.mission.target)}>
							Share the board
						</button>
						<a
							class="btn ghost small"
							href="https://internationaltreefoundation.org/donate/"
							target="_blank"
							rel="noopener">Plant one to celebrate ↗</a
						>
					</div>
				</div>
			{/if}

			<p class="label" style="margin-top:12px">Found</p>
			{#if p.done.length === 0}
				<p class="sub" style="margin:0">Nothing yet. Anything you identify from now counts.</p>
			{:else}
				<ul class="chips">
					{#each p.done as sp (sp.id)}
						<li>
							<a class="chip found" href="{base}/species/{sp.id}/">
								<img src="{base}/images/species/{sp.id}-thumb.webp" alt="" width="80" height="80" loading="lazy" />
								<span>✓ {sp.name}</span>
							</a>
						</li>
					{/each}
				</ul>
			{/if}

			<p class="label" style="margin-top:12px">Still out there</p>
			<ul class="hunt">
				{#each p.todo.slice(0, 6) as sp (sp.id)}
					<li class="hrow">
						<a class="hlink" href="{base}/species/{sp.id}/">
							<img src="{base}/images/species/{sp.id}-thumb.webp" alt="" width="80" height="80" loading="lazy" />
							<span class="htext">
								<span class="hn">{sp.name}</span>
								<span class="hh">
									{grove.has(sp.id)
										? 'Already in your grove — find it again to count it here'
										: sp.hint}
								</span>
							</span>
						</a>
						<button
							class="seen"
							aria-label="Seen it today — {sp.name}"
							onclick={() => grove.logSighting(sp.id)}
						>
							Seen it
						</button>
					</li>
				{/each}
			</ul>
			{#if p.todo.length > 6}
				<p class="more">
					and {p.todo.length - 6} more count towards it —
					<a href="{base}/identify/">identify anything</a> and it lands here.
				</p>
			{/if}
		</section>
	{/each}

	{#if upcoming.length}
		<p class="label" style="margin-top:6px">Coming up</p>
		{#each upcoming as u (u.mission.id)}
			<div class="card soon {seasonOfMonth(u.mission.from[0])}">
				<p class="soonhead">{u.mission.title}</p>
				<p class="when">{windowLabel(u.mission)}</p>
				<p class="blurb" style="margin-bottom:0">{u.mission.blurb}</p>
			</div>
		{/each}
	{/if}

	{#if seasonPicks.length}
		<p class="label" style="margin-top:6px">Worth looking at this month</p>
		{#each seasonPicks as pick (pick.sp.id)}
			<a class="pick {pick.season}" href="{base}/species/{pick.sp.id}/">
				<img src="{base}/images/species/{pick.sp.id}-thumb.webp" alt="" width="80" height="80" loading="lazy" />
				<span class="ptext">
					<span class="pn">{pick.sp.name}</span>
					<span class="pd">{pick.note}</span>
				</span>
			</a>
		{/each}
	{/if}

	<p class="samplenote">
		Anything you identify lands on the right board by itself. Miss a hunt and nothing happens — it
		closes quietly and comes round again next year.
	</p>
</main>

<style>
	.nums {
		font-variant-numeric: tabular-nums;
	}
	.mission,
	.soon {
		background: var(--card);
		border: 1px solid var(--line);
		border-left: 4px solid var(--line);
		border-radius: 16px;
		padding: 15px;
	}
	/* the same spine as the timeline and the species calendar: colour that says
	   which season, not colour for its own sake */
	.spring {
		border-left-color: #8fbf5a;
	}
	.summer {
		border-left-color: var(--green);
	}
	.autumn {
		border-left-color: #c8862f;
	}
	.winter {
		border-left-color: #6b7f8a;
	}
	.mission.done {
		border-color: var(--green);
	}
	.mhead {
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
		gap: 12px;
	}
	.mission h2 {
		font-family: var(--display);
		font-weight: 400;
		font-size: 21px;
		margin: 0;
		line-height: 1.15;
	}
	.soonhead {
		font-family: var(--display);
		font-size: 18px;
		margin: 0;
	}
	.when {
		margin: 3px 0 0;
		font-size: 12px;
		font-weight: 700;
		letter-spacing: 0.04em;
		text-transform: uppercase;
		color: var(--soft);
	}
	.count {
		font-family: var(--display);
		font-size: 20px;
		color: var(--deep);
		background: var(--wash);
		border: 1px solid var(--wash-line);
		border-radius: 10px;
		padding: 4px 11px;
		flex: none;
	}
	.blurb {
		margin: 10px 0 12px;
		font-size: 14px;
		line-height: 1.55;
		color: var(--soft);
		max-width: 62ch;
	}
	.meter {
		height: 8px;
		border-radius: 999px;
		background: var(--stonewash);
		overflow: hidden;
	}
	.fill {
		display: block;
		height: 100%;
		background: var(--green);
		border-radius: 999px;
		transition: width 0.3s ease;
	}
	.finished {
		margin-top: 12px;
		background: var(--wash);
		border: 1px solid var(--wash-line);
		border-radius: 13px;
		padding: 12px 13px;
	}
	.ft {
		margin: 0;
		font-weight: 700;
		font-size: 14px;
		color: var(--deep);
	}
	.fb {
		margin: 3px 0 0;
		font-size: 12.5px;
		color: var(--soft);
	}
	.pick {
		display: flex;
		align-items: center;
		gap: 12px;
		background: var(--card);
		border: 1px solid var(--line);
		border-left: 4px solid var(--line);
		border-radius: 14px;
		padding: 10px 12px;
		text-decoration: none;
		color: inherit;
	}
	.pick img {
		width: 40px;
		height: 40px;
		border-radius: 50%;
		object-fit: cover;
		flex: none;
	}
	.ptext {
		min-width: 0;
	}
	.pn {
		display: block;
		font-weight: 700;
		font-size: 14px;
	}
	.pd {
		display: block;
		font-size: 12.5px;
		line-height: 1.5;
		color: var(--soft);
	}
	.chips {
		list-style: none;
		margin: 0;
		padding: 0;
		display: flex;
		flex-wrap: wrap;
		gap: 8px;
	}
	.chip {
		display: inline-flex;
		align-items: center;
		gap: 8px;
		background: var(--stonewash);
		border: 1px solid var(--line);
		border-radius: 999px;
		padding: 5px 13px 5px 5px;
		text-decoration: none;
		color: var(--ink);
		font-weight: 600;
		font-size: 12.5px;
		min-height: 44px;
	}
	.chip.found {
		background: var(--wash);
		border-color: var(--wash-line);
		color: var(--deep);
		font-weight: 700;
	}
	.chip img {
		width: 34px;
		height: 34px;
		border-radius: 50%;
		object-fit: cover;
		display: block;
	}
	.how {
		margin: 10px 0 0;
		font-size: 12.5px;
		line-height: 1.55;
		color: var(--ink);
		background: var(--stonewash);
		border: 1px solid var(--line);
		border-radius: 11px;
		padding: 9px 11px;
	}
	.more {
		margin: 8px 0 0;
		font-size: 12.5px;
		color: var(--soft);
	}
	.more a {
		color: var(--deep);
		font-weight: 600;
	}
	/* rows rather than chips: a hunt needs the hint that tells you what to look
	   for, and somewhere to put the action that actually moves the count */
	.hunt {
		list-style: none;
		margin: 0;
		padding: 0;
		display: grid;
		gap: 8px;
	}
	.hrow {
		display: flex;
		align-items: center;
		gap: 10px;
		background: var(--stonewash);
		border: 1px solid var(--line);
		border-radius: 13px;
		padding: 7px 9px 7px 7px;
	}
	.hlink {
		display: flex;
		align-items: center;
		gap: 10px;
		flex: 1;
		min-width: 0;
		text-decoration: none;
		color: inherit;
		min-height: 44px;
	}
	.hlink img {
		width: 40px;
		height: 40px;
		border-radius: 50%;
		object-fit: cover;
		display: block;
		flex: none;
	}
	.htext {
		min-width: 0;
	}
	.hn {
		display: block;
		font-weight: 700;
		font-size: 13.5px;
	}
	.hh {
		display: block;
		font-size: 12px;
		line-height: 1.45;
		color: var(--soft);
	}
	.seen {
		flex: none;
		min-height: 44px;
		padding: 0 14px;
		border-radius: 999px;
		background: var(--card);
		/* --deep, not --green: on the row's stone ground the brand green only
		   reaches 2.75:1, under the 3:1 a control boundary needs */
		border: 1.5px solid var(--deep);
		color: var(--deep);
		font-weight: 700;
		font-size: 12.5px;
	}
	.seen:hover {
		background: var(--wash);
	}
	@media (min-width: 900px) {
		.mission,
		.card {
			max-width: 760px;
		}
		.hunt {
			grid-template-columns: 1fr 1fr;
		}
	}
</style>
