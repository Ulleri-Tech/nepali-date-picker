<script lang="ts">
	import CalendarAD from './CalendarAD.svelte';
	import { clickOutside } from '$lib/common/clickOutside';
	import type { DateFormat } from '../common/types';
	export let dateformat: DateFormat = 'YYYY/MM/DD';
	export let hidelabel: boolean = false;
	export let placeholder: string = 'YYYY/MM/DD';
	export let zIndex: string = 'auto';
	export let label: string = 'Date';
	export let restrictfuture: boolean = false;
	export let value: string | Date; // YYYY/MM/DD is storing Format!

	let isOpenCalendar = false; // true: show calendar
	let selectedDate: string;
</script>

<main>
	<div class="date-container">
		{#if !hidelabel}
			<label for="date" class="date-label">{label}</label>
		{/if}
		<div
			on:keydown={() => {
				isOpenCalendar = !isOpenCalendar;
			}}
			on:click={() => {
				isOpenCalendar = !isOpenCalendar;
			}}
			class="date-select-box"
		>
			<input {placeholder} type="text" bind:value={selectedDate} class="dateInputText" disabled />
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
			style="position:relative; width:100px; z-index: {zIndex}"
			style:visibility={isOpenCalendar ? 'visible' : 'hidden'}
		>
			<div class="calender">
				<CalendarAD
					bind:open={isOpenCalendar}
					bind:value
					bind:selectedDate
					{restrictfuture}
					{dateformat}
				/>
			</div>
		</div>
	</div>
</main>
