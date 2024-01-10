import prisma from "@/app/db";
import {
  ThrowNotFoundError,
  ThrowServerError,
  ThrowUnAuthorizedError,
} from "@/libs/backend/ResponseErrors";
import { verifyUser } from "@/libs/backend/VerifyUser";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  req: NextRequest,
  { params }: { params: { taskId: string } }
) => {
  try {
    // Verifying user by verifying access token
    const user = verifyUser(req);

    // If access token is not verified
    if (!user) {
      return ThrowUnAuthorizedError();
    }

    // finding task
    const task = await prisma.task.findUnique({
      where: {
        id: params.taskId,
        createdById: user.id,
      },
    });

    // if task not found
    if (!task) {
      return ThrowNotFoundError("No task found");
    }

    // returning task as response
    return NextResponse.json({ task }, { status: 200 });
  } catch (error: any) {
    console.error(error);
    return ThrowServerError();
  }
};
