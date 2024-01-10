import React from "react";
import GoBack from "../GoBack";

const NoTaskFound = () => {
  return (
    <div className="w-full h-fit py-10 relative">
      <GoBack href="/dashboard/tasks" />
      <div className="mt-20 text-center">
        <h3 className="text-3xl font-semibold">Error 404 : No task found</h3>
      </div>
    </div>
  );
};

export default NoTaskFound;
