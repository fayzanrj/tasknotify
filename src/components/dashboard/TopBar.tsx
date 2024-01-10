"use client";
import React from "react";

const getGreetingMessage = () => {
  const currentHour = new Date().getHours();

  // Determine greeting based on the hour of the day
  if (currentHour >= 5 && currentHour <= 12) {
    return "Good Morning";
  } else if (currentHour < 18 && currentHour >= 12) {
    return "Good Afternoon";
  } else {
    return "Good Evening";
  }
};

interface TopBarProps {
  name: string;
}

const TopBar: React.FC<TopBarProps> = ({ name }) => {
  const greetingMessage = getGreetingMessage();
  const message = `${greetingMessage} ${name}`;

  return (
    <div className="w-full h-16 px-10 text-black dark:text-white border-b-2 dark:border-b-0 bg-white dark:bg-[#1F1F1F] relative z-40">
      {/* GREETING */}
      <p className="max-w-[90%] text-lg md:text-2xl font-semibold absolute top-1/2 transform -translate-y-1/2">
        {message}
      </p>
    </div>
  );
};

export default TopBar;
