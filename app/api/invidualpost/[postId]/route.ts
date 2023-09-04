import bcrypt from "bcrypt";
import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

//api handler registration
//(fetch data via route handler)

interface IParams {
  postId?: string;
}

export async function GET(request: Request, { params }: { params: IParams }) {
  try {
    const { postId } = params;

    if (!postId || typeof postId !== "string") {
      throw new Error("Invalid ID");
    }

    const invidualPost = await prisma.post.findUnique({
      where: {
        id: postId,
      },
      include: {
        user: true,
        comments: {
          include: {
            user: true,
          },
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    });

    return NextResponse.json(invidualPost);
  } catch (error) {
    console.log(error);
  }
}
