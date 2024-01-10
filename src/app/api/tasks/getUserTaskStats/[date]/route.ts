import prisma from "@/app/db";
import { getInitialDate } from "@/libs/GetInitialDate";
import {
  ThrowServerError,
  ThrowUnAuthorizedError,
} from "@/libs/backend/ResponseErrors";
import { verifyUser } from "@/libs/backend/VerifyUser";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  req: NextRequest,
  { params }: { params: { date: string } }
) => {
  try {
    // Verifying user by verifying access token
    const user = verifyUser(req);

    // If access token is not verified
    if (!user) {
      return ThrowUnAuthorizedError();
    }

    // getting initial date
    const initialDate = getInitialDate();

    const [
      todaysTotalTasks,
      todaysCompletedTasks,
      weeklyTotalTasks,
      weeklyCompletedTasks,
    ] = await Promise.all([
      // todays total tasks
      prisma.task.count({
        where: {
          createdById: user.id,
          date: params.date,
        },
      }),
      // todays completed tasks
      prisma.task.count({
        where: {
          createdById: user.id,
          date: params.date,
          status: "Completed",
        },
      }),
      // weekly total tasks
      prisma.task.count({
        where: {
          createdById: user.id,
          createdAt: {
            gte: new Date(initialDate),
          },
        },
      }),
      // weekly completed tasks
      prisma.task.count({
        where: {
          createdById: user.id,
          status: "Completed",
          createdAt: {
            gte: new Date(initialDate),
          },
        },
      }),
    ]);

    const taskStats = {
      todaysTasks: { total: todaysTotalTasks, completed: todaysCompletedTasks },
      weeklyTasks: { total: weeklyTotalTasks, completed: weeklyCompletedTasks },
    };
    
    // Returing task stats as response
    return NextResponse.json({ taskStats }, { status: 200 });
  } catch (error: any) {
    console.error(error);
    return ThrowServerError();
  }
};
