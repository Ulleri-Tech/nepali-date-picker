import NepaliDate from 'nepali-date-converter';
import { firstDayOfEachMonth, numberOfDaysEachMonth } from './constant';
import type { DateFormat } from './types';

export function getFirstDayOfMonth(year: number, month: number): number {
	const pairFound = Object.entries(firstDayOfEachMonth).find(([key]) => key === year.toString());
	if (pairFound) {
		return pairFound[1][month - 1];
	} else {
		console.log('Date Not Found!');
		return 4;
	}
}
export function getNumberOfDays(year: number, month: number): number {
	const pairFound = Object.entries(numberOfDaysEachMonth).find(([key]) => key === year.toString());
	if (pairFound) {
		return pairFound[1][month - 1];
	} else {
		console.log('Date Not Found!');
		return 31;
	}
}

export function formatADdate(date: Date, format: DateFormat): string {
	const year = date.getFullYear();
	const month = String(date.getMonth() + 1).padStart(2, '0');
	const day = String(date.getDate()).padStart(2, '0');
	switch (format) {
		case 'YYYY/MM/DD':
			return `${year}/${month}/${day}`;
		case 'MM/DD/YYYY':
			return `${month}/${day}/${year}`;
		case 'DD/MM/YYYY':
			return `${day}/${month}/${year}`;
		case 'MM-DD-YYYY':
			return `${month}-${day}-${year}`;
		case 'DD-MM-YYYY':
			return `${day}-${month}-${year}`;
		default:
			return `${month}-${day}-${year}`;
	}
}

export function getFirstDayOfMonthAD(year: number, month: number): number {
	return new Date(year, month - 1, 1).getDay();
}

export function getNumberOfDaysAD(year: number, month: number): number {
	return new Date(year, month, 0).getDate();
}

export function isValidDate(d: string | Date) {
	const date = new Date(d);

	return date instanceof Date && !isNaN(date.getTime());
}

export function isValidDateBS(inputDate: string): boolean {
	// pattern to check YYYY/MM/DD or YYYY-MM-DD
	const regex = /^\d{4}\/\d{1,2}\/\d{1,2}$|^\d{4}-\d{1,2}-\d{1,2}$/;

	if (regex.test(inputDate)) {
		const [y, m, d] = inputDate.split(/[-/]/).map((str) => Number(str));

		if (m < 1 || m > 12 || d < 1 || d > 32) {
			console.log(`Invalid Month ${m} or Day ${d}`);
			return false;
		}
		try {
			const date = new NepaliDate(y, m - 1, d).format('YYYY/MM/DD');
			console.log('Valid Date', date);
			return true;
		} catch (e) {
			console.log('Invalid Date');
			return false;
		}
	}
	return false;
}
