<script lang="ts">
	import NepaliDate from 'nepali-date-converter';
	import { onMount } from 'svelte';

	const firstDayOfEachMonth = {
		'2078': ['Wed', 'Sat', 'Tue', 'Fri', 'Tue', 'Fri', 'Mon', 'Wed', 'Thu', 'Sat', 'Sun', 'Tue'],
		'2079': ['Thu', 'Sun', 'Wed', 'Sun', 'Wed', 'Sat', 'Tue', 'Thu', 'Fri', 'Sun', 'Mon', 'Wed']
	};
	let numberOfDaysEachMonth = {
		'2078': [31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30],
		'2079': [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30]
	};
	export let selectedDate: any;
	let isOpenCalendar = false; // true: show calendar
	const arrDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
	const currentDay = new NepaliDate().getBS().date; // 1..31
	const currentMonth = new NepaliDate().getBS().month + 1; // 1..12
	const currentYear = new NepaliDate().getBS().year; // 2078...
	let selectedDay = currentDay; // 1..31
	let selectedMonth = currentMonth; // 1..12
	let selectedYear = currentYear; // 2078...
	let rows: any = [];

	$: inCurrentMonth = currentMonth === selectedMonth && currentYear === selectedYear;
	// life cycle
	onMount(() => {
		selectedDate = new NepaliDate().format('YYYY/MM/DD'); // Today's Date Selected
		udpateRows();
	});

	function udpateRows() {
		const firstDay = firstDayOfEachMonth[selectedYear][selectedMonth - 1]; // 'Wed'

		const startingZeros = arrDays.indexOf(firstDay);
		const numberOfDays = numberOfDaysEachMonth[selectedYear][selectedMonth - 1]; // 31

		const previousMonthDays = new Array(startingZeros).fill(0);
		const currentMonthDays = Array.from({ length: numberOfDays }, (_, i) => i + 1);
		const nextMonthDays = new Array(42 - (previousMonthDays.length + numberOfDays)).fill(0);

		const daysArr = previousMonthDays.concat(currentMonthDays).concat(nextMonthDays);

		const slices = [0, 7, 14, 21, 28, 35];
		rows = slices.map((start) => daysArr.slice(start, start + 7));
		rows = rows.filter((row: any) => row[0] > 0 || row[6] > 0);
	}

	function previousMonth() {
		selectedMonth--;
		if (selectedMonth <= 0) {
			selectedMonth = 12;
			selectedYear--;
		}
		udpateRows();
	}

	function nextMonth() {
		selectedMonth++;
		if (selectedMonth > 12) {
			selectedMonth = 1;
			selectedYear++;
		}
		udpateRows();
	}

	function selectDate(y: any, m: any, d: any) {
		selectedDay = d;
		selectedDate = new NepaliDate(y, m - 1, d).format('YYYY/MM/DD');
		isOpenCalendar = false;
	}
</script>

{#if isOpenCalendar}
	<div class="overflow-auto fixed z-10 mt-16">
		<div class="flex justify-center items-center py-3 px-1">
			<div class="w-full max-w-sm shadow-lg">
				<div class="p-2 bg-white rounded-t sm:p-4">
					<div class="flex justify-between items-center px-2">
						<span class="text-sm font-bold text-gray-800 sm:text-base focus:outline-none"
							>{new NepaliDate(selectedYear, selectedMonth - 1, 1).format('MMMM YYYY')}</span
						>
						<div class="flex items-center">
							<button
								type="button"
								on:click={previousMonth}
								aria-label="calendar backward"
								class="text-white-800"
							>
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
							<button
								type="button"
								on:click={nextMonth}
								aria-label="calendar forward"
								class="ml-3 text-gray-800"
							>
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
					</div>
					<div class="flex overflow-x-auto justify-between items-center pt-2">
						<table class="w-full">
							<thead>
								<tr>
									{#each arrDays as day}
										<th>
											<div class="flex justify-center w-full">
												<p class="text-sm font-medium text-center text-gray-800 sm:text-base">
													{day}
												</p>
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
												<div class="flex justify-center p-2 w-full cursor-pointer">
													{#if i > 0}
														{#if i === selectedDay}
															<button
																type="button"
																on:click={() => {
																	selectDate(selectedYear, selectedMonth, i);
																}}
																class="flex justify-center items-center w-8 h-8 text-sm text-white bg-indigo-700 rounded sm:text-base hover:bg-indigo-500 focus:bg-indigo-500 focus:ring-2 focus:ring-indigo-700 focus:ring-offset-2 focus:outline-none"
																class:font-extrabold={inCurrentMonth && currentDay === i}
																>{i}</button
															>
														{:else}
															<p class="text-sm font-medium text-gray-500 sm:text-base">
																<button
																	class="border-none"
																	class:font-extrabold={inCurrentMonth && currentDay === i}
																	on:click={() => {
																		selectDate(selectedYear, selectedMonth, i);
																	}}
																>
																	{i}
																</button>
															</p>
														{/if}
													{/if}
												</div>
											</td>
										{/each}
									</tr>
								{/each}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	</div>
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
