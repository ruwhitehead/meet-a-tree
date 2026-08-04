<script lang="ts">
	import { page } from '$app/state';
	import { base } from '$app/paths';

	const items = [
		{ href: '/', label: 'Today', icon: 'sun' },
		{ href: '/near', label: 'Near You', icon: 'pin' }
	];
	const items2 = [
		{ href: '/grove', label: 'My Grove', icon: 'leaf' },
		{ href: '/learn', label: 'Learn', icon: 'book' }
	];
	const railItems = [...items, { href: '/identify', label: 'Identify', icon: 'camera' }, ...items2];

	const isActive = (href: string) =>
		href === '/'
			? page.url.pathname === `${base}/` || page.url.pathname === base
			: page.url.pathname.startsWith(base + href);
</script>

{#snippet icon(name: string)}
	{#if name === 'sun'}
		<svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><circle cx="12" cy="12" r="4" /><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M19.1 4.9L17 7M7 17l-2.1 2.1" /></svg>
	{:else if name === 'pin'}
		<svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M12 21s-7-5.5-7-11a7 7 0 0 1 14 0c0 5.5-7 11-7 11z" /><circle cx="12" cy="10" r="2.6" /></svg>
	{:else if name === 'leaf'}
		<svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M6 21c0-9 3-15 12-17-1 9-4 14-12 17z" /><path d="M6 21c2-5 5-9 9-12" /></svg>
	{:else if name === 'camera'}
		<svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M4 8h3l2-3h6l2 3h3v11H4z" /><circle cx="12" cy="13" r="3.4" /></svg>
	{:else}
		<svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M12 5c-2-1.5-5-2-8-1.5v14C7 17 10 17.5 12 19c2-1.5 5-2 8-1.5v-14C17 3 14 3.5 12 5z" /><path d="M12 5v14" /></svg>
	{/if}
{/snippet}

<!-- mobile: bottom tab bar. Tabs REPLACE history so Back never walks a trail of
     tab switches (and so the first Back from the app root exits cleanly). -->
<nav class="tabbar" aria-label="Main">
	{#each items as item (item.href)}
		<a
			class="nav-btn"
			href="{base}{item.href}"
			aria-current={isActive(item.href) ? 'page' : undefined}
			data-sveltekit-replacestate
		>
			{@render icon(item.icon)}{item.label}
		</a>
	{/each}
	<div class="fabwrap">
		<a
			class="fab"
			href="{base}/identify"
			aria-label="Identify a tree"
			aria-current={isActive('/identify') ? 'page' : undefined}
			data-sveltekit-replacestate
		>
			<svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" aria-hidden="true"><path d="M4 8h3l2-3h6l2 3h3v11H4z" /><circle cx="12" cy="13" r="3.4" /></svg>
		</a>
	</div>
	{#each items2 as item (item.href)}
		<a
			class="nav-btn"
			href="{base}{item.href}"
			aria-current={isActive(item.href) ? 'page' : undefined}
			data-sveltekit-replacestate
		>
			{@render icon(item.icon)}{item.label}
		</a>
	{/each}
</nav>

<!-- desktop: persistent side rail -->
<div class="rail">
	<p class="railmark"><span class="mark" aria-hidden="true"></span>Meet a Tree</p>
	<nav aria-label="Sections">
		{#each railItems as item (item.href)}
			<a
				class="rail-btn"
				href="{base}{item.href}"
				aria-current={isActive(item.href) ? 'page' : undefined}
				data-sveltekit-replacestate
			>
				{@render icon(item.icon)}<span>{item.label}</span>
			</a>
		{/each}
	</nav>
	<p class="railfoot">
		Free forever, in support of the <strong>International Tree Foundation</strong> — registered
		charity no. 1106269
	</p>
</div>

<style>
	.tabbar {
		flex: none;
		display: flex;
		justify-content: space-around;
		align-items: center;
		padding: 8px 6px calc(10px + env(safe-area-inset-bottom));
		border-top: 1px solid var(--line);
		background: var(--card);
		z-index: 20;
	}
	.nav-btn {
		font-size: 10.5px;
		font-weight: 700;
		color: var(--soft);
		text-align: center;
		width: 64px;
		min-height: 48px;
		border-radius: 10px;
		text-decoration: none;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
	.nav-btn[aria-current='page'] {
		color: var(--deep);
	}
	:global(.ic) {
		display: block;
		width: 22px;
		height: 22px;
		margin: 0 auto 3px;
	}
	.fabwrap {
		width: 64px;
		display: grid;
		place-items: center;
	}
	.fab {
		width: 56px;
		height: 56px;
		border-radius: 50%;
		background: var(--green);
		margin-top: -34px;
		display: grid;
		place-items: center;
		box-shadow: 0 6px 14px rgba(22, 126, 60, 0.45);
		border: 3px solid var(--card);
	}
	.fab svg {
		width: 26px;
		height: 26px;
	}

	.rail {
		display: none;
	}
	@media (min-width: 900px) {
		.tabbar {
			display: none;
		}
		.rail {
			display: flex;
			flex-direction: column;
			gap: 22px;
			position: sticky;
			top: 0;
			align-self: start;
			height: 100dvh;
			padding: 34px 20px 24px;
			border-right: 1px solid var(--line);
			background: var(--card);
			grid-column: 1;
			grid-row: 1;
		}
		.rail nav {
			display: flex;
			flex-direction: column;
			gap: 4px;
		}
		.railmark {
			display: flex;
			align-items: center;
			gap: 9px;
			margin: 0;
			font-family: var(--display);
			font-size: 18px;
			color: var(--forest);
		}
		.railmark .mark {
			width: 24px;
			height: 24px;
			border-radius: 50%;
			background: var(--green);
			position: relative;
			flex: none;
		}
		.railmark .mark::after {
			content: '';
			position: absolute;
			inset: 6px;
			border-radius: 0 55% 0 55%;
			background: var(--card);
			transform: rotate(-8deg);
		}
		.rail-btn {
			display: flex;
			align-items: center;
			gap: 12px;
			padding: 11px 13px;
			border-radius: 11px;
			font-size: 15px;
			font-weight: 600;
			color: var(--ink);
			text-decoration: none;
			min-height: 44px;
			transition: background 0.12s ease;
		}
		.rail-btn :global(.ic) {
			margin: 0;
			width: 20px;
			height: 20px;
			flex: none;
		}
		.rail-btn:hover {
			background: var(--stonewash);
		}
		.rail-btn[aria-current='page'] {
			background: var(--wash);
			color: var(--deep);
			font-weight: 700;
		}
		.railfoot {
			margin: auto 0 0;
			font-size: 11.5px;
			line-height: 1.45;
			color: var(--soft);
		}
		.railfoot strong {
			color: var(--ink);
			font-weight: 600;
		}
	}
</style>
