"use client";
import { SidebarTopNavLinks } from "@/constants/SidebarTopNavLinks";
import { AppContext } from "@/context/AppContext";
import React, { useContext } from "react";
import { CgProfile } from "react-icons/cg";
import Logo from "../../Logo";
import LogoutButton from "./LogoutButton";
import SidebarNavItem from "./SidebarNavItem";
import SidebarToggleButton from "./SidebarToggleButton";
import ThemeToggleButton from "./ThemeToggleButton";

const Sidebar: React.FC = () => {
  // App Context variable states
  const { isSidebarOpen, setIsSidebarOpen } = useContext(AppContext);

  // Function to show and hide sidebar
  const toggleSidebar = (): void => setIsSidebarOpen(!isSidebarOpen);

  return (
    <aside>
      {/* EMPTY DIV TO COVER THE SPACE BEHIND THE SIDE NAV BECAUSE OF USING POSTION FIXED */}
      {isSidebarOpen && (
        <div className="md:min-w-[16rem] hidden md:block "></div>
      )}

      {/* Navbar */}
      <nav
        className={`min-w-[60%] md:min-w-[16rem] h-full py-2 border-r-2 dark:border-[#262626] bg-white dark:bg-[#1f1f1f] fixed z-50 duration-500 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Opening and closing button for sidebar */}
        <SidebarToggleButton
          toggleSidebar={toggleSidebar}
          isSidebarOpen={isSidebarOpen}
        />

        {/* LOGO */}
        <div className="my-3">
          <Logo />
        </div>

        {/* Top navigation bar */}
        <ul className="my-10 p-3">
          {SidebarTopNavLinks.map((item, index) => (
            <SidebarNavItem
              key={index}
              {...item}
              toggleSidebar={toggleSidebar}
            />
          ))}
        </ul>

        {/* Bottom navigation bar */}
        <ul className="w-full p-3 absolute bottom-0">
          <SidebarNavItem
            text="Profile"
            href={"profile"}
            size={1.4}
            Icon={CgProfile}
            toggleSidebar={toggleSidebar}
          />
          {/* Theme toggle button */}
          <ThemeToggleButton />
          {/* Log out button */}
          <LogoutButton />
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
