import { NumberOfDaysInMonth } from "@/constants/Months";

export const isLeapYear = (year: number) =>
  (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;

export const getInitialDate = (): Date => {
  let currentDate = new Date();
  let day = currentDate.getDate();
  let month = currentDate.getMonth();
  let year = currentDate.getFullYear();
  let lastMonthDays = NumberOfDaysInMonth[month === 0 ? 11 : month - 1];

  if (month === 2 && isLeapYear(year)) {
    lastMonthDays = 29; // February in a leap year
  }

  if (day <= 7) {
    day = lastMonthDays + day - 7;
    month = month === 0 ? 11 : month - 1;
    year -= month === 11 ? 1 : 0;
  } else {
    day -= 7;
  }

  const newDate = new Date(year, month, day);
  return newDate;
};

