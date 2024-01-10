"use client";
import useHeaders from "@/hooks/useHeaders";
import { handleApiError } from "@/libs/handleApiError";
import axios from "axios";
import { useRouter } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";
import { LuSpellCheck2 } from "react-icons/lu";
import { MdContentCopy, MdDelete } from "react-icons/md";

// text area button interface
interface NoteTextAreaActionBtnsProps {
  content: string;
  id: string;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setIsSpellCheckerOn: React.Dispatch<React.SetStateAction<boolean>>;
  isSpellCheckerOn: boolean;
}

const NoteTextAreaActionBtns: React.FC<NoteTextAreaActionBtnsProps> = ({
  content,
  setIsLoading,
  id,
  setIsSpellCheckerOn,
  isSpellCheckerOn,
}) => {
  // Header for Api request
  const headers = useHeaders();
  // Router to push
  const nav = useRouter();

  // function to copy note
  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    toast.success("Copied");
  };

  // Function to toggle spell checker
  const toggleSpellChecker = (): void => setIsSpellCheckerOn(!isSpellCheckerOn);

  // Function to delete note
  const handleDelete = async () => {
    try {
      setIsLoading(true);
      const res = await axios.delete(`/api/notes/deleteNote/${id}`, {
        headers,
      });
      nav.back();
      toast.success(res.data.message);
      nav.push("/dashboard/notes");
    } catch (error: any) {
      handleApiError(error);
    } finally {
      setIsLoading(false);
    }
  };

  // Function to save note
  const handleSave = async () => {
    try {
      const data = { content: content, noteId: id };
      setIsLoading(true);
      const res = await axios.put("/api/notes/updateNote", data, { headers });
      toast.success(res.data.message);
    } catch (error: any) {
      handleApiError(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full h-8 relative">
      {/* Copy button */}
      <button aria-label="Copy-button" className="h-8" onClick={handleCopy}>
        <MdContentCopy className="inline" size="1.4rem" />
      </button>

      {/* Delete button */}
      <button
        aria-label="delete-button"
        className="mx-4"
        onClick={handleDelete}
      >
        <MdDelete className="inline" size="1.6rem" color="red" />
      </button>

      {/* Spell Checker toggle button */}
      <button
        aria-label="spellchecker-toggle-button"
        onClick={toggleSpellChecker}
      >
        <LuSpellCheck2
          size="1.5rem"
          className={`inline ${
            isSpellCheckerOn ? "text-black dark:text-white" : "text-gray-500"
          }`}
        />
      </button>

      {/* Save button */}
      <button
        aria-label="save-button"
        onClick={handleSave}
        className=" w-20 h-8 ml-2 text-black font-semibold rounded-lg bg-[#19fa9a] absolute right-1"
      >
        Save
      </button>
    </div>
  );
};

export default NoteTextAreaActionBtns;
