import React from "react";

const TaskCompletionStatsSkeleton = () => {
  return (
    <div className="flex flex-wrap justify-center gap-3 md:gap-10 lg:gap:20">
      <div className=" w-72 h-28 rounded-lg bg-gray-200 dark:bg-[#404040] animate-pulse"></div>
      <div className=" w-72 h-28 rounded-lg bg-gray-200 dark:bg-[#404040] animate-pulse"></div>
    </div>
  );
};

export default TaskCompletionStatsSkeleton;
