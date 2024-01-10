import NoTaskFound from "@/components/tasks/NoTaskFound";
import TaskForm from "@/components/tasks/addtask/TaskForm";
import { getHeaders } from "@/libs/GetHeaders";
import { TaskProps } from "@/props/TaskProps";
import { Metadata, NextPage } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Edit task",
};

// Task edit interface
interface TaskEditProps {
  params: { taskId: string };
}

const EditTask: NextPage<TaskEditProps> = async ({ params }) => {
  // If id provided is not of 24 chars
  if (params.taskId.length !== 24) {
    return <NoTaskFound />;
  }

  // HEADERS FOR API REQUEST
  const headers = await getHeaders();

  // Fetching task details for the specified taskId
  const response = await fetch(
    `${process.env.HOST}/api/tasks/getTask/${params.taskId}`,
    { cache: "no-cache", headers: headers }
  );
  const res = await response.json();
  const task: TaskProps = res.task;

  // if task is not found
  if (!task) {
    return <NoTaskFound />;
  }

  // Rendering the TaskForm component with the retrieved task details
  return <TaskForm {...task} variant="EDIT" />;
};

export default EditTask;
