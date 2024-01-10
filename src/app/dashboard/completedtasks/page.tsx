import FetchError from "@/components/FetchError";
import NoItemFound from "@/components/NoItemFound";
import { getHeaders } from "@/libs/GetHeaders";
import { TaskProps } from "@/props/TaskProps";
import { Metadata, NextPage } from "next";

export const metadata: Metadata = {
  title: "Completed Tasks",
};

const CompletedTasks: NextPage = async () => {
  const headers = await getHeaders();

  const response = await fetch(
    `${process.env.HOST}/api/tasks/getTasksByStatus/Completed`,
    { cache: "no-cache", headers: headers }
  );
  const res = await response.json();
  const tasks = res.tasks;

  // If there is an error fetching tasks
  if (tasks === undefined || tasks === null) {
    return <FetchError />;
  }

  // If there are no tasks
  if (tasks.length === 0) {
    return (
      <div className="mt-20">
        <NoItemFound variant="Tasks" />
      </div>
    );
  }
  return <TasksTable tasks={tasks} />;
};

export default CompletedTasks;

// Task Table interface
interface TaskTableProps {
  tasks: TaskProps[];
}

// Task Table Component
const TasksTable: React.FC<TaskTableProps> = ({ tasks }) => (
  <table className="min-w-full  border border-t-0 border-[#323232] text-center">
    {/* Headers for table */}
    <thead>
      <tr>
        {/* Date */}
        <th className="w-1/4 py-2 px-4 text-xl font-bold border-b border-[#323232]">
          Date
        </th>
        {/* Tilte */}
        <th className="w-2/4 py-2 px-4 text-xl font-bold border-b border-[#323232]">
          Task Title
        </th>
        {/* Status */}
        <th className="w-1/4 py-2 px-4 text-xl font-bold border-b border-[#323232]">
          Status
        </th>
      </tr>
    </thead>

    {/* Table data  */}
    <tbody>
      {tasks.map((task: TaskProps, index: number) => (
        <tr key={index}>
          {/* Task date */}
          <td className="w-1/4 py-2 px-4 font-semibold border-b border-r border-[#323232]">
            {task.date}
          </td>
          {/* Task Title */}
          <td className="w-2/4 py-2 px-4 font-semibold border-b border-r border-[#323232]">
            {task.taskTitle}
          </td>
          {/* Task Status */}
          <td className="w-1/4 py-2 px-4 font-semibold border-b border-[#323232]">
            {task.status}
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);
