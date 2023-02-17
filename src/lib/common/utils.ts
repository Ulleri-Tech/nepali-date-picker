import { firstDayOfEachMonth, numberOfDaysEachMonth } from './constant';
import type { DateFormat } from './types';

export function getFirstDayOfMonth(year: number, month: number): number {
	let pairFound = Object.entries(firstDayOfEachMonth).find(([key]) => key === year.toString());
	if (pairFound) {
		return pairFound[1][month - 1];
	} else {
		console.log('Date Not Found!');
		return 4;
	}
}
export function getNumberOfDays(year: number, month: number): number {
	let pairFound = Object.entries(numberOfDaysEachMonth).find(([key]) => key === year.toString());
	if (pairFound) {
		return pairFound[1][month - 1];
	} else {
		console.log('Date Not Found!');
		return 31;
	}
}

export function formatADdate(date: Date, format: DateFormat): string{
	if (format == 'MM/DD/YYYY') {
		return date.toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' });
	} else if (format == 'YYYY/MM/DD') {
		return date.toLocaleDateString('en-ZA');
	} else if (format == 'DD/MM/YYYY') {
		return date.toLocaleDateString('en-GB');
	} else {
		return date.toLocaleDateString('en-CA');
	}
}

export function getFirstDayOfMonthAD(year: number, month: number): number {
	return new Date(year, month - 1, 1).getDay();
}

export  function getNumberOfDaysAD(year: number, month: number): number {
	return new Date(year, month, 0).getDate();
}


export function isValidDate(d:string | Date) {
	let date= new Date(d)
	
	return  date instanceof Date && !isNaN(date.getTime());
  }