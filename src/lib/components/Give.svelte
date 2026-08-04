<script lang="ts">
	/**
	 * The single giving ask, echoing how ITF actually fundraise on their own site.
	 *
	 * Two findings from reading internationaltreefoundation.org/donate:
	 *  - They deliberately do NOT publish "£X plants Y trees". Their framing is
	 *    outcome-led ("food and income for today"), so inventing per-tree figures
	 *    would both mislead and contradict them.
	 *  - Their strongest, most specific ask is the match: a monthly gift matched
	 *    for the first 12 months. That is genuinely persuasive and true, and the
	 *    app previously never mentioned it.
	 *
	 * There used to be four vague "Donate to ITF" links. One specific ask, in
	 * their words, converts better than four bland ones.
	 */
	let {
		tone = 'standing',
		reason = ''
	}: {
		/** `standing` = the always-there ask; `earned` = after a milestone */
		tone?: 'standing' | 'earned';
		/** what the user just did, for the earned version */
		reason?: string;
	} = $props();

	const DONATE = 'https://internationaltreefoundation.org/donate/';
</script>

<section class="give" aria-labelledby="give-title">
	<p class="eyebrow">{tone === 'earned' ? 'Worth marking' : 'Why this is free'}</p>
	<h2 id="give-title">
		{#if tone === 'earned' && reason}
			{reason} Plant a real one?
		{:else}
			Plant trees that provide food and income today, and protect nature tomorrow
		{/if}
	</h2>

	<p class="body">
		Meet a Tree costs nothing and never will. The International Tree Foundation has been planting
		with communities since 1922 — in West Pokot, Dundori and Mutaluni, and here in Britain and
		Ireland.
	</p>

	<p class="match">
		<strong>Your monthly gift is doubled.</strong> ITF match regular gifts for the first 12 months,
		at no extra cost to you.
	</p>

	<div class="ctas">
		<a class="btn" href={DONATE} target="_blank" rel="noopener">Give monthly ↗</a>
		<a class="btn ghost" href={DONATE} target="_blank" rel="noopener">Give once ↗</a>
	</div>

	<p class="small">
		Donations go directly to ITF, never through this app. Registered charity no. 1106269.
	</p>
</section>

<style>
	.give {
		background: var(--wash);
		border: 1px solid var(--wash-line);
		border-radius: 16px;
		padding: 16px;
	}
	.eyebrow {
		margin: 0;
		font-size: 10.5px;
		font-weight: 700;
		letter-spacing: 0.12em;
		text-transform: uppercase;
		color: var(--deep);
	}
	h2 {
		font-family: var(--display);
		font-weight: 400;
		font-size: 20px;
		line-height: 1.2;
		margin: 7px 0 9px;
		text-wrap: balance;
		color: var(--ink);
	}
	.body {
		margin: 0;
		font-size: 14px;
		line-height: 1.55;
		color: var(--soft);
	}
	.match {
		margin: 11px 0 0;
		font-size: 13.5px;
		line-height: 1.5;
		color: var(--soft);
		background: var(--card);
		border: 1px solid var(--wash-line);
		border-radius: 11px;
		padding: 10px 12px;
	}
	.match strong {
		color: var(--ink);
	}
	.ctas {
		display: flex;
		gap: 9px;
		flex-wrap: wrap;
		margin-top: 13px;
	}
	.small {
		margin: 11px 0 0;
		font-size: 11.5px;
		color: var(--soft);
	}
</style>
