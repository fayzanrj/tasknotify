import prisma from "@/app/db";
import {
  ThrowNotFoundError,
  ThrowServerError,
  ThrowUnAuthorizedError,
} from "@/libs/backend/ResponseErrors";
import { verifyUser } from "@/libs/backend/VerifyUser";
import { NextRequest, NextResponse } from "next/server";

export const DELETE = async (
  req: NextRequest,
  { params }: { params: { watchLaterId: string } }
) => {
  try {
    // Verify user by verifying access token
    const user = verifyUser(req);

    // If access token is not verified
    if (!user) {
      return ThrowUnAuthorizedError();
    }

    // finding watchLater
    const watchLater = await prisma.watchLater.delete({
      where: {
        id: params.watchLaterId,
        createdById: user.id,
      },
    });

    // if watchLater not found
    if (!watchLater) {
      return ThrowNotFoundError("No watch later found");
    }

    // returning success message
    return NextResponse.json(
      { message: "Item has been deleted" },
      { status: 200 }
    );
  } catch (error: any) {
    console.error(error);
    return ThrowServerError();
  }
};
