import React from "react";

// Ham burger button interface
interface HamBurgerButtonProps {
  toggleNavbar: () => void;
}

const HamBurgerButton: React.FC<HamBurgerButtonProps> = ({ toggleNavbar }) => {
  return (
    <button
      aria-label="open-navbar-button"
      className="text-black dark:text-white md:hidden outline-none"
      onClick={toggleNavbar}
    >
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M4 6h16M4 12h16m-7 6h7"
        />
      </svg>
    </button>
  );
};

export default HamBurgerButton;
