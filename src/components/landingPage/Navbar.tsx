"use client";
import React, { useState } from "react";
import Link from "next/link";
import Logo from "../Logo";
import { NAVBAR_LINKS } from "@/constants/LandingPageNavLinks";
import HamBurgerButton from "./HamBurgerButton";
import NavbarCloseButton from "./NavbarCloseButton";
import { NavbarLinkProps } from "@/props/NavbarLinksProps";
import LandingThemeToggleBtn from "./LandingThemeToggleBtn";

const Navbar: React.FC = () => {
  // Variable state
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);

  // Function to toggle navbar
  const toggleNavbar = () => {
    setIsNavbarOpen(!isNavbarOpen);
  };

  return (
    <nav className="w-screen p-4 bg-[#DDFEF0] dark:bg-[#010D08] md:bg-transparent dark:md:bg-transparent fixed top-0 z-50">
      <div className="flex items-center justify-between">
        {/* Hamburger menu button for small screens */}
        <HamBurgerButton toggleNavbar={toggleNavbar} />

        {/* Navbar */}
        <div
          className={`w-3/5 sm:w-2/5 md:w-fit h-[100svh] md:h-full py-16 md:py-0  text-center bg-[#DDFEF0] dark:bg-[#010D08] md:bg-transparent  dark:md:bg-transparent block md:flex fixed z-50 md:relative top-0 left-0  transition-transform md:translate-x-0  ${
            isNavbarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          {/* Close Button */}
          {isNavbarOpen && <NavbarCloseButton toggleNavbar={toggleNavbar} />}

          {/* Navigation Links */}
          <ul className="">
            {NAVBAR_LINKS.map((link, index) => (
              <NavBarItem key={index} {...link} />
            ))}
          </ul>

          {/* Theme toggle button */}
          <LandingThemeToggleBtn />
        </div>

        {/* Logo */}
        <Logo />
      </div>
    </nav>
  );
};

// Navbar Item
const NavBarItem: React.FC<NavbarLinkProps> = ({ text, href, className }) => {
  console.log({text, className})
  return (
    <li className={`my-10 md:my-1 md:mx-5 text-lg block md:inline-block font-semibold`}>
      <Link href={href} className={className}>
        {text}
      </Link>
    </li>
  );
};

export default Navbar;
