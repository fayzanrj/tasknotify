import { TaskProps } from "@/props/TaskProps";
import FetchError from "../FetchError";
import NoItemFound from "../NoItemFound";
import TaskItemSkeleton from "../skeletons/TaskItemSkeleton";
import TaskItem from "./TaskItem";
import React from "react";

// Tasks List interface
interface TasksListProps {
  tasks: TaskProps[] | undefined;
  isLoading: boolean;
}

const TasksList: React.FC<TasksListProps> = ({ tasks, isLoading }) => {
  // If tasks are loading
  if (isLoading) {
    return <TaskItemSkeleton />;
  }

  // If there is error fetching tasks
  if (tasks === undefined) {
    return <FetchError />;
  }

  // If there are no tasks
  if (tasks.length === 0) {
    return (
      <div className="mt-20">
        <NoItemFound variant="Tasks" />
      </div>
    );
  }

  return (
    <div
      className={`py-10 px-10 lg:px-16 flex flex-wrap justify-center ${
        tasks.length >= 4 ? "sm:justify-center " : "sm:justify-start"
      } gap-5`}
    >
      {tasks.map((task: TaskProps, index: number) => (
        <TaskItem key={index} {...task} />
      ))}
    </div>
  );
};

export default TasksList;
