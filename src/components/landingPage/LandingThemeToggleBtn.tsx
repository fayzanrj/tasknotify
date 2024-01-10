"use client";
import { AppContext } from "@/context/AppContext";
import React, { useContext } from "react";
import { FaMoon } from "react-icons/fa";
import { IoSunny } from "react-icons/io5";

const LandingThemeToggleBtn = () => {
  // Dark Mode state from App Context
  const { isDarkMode, setIsDarkMode } = useContext(AppContext);

  return (
    <button
      aria-label="change-theme-button"
      className="w-8 h-8 md:my-2 relative"
      onClick={() => setIsDarkMode(!isDarkMode)}
      type="button"
    >
      {isDarkMode ? (
        <IoSunny
          className="font-semibold absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 "
          size="1.5rem"
        />
      ) : (
        <FaMoon
          className="font-semibold absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          size="1rem"
        />
      )}
    </button>
  );
};

export default LandingThemeToggleBtn;
