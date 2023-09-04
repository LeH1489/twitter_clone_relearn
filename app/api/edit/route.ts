import bcrypt from "bcrypt";
import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";
import getCurrentUser from "@/app/libs/getCurrentUser";

//api handler registration
//(fetch data via route handler)
export async function PATCH(request: Request) {
  try {
    const currentUser = await getCurrentUser();

    const body = await request.json();

    const { name, username, bio, profileImage, coverImage } = body;

    if (!name || !username) {
      throw new Error("Missing fields!");
    }

    const updatedUser = await prisma.user.update({
      where: {
        id: currentUser?.id,
      },
      data: {
        name,
        username,
        bio,
        profileImage,
        coverImage,
      },
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.log(error);
  }
}
