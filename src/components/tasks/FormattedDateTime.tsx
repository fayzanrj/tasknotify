"use client";

import { Roboto } from "next/font/google";

const roboto = Roboto({ subsets: ["latin"], weight: "500" });
// Formatted date time component interface
interface FormattedDateTimeProps {
  label: "Start time" | "Reminder Time" | "Date";
  info: string | Date;
  variant: "time" | "date";
}

// Formatted date time component
const FormattedDateTime: React.FC<FormattedDateTimeProps> = ({
  label,
  info,
  variant,
}) => {
  const formattedInfo =
    variant === "time"
      ? new Date(info).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })
      : new Date(info).toLocaleDateString();

  return (
    <div className="my-2">
      <p className="font-bold">
        {label} :{" "}
        <span className={`${roboto.className} ml-2 `}>{formattedInfo}</span>
      </p>
    </div>
  );
};

export default FormattedDateTime;
