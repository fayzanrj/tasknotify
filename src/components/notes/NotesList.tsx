"use client";
import useHeaders from "@/hooks/useHeaders";
import { handleApiError } from "@/libs/handleApiError";
import { NoteProps } from "@/props/NoteProps";
import axios from "axios";
import React, { useEffect, useState } from "react";
import FetchError from "../FetchError";
import NoItemFound from "../NoItemFound";
import NotesSkeleton from "../skeletons/NotesSkeleton";
import NotesActionBtns from "./NotesActionBtns";
import NotesListItem from "./NotesListItem";

// Notes list interface
interface NotesListProps {
  notes: NoteProps[];
}

const NotesList: React.FC<NotesListProps> = ({ notes }) => {
  const [allNotes, setAllNotes] = useState<NoteProps[]>(notes);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const headers = useHeaders();

  // Fuction to fetch latest notes
  const handleRefresh = async () => {
    try {
      setIsRefreshing(true);
      const res = await axios.get("/api/notes/getAllNotes", { headers });
      setAllNotes(res.data.notes);
    } catch (error: any) {
      handleApiError(error);
    } finally {
      setIsRefreshing(false);
    }
  };

  // Props to pass to Notes action button in an object instead of writing evertime
  const NotesActionBtnsProps = {
    isRefreshing,
    handleRefresh,
  };

  // If is Refreshing state is true i.e. notes are being fetched
  if (isRefreshing) {
    return (
      <>
        <NotesActionBtns {...NotesActionBtnsProps} />
        <NotesSkeleton />;
      </>
    );
  }

  // If there is an error fetching notes
  if (allNotes === undefined) {
    return (
      <>
        <NotesActionBtns {...NotesActionBtnsProps} />
        <FetchError />;
      </>
    );
  }

  // If there are no notes
  if (allNotes.length <= 0) {
    return (
      <>
        <NotesActionBtns {...NotesActionBtnsProps} />
        <div className="mt-20">
          <NoItemFound variant="Notes" />
        </div>
      </>
    );
  }

  return (
    <>
      <NotesActionBtns {...NotesActionBtnsProps} />
      <div className="flex flex-wrap justify-center md:justify-start gap-3">
        {allNotes.map((note: NoteProps, index: number) => (
          <NotesListItem key={index} {...note} />
        ))}
      </div>
    </>
  );
};

export default NotesList;
