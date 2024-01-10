import GoBack from "@/components/GoBack";
import RefreshPage from "@/components/RefreshPage";
import FormattedDateTime from "@/components/tasks/FormattedDateTime";
import NoTaskFound from "@/components/tasks/NoTaskFound";
import RenderTags from "@/components/tasks/RenderTags";
import TaskActionBtns from "@/components/tasks/TaskActionBtns";
import TaskStatus from "@/components/tasks/TaskStatus";
import { getHeaders } from "@/libs/GetHeaders";
import { updateTaskStatus } from "@/libs/UpdateTaskStatus";
import { TaskProps } from "@/props/TaskProps";
import { Metadata, NextPage } from "next";

export const metadata: Metadata = {
  title: "Task Details",
};


// Task details interface
interface TaskDetailsProps {
  params: { taskId: string };
}

const TaskDetails: NextPage<TaskDetailsProps> = async ({ params }) => {
  // HEADERS FOR API REQUEST
  const headers = await getHeaders();

  // If id provided is not of 24 chars
  if (params.taskId.length !== 24) {
    return <NoTaskFound />;
  }

  // Api request
  const response = await fetch(
    `${process.env.HOST}/api/tasks/getTask/${params.taskId}`,
    { cache: "no-store", headers: headers }
  );
  const res = await response.json();
  const task: TaskProps = res.task;

  // If task couldnt be found
  if (!task) {
    return <NoTaskFound />;
  }

  // updating current status of the task if it is overdue
  await updateTaskStatus(task?.date, task?.status, task?.id || "");

  return (
    <div className="w-full h-fit py-10 relative select-text">
      <RefreshPage />
      {/* Button to go back */}
      <GoBack href="/dashboard/tasks" />

      <div className="w-11/12 sm:w-[30rem] md:w-[32rem] mx-auto p-2 transform duration-500">
        {/* TAGS */}
        <div className="mb-4 text-right">
          <RenderTags tags={task?.tags || []} />
        </div>

        {/* Task title */}
        <h3 className="text-4xl font-bold">{task?.taskTitle}</h3>

        {/* Task description */}
        <div className="min-h-[20vh]">
          <p className="my-10 font-semibold">{task?.taskDesc}</p>
        </div>

        {/* Attached link */}
        <p className="w-full font-bold">
          Attached link :{" "}
          <span className="w-full">
            {task.link ? (
              <a
                href={task?.link}
                target="_blank"
                className="w-full font-normal underline underline-offset-2"
              >
                {task.link}
              </a>
            ) : (
              "N/A"
            )}
          </span>
        </p>

        {/* Start time */}
        <FormattedDateTime
          info={task?.startsAt}
          variant="time"
          label="Start time"
        />

        {/* Reminder time */}
        <FormattedDateTime
          info={task?.reminderAt}
          variant="time"
          label="Reminder Time"
        />

        {/* Date */}
        <FormattedDateTime
          info={task?.date || ""}
          variant="date"
          label="Date"
        />

        {/* Task status */}
        <TaskStatus taskId={params.taskId} date={task?.date} />

        <TaskActionBtns
          href={`/dashboard/tasks/edittask/${params.taskId}`}
          taskId={params.taskId}
        />
      </div>
    </div>
  );
};

export default TaskDetails;
