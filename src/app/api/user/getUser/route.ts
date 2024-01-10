import prisma from "@/app/db";
import {
  ThrowServerError,
  ThrowUnAuthorizedError,
} from "@/libs/backend/ResponseErrors";
import { verifyUser } from "@/libs/backend/VerifyUser";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    // Verifying user by verifying access token
    const user = verifyUser(req);

    // If access token is not verified
    if (!user) {
      return ThrowUnAuthorizedError();
    }

    // finding user
    const userDetails = await prisma.user.findUnique({
      where: {
        id: user.id,
      },
      select: {
        id: true,
        name : true,
        email: true,
        profilePic: true,
        isVerified: true,
        sendReminders : true,
      },
    });

    // returning user as response
    return NextResponse.json({ user: userDetails }, { status: 200 });
  } catch (error: any) {
    console.error(error.message)
    return ThrowServerError();
  }
};
