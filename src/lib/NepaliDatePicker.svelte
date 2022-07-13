<script lang="ts">
	import NepaliDate from 'nepali-date-converter';
	import { onMount } from 'svelte';
	import Calendar from './components/Calendar.svelte';
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

	const handleDropdownClick = () => {
		isOpenCalendar = !isOpenCalendar; // togle state on click
	};

	const handleDropdownFocusLoss = ({ relatedTarget, currentTarget }) => {
		if (relatedTarget instanceof HTMLElement && currentTarget.contains(relatedTarget)) return; // check if the new focus target doesn't present in the dropdown tree (exclude ul\li padding area because relatedTarget, in this case, will be null)
		isOpenCalendar = false;
	};
</script>

<main>
	<div on:focusout={handleDropdownFocusLoss}>
		<div class="date-container" on:click={handleDropdownClick}>
			<label for="date" class="date-label">Date</label>
			<div class="date-select-box">
				<input placeholder="YYYY/MM/DD" type="text" bind:value={selectedDate} />
				<div class="date-icon">
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

		<div style="position: absolute;" style:visibility={isOpenCalendar ? 'visible' : 'hidden'}>
			<Calendar
				bind:open={isOpenCalendar}
				bind:selectedMonth
				bind:selectedYear
				bind:selectedDay
				bind:selectedDate
				bind:rows
				{updateRows}
			/>
		</div>
	</div>
</main>

<style>
	main {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		width: 100%;
		margin-left: auto;
		margin-right: auto;
		gap: 2.5rem;
	}

	.date-container {
		display: flex;
		flex-direction: column;
		background-color: white;
		gap: 0.25rem;
	}
	.date-label {
		text-align: left;
		margin-bottom: 0.5rem;
		height: 1rem;
		font-weight: 700;
	}
	.date-select-box {
		display: flex;
		padding-left: 0.25rem;
		justify-content: center;
		align-items: center;
		height: 2.25rem;
		background-color: white;
		outline-style: solid;
		outline-width: 0.5px;
		outline-color: #6b7280;
	}
	.date-icon {
		padding-right: 0.75rem;
		display: flex;
	}
	input {
		background-color: transparent;
		border: 0px solid;
		height: 1rem;
		width: 6rem;
		text-align: center;
	}
	textarea:focus,
	input:focus {
		outline: none;
	}
</style>
