import React, { useContext } from "react";
import ScrollButton from "./ScrollButton";
import { WatchLaterProps } from "@/props/WatchLaterProps";
import { NoteProps } from "@/props/NoteProps";
import { TaskProps } from "@/props/TaskProps";
import { AppContext } from "@/context/AppContext";

// Dashboard list interface
interface DashboardListProps {
  children: React.ReactNode;
  id: string;
  heading: string;
  itemsArray: WatchLaterProps[] | NoteProps[] | TaskProps[];
  handleScroll: (direction: "right" | "left") => void;
}

const DashboardList: React.FC<DashboardListProps> = ({
  children,
  id,
  heading,
  itemsArray,
  handleScroll,
}) => {
  // Sidebar state from App Context
  const { isSidebarOpen } = useContext(AppContext);
  
  return (
    <div className="my-10">
      {/* Heading */}
      <h3 className="my-5 mx-10 text-2xl font-semibold">{heading}</h3>
      {/* List div */}
      <div
        className={`w-full h-full text-center flex justify-between items-center gap-[0.585rem] relative ${
          isSidebarOpen ? "md:w-[calc(100vw_-20rem)]" : "md:w-full"
        } `}
      >
        {/* LEFT BUTTON */}
        <ScrollButton
          direction="left"
          onClick={() => handleScroll("left")}
          disabled={itemsArray === undefined || itemsArray.length <= 0}
        />

        {/* LISTS */}
        <div
          id={id}
          className="md:w-[91%] mx-auto flex gap-3 overflow-x-auto scroll-smooth NO_SCROLLBAR"
        >
          {children}
        </div>

        {/* Right scroll button */}
        <ScrollButton
          direction="right"
          onClick={() => handleScroll("right")}
          disabled={itemsArray === undefined || itemsArray.length <= 0}
        />
      </div>
    </div>
  );
};

export default DashboardList;
