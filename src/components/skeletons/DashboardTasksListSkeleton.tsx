import React from "react";

const DashboardTasksListSkeleton = () => (
  <>
  <DashboardTasksListSkeletonItem/>
  <DashboardTasksListSkeletonItem/>
  <DashboardTasksListSkeletonItem/>
  <DashboardTasksListSkeletonItem/>
  </>
);

export default DashboardTasksListSkeleton;

const DashboardTasksListSkeletonItem = () => (
  <div className="min-w-[15rem] max-w-[15rem] h-44 rounded-lg bg-gray-200 dark:bg-[#404040] animate-pulse"></div>
);
