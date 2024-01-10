import { Roboto } from "next/font/google";
import React from "react";

const roboto = Roboto({ subsets: ["latin"], weight: "500" });

// Task Counter interface
interface TasksCounterProps {
  header: "Today's Tasks" | "Weekly Tasks";
  totalTasks: number;
  completedTasks: number;
}

// function to get color
const getColor = (header: string): string => {
  if (header === "Today's Tasks") {
    return "#19fa9a";
  } else {
    return "#22C1C3";
  }
};

const TaskCompletionStatsItem: React.FC<TasksCounterProps> = ({
  header,
  totalTasks,
  completedTasks,
}) => {
  // Calculating percentage of completed tasks
  const completedPercentage =
    totalTasks === 0 ? 0 : (completedTasks / totalTasks) * 100;

  return (
    <div className="w-72 h-28 px-4 py-3 rounded-lg border-[0.1rem] dark:border-0 bg-white dark:bg-[#1D1F21] shadow-xl drop-shadow-xl relative">
      {/* Header */}
      <h3 className="text-xl font-semibold">{header}</h3>

      <div
        className={`${roboto.className} w-[90%] absolute bottom-2 left-1/2 transform -translate-x-1/2`}
      >
        {/* No of completed and total tasks */}
        <div className="h-5 relative">
          <p className="text-sm">
            {completedTasks}/{totalTasks}
          </p>
          <p className="text-sm text-stone-500 absolute right-0 top-0">
            {completedPercentage.toFixed(2)}%
          </p>
        </div>

        {/* Task completion percentage bar */}
        <div className="w-full h-1.5 mt-2 rounded-full bg-stone-300 dark:bg-[#323232] shadow-sm drop-shadow-sm">
          <div
            style={{
              width: `${completedPercentage}%`,
              backgroundColor: getColor(header),
            }}
            className={`h-full rounded-full`}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default TaskCompletionStatsItem;
