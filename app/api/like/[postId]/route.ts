import bcrypt from "bcrypt";
import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";
import getCurrentUser from "@/app/libs/getCurrentUser";

interface IParams {
  postId?: string;
}

//api handler registration
//(fetch data via route handler)
export async function POST(request: Request, { params }: { params: IParams }) {
  try {
    const { postId } = params;

    const currentUser = await getCurrentUser();
    const userId = currentUser?.id || "";

    //if params from url is invalid
    if (!postId || typeof postId !== "string") {
      throw new Error("Invalid ID!");
    }

    const post = await prisma.post.findUnique({
      where: {
        id: postId,
      },
    });

    if (!post) {
      throw new Error("Invalid ID");
    }

    let updatedLikedIds = [...(post.likedIds || [])];
    updatedLikedIds.push(userId);

    //update notification
    try {
      const post = await prisma.post.findUnique({
        where: {
          id: postId,
        },
      });

      if (post?.userId) {
        await prisma.notification.create({
          data: {
            body: "Someone liked your tweet",
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
    } catch (error) {
      console.log(error);
    }

    const updatedUser = await prisma.post.update({
      where: {
        id: postId,
      },
      data: {
        likedIds: updatedLikedIds,
      },
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.log(error);
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: IParams }
) {
  try {
    const { postId } = params;

    const currentUser = await getCurrentUser();
    const userId = currentUser?.id || "";

    //if params from url is invalid
    if (!postId || typeof postId !== "string") {
      throw new Error("Invalid ID!");
    }

    const post = await prisma.post.findUnique({
      where: {
        id: postId,
      },
    });

    if (!post) {
      throw new Error("Invalid ID");
    }

    let updatedLikedIds = [...(post.likedIds || [])];
    updatedLikedIds = updatedLikedIds.filter((likedId) => likedId !== userId);

    const updatedUser = await prisma.post.update({
      where: {
        id: postId,
      },
      data: {
        likedIds: updatedLikedIds,
      },
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.log(error);
  }
}
