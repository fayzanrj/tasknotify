import prisma from "@/app/db";
import { generateCode } from "@/libs/GenerateCode";
import {
  ThrowServerError,
  ThrowUnAuthorizedError
} from "@/libs/backend/ResponseErrors";
import { verifyUser } from "@/libs/backend/VerifyUser";
import { SendCodeEmail } from "@/utilities/SendCodeEmail";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    // Verify user by verifying access token
    const user = verifyUser(req);

    // If access token is not verified
    if (!user) {
      return ThrowUnAuthorizedError();
    }

    // finding if code exists with this email id
    const codeExists = await prisma.code.findUnique({
      where: { userId: user.id },
    });

    const newCode = generateCode();

    let code;
    if (codeExists) {
      // if code exists then updating it with new code
      code = await prisma.code.update({
        where: { id: codeExists.id },
        data: { code: newCode },
      });
    } else {
      // creating new code object in database
      code = await prisma.code.create({
        data: {
          code: newCode,
          userId: user.id,
          userEmail: user.email,
        },
      });
    }

    // If code is not created
    if (!code) {
      return ThrowServerError();
    }

    // Sending verification code on user's email
    const sendingMail = await SendCodeEmail(
      code.userEmail,
      user.name,
      "Verification of account",
      newCode
    );

    // Response
    return NextResponse.json({ message: "Code sent" }, { status: 200 });
  } catch (error: any) {
    console.error(error.message);
    return ThrowServerError();
  }
};
