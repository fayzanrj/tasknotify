// Importing constants and props
import { NumberOfDaysInMonth } from "@/constants/Months";
import { addZero } from "@/libs/GetFormattedData";
import { DateTimeInputProps } from "@/props/DateTimeProps";
import React from "react";

// Function to calculate the minimum date
const calculateMinDate = (date?: string) => {
  if (date) {
    const currentDate = new Date(date);
    return `${currentDate.getFullYear()}-${addZero(
      currentDate.getMonth() + 1
    )}-${addZero(currentDate.getDate())}`;
  } else {
    const currentDate = new Date();
    return `${currentDate.getFullYear()}-${addZero(
      currentDate.getMonth() + 1
    )}-${addZero(currentDate.getDate())}`;
  }
};

// Function to calculate the maximum date for input
const calculateMaxDate = () => {
  const currentDate = new Date();
  let day = currentDate.getDate();
  let month = currentDate.getMonth();
  let year = currentDate.getFullYear();
  let currentMonthDays = NumberOfDaysInMonth[month];

  if (new Date(year, 1, 29).getDate() === 29) {
    currentMonthDays = 29; // February in a leap year
  }

  const DAYS_TO_ADD = 7;

  if (day >= 25) {
    day = day + DAYS_TO_ADD - currentMonthDays;
    month = month === 11 ? 0 : month + 1;
    year = month === 11 ? year + 1 : year;
  } else {
    day += DAYS_TO_ADD;
  }

  const newDate = `${year}-${addZero(month + 1)}-${addZero(day)}`;
  return newDate;
};

// Component for the date input field
const AddTaskDateInput: React.FC<DateTimeInputProps> = ({
  label,
  id,
  state,
  setState,
  date,
  variant,
}) => {
  return (
    <div className="my-5">
      <label htmlFor={id} className="ml-2">
        {label}
      </label>
      <br />
      <input
        id={id}
        type="date"
        min={variant === "EDIT" ? calculateMinDate(date) : calculateMinDate()} // Set the minimum date using the function
        max={calculateMaxDate()}
        value={state}
        onChange={(e): void => setState(e.currentTarget.value)}
        className="w-full mt-1 px-3 py-2 border-2 dark:border-[#1F1F1F] rounded-lg dark:bg-[#1F1F1F] outline-none dark:[color-scheme:dark]"
      />
    </div>
  );
};

export default AddTaskDateInput;
