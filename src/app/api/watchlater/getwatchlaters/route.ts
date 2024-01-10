import prisma from "@/app/db";
import { getInitialDate } from "@/libs/GetInitialDate";
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

    // Finding all the user's watchlaters for the given date and ordering them in ascending order
    const watchlaters = await prisma.watchLater.findMany({
      where: {
        createdById: user.id,
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    // Returing tasks as response
    return NextResponse.json({ watchlaters }, { status: 200 });
  } catch (error: any) {
    console.error(error);
    return ThrowServerError();
  }
};
