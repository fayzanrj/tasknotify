"use client";
import useHeaders from "@/hooks/useHeaders";
import { handleApiError } from "@/libs/handleApiError";
import axios from "axios";
import { useEffect, useState } from "react";
import FetchError from "../../FetchError";
import TaskCompletionStatsSkeleton from "../../skeletons/TaskCompletionStatsSkeleton";
import TaskCompletionStatsItem from "./TaskCompletionStatsItem";

// Interface for task stats object
interface TaskStatsProps {
  todaysTasks: {
    total: number;
    completed: number;
  };
  weeklyTasks: {
    total: number;
    completed: number;
  };
}

interface TaskCompletonStatsProps {
  accessToken: string;
}

const TaskCompletionStats: React.FC<TaskCompletonStatsProps> = ({
  accessToken,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [taskStats, setTaskStats] = useState<TaskStatsProps | undefined>(
    undefined
  );

  // Headers for API request
  const headers = {
    "Content-Type": "application/json",
    accessToken: accessToken,
  };
  
  useEffect(() => {
    const fetchTaskStats = async () => {
      const encodedDate = encodeURIComponent(new Date().toDateString());
      try {
        const res = await axios.get(
          `/api/tasks/getUserTaskStats/${encodedDate}`,
          { headers }
        );
        setTaskStats(res.data.taskStats);
      } catch (error: any) {
        handleApiError(error);
      } finally {
        setIsLoading(false);
      }
    };

    // Calling function
    fetchTaskStats();
  }, [accessToken]);

  // If loading state is true
  if (isLoading) {
    return <TaskCompletionStatsSkeleton />;
  }

  // If there is an error in fetching task stats
  if (!taskStats) {
    return <FetchError />;
  }

  return (
    <section className="flex justify-center gap-3 md:gap-10 lg:gap:20 flex-wrap">
      <TaskCompletionStatsItem
        header="Today's Tasks"
        totalTasks={taskStats?.todaysTasks?.total}
        completedTasks={taskStats?.todaysTasks?.completed}
      />
      <TaskCompletionStatsItem
        header="Weekly Tasks"
        totalTasks={taskStats.weeklyTasks.total}
        completedTasks={taskStats.weeklyTasks.completed}
      />
    </section>
  );
};

export default TaskCompletionStats;
