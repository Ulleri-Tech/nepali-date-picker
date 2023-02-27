<script lang="ts">
	import { onMount } from 'svelte';
	import ShiftAdMonth from './ShiftADMonth.svelte';
	import {
		formatADdate,
		getFirstDayOfMonthAD,
		getNumberOfDaysAD,
		isValidDate
	} from '$lib/common/utils';
	import type { DateFormat } from '../common/types';
	import { shortDays, slices } from '$lib/common/constant';

	export let dateformat: DateFormat;
	export let value: string | Date; // YYYY-MM-DD is storing Format!
	export let open: boolean;
	export let restrictfuture: boolean;
	export let selectedDate: string;

	const currentDay = new Date().getDate(); // 1..31
	const currentMonth = new Date().getMonth() + 1; // 1..12
	const currentYear = new Date().getFullYear(); // 2023...

	let selectedDay: number = currentDay; // 1..31
	let selectedMonth: number = currentMonth; // 1..12
	let selectedYear: number = currentYear; // 2023...

	let currentNumberOfDays: number;
	$: inCurrentMonth = currentMonth === selectedMonth && currentYear === selectedYear;

	let rows: any = [];

	// life cycle
	onMount(() => {
		currentNumberOfDays = getNumberOfDaysAD(selectedYear, selectedMonth);

		if (isValidDate(value)) {
			selectedYear = new Date(value).getFullYear();
			selectedMonth = new Date(value).getMonth() + 1;
			selectedDay = new Date(value).getDate();
			selectedDate = formatADdate(
				new Date(selectedYear, selectedMonth - 1, selectedDay),
				dateformat
			);
		} else {
			value = formatADdate(new Date(), 'YYYY-MM-DD');
		}
		updateRows();
	});

	function updateRows() {
		const firstDay = getFirstDayOfMonthAD(selectedYear, selectedMonth); // '0 to 6 (Weeks)'
		currentNumberOfDays = getNumberOfDaysAD(selectedYear, selectedMonth); // 31

		const previousMonthNoOfDays =
			selectedMonth == 1
				? getNumberOfDaysAD(selectedYear - 1, 12)
				: getNumberOfDaysAD(selectedYear, selectedMonth - 1); // 0 to 31

		const previousMonthDays = Array.from(
			{ length: firstDay },
			(_, i) => i - previousMonthNoOfDays
		).reverse(); // [-31,-30,-29,..]

		const currentMonthDays = Array.from({ length: currentNumberOfDays }, (_, i) => i + 1); // [1,2,3,..,31]

		const nextMonthDays = Array.from(
			{ length: 42 - (previousMonthDays.length + currentNumberOfDays) },
			(_, i) => currentNumberOfDays + (i + 1)
		); // [32,33,34,..]

		const daysArr = previousMonthDays.concat(currentMonthDays).concat(nextMonthDays);
		rows = slices.map((start) => daysArr.slice(start, start + 7));
		rows = rows.filter((row: any) => row[0] > 0 || row[6] > 0);
	}

	function selectDate(y: number, m: number, d: number) {
		selectedDay = d;
		selectedDate = formatADdate(new Date(y, m - 1, d), dateformat);
		value = formatADdate(new Date(y, m - 1, d), 'YYYY-MM-DD');
		open = false;
	}

	function selectPreviousDate(year: number, month: number, negD: number) {
		const day = Math.abs(negD);
		if (month == 1) {
			selectDate(year - 1, 12, day);
			selectedYear = year - 1;
			selectedMonth = 12;
		} else {
			selectDate(year, month - 1, day);
			selectedYear = year;
			selectedMonth = month - 1;
		}
		updateRows();
	}

	function selectNextDate(year: number, month: number, D: number) {
		const day = D - currentNumberOfDays;
		if (month == 12) {
			selectDate(year + 1, 1, day);
			selectedYear = year + 1;
			selectedMonth = 1;
		} else {
			selectDate(year, month + 1, day);
			selectedYear = year;
			selectedMonth = month + 1;
		}
		updateRows();
	}

	function selectToday() {
		selectedYear = currentYear;
		selectedMonth = currentMonth;
		selectDate(currentYear, currentMonth, currentDay);
		updateRows();
	}
