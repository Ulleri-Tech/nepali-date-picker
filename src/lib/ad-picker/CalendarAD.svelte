<script lang="ts">
	import { onMount } from 'svelte';
	import ShiftAdMonth from './ShiftADMonth.svelte';
	import { formatADdate, getFirstDayOfMonthAD, getNumberOfDaysAD } from '$lib/common/utils';
	import type { DateFormat } from '../common/types';
	import { shortDays, slices } from '$lib/common/constant';

	export let dateformat: DateFormat;
	export let value: string; // YYYY-MM-DD is storing Format!
	export let open: boolean;
	export let restrictfuture: boolean;
	export let selectedDate: string;

	const currentDay = new Date().getDate(); // 1..31
	const currentMonth = new Date().getMonth() + 1; // 1..12
	const currentYear = new Date().getFullYear(); // 2023...

	let selectedDay: number = currentDay; // 1..31
	let selectedMonth: number = currentMonth; // 1..12
	let selectedYear: number = currentYear; // 2023...

	let currentNumberOfDays = getNumberOfDaysAD(selectedYear, selectedMonth);

	$: inCurrentMonth = currentMonth === selectedMonth && currentYear === selectedYear;

	let rows: any = [];

	// life cycle
	onMount(() => {
		if (value) {
			[selectedYear, selectedMonth, selectedDay] = value.split('-').map((str) => Number(str));

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
					{#each col as i}
						<td>
							<div class="month-days">
								{#if i > 0 && i <= currentNumberOfDays}
									{#if i === selectedDay && selectedMonth == parseInt(value.split('-')[1])}
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
