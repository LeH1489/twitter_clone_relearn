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

  let posts;

  if (userId && typeof userId === "string") {
    posts = await prisma.post.findMany({
      where: {
        userId,
      },
      include: {
        user: true,
        comments: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  } else {
    posts = await prisma.post.findMany({
      include: {
        user: true,
        comments: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  return NextResponse.json(posts);
}
