import prisma from "@/app/db";
import {
  ThrowIncompleteError,
  ThrowServerError,
  ThrowUnAuthorizedError,
} from "@/libs/backend/ResponseErrors";
import { verifyUser } from "@/libs/backend/VerifyUser";
import { NextRequest, NextResponse } from "next/server";

export const revalidate = true;

export const PUT = async (req: NextRequest) => {
  try {
    // Verify user by verifying access token
    const user = verifyUser(req);

    // If access token is not verified
    if (!user) {
      return ThrowUnAuthorizedError();
    }

    // Receive and check if all the data is present
    const data = await req.json();

    if (!data.content || !data.noteId) {
      return ThrowIncompleteError();
    }

    // update note in the database
    const note = await prisma.note.update({
      where: { id: data.noteId },
      data: {
        content: data.content,
      },
    });

    // If note is not updated
    if (!note) {
      return ThrowServerError();
    }

    // Send response back
    return NextResponse.json(
      { message: "Note has been saved" },
      { status: 200 }
    );
  } catch (error: any) {
    // console.error(error);
    return ThrowServerError();
  }
};
