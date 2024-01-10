import { TaskProps } from "@/props/TaskProps";
import Link from "next/link";
import React from "react";

type TaskStatus = "Pending" | "Completed" | "Overdue";
const getCurrentStatus = (date: string, taskStatus: TaskStatus) => {
  if (taskStatus === "Completed") return "Completed";
  if (taskStatus === "Overdue") return "Overdue";
  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);

  if (currentDate <= new Date(date)) {
    return "Pending";
  } else {
    return "Overdue";
  }
};

const TaskItem: React.FC<TaskProps> = ({
  taskTitle,
  taskDesc,
  startsAt,
  id,
  status,
  date,
}) => {
  // Finding current status of the task
  const currentStatus = getCurrentStatus(date, status);

  return (
    <article>
      <Link href={`/dashboard/tasks/taskdetail/${id}`}>
        <div className="w-80 sm:w-72 h-44 sm:h-40 p-3 rounded-xl bg-white dark:bg-[#1D1F21] shadow-lg drop-shadow-lg relative cursor-pointer select-none overflow-hidden box-border">
          {/* Task title */}
          <h2 className="w-full text-center text-ellipsis text-2xl font-semibold overflow-hidden whitespace-nowrap">
            {taskTitle}
          </h2>

          {/* Task Description */}
          <p className="mt-2 mb-1 text-sm text-ellipsis break-words">
            {taskDesc.slice(0, 100) + (taskDesc.length > 100 ? "....." : "a")}
          </p>

          <div className="w-[85%] flex justify-between items-center absolute bottom-2 left-1/2 transform -translate-x-1/2">
            {/* Task Status */}
            <p>{currentStatus}</p>

            {/* Task Start Time */}
            <p className="text-right">
              {startsAt && new Date(startsAt).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          </div>
        </div>
      </Link>
    </article>
  );
};

export default TaskItem;
