import prisma from "@/app/db";
import {
  ThrowIncompleteError,
  ThrowServerError,
  ThrowUnAuthorizedError,
} from "@/libs/backend/ResponseErrors";
import { verifyUser } from "@/libs/backend/VerifyUser";
import { NextRequest, NextResponse } from "next/server";

interface UpdateStatusProps {
  taskId: String;
  updatedStatus: "Pending" | "Completed" | "Overdue";
}
const checkData = (data: UpdateStatusProps): boolean => {
  const { taskId, updatedStatus } = data;
  data;
  return !!(taskId || updatedStatus);
};

export const PUT = async (req: NextRequest) => {
  try {
    // Verify user by verifying access token
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
      where: { id: data.taskId },
      data: {
        status: data.updatedStatus,
      },
    });

    // If task is not updated
    if (!task) {
      return ThrowServerError();
    }

    // Response
    return NextResponse.json(
      { message: `Task has been marked as ${data.updatedStatus}` },
      { status: 200 }
    );
  } catch (error: any) {
    console.error(error);
    return ThrowServerError();
  }
};
