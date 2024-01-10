import EmailMessage from "@/components/tasks/addtask/EmailMessage";
import TaskForm from "@/components/tasks/addtask/TaskForm";
import { Metadata, NextPage } from "next";

export const metadata: Metadata = {
  title: "Add task",
};

const AddTask: NextPage = () => {
  return (
    <div className="relative">
      <EmailMessage/>
      <TaskForm variant="ADD" />;
    </div>
  );
};

export default AddTask;
