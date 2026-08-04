<script lang="ts">
	import { base } from '$app/paths';
	import { page } from '$app/state';
</script>

<svelte:head>
	<title>Lost among the trees · Grove</title>
</svelte:head>

<main class="view" style="justify-content:center; text-align:center">
	<h1 style="font-family:var(--display); font-weight:400; font-size:28px; margin:0">
		Lost among the trees
	</h1>
	<p class="sub">
		{page.status === 404 ? 'That page isn’t in the guide.' : 'Something went wrong.'}
	</p>
	<a class="btn" style="align-self:center" href="{base}/">Back to Today</a>
</main>
