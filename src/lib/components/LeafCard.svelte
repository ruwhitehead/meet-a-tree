<script lang="ts">
	let { colors, size = 38, rotate = -10 }: { colors: [string, string]; size?: number; rotate?: number } =
		$props();
</script>

<span
	class="leaf"
	aria-hidden="true"
	style="width:{size}px;height:{size}px;background:linear-gradient(135deg,{colors[0]},{colors[1]});transform:rotate({rotate}deg)"
></span>

<style>
	.leaf {
		display: block;
		border-radius: 0 55% 0 55%;
	}
</style>
