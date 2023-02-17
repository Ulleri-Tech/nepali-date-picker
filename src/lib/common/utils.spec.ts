import {describe, test, expect } from 'vitest';
import { getFirstDayOfMonth, getNumberOfDays, isValidDate, isValidDateBS } from './utils';

describe("Testing getFirstDay of Month of BS calender", () => {
    test("should output first day of year 2090 and month 12 is 3", () => {
        let year = 2090; // 2076..2099
        let month= 12; // 1..12
        expect(getFirstDayOfMonth(year,month)).equal(3);
    });

    test("should output first day of year 2076 and month 5 is 0", () => {
        let year = 2076; // 2076..2099
        let month= 5; // 1..12
        expect(getFirstDayOfMonth(year,month)).equal(0);
    });

    test("should output first day of year 3000 and month 1 is 4", () => {
        let year = 3000; // out of range
        let month= 1; 
        expect(getFirstDayOfMonth(year,month)).equal(4); // out of range but default date is 4
    });
});


describe("Testing getNumber of Days of BS calender", () => {
    test("should output no of days in 2090/12 is 30", () => {
        let year = 2090; // 2076..2099
        let month= 12; // 1..12
        expect(getNumberOfDays(year,month)).equal(30);
    });

    test("should output no of days in 2083/9 is 29", () => {
        let year = 2083; // 2076..2099
        let month= 9; // 1..12
        expect(getNumberOfDays(year,month)).equal(29);
    });

    test("should output no of days in 3000/1 is 31", () => {
        let year = 3000; // out of range
        let month= 1; 
        expect(getNumberOfDays(year,month)).equal(31); // out of range but default date is 4
    });
});


describe("Testing Valid Date checker for AD calender", () => {
    test("should output true. Since Feb 31 can becomes Mar-3, 2090", () => {
        let year = "2090/02/31"; // AD Date in string
        expect(isValidDate(year)).equal(true);
    });

    test("should output false. Since month 13 return invalid date", () => {
        let year = "1997/13/30"; // AD Date in string
        expect(isValidDate(year)).equal(false);
    });
   
    test("should output false. Since month 0 return invalid date", () => {
        let year = "2021/0/28"; // AD Date in string
        expect(isValidDate(year)).equal(false);
    });
   
    test("should output false. Since no date can have 32 days in a month", () => {
        let year = "2001/02/32"; // AD Date in string
        expect(isValidDate(year)).equal(false);
    });

    test("should output true. function accept both date and string", () => {
        let year = new Date(); // AD Date Today
        expect(isValidDate(year)).equal(true);
    });

});


describe("Testing Valid Date checker for BS calender", () => {
    test("should output true.", () => {
        let year = "2090/02/33"; // BS Date in string
        expect(isValidDateBS(year)).equal(false);
    });

    test("should output false. Invalid Pattern ", () => {
        let year = "2088-11/32"; // BS Date in string
        expect(isValidDateBS(year)).equal(false);
    });

    test("should output true. Accept two type of pattern YYYY-MM-DD and YYYY/MM/DD ", () => {
        let year = "2088-11-32"; // BS Date in string
        expect(isValidDateBS(year)).equal(true);
    });
    

});