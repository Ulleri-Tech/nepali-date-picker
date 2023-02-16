<script lang="ts">
	import NepaliDate from 'nepali-date-converter';
	import { onMount } from 'svelte';
	import ShiftBSMonth from './ShiftBSMonth.svelte';
	import { getFirstDayOfMonth, getNumberOfDays } from '$lib/common/utils';
	import type { DateFormat } from '../common/types';
	import { shortDays, slices } from '$lib/common/constant';

	export let dateformat: DateFormat;
	export let value: string; // YYYY/MM/DD is storing Format!
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
		if (value) {
			[selectedYear, selectedMonth, selectedDay] = value.split('/').map((str) => Number(str));
			selectedDate = new NepaliDate(selectedYear, selectedMonth - 1, selectedDay).format(
				dateformat
			);
		} else {
			value = new NepaliDate().format('YYYY/MM/DD');
		}
		updateRows();
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

<div class="main">
	<div class="header">
		<span class="header-wrapper">
			{new NepaliDate(selectedYear, selectedMonth - 1, 1).format('MMMM YYYY')}
		</span>
		<ShiftBSMonth {restrictfuture} bind:selectedMonth bind:selectedYear {updateRows} />
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
					{#each col as i}
						<td>
							<div class="month-days">
								{#if i > 0 && i <= currentNumberOfDays}
									{#if i === selectedDay && selectedMonth == parseInt(value.split('/')[1])}
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
												type="button"
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
