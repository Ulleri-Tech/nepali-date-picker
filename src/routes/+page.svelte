<script>
	import NepaliDatePicker from '$lib/NepaliDatePicker.svelte';
</script>

<div class="divWrapper">
	<h1>Nepali Date Picker</h1>

	<NepaliDatePicker value="2078/01/01" />
</div>

<style>
	.divWrapper {
		display: flex;
		flex-direction: column;
		width: 100%;
		justify-content: center;
		align-items: center;
	}
	h1 {
		margin-bottom: 1rem;
		font-size: 2.25rem;
		line-height: 2.5rem;
	}
</style>
