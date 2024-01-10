"use client";
import DatePicker from "@/components/tasks/DatePicker";
import { fetchTasks } from "@/libs/FetchTasks";
import { getInitialDate } from "@/libs/GetInitialDate";
import { handleApiError } from "@/libs/handleApiError";
import { TaskProps } from "@/props/TaskProps";
import React, { useEffect, useState } from "react";
import TasksList from "./TasksList";

// Task Panel interface
interface TaskPanelProps {
  accessToken: string;
}

const TaskPanel: React.FC<TaskPanelProps> = ({ accessToken }) => {
  // Variable states
  const [tasks, setTasks] = useState<TaskProps[] | undefined>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Fetching current date tasks
  useEffect(() => {
    // Function
    const fetchData = async () => {
      try {
        const currentTasks: TaskProps[] | undefined = await fetchTasks(
          new Date(),
          accessToken
        );
        setTasks(currentTasks);
      } catch (error) {
        handleApiError(error);
      } finally {
        setIsLoading(false);
      }
    };

    // Fetching
    fetchData();
  }, [accessToken]);

  // Getting inital date for the date picker calender
  const intialDate = getInitialDate();

  return (
    <div className="w-full relative">
      {/* Date picker calender */}
      <DatePicker
        initialDate={intialDate}
        isLoading={isLoading}
        numDatesToShow={15}
        setTasks={setTasks}
        setIsLoading={setIsLoading}
      />
      {/* Tasks list */}
      <TasksList tasks={tasks} isLoading={isLoading} />
    </div>
  );
};

export default TaskPanel;
