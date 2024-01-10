import { TaskProps } from "@/props/TaskProps";
import axios from "axios";
import { handleApiError } from "./handleApiError";

export const fetchTasks = async (
  date: Date,
  accessToken: string
): Promise<TaskProps[] | undefined> => {
  // Encooding given date
  const encodedDate = encodeURIComponent(new Date(date).toDateString());

  try {
    const res = await axios.get(`/api/tasks/getAllTasks/${encodedDate}`, {
      headers: {
        "Content-Type": "application/json",
        accessToken: accessToken,
      },
    });
    return res.data.tasks;
  } catch (error: any) {
    handleApiError(error);
  }
};
