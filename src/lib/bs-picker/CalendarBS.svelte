<script lang="ts">
	import { onMount } from 'svelte';
	import ShiftBSMonth from './ShiftBSMonth.svelte';
	import { getFirstDayOfMonth, getNumberOfDays, isValidDateBS } from '$lib/common/utils';
	import type { DateFormat } from '../common/types';
	import { shortDays, slices } from '$lib/common/constant';
	import NepaliDate from '$lib/packages/nepali-date-converter';

	export let dateformat: DateFormat;
	export let value: string; // YYYY/MM/DD or YYYY-MM-DD is storing Format!
	export let open: boolean;
	export let restrictfuture: boolean;
	export let selectedDate: string;

	const currentDay = new NepaliDate().getBS().date; // 1..31
	const currentMonth = new NepaliDate().getBS().month + 1; // 1..12
	const currentYear = new NepaliDate().getBS().year; // 2078...

	let selectedDay: number = currentDay; // 1..31
	let selectedMonth: number = currentMonth; // 1..12
	let selectedYear: number = currentYear; // 2078...

	$: inCurrentMonth = currentMonth === selectedMonth && currentYear === selectedYear;

	let currentNumberOfDays = getNumberOfDays(selectedYear, selectedMonth);
	let rows: any = [];

	// life cycle
	onMount(() => {
		if (isValidDateBS(value)) {
			[selectedYear, selectedMonth, selectedDay] = value.split(/[-/]/).map((str) => Number(str));
			selectedDate = new NepaliDate(selectedYear, selectedMonth - 1, selectedDay).format(
				dateformat
			);
			updateRows();
		} else {
			value = new NepaliDate().format('YYYY/MM/DD');
			updateRows();
		}
	});

	function updateRows() {
		const firstDay = getFirstDayOfMonth(selectedYear, selectedMonth); // '0 to 6 (Weeks)'
		currentNumberOfDays = getNumberOfDays(selectedYear, selectedMonth); // 31
		const previousMonthNoOfDays =
			selectedMonth == 1
				? getNumberOfDays(selectedYear - 1, 12)
				: getNumberOfDays(selectedYear, selectedMonth - 1); // 0 to 31

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
		selectedDate = new NepaliDate(y, m - 1, d).format(dateformat);
		value = new NepaliDate(y, m - 1, d).format('YYYY/MM/DD');
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
		// Due to limitation of data
		if (year >= 2099) return;
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

<div class="ut--div--main">
	<div class="ut--header">
		<span class="ut--header-wrapper">
			{new NepaliDate(selectedYear, selectedMonth - 1, 1).format('MMMM YYYY')}
		</span>
		<ShiftBSMonth {restrictfuture} bind:selectedMonth bind:selectedYear {updateRows} />
	</div>

	<table class="ut--calender-body">
		<thead>
			<tr>
				{#each shortDays as day}
					<th>
						<div class="ut--p--text-day">
							{day}
						</div>
					</th>
				{/each}
			</tr>
		</thead>
		<tbody>
			{#each rows as col}
				<tr>
					{#if isValidDateBS(value)}
						{#each col as i}
							<td>
								<div class="ut--div--month-days">
									{#if i > 0 && i <= currentNumberOfDays}
										{#if i === selectedDay && selectedMonth == parseInt(value.split(/[-/]/)[1])}
											<button
												type="button"
												on:click={() => {
													selectDate(selectedYear, selectedMonth, i);
												}}
												class="ut--button--selected-day ut--button--basic"
												class:font-extrabold={inCurrentMonth && currentDay === i}>{i}</button
											>
										{:else}
											<p class="ut--p--text-day">
												<button
													type="button"
													class="ut--button--basic ut--button--unselected-day"
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
										<p class="ut--p--text-day">
											<button
												type="button"
												class="ut--button--basic ut--button--unselected-day"
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

	<div style="width:100%">
		<button class="ut--button--select-today" on:click={() => selectToday()} type="button">
			Select Today
		</button>
	</div>
</div>

<style>
	.ut--calender-body {
		width: 240px;
	}
	.ut--div--main {
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
	.ut--button--basic {
		background-color: #ffffff;
		color: inherit;
		border: none;
		padding: 0;
		margin: 0;
		font: inherit;
		cursor: pointer;
	}
	.ut--header {
		display: flex;
		width: 100%;
		padding: 0.5rem 0rem 0rem 0rem;
		justify-content: space-between;
	}
	.ut--header-wrapper {
		color: #1f2937;
		font-weight: 700;
		padding: 0 0.5rem;
	}
	.ut--p--text-day {
		color: #1f2937;
		font-weight: 500;
		text-align: center;
		background-color: #ffffff;
	}

	.ut--button--unselected-day {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 1.25rem;
		height: 1.25rem;
		border-radius: 0.25rem;
	}

	.ut--button--selected-day {
		display: flex;
		background-color: #4338ca;
		color: #ffffff;
		justify-content: center;
		align-items: center;
		width: 1.5rem;
		height: 1.5rem;
		border-radius: 0.25rem;
	}
	.ut--button--selected-day:hover {
		background-color: #6366f1;
	}
	.ut--div--month-days {
		display: flex;
		justify-content: center;
		width: 100%;
		cursor: pointer;
		padding: 8px;
	}
	.ut--button--select-today {
		background-color: #4338ca;
		color: white;
		width: 100%;
		padding: 0.25rem 0;
	}
	.ut--button--select-today:hover {
		background-color: #6b62c7;
	}
</style>
