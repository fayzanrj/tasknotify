"use client";
import { WatchLaterProps } from "@/props/WatchLaterProps";
import React, { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import WatchLaterDeleteButton from "./WatchLaterDeleteButton";

interface WatchLaterActionButtonProps {
  note: string;
  id: string;
  setWatchLaterList: React.Dispatch<React.SetStateAction<WatchLaterProps[]>>;
}
const WatchLaterActionButton: React.FC<WatchLaterActionButtonProps> = ({
  note,
  id,
  setWatchLaterList,
}) => {
  // Variable state
  const [isOpen, setIsOpen] = useState<boolean>(false);

  // Function to toggle note and delet button section
  const handleClick = (): void => setIsOpen(!isOpen);

  return (
    <>
      <section
        className={`w-[16rem] my-2 relative overflow-hidden duration-200 ${
          isOpen ? "h-28" : "h-0"
        }`}
      >
        {/* Note */}
        <Note note={note} />

        {/* Delete watch later button */}
        <WatchLaterDeleteButton
          id={id}
          setWatchLaterList={setWatchLaterList}
          setIsOpen={setIsOpen}
        />
      </section>

      {/* Open Menu Button */}
      <SectionToggleButton handleClick={handleClick} isOpen={isOpen} />
    </>
  );
};

export default WatchLaterActionButton;

// Note Component
const Note = ({ note }: { note: string }) => (
  <div className="w-10/12 h-28 p-2 rounded-lg border-[.1rem] dark:border-[#1D1F21] bg-white dark:bg-[#1D1F21] overflow-y-auto SCROLL_BAR">
    <p>
      Note : <span>{note.slice(0, 80)}</span>
    </p>
  </div>
);

// Section toggle button interface
interface SectionToggleButtonProps {
  handleClick: () => void;
  isOpen: boolean;
}

// Section toggle button component
const SectionToggleButton: React.FC<SectionToggleButtonProps> = ({
  handleClick,
  isOpen,
}) => (
  <button
    aria-label="section-toggle-button"
    className="w-[16rem] h-10 rounded-lg bg-white dark:bg-[#1D1F21] shadow-lg drop-shadow-lg"
    onClick={handleClick}
  >
    <IoIosArrowDown
      size="1.6rem"
      className={`inline-block duration-200 transform ${
        isOpen ? "rotate-180" : "rotate-0"
      }`}
    />
  </button>
);
