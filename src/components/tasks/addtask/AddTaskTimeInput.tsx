import { addZero } from "@/libs/GetFormattedData";
import { DateTimeInputProps } from "@/props/DateTimeProps";
import React from "react";

const AddTaskTimeInput: React.FC<DateTimeInputProps> = ({
  label,
  id,
  state,
  setState,
  selectedDate,
}) => {
  // Checing current date
  const isCurrentDate =
    selectedDate ===
    `${addZero(new Date().getFullYear())}-${addZero(
      new Date().getMonth() + 1
    )}-${addZero(new Date().getDate())}`;

  // Function to hanle change
  const handleChange = (e: React.FormEvent<HTMLInputElement>): void => {
    const passedTime =
      e.currentTarget.value <
      `${addZero(new Date().getHours())}:${addZero(new Date().getMinutes())}`;

    if (isCurrentDate && passedTime) {
      setState(
        `${addZero(new Date().getHours())}:${addZero(new Date().getMinutes())}`
      );
    } else {
      setState(e.currentTarget.value);
    }
  };

  return (
    <div className="my-5">
      {/* Label for the time input */}
      <label htmlFor={id} className="ml-2">
        {label}
      </label>
      <br />
      {/* Time input field */}
      <input
        id={id}
        type="time"
        value={state}
        onChange={handleChange}
        className="w-full mt-1 px-3 py-2 border-2 dark:border-[#1F1F1F] rounded-lg dark:bg-[#1F1F1F] outline-none dark:[color-scheme:dark]"
      />
    </div>
  );
};

export default AddTaskTimeInput;
