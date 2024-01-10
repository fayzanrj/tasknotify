"use client";
import useDeviceWidth from "@/hooks/useDeviceWidth";
import { SidebarNavProps } from "@/props/SidebarNavProps";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

// Sidebar nav item interface
interface SidebarNavItemProps extends SidebarNavProps {
  toggleSidebar: () => void;
}

const SidebarNavItem: React.FC<SidebarNavItemProps> = ({
  text,
  href,
  Icon,
  size,
  toggleSidebar,
}) => {
  const pathname = usePathname();
  const path = pathname.split("/");

  // Checking the current path
  const isActive =
    path[2] === href || (path.length === 2 && href === "dashboard");

  // Closing sidebar on click in mobile devices
  const screenWidth = useDeviceWidth();

  // Function close sidebar on click on any item of devices with width === or > 768px
  const handleClick = (): void => {
    if (screenWidth <= 768) {
      toggleSidebar()
    }
  };
  return (
    <li
      className={`my-1 p-3 text-sm rounded-xl relative ${
        isActive ? "bg-[#19fa9a] text-black" : "dark:text-[#8D8D8D] text-black"
      }`}
      onClick={handleClick}
    >
      <Link href={href === "dashboard" ? "/dashboard" : `/dashboard/${href}`}>
        {/* Icon */}
        <span>
          <Icon className="" size={`${size}rem`} />
        </span>

        {/* Text */}
        <p className="w-fit font-bold absolute left-12 top-1/2 transform -translate-y-1/2">
          {text}
        </p>
      </Link>
    </li>
  );
};

export default SidebarNavItem;
