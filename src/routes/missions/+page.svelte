<script lang="ts">
	import { base } from '$app/paths';
	import { missionsFor, windowLabel } from '$lib/content/missions';
	import { progressFor } from '$lib/missions.svelte';
	import { shareMission } from '$lib/share';

	const now = new Date();
	const { current, next } = missionsFor(now);
	const running = $derived(current.map((m) => progressFor(m, now)));
	const upcoming = next.map((m) => ({ mission: m }));
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
		<section class="mission" class:done={p.complete}>
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
			<ul class="chips">
				{#each p.todo.slice(0, 10) as sp (sp.id)}
					<li>
						<a class="chip" href="{base}/species/{sp.id}/">
							<img src="{base}/images/species/{sp.id}-thumb.webp" alt="" width="80" height="80" loading="lazy" />
							<span>{sp.name}</span>
						</a>
					</li>
				{/each}
			</ul>
		</section>
	{/each}

	{#if upcoming.length}
		<p class="label" style="margin-top:6px">Coming up</p>
		{#each upcoming as u (u.mission.id)}
			<div class="card">
				<p class="soonhead">{u.mission.title}</p>
				<p class="when">{windowLabel(u.mission)}</p>
				<p class="blurb" style="margin-bottom:0">{u.mission.blurb}</p>
			</div>
		{/each}
	{/if}

	<p class="samplenote">
		Boards fill themselves from what you identify — nothing extra to tick. Miss one and nothing
		happens; it just closes quietly and comes round again next year.
	</p>
</main>

<style>
	.nums {
		font-variant-numeric: tabular-nums;
	}
	.mission {
		background: var(--card);
		border: 1px solid var(--line);
		border-radius: 16px;
		padding: 15px;
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
	@media (min-width: 900px) {
		.mission,
		.card {
			max-width: 760px;
		}
	}
</style>
