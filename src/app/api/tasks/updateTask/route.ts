import prisma from "@/app/db";
import {
  ThrowIncompleteError,
  ThrowServerError,
  ThrowUnAuthorizedError,
} from "@/libs/backend/ResponseErrors";
import { verifyUser } from "@/libs/backend/VerifyUser";
import { TaskProps } from "@/props/TaskProps";
import { NextRequest, NextResponse } from "next/server";

const checkData = (data: TaskProps): boolean => {
  const { date, reminderAt, startsAt, status, tags, taskDesc, taskTitle } =
    data;
  return !!(
    date ||
    reminderAt ||
    startsAt ||
    status ||
    tags ||
    taskDesc ||
    taskTitle
  );
};

export const PUT = async (req: NextRequest) => {
  try {
    // Verifing user by verifying access token
    const user = verifyUser(req);

    // If access token is not verified
    if (!user) {
      return ThrowUnAuthorizedError();
    }

    // Receiving and checking if all the data is present
    const data = await req.json();
    const isValid = checkData(data);

    if (!isValid) {
      return ThrowIncompleteError();
    }

    // Updating task in the database
    const task = await prisma.task.update({
      where: { id: data.id },
      data: {
        taskTitle: data.taskTitle,
        taskDesc: data.taskDesc,
        status: data.status,
        startsAt: data.startsAt,
        reminderAt: data.reminderAt,
        date: data.date,
        tags: data.tags,
      },
    });

    // If task is not updated
    if (!task) {
      return ThrowServerError();
    }

    // Sending response back
    return NextResponse.json(
      { message: "Task has been updated", task },
      { status: 200 }
    );
  } catch (error: any) {
    console.error(error);
    return ThrowServerError();
  }
};
