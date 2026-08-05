<script lang="ts">
	import { base } from '$app/paths';
	import { PROJECTS } from '$lib/content/projects';
	import { RECORDED_COUNT } from '$lib/phenology';

	/** The depth lives here so the cards in My Trees can stay two lines long.
	 *  Every figure on this page is quoted from the project that published it. */
</script>

<svelte:head>
	<title>What your records are for · Meet a Tree</title>
	<meta
		name="description"
		content="Why the dates you note on one tree are worth sending on, and the four projects that want them — Nature's Calendar, the Ancient Tree Inventory, TreeAlert and iRecord."
	/>
</svelte:head>

<main class="view">
	<a class="backlink" href="{base}/trees/">
		<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
			<path d="M19 12H6" /><path d="M11.5 6.5L6 12l5.5 5.5" />
		</svg>
		My Trees
	</a>

	<div class="vhead">
		<div>
			<p class="vsub">Citizen science</p>
			<h1>What your records are for</h1>
		</div>
	</div>

	<div class="card tint">
		<p class="serif lead">
			A tree cannot tell you it is running two weeks early. The only way anyone knows is that somebody
			wrote down the date it came into leaf, in the same place, year after year.
		</p>
	</div>

	<section class="section">
		<h2 class="shead">Why a date is worth sending</h2>
		<div class="prose">
			<p>
				Phenology is the timing of natural events — leafing, flowering, fruiting, falling. It is
				unusually well suited to being recorded by anyone, because it needs no equipment and no
				expertise beyond knowing which tree you are looking at. It is also unusually hard to fake or
				reconstruct: a date missed is gone for a year.
			</p>
			<p>
				Britain has an exceptional run of these observations. Nature's Calendar holds
				<strong>2.9 million records</strong> and, in the Woodland Trust's own words, is believed to be
				the longest written biological record of its kind in the UK. It is what makes statements about
				spring arriving earlier evidence rather than impression: their reading of it is that spring
				across Europe is now advancing by <strong>2.5 days per decade</strong>, and they cite a Met
				Office estimate that the period of active plant growth has been, on average, a month longer in
				the past decade than it was between 1961 and 1990.
			</p>
			<p>
				Those records are worked on well beyond the Trust. Research using the database currently
				includes doctoral work at Newcastle, Glasgow, Exeter and Cranfield, and at the universities of
				British Columbia and Peking — on what drives plant timing, on how species differ in their
				sensitivity to warming, and on animals such as dormice whose year depends on when trees fruit.
			</p>
			<p class="pull">
				One date from one tree is close to worthless. A decade of dates from the same tree is data. The
				second is what following a tree actually produces, and it is why this app keeps your dates in a
				form you can hand over rather than a form only it can read.
			</p>
		</div>
	</section>

	<section class="section">
		<h2 class="shead">Where a record can go</h2>
		<p class="sub intro">
			Four projects want what a person on an ordinary walk can see. Only the first is one this app
			prepares for you; the others are worth knowing about, and none of them need you to be an expert.
		</p>

		<ul class="projects">
			{#each PROJECTS as p (p.id)}
				<li class="project">
					<div class="phead">
						<h3>{p.name}</h3>
						{#if p.supported}
							<span class="tag">Prepared for you</span>
						{/if}
					</div>
					<p class="run">{p.run}</p>
					<p class="wants">{p.wants}</p>

					<p class="label">What it needs</p>
					<ul class="needs">
						{#each p.needs as n (n)}
							<li>{n}</li>
						{/each}
					</ul>

					<p class="then">{p.then}</p>
					<a class="btn ghost small" href={p.url} target="_blank" rel="noopener">
						{p.name} ↗
					</a>
				</li>
			{/each}
		</ul>
	</section>

	<section class="section">
		<h2 class="shead">What this app does, and doesn't</h2>
		<div class="prose">
			<p>
				It prepares Nature's Calendar records: the {RECORDED_COUNT} trees in the guide they collect,
				the event named in their vocabulary, the date and the location you typed. You copy it into
				their form and submit it yourself.
			</p>
			<p>
				Nothing here is uploaded automatically. There is no account, no analytics, and no copy of your
				trees anywhere but this device — which is a deliberate limit, not an oversight. It also means
				that if you never submit anything, nobody but you will ever see a single date, so the choice is
				genuinely yours and worth making.
			</p>
		</div>
	</section>

	<p class="tell">
		If you only ever do one of these: pick the tree you pass most often, note the day its leaves break,
		and do it again next year.
	</p>
</main>

<style>
	h1 {
		font-size: 27px;
		line-height: 1.15;
		text-wrap: balance;
	}
	.backlink {
		font-size: 13.5px;
		font-weight: 700;
		color: var(--deep);
		min-height: 44px;
		display: inline-flex;
		align-items: center;
		gap: 5px;
		text-decoration: none;
	}
	.backlink svg {
		width: 15px;
		height: 15px;
		flex: none;
	}
	.lead {
		font-size: 16.5px;
		margin: 0;
	}
	.shead {
		font-family: var(--display);
		font-weight: 400;
		font-size: 22px;
		margin: 6px 0 10px;
		padding-bottom: 7px;
		border-bottom: 1px solid var(--line);
	}
	.prose {
		display: flex;
		flex-direction: column;
		gap: 13px;
	}
	.prose p {
		margin: 0;
		font-size: 15px;
		line-height: 1.65;
		color: var(--ink);
		max-width: 66ch;
	}
	.prose strong {
		font-variant-numeric: tabular-nums;
	}
	/* the one paragraph that answers "why me" gets the storytelling face */
	.pull {
		font-family: var(--display);
		font-size: 16px !important;
		line-height: 1.6 !important;
		background: var(--wash);
		border: 1px solid var(--wash-line);
		border-radius: 13px;
		padding: 13px 15px;
	}
	.intro {
		margin: 0 0 12px;
		max-width: 66ch;
	}
	.projects {
		list-style: none;
		margin: 0;
		padding: 0;
		display: grid;
		gap: 12px;
	}
	.project {
		background: var(--card);
		border: 1px solid var(--line);
		border-radius: 16px;
		padding: 14px 15px;
	}
	.phead {
		display: flex;
		align-items: baseline;
		justify-content: space-between;
		gap: 10px;
		flex-wrap: wrap;
	}
	.project h3 {
		font-family: var(--display);
		font-weight: 400;
		font-size: 20px;
		margin: 0;
		line-height: 1.2;
	}
	.tag {
		font-size: 10.5px;
		font-weight: 700;
		letter-spacing: 0.06em;
		text-transform: uppercase;
		color: var(--deep);
		background: var(--wash);
		border: 1px solid var(--wash-line);
		border-radius: 999px;
		padding: 4px 9px;
		flex: none;
	}
	.run {
		margin: 3px 0 0;
		font-size: 12px;
		color: var(--soft);
	}
	.wants {
		margin: 9px 0 0;
		font-size: 14.5px;
		line-height: 1.55;
	}
	.needs {
		margin: 0;
		padding-left: 18px;
		display: grid;
		gap: 3px;
	}
	.needs li {
		font-size: 13px;
		line-height: 1.5;
		color: var(--soft);
	}
	.then {
		margin: 10px 0 11px;
		font-size: 13px;
		line-height: 1.55;
		color: var(--ink);
		background: var(--stonewash);
		border-radius: 11px;
		padding: 10px 12px;
	}
	.tell {
		font-family: var(--display);
		font-style: italic;
		font-size: 15.5px;
		line-height: 1.6;
		color: var(--forest);
		background: var(--wash);
		border-left: 4px solid var(--green);
		border-radius: 4px 13px 13px 4px;
		padding: 13px 15px;
		margin: 0;
	}
	@media (prefers-color-scheme: dark) {
		.tell {
			color: var(--ink);
		}
	}
	@media (min-width: 700px) {
		.projects {
			grid-template-columns: 1fr 1fr;
		}
	}
	@media (min-width: 900px) {
		.card,
		.section {
			max-width: 760px;
		}
	}
</style>
