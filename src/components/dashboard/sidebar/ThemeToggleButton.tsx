"use client";
import { AppContext } from "@/context/AppContext";
import { useContext } from "react";
import { FaMoon } from "react-icons/fa";
import { IoSunny } from "react-icons/io5";

const ThemeToggleButton = () => {
  // Dark mode variable state from App Content
  const { isDarkMode, setIsDarkMode } = useContext(AppContext);

  return (
    <li className="h-[2.9rem] my-1 px-3 text-sm text-black dark:text-[#8D8D8D] rounded-xl overflow-hidden">
      <button
        aria-label="toggle-theme-button"
        onClick={(): void => setIsDarkMode(!isDarkMode)}
        className="w-full h-full text-left relative"
      >
        {/* Icon */}
        <span className="pl-0.5">
          {isDarkMode ? (
            <IoSunny className="inline-block" size="1.1rem" />
          ) : (
            <FaMoon className="inline-block" size=".9rem" />
          )}
        </span>

        {/* Text */}
        <p className="w-full font-bold absolute left-9 top-1/2 transform -translate-y-1/2">
          {isDarkMode ? "Light Mode" : "Dark Mode"}
        </p>
      </button>
    </li>
  );
};

export default ThemeToggleButton;
