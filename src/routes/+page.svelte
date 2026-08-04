<script lang="ts">
	import { base } from '$app/paths';
	import { factForDate, SEASONS } from '$lib/content/facts';
	import { grove } from '$lib/grove.svelte';

	const now = new Date();
	const dateLine = `${now.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' })} · ${SEASONS[now.getMonth()]}`;
	const greeting = now.getHours() < 12 ? 'Good morning' : now.getHours() < 18 ? 'Good afternoon' : 'Good evening';
	const fact = factForDate(now);
</script>

<svelte:head>
	<title>Grove — meet the trees near you</title>
	<meta
		name="description"
		content="A free pocket companion that turns noticing trees into a habit — in support of the International Tree Foundation."
	/>
</svelte:head>

<main class="view">
	<div class="vhead">
		<div>
			<p class="vsub">{dateLine}</p>
			<h1>{greeting}</h1>
		</div>
		<span class="pill">🌿 {grove.streak.count === 1 ? 'day 1' : `${grove.streak.count}-day streak`}</span>
	</div>

	<div class="card tint">
		<p class="label">Today's tree fact</p>
		<p class="serif">{fact}</p>
	</div>

	<div class="card">
		<p class="label">Near you this week</p>
		<p class="serif" style="font-size:15px">
			Rowan berries are turning — three rowans within 500 m of the park gates.
		</p>
		<p class="samplenote">Sample data — the live feed uses open GBIF records.</p>
	</div>

	<div class="card">
		<p class="label forest">September challenge</p>
		<p class="serif" style="font-size:15px">
			Autumn Colours Bingo opens soon. Bring a friend — boards are better in pairs.
		</p>
	</div>

	<div class="give">
		<p class="gt">Enjoying Grove? Plant a real tree.</p>
		<p class="gb">
			Grove is free forever. If it makes you love trees a little more, the International Tree
			Foundation plants them for real — registered charity 1106269.
		</p>
		<a
			class="btn small"
			style="margin-top:10px"
			href="https://internationaltreefoundation.org/donate/"
			target="_blank"
			rel="noopener">Donate to ITF ↗</a
		>
	</div>

	<div class="lockup">
		<div class="mark" aria-hidden="true"></div>
		<p class="lt">
			<b>Grove — in support of the International Tree Foundation</b>
			Registered charity no. 1106269. Free forever · no ads · your data stays on your phone.
		</p>
	</div>

	<a class="pill" style="align-self:center" href="{base}/identify/">Meet your first tree →</a>
</main>
