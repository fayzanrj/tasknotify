import ActivityLoader from "@/components/ActivityLoader";
import React from "react";

const loading = () => {
  return (
    <div className="w-full h-[calc(100svh_-_4rem)] flex justify-center items-start">
      <ActivityLoader />
    </div>
  );
};

export default loading;
