<script lang="ts">
	import CalendarAD from './CalendarAD.svelte';
	import { clickOutside } from '$lib/common/clickOutside';
	import type { DateFormat } from '../common/types';
	export let dateformat: DateFormat = 'YYYY-MM-DD';
	export let hidelabel = false;
	export let placeholder = 'YYYY-MM-DD';
	export let zIndex = 'auto';
	export let label = 'Date';
	export let restrictfuture = false;
	export let value: string | Date; // YYYY/MM/DD is storing Format!

	let isOpenCalendar = false; // true: show calendar
	let selectedDate: string;
</script>

<main class="ut---main">
	<div class="ut--date-container">
		{#if !hidelabel}
			<label for="date" class="ut--date-label">{label}</label>
		{/if}
		<div
			on:keydown={() => {
				isOpenCalendar = !isOpenCalendar;
			}}
			on:click={() => {
				isOpenCalendar = !isOpenCalendar;
			}}
			class="ut--date-select-box"
		>
			<input
				{placeholder}
				type="text"
				bind:value={selectedDate}
				class="ut--dateInputText"
				disabled
			/>
			<div class="ut--date-icon">
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
			<div class="ut--calender">
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

<style lang="scss">
	:global {
		html {
			box-sizing: border-box;
			font-size: 16px;
		}
		*,
		*:before,
		*:after {
			box-sizing: inherit;
			margin: 0;
			padding: 0;
		}
		button,
		input {
			background: none;
			color: inherit;
			border: none;
			padding: 0;
			margin: 0;
			font: inherit;
			cursor: pointer;
		}
		body,
		h1,
		h2,
		h3,
		h4,
		h5,
		h6,
		p,
		ol,
		ul {
			margin: 0;
			padding: 0;
			font-weight: normal;
			font-size: 0.875rem;
			line-height: 1.25rem;
		}
		ol,
		ul {
			list-style: none;
		}
		img {
			max-width: 100%;
			height: auto;
		}
		table,
		thead,
		tbody,
		tfoot,
		tr,
		th,
		td {
			margin: 0;
			padding: 0;
			-webkit-border-horizontal-spacing: 0;
			-webkit-border-vertical-spacing: 0;
		}
	}
	.ut---main {
		width: 140px;
	}
	.ut--dateInputText {
		width: 100px;
		background-color: white;
		color: #161616;
		height: 2rem;
		text-align: center;
	}

	.ut--dateInputText:focus {
		outline: none;
	}
	.ut--dateInputText:disabled {
		color: #161616;
	}
	.ut--date-container {
		display: flex;
		flex-direction: column;
		background-color: white;
	}
	.ut--date-label {
		text-align: left;
		margin-bottom: 0.5rem;
		height: 1rem;
		font-weight: 600;
	}
	.ut--date-select-box {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 2.5rem;
		background-color: white;
		outline: 0.5px solid #6b7280;
		outline-offset: -2px;
	}
	.ut--date-icon {
		padding-right: 0.75rem;
		display: flex;
	}

	.ut--calender {
		position: absolute;
		left: 0;
	}
</style>
