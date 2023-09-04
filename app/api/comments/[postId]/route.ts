import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";
import getCurrentUser from "@/app/libs/getCurrentUser";

interface IParams {
  postId?: string;
}

//api handler registration
//(fetch data via route handler)
export async function POST(request: Request, { params }: { params: IParams }) {
  const currentUser = await getCurrentUser();
  const userId = currentUser?.id || "";

  const bodyFromRequest = await request.json();
  const { body } = bodyFromRequest;

  const { postId } = params;

  if (!postId || typeof postId !== "string") {
    throw new Error("Invalid ID");
  }

  const newComment = await prisma.comment.create({
    data: {
      body: body,
      userId: userId,
      postId: postId,
    },
  });

  //update notification
  const post = await prisma.post.findUnique({
    where: {
      id: postId,
    },
  });

  if (post?.userId) {
    await prisma.notification.create({
      data: {
        body: "Someone replied your tweet",
        userId: post.userId,
      },
    });

    await prisma.user.update({
      where: {
        id: post.userId,
      },
      data: {
        hasNotification: true,
      },
    });
  }

  return NextResponse.json(newComment);
}
