"use client";
import { NoteProps } from "@/props/NoteProps";
import React, { useState } from "react";
import FetchError from "../../FetchError";
import NoItemFound from "../../NoItemFound";
import NotesListItem from "../../notes/NotesListItem";
import DashboardList from "./DashboardList";

// Dasboard notes list interface
interface DashboardNotesListProps {
  notes: NoteProps[];
}

const DashboardNotesList: React.FC<DashboardNotesListProps> = ({ notes }) => {
  // Variable States
  const [initialNotes, setInitialNotes] = useState<NoteProps[]>(notes);
  const [scrollPosition, setScrollPosition] = useState(0);

  // Function to scroll
  const handleScroll = (direction: "left" | "right") => {
    const container = document.getElementById("notesContainer");

    if (container) {
      const scrollAmount = 252;
      const newPosition =
        direction === "left"
          ? scrollPosition - scrollAmount
          : scrollPosition + scrollAmount;

      if (newPosition >= 0 && newPosition < container.scrollWidth) {
        container.scrollTo({
          left: newPosition,
          behavior: "smooth",
        });

        setScrollPosition(newPosition);
      } else {
        setScrollPosition(0);
      }
    }
  };

  // If there is an error
  if (initialNotes === undefined) {
    return <FetchError />;
  }

  return (
    <DashboardList
      handleScroll={handleScroll}
      id="notesContainer"
      heading="Your Notes"
      itemsArray={initialNotes}
    >
      {/* List */}
      {initialNotes.length > 0 ? (
        initialNotes.map((note: NoteProps, index: number) => (
          <NotesListItem key={index} {...note} />
        ))
      ) : (
        <NoItemFound variant="Watch Laters" />
      )}
    </DashboardList>
  );
};

export default DashboardNotesList;
