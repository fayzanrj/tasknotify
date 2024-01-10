'use client'
import useHeaders from "@/hooks/useHeaders";
import { handleApiError } from "@/libs/handleApiError";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import ActivityLoader from "../ActivityLoader";

// Notes action button interface
interface NotesActionBtnsProps {
  isRefreshing: boolean;
  handleRefresh: () => void;
}

const NotesActionBtns: React.FC<NotesActionBtnsProps> = ({
  isRefreshing,
  handleRefresh,
}) => {
  // Variable states
  const [isCreatingNote, setIsCreatingNote] = useState<boolean>(false);
  // Router to change routes
  const nav = useRouter();
  // Headers for Api call
  const headers = useHeaders();

  // Function to create note
  const handleCreate = async () => {
    try {
      setIsCreatingNote(true);
      const res = await axios.post("/api/notes/createNote", {}, { headers });
      nav.push(`/dashboard/notes/${res.data.note.id}`);
    } catch (error: any) {
      handleApiError(error);
    } finally {
      setIsCreatingNote(false);
    }
  };

  return (
    <section className="w-full h-10 my-2 flex justify-end items-center gap-5">
      {/* Create new note button */}
      <button
        aria-label="add-note-button"
        onClick={handleCreate}
        disabled={isRefreshing}
        className="w-32 h-10 text-black font-semibold rounded-lg bg-[#19fa9a]"
      >
        {isCreatingNote ? <ActivityLoader /> : "Create Note"}
      </button>

      {/* Refresh button */}
      <button
        aria-label="refresh-watchlater-button"
        onClick={handleRefresh}
        disabled={isRefreshing}
        className="w-16 h-10 font-semibold rounded-lg"
      >
        {isRefreshing ? <ActivityLoader /> : "Refresh"}
      </button>
    </section>
  );
};

export default NotesActionBtns;
