<script lang="ts">
	import NepaliDatePicker from '$lib/NepaliDatePicker.svelte';
	let dateBS: string;
</script>

<h1>Nepali Date Picker</h1>
<ul class="wrapper">
	<li>
		<p>1. Simple</p>
		<NepaliDatePicker value="2079/01/01" />
	</li>
	<li>
		<p>2. Without Label</p>
		<NepaliDatePicker hidelabel value="2079/01/01" />
	</li>
	<li>
		<p>2. Change Label</p>
		<NepaliDatePicker label="Meeting Date" value="2079/01/01" />
	</li>
	<li>
		<p>4. Custom Date Format</p>
		<NepaliDatePicker value={dateBS} dateformat="DD-MM-YYYY" />
	</li>
	<li>
		<p>5. Custom Placeholder</p>
		<NepaliDatePicker placeholder="DD-MM-YYYY" value={dateBS} />
	</li>
	<li>
		<p>6. Restrict Future Date</p>
		<NepaliDatePicker restrictfuture value="2079/01/01" />
	</li>
	<li>
		<p>7. AD Calendar Type</p>
		<NepaliDatePicker calendarType="AD" value="2023-01-01" />
	</li>
</ul>

<style>
	.wrapper {
		display: grid;
		grid-template-columns: 1fr;
		gap: 2rem;
		width: 100%;
		padding: 2rem;
		justify-content: center;
		align-items: center;
	}
	p {
		padding-bottom: 1rem;
		font-family: monospace;
		font-size: x-large;
	}
	h1 {
		text-align: center;
		margin: 1rem 0rem;
		font-size: 2.25rem;
		line-height: 2.5rem;
	}

	@media (min-width: 600px) {
		.wrapper {
			grid-template-columns: repeat(2, 1fr);
		}
	}
</style>
