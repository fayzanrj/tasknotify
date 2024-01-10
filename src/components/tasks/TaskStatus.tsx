"use client";
import useHeaders from "@/hooks/useHeaders";
import { handleApiError } from "@/libs/handleApiError";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { MdClose, MdDone } from "react-icons/md";
import ActivityLoader from "../ActivityLoader";
import TaskStatusSkeleton from "../skeletons/TaskStatusSkeleton";

// Possible task status values
type TaskStatus = "Pending" | "Completed" | "Overdue" | null;

// Function to get color based on taskStatus
const getColor = (status: TaskStatus): string => {
  switch (status) {
    case "Completed":
      return "#32CD32";
    case "Pending":
      return "#FFA500";
    default:
      return "#FF6347";
  }
};

const getUpdatedStatus = (date: string, taskStatus: TaskStatus): TaskStatus => {
  if (taskStatus !== "Completed") return "Completed";
  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);
  return currentDate <= new Date(date) ? "Pending" : "Overdue";
};

// Task status interface
interface TaskStatusProps {
  taskId: string;
  date: string;
}

const TaskStatus: React.FC<TaskStatusProps> = ({ taskId, date }) => {
  // Variable States
  const [taskStatus, setTaskStatus] = useState<TaskStatus>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isFetchingStatus, setIsFetchingStatus] = useState<boolean>(true);

  // Headers for API request
  const headers = useHeaders();

  // Fetching task's latest status
  useEffect(() => {
    // Function
    const fetchTaskStatus = async () => {
      try {
        const res = await axios.get(`/api/tasks/getTaskStatus/${taskId}`, {
          headers,
        });
        setTaskStatus(res.data.status);
      } catch (error) {
        handleApiError(error);
      } finally {
        setIsFetchingStatus(false);
      }
    };

    // Fetching
    fetchTaskStatus();
  }, [taskId, headers]);

  // Function to handle click i.e. updating status
  const handleClick = async () => {
    try {
      setIsLoading(true);
      const updatedStatus = getUpdatedStatus(date, taskStatus);
      const data = { taskId, updatedStatus };
      const res = await axios.put("/api/tasks/markTask", data, { headers });

      setTaskStatus(updatedStatus);
      toast.success(res.data.message);
    } catch (error) {
      handleApiError(error);
    } finally {
      setIsLoading(false);
    }
  };

  // Get color based on taskStatus
  const color = getColor(taskStatus);

  // If tasks status is getting fetched
  if (isFetchingStatus) {
    return <TaskStatusSkeleton />;
  }

  if (!taskStatus) {
    return (
      <div>
        <p>Couldn&#39;t find task&#39;s status</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between">
      {/* Current task status */}
      <p style={{ color, fontWeight: 700 }} className="text-lg">
        {taskStatus}
      </p>

      {/* Button for updating the task status */}
      <button onClick={handleClick} className="w-56 h-10 text-right relative">
        {isLoading ? (
          <ActivityLoader />
        ) : (
          // Displaying button text based on task's current status
          <p className="font-semibold">
            Mark it as{" "}
            {taskStatus === "Completed" ? (
              <span>
                Not Completed <MdClose className="inline-block" size="1.2rem" />
              </span>
            ) : (
              <span>
                Completed <MdDone className="inline-block" size="1.2rem" />
              </span>
            )}
          </p>
        )}
      </button>
    </div>
  );
};

export default TaskStatus;
