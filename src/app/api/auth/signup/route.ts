import prisma from "@/app/db";
import { generateCode } from "@/libs/GenerateCode";
import {
  ThrowIncompleteError,
  ThrowServerError,
} from "@/libs/backend/ResponseErrors";
import { SendCodeEmail } from "@/utilities/SendCodeEmail";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    // getting data from req
    const data: { name: string; email: string; password: string } =
      await req.json();

    // if any data is missing
    if (!data.email || !data.password || !data.name) {
      return ThrowIncompleteError();
    }

    // checking if email is taken
    const existingUser = await prisma.user.findUnique({
      where: { email: data.email },
    });

    // if user exist with given email
    if (existingUser) {
      return NextResponse.json(
        { message: "Email is already taken" },
        { status: 400 }
      );
    }

    // hashing password
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(data.password, salt);

    data.password = hashedPass;

    // creating a new user in the database
    const newUser = await prisma.user.create({ data });

    if (!newUser) {
      return ThrowServerError();
    }

    // generating a new code
    const newCode = generateCode();

    // creating code in the database
    const code = await prisma.code.create({
      data: {
        code: newCode,
        userId: newUser.id,
        userEmail: newUser.email,
      },
    });

    // If code is not created
    if (!code) {
      return ThrowServerError();
    }

    // Sending email with verification code
    await SendCodeEmail(
      code.userEmail,
      newUser.name,
      "Verification of account",
      newCode
    );

    // Response
    return NextResponse.json(
      { message: "Signed up succesfully", userId: newUser.id },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return ThrowServerError();
  }
};
