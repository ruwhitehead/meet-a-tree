<script lang="ts">
	import { base } from '$app/paths';
	import { speciesById } from '$lib/content/species';

	/** Habitat-led guidance: honest, useful with no signal and no location
	 *  permission. Live per-location species counts (GBIF) come with the next
	 *  release; until then we tell you where to look rather than inventing
	 *  distances we cannot know. */
	const PLACES: { place: string; blurb: string; ids: string[] }[] = [
		{
			place: 'A street or town park',
			blurb: 'Planted for shade and toughness. Look up at the crown shape first — street trees are usually pruned, so leaves and bark tell you more than outline.',
			ids: ['chestnut', 'sycamore', 'birch', 'rowan']
		},
		{
			place: 'An old churchyard',
			blurb: 'The most reliable place in lowland Britain to meet a genuinely ancient tree. Check the girth: anything over 5 m round is likely centuries old.',
			ids: ['yew', 'holly', 'ash']
		},
		{
			place: 'A hedgerow or field edge',
			blurb: 'Hedges were planted to be stock-proof, so expect thorns. Count woody species along thirty paces — roughly one per century of hedge age.',
			ids: ['hawthorn', 'elder', 'ash', 'oak']
		},
		{
			place: 'Chalk or limestone downland',
			blurb: 'Thin alkaline soil suits a particular set of trees. Beech hangers on scarp slopes are the signature of the southern chalk.',
			ids: ['beech', 'yew', 'hawthorn']
		},
		{
			place: 'Heath, sandy or acid ground',
			blurb: 'Poor, free-draining soil favours pioneers and conifers. Birch arrives first; pine follows and stays.',
			ids: ['birch', 'pine', 'rowan']
		},
		{
			place: 'Ancient or damp woodland',
			blurb: 'Look at the ground flora as well as the canopy — bluebells, dog’s mercury and ramsons all say the wood is old.',
			ids: ['oak', 'beech', 'ash', 'holly']
		},
		{
			place: 'Uplands, crags and mountainsides',
			blurb: 'Trees survive here where grazing animals cannot reach. A lone tree wedged in a crag is almost always rowan.',
			ids: ['rowan', 'birch', 'pine']
		}
	];
</script>

<svelte:head>
	<title>Near you · Meet a Tree</title>
	<meta name="description" content="Which trees to expect where you are — by habitat, from streets and churchyards to chalk downland and upland crags." />
</svelte:head>

<main class="view">
	<div class="vhead"><h1>Near you</h1></div>

	<div class="card tint">
		<p class="label">Where to look</p>
		<p class="serif" style="font-size:15.5px">
			Trees are not scattered at random. Pick the place you’re standing in and you can usually narrow
			it to three or four candidates before you even look at a leaf.
		</p>
	</div>

	{#each PLACES as p (p.place)}
		<section class="place">
			<h2>{p.place}</h2>
			<p class="blurb">{p.blurb}</p>
			<ul class="chips">
				{#each p.ids as id (id)}
					{@const sp = speciesById(id)}
					{#if sp}
						<li>
							<a class="chip" href="{base}/species/{sp.id}/">
								<img src="{base}/images/species/{sp.id}-thumb.webp" alt="" width="80" height="80" loading="lazy" decoding="async" />
								<span>{sp.name}</span>
							</a>
						</li>
					{/if}
				{/each}
			</ul>
		</section>
	{/each}

	<section class="place locnote">
		<h2>Does this know where I am?</h2>
		<p class="blurb">
			<strong>No — and that is deliberate.</strong> This page asks for no location permission and
			sends nothing anywhere. It works the same on any phone, in any country, with no signal, because
			it is habitat guidance rather than a map of your surroundings.
		</p>
		<p class="blurb">
			When live species counts arrive, they will work like this: tap a button, your phone asks
			<em>you</em> whether to share your location, and only then do we query open GBIF and
			iNaturalist records for that rough area — rounded to about a kilometre, never your exact
			position, and never stored. If you decline, or your phone can’t get a fix, or you are offline,
			you keep this page. Location will always be the optional extra, never the way in.
		</p>
	</section>
</main>

<style>
	.place {
		background: var(--card);
		border: 1px solid var(--line);
		border-radius: 15px;
		padding: 14px 15px;
	}
	.locnote {
		background: var(--stonewash);
	}
	.locnote em {
		font-style: italic;
	}
	.place h2 {
		font-family: var(--display);
		font-weight: 400;
		font-size: 18px;
		margin: 0 0 4px;
	}
	.blurb {
		margin: 0 0 11px;
		font-size: 13.5px;
		line-height: 1.55;
		color: var(--soft);
		max-width: 62ch;
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
		background: var(--wash);
		border: 1px solid var(--wash-line);
		border-radius: 999px;
		padding: 5px 13px 5px 5px;
		text-decoration: none;
		color: var(--deep);
		font-weight: 700;
		font-size: 12.5px;
		min-height: 44px;
		transition: transform 0.12s ease;
	}
	.chip:active {
		transform: scale(0.97);
	}
	.chip img {
		width: 34px;
		height: 34px;
		border-radius: 50%;
		object-fit: cover;
		display: block;
	}
	@media (min-width: 900px) {
		.place {
			max-width: 760px;
		}
	}
</style>
