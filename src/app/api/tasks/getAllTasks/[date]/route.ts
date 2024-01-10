import prisma from "@/app/db";
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


    // Finding all the user's tasks for the given date and ordering them in ascending order
    const tasks = await prisma.task.findMany({
      where: {
        createdById: user.id,
        date: params.date,
      },
      orderBy: {
        startsAt: "asc",
      },
    });

    // Returing tasks as response
    return NextResponse.json({ tasks }, { status: 200 });
  } catch (error: any) {
    console.error(error);
    return ThrowServerError();
  }
};
