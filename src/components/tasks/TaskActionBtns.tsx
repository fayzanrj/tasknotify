"use client";
import useHeaders from "@/hooks/useHeaders";
import { handleApiError } from "@/libs/handleApiError";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { MdDelete, MdEdit } from "react-icons/md";
import ActivityLoader from "../ActivityLoader";

// Task action btns props
interface TaskActionBtnsProps {
  href: string;
  taskId: string;
}

const TaskActionBtns: React.FC<TaskActionBtnsProps> = ({ href, taskId }) => {
  // Router for navigation
  const router = useRouter();
  // Activity state
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Headers for api request
  const headers = useHeaders();

  // Function to handle delete
  const handleDelete = async () => {
    const confirmDelete = confirm("Are you sure?");

    if (!confirmDelete) {
      return;
    }

    try {
      setIsLoading(true);
      const res = await axios.delete(`/api/tasks/deleteTask/${taskId}`, {
        headers,
      });
      router.back();
      toast.success(res.data.message, {
        duration: 4000,
      });
    } catch (error) {
      handleApiError(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="my-4 text-right font-semibold relative">
      {/* Edit button */}
      <Link href={href}>
        <button
          aria-label="edit-task-link-button"
          disabled={isLoading}
          className="w-24 h-10 rounded-lg absolute right-28"
        >
          Edit{" "}
          <span>
            <MdEdit size="1.3rem" className="inline" />
          </span>
        </button>
      </Link>

      {/* Delete button */}
      <button
        aria-label="delete-task-button"
        disabled={isLoading}
        onClick={handleDelete}
        className="w-24 h-10 text-white bg-red-600 rounded-lg absolute right-0"
      >
        {isLoading ? (
          <ActivityLoader />
        ) : (
          <>
            Delete
            <span>
              <MdDelete size="1.5rem" className="inline" />
            </span>
          </>
        )}
      </button>
    </div>
  );
};

export default TaskActionBtns;
