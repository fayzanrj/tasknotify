import { IoIosArrowDropleft } from "react-icons/io";

interface SidebarToggleButtonProps {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}

const SidebarToggleButton: React.FC<SidebarToggleButtonProps> = ({
  toggleSidebar,
  isSidebarOpen,
}) => {
  return (
    <button
      aria-label="sidebar-toggle-button"
      onClick={toggleSidebar}
      className={`dark:text-[#8D8D8D] rounded-full bg-white dark:bg-[#1f1f1f] absolute top-4 duration-500 ${
        isSidebarOpen
          ? "border-r-2 border-gray-300 dark:border-[#262626] -right-4"
          : "-right-9 rotate-180 fixed"
      }`}
    >
      <IoIosArrowDropleft size="2rem" />
    </button>
  );
};

export default SidebarToggleButton;
