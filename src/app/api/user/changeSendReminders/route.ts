import prisma from "@/app/db";
import {
  ThrowNotFoundError,
  ThrowServerError,
  ThrowUnAuthorizedError,
} from "@/libs/backend/ResponseErrors";
import { verifyUser } from "@/libs/backend/VerifyUser";
import { NextRequest, NextResponse } from "next/server";

export const PUT = async (req: NextRequest) => {
  try {
    // Verifying user by verifying access token
    const user = verifyUser(req);

    // If access token is not verified
    if (!user) {
      return ThrowUnAuthorizedError();
    }

    const userDetails = await prisma.user.findUnique({
      where: { id: user.id },
    });

    if (!userDetails) {
      return ThrowNotFoundError("User not found");
    }

    // Updaing new password in the database
    await prisma.user.update({
      where: { id: user.id },
      data: { sendReminders: !userDetails?.sendReminders },
    });

    const tasks = await prisma.task.updateMany({
      where: { createdById: user.id },
      data: { sendReminder: !userDetails?.sendReminders },
    });

    const message = userDetails?.sendReminders ? "deactivated" : "activated";
    // returning updated message as response
    return NextResponse.json(
      { message: `Send Reminders are ${message}` },
      { status: 200 }
    );
  } catch (error: any) {
    console.error(error.message);
    return ThrowServerError();
  }
};
