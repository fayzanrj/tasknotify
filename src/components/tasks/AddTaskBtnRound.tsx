import Link from "next/link";
import React from "react";
import { IoMdAdd } from "react-icons/io";

const AddTaskBtnRound = () => {
  return (
    <Link href="/dashboard/tasks/addtask">
      <button
        aria-label="add-task-buton"
        className="w-14 h-14 bg-[#19fa9a] rounded-full fixed right-5 z-40 bottom-8"
      >
        <IoMdAdd
          size="1.3rem"
          className="text-[#1F1F1F] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        />
      </button>
    </Link>
  );
};
export default AddTaskBtnRound;
