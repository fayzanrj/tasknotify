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
  { params }: { params: { noteId: string } }
) => {
  try {
    // Verify user by verifying access token
    const user = verifyUser(req);

    // If access token is not verified
    if (!user) {
      return ThrowUnAuthorizedError();
    }

    // finding note and deleting
    const note = await prisma.note.delete({
      where: {
        id: params.noteId,
        createdById: user.id,
      },
    });

    // if note not found
    if (!note) {
      return ThrowNotFoundError("No note found");
    }

    // returning success message
    return NextResponse.json(
      { message: "Note has been deleted" },
      { status: 200 }
    );
  } catch (error: any) {
    console.error(error);
    return ThrowServerError();
  }
};
