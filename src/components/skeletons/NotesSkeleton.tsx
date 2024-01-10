import Notes from "@/app/dashboard/notes/page";
import React from "react";

const NotesSkeleton = () => {
  return (
    <div className="flex flex-wrap justify-center md:justify-start gap-3">
      <NotesSkeletonItem />
      <NotesSkeletonItem />
      <NotesSkeletonItem />
      <NotesSkeletonItem />
      <NotesSkeletonItem />
      <NotesSkeletonItem />
    </div>
  );
};

export default NotesSkeleton;

const NotesSkeletonItem = () => (
  <div className="w-56 h-56 p-4 text-ellipsis rounded-lg bg-gray-200 dark:bg-[#404040] shadow-lg overflow-hidden cursor-pointer animate-pulse"></div>
);
