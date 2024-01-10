import prisma from "@/app/db";
import {
  ThrowNotFoundError,
  ThrowServerError,
  ThrowUnAuthorizedError,
} from "@/libs/backend/ResponseErrors";
import { verifyUser } from "@/libs/backend/VerifyUser";
import { NextRequest, NextResponse } from "next/server";

export const revalidate = true;

export const GET = async (
  req: NextRequest,
  { params }: { params: { noteId: string } }
) => {
  try {
    // Verifying user by verifying access token
    const user = verifyUser(req);

    // If access token is not verified
    if (!user) {
      return ThrowUnAuthorizedError();
    }

    // finding note
    const note = await prisma.note.findUnique({
      where: {
        id: params.noteId,
        createdById: user.id,
      },
    });

    // if task not found
    if (!note) {
      return ThrowNotFoundError("No note found");
    }

    // returning task as response
    return NextResponse.json({ note }, { status: 200 });
  } catch (error: any) {
    console.error(error);
    return ThrowServerError();
  }
};