</script>

<div class="main">
	<div class="header">
		<span class="header-wrapper">
			{new Date(selectedYear, selectedMonth - 1, 1).toLocaleString('en-ca', {
				month: 'long',
				year: 'numeric'
			})}
		</span>
		<ShiftAdMonth {restrictfuture} bind:selectedMonth bind:selectedYear {updateRows} />
	</div>

	<table class="calender-body">
		<thead>
			<tr>
				{#each shortDays as day}
					<th>
						<div class="text-day">
							{day}
						</div>
					</th>
				{/each}
			</tr>
		</thead>
		<tbody>
			{#each rows as col}
				<tr>
					{#if isValidDate(value)}
						{#each col as i}
							<td>
								<div class="month-days">
									{#if i > 0 && i <= currentNumberOfDays}
										{#if i === selectedDay && selectedMonth == new Date(value).getMonth() + 1}
											<button
												type="button"
												on:click={() => {
													selectDate(selectedYear, selectedMonth, i);
												}}
												class="selected-day"
												class:font-extrabold={inCurrentMonth && currentDay === i}>{i}</button
											>
										{:else}
											<p class="text-day">
												<button
													style="border-style: none;"
													style:font-weight={inCurrentMonth && currentDay === i ? '800' : '400'}
													on:click={() => {
														selectDate(selectedYear, selectedMonth, i);
													}}
												>
													{i}
												</button>
											</p>
										{/if}
									{:else}
										<p class="text-day">
											<button
												type="button"
												style="border-style: none; color:gray;"
												on:click={() => {
													i < 0
														? selectPreviousDate(selectedYear, selectedMonth, i)
														: selectNextDate(selectedYear, selectedMonth, i);
												}}
											>
												{i < 0 ? Math.abs(i) : i - currentNumberOfDays}
											</button>
										</p>
									{/if}
								</div>
							</td>
						{/each}
					{/if}
				</tr>
			{/each}
		</tbody>
	</table>

	<div class="button-wrapper">
		<button class="select-today" on:click={() => selectToday()} type="button">
			Select Today
		</button>
	</div>
</div>

<style>
	.calender-body {
		width: 240px;
	}
	.main {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		background-color: white;
		border: 1px solid rgb(218, 218, 218);
		font-weight: normal;
		font-size: 0.875rem;
		line-height: 1.25rem;
		padding: 0.5rem;
		margin-top: 0.25rem;
	}
	button {
		background-color: #ffffff;
		color: inherit;
		border: none;
		padding: 0;
		margin: 0;
		font: inherit;
		cursor: pointer;
	}
	.header {
		display: flex;
		width: 100%;
		padding: 0.5rem 0rem 0rem 0rem;
		justify-content: space-between;
	}
	.header-wrapper {
		color: #1f2937;
		font-weight: 700;
		padding: 0 0.5rem;
	}
	.text-day {
		color: #1f2937;
		font-weight: 500;
		text-align: center;
		background-color: #ffffff;
	}

	.selected-day {
		display: flex;
		background-color: #4338ca;
		color: #ffffff;
		justify-content: center;
		align-items: center;
		width: 1.5rem;
		height: 1.5rem;
		border-radius: 0.25rem;
	}
	.selected-day:hover {
		background-color: #6366f1;
	}
	.month-days {
		display: flex;
		justify-content: center;
		width: 100%;
		cursor: pointer;
		padding: 8px;
	}
	.select-today {
		background-color: #4338ca;
		color: white;
		width: 100%;
		padding: 0.25rem 0;
	}
	.select-today:hover {
		background-color: #6b62c7;
	}
	.button-wrapper {
		width: 100%;
	}
</style>
