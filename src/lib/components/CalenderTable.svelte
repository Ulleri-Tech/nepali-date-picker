<script lang="ts">
	import NepaliDate from 'nepali-date-converter';
	export let selectedDay: number;
	export let selectedDate: any;
	export let selectedMonth: number;
	export let selectedYear: number;
	export let open: boolean;
	export let rows: any;

	const arrDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

	const currentMonth = new NepaliDate().getBS().month + 1; // 1..12
	const currentYear = new NepaliDate().getBS().year; // 2078...
	const currentDay = new NepaliDate().getBS().date; // 1..31

	function selectDate(y: any, m: any, d: any) {
		selectedDay = d;
		selectedDate = new NepaliDate(y, m - 1, d).format('YYYY/MM/DD');
		open = false;
	}
	$: inCurrentMonth = currentMonth === selectedMonth && currentYear === selectedYear;
</script>

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
										class:font-extrabold={inCurrentMonth && currentDay === i}>{i}</button
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
