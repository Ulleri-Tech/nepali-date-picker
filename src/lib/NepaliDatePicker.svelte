<script lang="ts">
	import NepaliDate from 'nepali-date-converter';
	import Calendar from './Calendar.svelte';
	import { clickOutside } from '$lib/clickOutside';
	export let dateFormat = 'YYYY/MM/DD';
	export let hideLabel: boolean = false;
	export let label: string = 'Date';
	export let restrictfuture: boolean = false;
	export let value: string; // YYYY/MM/DD is storing Format!

	let isOpenCalendar = false; // true: show calendar
	let selectedDate: string = new NepaliDate().format(dateFormat);
</script>

<main>
	<div class="date-container">
		<label for="date" class="date-label" class:hidden={hideLabel}>{label}</label>
		<div
			on:keydown={() => {
				isOpenCalendar = !isOpenCalendar;
			}}
			on:click={() => {
				isOpenCalendar = !isOpenCalendar;
			}}
			class="date-select-box"
		>
			<input
				placeholder="YYYY/MM/DD"
				type="text"
				bind:value={selectedDate}
				disabled
				class="dateInputText"
			/>
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

		<div
			use:clickOutside
			on:click_outside={() => {
				isOpenCalendar = false;
			}}
			style="position:relative; width:100px;"
			style:visibility={isOpenCalendar ? 'visible' : 'hidden'}
		>
			<div class="calender">
				<Calendar
					bind:open={isOpenCalendar}
					bind:value
					bind:selectedDate
					{restrictfuture}
					{dateFormat}
				/>
			</div>
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
		gap: 0.25rem;
		font-weight: normal;
		font-size: 0.875rem;
		line-height: 1.25rem;
	}

	.dateInputText {
		width: 100px;
		background-color: white;
		color: #161616;
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
	input:focus {
		outline: none;
	}

	.calender {
		position: absolute;
		z-index: 1000;
		left: 0;
	}
</style>
