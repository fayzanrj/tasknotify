import useHeaders from "@/hooks/useHeaders";
import { handleApiError } from "@/libs/handleApiError";
import { WatchLaterProps } from "@/props/WatchLaterProps";
import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { MdDelete } from "react-icons/md";
import ActivityLoader from "../ActivityLoader";

// Watch later delete button interface
interface WatchLaterDeleteButtonProps {
  id: string;
  setWatchLaterList: React.Dispatch<React.SetStateAction<WatchLaterProps[]>>;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const WatchLaterDeleteButton: React.FC<WatchLaterDeleteButtonProps> = ({
  id,
  setWatchLaterList,
  setIsOpen,
}) => {
  // Variable state
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Headers for API request
  const headers = useHeaders();

  // Function to delete watch later item
  const handleDelete = async () => {
    try {
      setIsLoading(true);
      const res = await axios.delete(`/api/watchlater/deletewatchlater/${id}`, {
        headers,
      });
      setWatchLaterList((prevList) =>
        prevList.filter((item) => item.id !== id)
      );
      setIsOpen(false);
      toast.success(res.data.message);
    } catch (error: any) {
      handleApiError(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-[15%] h-28 absolute top-0 right-0">
      <button
        aria-label="delete-watchlater-button"
        onClick={handleDelete}
        disabled={isLoading}
        className="w-full h-full rounded-lg border-[.1rem] dark:border-[#1D1F21] bg-white dark:bg-[#1D1F21]"
      >
        {isLoading ? (
          <ActivityLoader />
        ) : (
          <MdDelete size="2rem" className="inline-block text-red-600" />
        )}
      </button>
    </div>
  );
};

export default WatchLaterDeleteButton;
