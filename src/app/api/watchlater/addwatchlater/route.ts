import prisma from "@/app/db";
import {
  ThrowIncompleteError,
  ThrowServerError,
  ThrowUnAuthorizedError,
} from "@/libs/backend/ResponseErrors";
import { verifyUser } from "@/libs/backend/VerifyUser";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    // Verify user by verifying access token
    const user = verifyUser(req);

    // If access token is not verified
    if (!user) {
      return ThrowUnAuthorizedError();
    }

    // Receive and check if data is present
    const data = await req.json();

    if (!data.url || !data.title || !data.image || !data.note){
      return ThrowIncompleteError();
    }

    // Add creator ID to data
    data.createdById = user.id;

    // Create watchlater in the database
    const watchlater = await prisma.watchLater.create({ data });

    // If watchlater is not created
    if (!watchlater) {
      return ThrowServerError();
    }

    // Send response back
    return NextResponse.json(
      { message: "Url has been added", watchlater },
      { status: 200 }
    );
  } catch (error: any) {
    console.error(error);
    return ThrowServerError();
  }
};
