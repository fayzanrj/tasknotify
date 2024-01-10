import ActivityLoader from "@/components/ActivityLoader";
import React from "react";

const loading = () => {
  return (
    <div className="w-full h-[100svh] flex justify-center items-start">
      <ActivityLoader />
    </div>
  );
};

export default loading;
