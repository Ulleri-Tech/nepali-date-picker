<script lang="ts">
	import NepaliDate from 'nepali-date-converter';
	export let restrictfuture: boolean;
	export let selectedMonth: number;
	export let selectedYear: number;
	export let updateRows: any;

	function previousMonth() {
		if (selectedYear < 2076 || (selectedMonth - 1 <= 0 && selectedYear - 1 < 2076)) return;
		selectedMonth--;
		if (selectedMonth <= 0) {
			selectedMonth = 12;
			selectedYear--;
		}
		updateRows();
	}
	function nextMonth() {
		if (
			selectedYear >= new NepaliDate().getBS().year &&
			selectedMonth + 1 > new NepaliDate().getBS().month + 1 &&
			restrictfuture
		)
			return;
		selectedMonth++;
		if (selectedMonth > 12) {
			selectedMonth = 1;
			selectedYear++;
		}
		updateRows();
	}
</script>

<div>
	<button type="button" on:click={previousMonth} aria-label="calendar backward">
		<svg
			xmlns="http://www.w3.org/2000/svg"
			class="icon icon-tabler icon-tabler-chevron-left"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			stroke-width="1.5"
			stroke="currentColor"
			fill="none"
			stroke-linecap="round"
			stroke-linejoin="round"
		>
			<path stroke="none" d="M0 0h24v24H0z" fill="none" />
			<polyline points="15 6 9 12 15 18" />
		</svg>
	</button>

	<button type="button" on:click={nextMonth} aria-label="calendar forward">
		<svg
			xmlns="http://www.w3.org/2000/svg"
			class="icon icon-tabler icon-tabler-chevron-right"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			stroke-width="1.5"
			stroke="currentColor"
			fill="none"
			stroke-linecap="round"
			stroke-linejoin="round"
		>
			<path stroke="none" d="M0 0h24v24H0z" fill="none" />
			<polyline points="9 6 15 12 9 18" />
		</svg>
	</button>
</div>
