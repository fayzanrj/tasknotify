"use client";
import useHeaders from "@/hooks/useHeaders";
import { getDate, getTime } from "@/libs/GetFormattedData";
import { getTags } from "@/libs/GetTags";
import { handleApiError } from "@/libs/handleApiError";
import { TaskProps } from "@/props/TaskProps";
import axios from "axios";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import toast from "react-hot-toast";
import ActivityLoader from "../../ActivityLoader";
import GoBack from "../../GoBack";
import AddTaskDateInput from "./AddTaskDateInput";
import AddTaskTextArea from "./AddTaskTextArea";
import AddTaskTextInput from "./AddTaskTextInput";
import AddTaskTimeInput from "./AddTaskTimeInput";
import { getTaskScheduleInfo } from "@/libs/getTaskScheduleInfo";

// Task Form Interface
interface TaskFormProps {
  id?: string;
  taskTitle?: string;
  taskDesc?: string;
  tags?: string[];
  date?: string;
  startsAt?: Date;
  reminderAt?: Date;
  status?: string;
  link?: string;
  variant: "EDIT" | "ADD";
}

const TaskForm: React.FC<TaskFormProps> = ({
  id,
  status,
  taskTitle,
  taskDesc,
  tags,
  reminderAt,
  startsAt,
  date,
  variant,
  link,
}) => {
  const { data: session } = useSession();
  // Variable states
  const [title, setTitle] = useState<string>(taskTitle || "");
  const [desc, setDesc] = useState<string>(taskDesc || "");
  const [urlLink, setUrlLink] = useState<string>(link || "");
  // Date state
  const [selectedDate, setSelectedDate] = useState<string>(
    getDate(date ? date : "")
  );
  // Tags state
  const [selectedTags, setSelectedTags] = useState<string>(
    tags ? tags.join(", ") : ""
  );
  // Start time state
  const [startingTime, setStartingTime] = useState<string>(
    date && startsAt ? getTime(startsAt) : ""
  );
  // Remind time state
  const [remindAt, setRemindAt] = useState<string>(
    date && reminderAt ? getTime(reminderAt) : ""
  );

  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Headers
  const headers = useHeaders();

  // Function to make all states an empty string
  const clearStates = () => {
    setRemindAt("");
    setTitle("");
    setDesc("");
    setStartingTime("");
    setSelectedDate("");
    setSelectedTags("");
    setUrlLink("");
  };

  // Handle save function
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // setting new task with user selected values
    const task: TaskProps = {
      taskTitle: title,
      taskDesc: desc,
      startsAt: getTaskScheduleInfo(selectedDate, startingTime),
      reminderAt: getTaskScheduleInfo(selectedDate, remindAt),
      date: new Date(selectedDate).toDateString(),
      tags: getTags(selectedTags),
      link: urlLink,
      status: "Pending",
    };

    try {
      if (variant === "ADD") {
        // If form is to variant is to add a new task
        await axios.post("/api/tasks/addtask", task, { headers });
        toast.success("Task has been added");
        clearStates();
      } else {
        // If form is to variant is to update a task
        task.id = id;
        const res = await axios.put("/api/tasks/updateTask", task, { headers });
        toast.success(res.data.message);
      }
    } catch (error: any) {
      handleApiError(error);
    } finally {
      setIsLoading(false);
    }
  };

  // JSX structure of the component
  return (
    <div className="w-full h-full px-4 py-10 md:pb-2 relative">
      {/* Go back button */}
      <GoBack
        href={id ? `/dashboard/tasks/taskdetail/${id}` : "/dashboard/tasks"}
      />

      {/* Header */}
      <header className="text-center">
        <h1 className="text-3xl font-bold">Add a Task</h1>
      </header>

      <form onSubmit={handleSubmit} className="w-full lg:w-[39rem] mx-auto">
        <div className="flex justify-center lg:justify-between items-center flex-wrap md:gap-5 lg:gap-5">
          <section className="w-full sm:w-80 px-5 sm:px-1">
            {/* Input components for task details */}
            <AddTaskTextInput
              label="Title"
              type="text"
              id="taskTitle"
              placeholder="Write a title for your task"
              state={title}
              setState={setTitle}
            />
            <AddTaskTextArea
              label="Description"
              id="taskDesc"
              placeholder="Write a description for your task"
              rows={5}
              state={desc}
              setState={setDesc}
            />
            <AddTaskTextInput
              label="Tags"
              type="text"
              id="taskTags"
              state={selectedTags}
              setState={setSelectedTags}
              placeholder="Separate tags by adding a comma"
            />
          </section>

          {/* Input components for date and time */}
          <section className="w-full sm:w-48 px-5 sm:px-1">
            <AddTaskDateInput
              label="Select a Date"
              id="date"
              state={selectedDate}
              setState={setSelectedDate}
              date={date}
              variant={variant}
            />
            <AddTaskTimeInput
              label="Select starting time"
              id="startingTime"
              state={startingTime}
              setState={setStartingTime}
              selectedDate={selectedDate}
            />
            <AddTaskTimeInput
              label="Remind me at"
              id="remindTime"
              state={remindAt}
              setState={setRemindAt}
              selectedDate={selectedDate}
            />
          </section>

          {/* Url input component */}
          <section className="w-full px-5 sm:px-1">
            <AddTaskTextInput
              label="Add a link"
              type="url"
              id="url"
              placeholder="Enter a url"
              state={urlLink}
              setState={setUrlLink}
            />
          </section>
        </div>

        <section className="w-[90%] h-10 mx-auto my-10 mb-14 relative">
          {/* Buttons for cancel and save actions */}
          <button
            disabled={isLoading}
            className="h-10 font-semibold w-24 absolute right-28"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={
              isLoading ||
              !title ||
              !desc ||
              !selectedTags ||
              !startingTime ||
              !selectedDate ||
              !remindAt
            }
            className="w-24 h-10 text-[#1F1F1F] disabled:text-gray-400 font-bold rounded-lg bg-[#19fa9a] disabled:bg-[#19fa985f] absolute right-0"
          >
            {isLoading ? (
              <ActivityLoader />
            ) : variant === "ADD" ? (
              "Add"
            ) : (
              "Save"
            )}
          </button>
        </section>
      </form>
    </div>
  );
};

export default TaskForm;
