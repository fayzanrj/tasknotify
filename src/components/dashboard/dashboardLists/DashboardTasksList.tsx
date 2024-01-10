"use client";
import { fetchTasks } from "@/libs/FetchTasks";
import { handleApiError } from "@/libs/handleApiError";
import { TaskProps } from "@/props/TaskProps";
import React, { useEffect, useState } from "react";
import FetchError from "../../FetchError";
import NoItemFound from "../../NoItemFound";
import DashboardTasksListSkeleton from "../../skeletons/DashboardTasksListSkeleton";
import RenderTags from "../../tasks/RenderTags";
import DashboardList from "./DashboardList";
import Link from "next/link";

// Dasboard tasks list interface
interface DashboardTasksListProps {
  accessToken: string;
}

const DashboardTasksList: React.FC<DashboardTasksListProps> = ({ accessToken }) => {
  // Variable states
  const [initialTasks, setInitialTasks] = useState<TaskProps[] | undefined>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [scrollPosition, setScrollPosition] = useState(0);

  // Use effect to get initial tasks
  useEffect(() => {
    // Function
    const fetchTodaysTasks = async () => {
      const date = new Date();
      try {
        const currentTasks: TaskProps[] | undefined = await fetchTasks(
          date,
          accessToken
        );
        setInitialTasks(currentTasks);
      } catch (error) {
        handleApiError(error);
      } finally {
        setIsLoading(false);
      }
    };

    // Calling Function
    fetchTodaysTasks();
  }, [accessToken]);

  // Function to scroll
  const handleScroll = (direction: "left" | "right") => {
    const container = document.getElementById("tasksContainer");

    if (container && scrollPosition >= 0) {
      const scrollAmount = 252;

      const newPosition =
        direction === "left"
          ? scrollPosition - scrollAmount
          : scrollPosition + scrollAmount;
      if (scrollPosition >= 0 && newPosition < container.scrollWidth) {
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

  // If there is an error fetching tasks
  if (initialTasks === undefined) {
    return <FetchError />;
  }

  return (
    <DashboardList
      handleScroll={handleScroll}
      id="tasksContainer"
      heading="Your today's tasks"
      itemsArray={initialTasks}
    >
      {/* List */}
      {isLoading ? (
        <DashboardTasksListSkeleton />
      ) : initialTasks.length > 0 ? (
        initialTasks.map((task: TaskProps, index: number) => (
          <DashboardTasksListItem key={index} {...task} />
        ))
      ) : (
        <NoItemFound variant="Tasks" />
      )}
    </DashboardList>
  );
};

export default DashboardTasksList;

// Task List item Component
const DashboardTasksListItem: React.FC<TaskProps> = ({
  taskTitle,
  tags,
  taskDesc,
  id,
}) => {
  return (
    <Link href={`/dashboard/tasks/taskdetail/${id}`}>
      <div className="min-w-[15rem] max-w-[15rem] h-44 p-3 rounded-lg border-[0.1rem] dark:border-[#1D1F21] bg-white dark:bg-[#1D1F21] overflow-hidden">
        {/* Tags */}
        <div className="mb-4 py-1 text-right overflow-hidden">
          <RenderTags tags={tags.slice(0, 2) || []} />
        </div>

        {/* Task title */}
        <h2 className="w-full text-center text-2xl text-ellipsis font-semibold overflow-hidden whitespace-nowrap">
          {taskTitle}
        </h2>

        {/* Task Description */}
        <p className="mt-2 mb-1 px-5 py-2 text-sm text-left text-ellipsis break-words">
          {taskDesc.slice(0, 50) + (taskDesc.length > 50 ? "....." : ".")}
        </p>
      </div>
    </Link>
  );
};
