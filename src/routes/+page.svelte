<script lang="ts">
	import NepaliDatePicker from '$lib/bs-picker/NepaliDatePicker.svelte';
	import DatePicker from '$lib/ad-picker/DatePicker.svelte';
	let dateBS: string;
	let todayAD = new Date();
</script>

<div
	style="max-width:1024px; margin: auto; font-family:system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif"
>
	<h1>Nepali Date Picker</h1>
	<ul class="wrapper">
		<li class="date-container">
			<p>1. Simple</p>
			<NepaliDatePicker value="2079/01/01" />

			<div class="code">
				<b>CODE</b>
				<span class="script-span"
					>{` import {NepaliDatePicker} from '@ulleritech/nepali-date-picker';`}</span
				>
				<span class="html-span">{`<NepaliDatePicker value="2079/01/01" />`}</span>
			</div>
		</li>
		<li class="date-container">
			<p>2. Without Label</p>
			<span />
			<NepaliDatePicker hidelabel value="2079-11-01" />

			<div class="code">
				<b>CODE</b>

				<span class="html-span">{`<NepaliDatePicker hidelabel value="2079-11-01" />`}</span>
			</div>
		</li>
		<li class="date-container">
			<p>2. Change Label</p>
			<NepaliDatePicker label="Meeting Date" value="2079/12/01" />
			<div class="code">
				<b>CODE</b>

				<span class="html-span"
					>{`<NepaliDatePicker label="Meeting Date" value="2079/12/01" />`}</span
				>
			</div>
		</li>
		<li class="date-container">
			<p>4. Custom Date Format</p>
			<NepaliDatePicker value={dateBS} dateformat="DD-MM-YYYY" placeholder="DD-MM-YYYY" />
			<div class="code">
				<b>CODE</b>
				<span class="script-span">{`let dateBS: string;`}</span>
				<span class="html-span"
					>{`<NepaliDatePicker value={dateBS} dateformat="DD-MM-YYYY" placeholder="DD-MM-YYYY" />`}</span
				>
			</div>
		</li>
		<li class="date-container">
			<p>5. AD Calendar</p>
			<DatePicker value={todayAD} dateformat="MM-DD-YYYY" />
			<div class="code">
				<b>CODE</b>
				<span class="script-span"
					>{` import {DatePicker} from '@ulleritech/nepali-date-picker';`}</span
				><span class="script-span">{`let todayAD = new Date();`}</span>
				<span class="html-span">{`<DatePicker dateformat="MM-DD-YYYY" value={todayAD} />`}</span>
			</div>
		</li>
	</ul>
</div>

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

	.script-span {
		color: darkseagreen;
	}
	.html-span {
		color: darkturquoise;
	}

	.date-container {
		display: flex;
		gap: 1rem;
	}

	.code {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		outline: 1px solid white;
		border-radius: 3px;
		padding: 10px;
		color: white;
		background-color: rgb(17 24 39);
		max-width: 460px;
		font-size: small;
	}
	p {
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
