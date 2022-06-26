<script lang="ts">
	import { clickOutside } from '../utils';
	import NepaliDate from 'nepali-date-converter';
	import ShiftMonth from './ShiftMonth.svelte';
	import CalenderTable from './CalenderTable.svelte';

	export let selectedMonth: number;
	export let selectedYear: number;
	export let selectedDate: any;
	export let selectedDay: number;
	export let rows: any;
	export let updateRows: any;
	export let open: boolean;
</script>

<div
	class="main"
	use:clickOutside={{ enabled: open, cb: () => (open = false) }}
	on:click|preventDefault={() => (open = !open)}
>
	<div class="header justify-between">
		<span class="font-bold text-sm text-gray-800 sm:text-base focus:outline-none">
			{new NepaliDate(selectedYear, selectedMonth - 1, 1).format('MMMM YYYY')}
		</span>
		<ShiftMonth bind:selectedMonth bind:selectedYear {updateRows} />
	</div>

	<CalenderTable
		bind:selectedMonth
		bind:selectedYear
		bind:selectedDay
		bind:selectedDate
		bind:rows
		bind:open
	/>
</div>

<style>
	.main {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		z-index: 20;
		border: 1px solid rgb(218, 218, 218);
		padding-left: 3px;
	}
	.header {
		display: flex;
		width: 100%;
		padding: 1rem;
		justify-content: space-between;
	}
</style>
