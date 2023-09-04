import bcrypt from "bcrypt";
import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

//api handler registration
//(fetch data via route handler)

interface IParams {
  userId?: string;
}

export async function GET(request: Request, { params }: { params: IParams }) {
  const { userId } = params;

  if (!userId || typeof userId !== "string") {
    throw new Error("Invalid ID!");
  }

  const existingUser = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  const followersCount = await prisma.user.count({
    where: {
      followingIds: {
        has: userId,
      },
    },
  });

  return NextResponse.json({ ...existingUser, followersCount });
}
