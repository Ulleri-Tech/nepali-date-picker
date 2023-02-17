import type { DateFormat } from "./types";

export const numberOfDaysEachMonth = {
	'2076': [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30],
	'2077': [31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
	'2078': [31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30],
	'2079': [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
	'2080': [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30],
	'2081': [31, 31, 32, 32, 31, 30, 30, 30, 29, 30, 30, 30],
	'2082': [31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 30, 30],
	'2083': [31, 31, 32, 31, 31, 30, 30, 30, 29, 30, 30, 30],
	'2084': [31, 31, 32, 31, 31, 30, 30, 30, 29, 30, 30, 30],
	'2085': [31, 32, 31, 32, 31, 31, 30, 30, 29, 30, 30, 30],
	'2086': [31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 30, 30],
	'2087': [31, 31, 32, 31, 31, 31, 30, 30, 29, 30, 30, 30],
	'2088': [30, 31, 32, 32, 30, 31, 30, 30, 29, 30, 30, 30],
	'2089': [31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 30, 30],
	'2090': [31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 30, 30],
	'2091': [31, 31, 32, 31, 31, 31, 30, 30, 29, 30, 30, 30],
	'2092': [31, 31, 32, 32, 31, 30, 30, 30, 29, 30, 30, 30],
	'2093': [31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 30, 30],
	'2094': [31, 31, 32, 31, 31, 30, 30, 30, 29, 30, 30, 30],
	'2095': [31, 31, 32, 31, 31, 31, 30, 29, 30, 30, 30, 30],
	'2096': [30, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
	'2097': [31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 30, 30],
	'2098': [31, 31, 32, 31, 31, 31, 29, 30, 29, 30, 30, 31],
	'2099': [31, 31, 32, 31, 31, 31, 30, 29, 29, 30, 30, 30],
	'2100': [31, 32, 31, 32, 30, 31, 30, 29, 30, 29, 30, 30]
};

export const firstDayOfEachMonth = {
	'2076': [0, 3, 0, 3, 0, 3, 5, 0, 2, 3, 4, 6],
	'2077': [1, 4, 1, 4, 1, 4, 6, 1, 3, 4, 6, 0],
	'2078': [3, 6, 2, 5, 2, 5, 1, 3, 4, 6, 0, 2],
	'2079': [4, 0, 3, 0, 3, 6, 2, 4, 5, 0, 1, 3],
	'2080': [5, 1, 5, 1, 5, 1, 3, 5, 0, 1, 2, 4],
	'2081': [6, 2, 5, 2, 6, 2, 4, 6, 1, 2, 4, 6],
	'2082': [1, 3, 0, 3, 0, 3, 5, 0, 2, 3, 5, 0],
	'2083': [2, 5, 1, 5, 1, 4, 6, 1, 3, 4, 6, 1],
	'2084': [3, 6, 2, 6, 2, 5, 0, 2, 4, 5, 0, 2],
	'2085': [4, 0, 4, 0, 4, 6, 2, 4, 6, 0, 2, 4],
	'2086': [6, 1, 5, 1, 5, 1, 3, 5, 0, 1, 3, 5],
	'2087': [0, 3, 6, 3, 6, 2, 5, 0, 1, 3, 5, 0],
	'2088': [2, 4, 0, 4, 1, 3, 6, 1, 3, 4, 6, 1],
	'2089': [3, 5, 2, 5, 2, 5, 0, 2, 4, 5, 0, 2],
	'2090': [4, 6, 3, 6, 3, 6, 1, 3, 5, 6, 1, 3],
	'2091': [5, 1, 4, 1, 4, 0, 3, 5, 0, 1, 3, 5],
	'2092': [0, 2, 5, 2, 6, 2, 4, 6, 1, 2, 4, 6],
	'2093': [1, 3, 0, 3, 0, 3, 5, 0, 2, 3, 5, 0],
	'2094': [2, 5, 1, 5, 1, 4, 6, 1, 3, 4, 6, 1],
	'2095': [3, 6, 2, 6, 2, 5, 1, 3, 4, 6, 1, 3],
	'2096': [5, 0, 3, 0, 4, 0, 2, 4, 5, 0, 1, 3],
	'2097': [5, 1, 5, 1, 5, 1, 3, 5, 0, 1, 3, 5],
	'2098': [0, 3, 6, 3, 6, 2, 5, 6, 1, 2, 4, 5],
	'2099': [1, 4, 0, 4, 0, 3, 6, 1, 2, 3, 5, 0],
	'2100': [2, 5, 2, 5, 2, 4, 0, 2, 3, 5, 6, 1]
};

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


export function formatADdate(date:Date, format: DateFormat):string{
	if(format=='MM/DD/YYYY'){
		return date.toLocaleDateString('en-US', {year: 'numeric', month: '2-digit', day: '2-digit'})
	}else if (format=='YYYY/MM/DD'){
		return  date.toLocaleDateString('en-ZA');
	
	}else if (format=='DD/MM/YYYY'){
		return date.toLocaleDateString('en-GB')
	}
	else {
		return date.toLocaleDateString('en-CA')
	}
}

export function getFirstDayOfMonthAD(year:number, month:number):number {
	return new Date(year, month-1, 1).getDay();
  }

  export function getNumberOfDaysAD(year:number, month:number):number {
	return new Date(year, month, 0).getDate();
  }

  export function isValidDate(d:string | Date) {
	let date= new Date(d)

	return  date instanceof Date && !isNaN(date.getTime());
  }