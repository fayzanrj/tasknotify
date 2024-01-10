import { NoteProps } from "@/props/NoteProps";
import Link from "next/link";
import React from "react";

const NotesListItem: React.FC<NoteProps> = ({ content, id }) => {
  return (
    <Link href={`/dashboard/notes/${id}`}>
      <div className="w-56 h-56 p-4 text-ellipsis rounded-lg border-[0.1rem] dark:border-[#1D1F21] bg-white dark:bg-[#1D1F21] dark:shadow-lg overflow-hidden cursor-pointer">
        <p className="h-full text-ellipsis overflow-hidden">{content}</p>
      </div>
    </Link>
  );
};

export default NotesListItem;
