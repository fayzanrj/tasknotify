import AddTaskBtnRound from "@/components/tasks/AddTaskBtnRound";
import TaskPanel from "@/components/tasks/TaskPanel";
import { authOptions } from "@/utilities/AuthOptions";
import { Metadata, NextPage } from "next";
import { getServerSession } from "next-auth";

export const metadata: Metadata = {
  title: "Tasks",
  description: "",
};

const Tasks: NextPage = async () => {
  const data = await getServerSession(authOptions);
  // @ts-ignore
  const accessToken = data?.user?.accessToken;
  
  return (
    <>
      <TaskPanel accessToken={accessToken} />
      <AddTaskBtnRound />
    </>
  );
};

export default Tasks;
