<script lang="ts">
	export let selectedMonth: number;
	export let selectedYear: number;
	export let selectedDate: any;
	export let selectedDay: number;
	export let rows: any;
	export let updateRows: any;
	export let open: boolean;
	import NepaliDate from 'nepali-date-converter';
	import ShiftMonth from './ShiftMonth.svelte';

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

<div class="main">
	<div class="header">
		<span class="header-month">
			{new NepaliDate(selectedYear, selectedMonth - 1, 1).format('MMMM YYYY')}
		</span>
		<ShiftMonth bind:selectedMonth bind:selectedYear {updateRows} />
	</div>

	<table class="w-full reset-this">
		<thead>
			<tr>
				{#each arrDays as day}
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
								{#if i > 0}
									{#if i === selectedDay}
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
								{/if}
							</div>
						</td>
					{/each}
				</tr>
			{/each}
		</tbody>
	</table>
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
		padding: 0.5rem 0.5rem 0rem 0.5rem;
		justify-content: space-between;
	}
	.header-month {
		color: #1f2937;
		font-size: 0.875rem;
		line-height: 1.25rem;
		font-weight: 700;
	}

	button {
		background-color: #ffffff;
	}
	.text-day {
		color: #1f2937;
		font-size: 0.875rem;
		line-height: 1.25rem;
		font-weight: 500;
		text-align: center;
		background-color: #ffffff;
	}
	.selected-day {
		display: flex;
		background-color: #4338ca;
		color: #ffffff;
		font-size: 0.875rem;
		line-height: 1.25rem;
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
</style>
