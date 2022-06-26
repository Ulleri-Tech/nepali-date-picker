<script lang="ts">
	import NepaliDate from 'nepali-date-converter';
	import { onMount } from 'svelte';
	import Calender from './components/Calender.svelte';
	import { numberOfDaysEachMonth, firstDayOfEachMonth } from './data';
	export let selectedDate: any;

	let isOpenCalendar = false; // true: show calendar
	let selectedDay = new NepaliDate().getBS().date; // 1..31
	let selectedMonth = new NepaliDate().getBS().month + 1; // 1..12
	let selectedYear = new NepaliDate().getBS().year; // 2078...
	let rows: any = [];

	// life cycle
	onMount(() => {
		selectedDate = new NepaliDate().format('YYYY/MM/DD'); // Today's Date Selected
		updateRows();
	});

	function updateRows() {
		const firstDay = firstDayOfEachMonth[selectedYear][selectedMonth - 1]; // '0 to 6 (Weeks)'
		const numberOfDays = numberOfDaysEachMonth[selectedYear][selectedMonth - 1]; // 31
		const previousMonthDays = new Array(firstDay).fill(0);
		const currentMonthDays = Array.from({ length: numberOfDays }, (_, i) => i + 1);
		const nextMonthDays = new Array(42 - (previousMonthDays.length + numberOfDays)).fill(0);
		const daysArr = previousMonthDays.concat(currentMonthDays).concat(nextMonthDays);
		const slices = [0, 7, 14, 21, 28, 35];

		rows = slices.map((start) => daysArr.slice(start, start + 7));
		rows = rows.filter((row: any) => row[0] > 0 || row[6] > 0);
	}
</script>

{#if isOpenCalendar}
	<Calender
		bind:selectedMonth
		bind:selectedYear
		bind:selectedDay
		bind:selectedDate
		bind:rows
		{updateRows}
	/>
	<!-- <div class="overflow-auto fixed z-10 mt-16">
		<div class="flex justify-center items-center py-3 px-1">
			<div class="w-full max-w-sm shadow-lg">
				<div class="p-2 bg-white rounded-t sm:p-4">
					<div class="flex justify-between items-center px-2">
						header
					</div>
					<div class="flex overflow-x-auto justify-between items-center pt-2">
						
					</div>
				</div>
			</div>
		</div>
	</div> -->
{/if}
<div class="flex flex-col gap-1 w-36">
	<label for="date" class="mb-2 h-4 font-bold">Date</label>
	<div
		on:click={() => {
			isOpenCalendar = !isOpenCalendar;
		}}
		class="flex items-center ml-0.5 p-4 h-9 bg-white outline outline-[0.5px] solid outline-gray-500"
	>
		<input
			placeholder="YYYY/MM/DD"
			type="text"
			bind:value={selectedDate}
			disabled
			class="w-24 bg-white"
		/>
		<div class="flex">
			<svg
				width="14"
				height="20"
				viewBox="0 0 40 44"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					d="M36 4H34V0H30V4H10V0H6V4H4C1.8 4 0 5.8 0 8V40C0 42.2 1.8 44 4 44H36C38.2 44 40 42.2 40 40V8C40 5.8 38.2 4 36 4ZM36 40H4V14H36V40Z"
					fill="black"
					fill-opacity="0.56"
				/>
			</svg>
		</div>
	</div>
</div>
