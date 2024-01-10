import prisma from "@/app/db";
import { getInitialDate } from "@/libs/GetInitialDate";
import {
  ThrowServerError,
  ThrowUnAuthorizedError
} from "@/libs/backend/ResponseErrors";
import { verifyUser } from "@/libs/backend/VerifyUser";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  req: NextRequest,
  { params }: { params: { status: "Completed" | "Overdue" } }
) => {
  try {
    // Verify user by verifying access token
    const user = verifyUser(req);

    // If access token is not verified
    if (!user) {
      return ThrowUnAuthorizedError();
    }

    // getting initial date 
    const initialDate = getInitialDate();

    // finding a user's task with provided status and from the initial date
    const tasks = await prisma.task.findMany({
      where: {
        createdById: user.id,
        status: params.status,
        createdAt: {
          gte: new Date(initialDate),
        },
      },
      orderBy: {
        date: "asc",
      },
    });

    // returing tasks
    return NextResponse.json({ tasks });
  } catch (error: any) {
    console.error(error);
    return ThrowServerError();
  }
};
