import prisma from "@/app/db";
import {
  ThrowIncompleteError,
  ThrowServerError,
} from "@/libs/backend/ResponseErrors";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { signJwtAccessToken } from "@/utilities/Jwt";
import { UserProps } from "@/props/UserProps";


export const POST = async (req: NextRequest) => {
  try {
    const data: { email: string; password: string } = await req.json();

    // if any data is missing
    if (!data.email || !data.password) {
      return ThrowIncompleteError();
    }

    // finding user
    const user = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (!user) {
      return NextResponse.json(
        { message: "Login failed! Please check your credentials" },
        { status: 401 }
      );
    }

    // comparing password
    const isPasswordCorrect = bcrypt.compareSync(
      data.password,
      user.password
    );

    if (!isPasswordCorrect) {
      return NextResponse.json(
        { message: "Login failed! Please check your credentials" },
        { status: 401 }
      );
    }

    const newUser: UserProps = {
      id: user.id,
      name: user.name,
      email: user.email,
      profilePic: user.profilePic,
      isVerified: user.isVerified,
      sendReminders : user.sendReminders
    };

    // signing access token
    const accessToken = signJwtAccessToken(newUser);
    const result = {
      ...newUser,
      accessToken,
    };

    // response
    return NextResponse.json(JSON.stringify(result));
  } catch (error) {
    console.error(error);
    return ThrowServerError();
  }
};
