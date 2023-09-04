import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";
import getCurrentUser from "@/app/libs/getCurrentUser";

interface IParams {
  userId?: string;
}

//api handler registration
//(fetch data via route handler)
export async function POST(request: Request, { params }: { params: IParams }) {
  const { userId } = params;

  const currentUser = await getCurrentUser();

  //if params from url is invalid
  if (!userId || typeof userId !== "string") {
    throw new Error("Invalid ID!");
  }

  //get user we want to update (follow)
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user) {
    throw new Error("Invalid user!");
  }

  let updateFollowingIds = [...(currentUser?.followingIds || [])];

  updateFollowingIds.push(userId);

  //create notifications
  await prisma.notification.create({
    data: {
      body: "Someone followed you",
      userId: userId,
    },
  });

  await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      hasNotification: true,
    },
  });

  const updatedUser = await prisma.user.update({
    where: {
      id: currentUser?.id,
    },
    data: {
      followingIds: updateFollowingIds,
    },
  });

  return NextResponse.json(updatedUser);
}

export async function DELETE(
  request: Request,
  { params }: { params: IParams }
) {
  const { userId } = params;

  const currentUser = await getCurrentUser();

  //if params from url is invalid
  if (!userId || typeof userId !== "string") {
    throw new Error("Invalid ID!");
  }

  //get user we want to update (follow)
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user) {
    throw new Error("Invalid user!");
  }

  let updateFollowingIds = [...(currentUser?.followingIds || [])];

  updateFollowingIds = updateFollowingIds.filter(
    (followingId) => followingId !== userId
  );

  const updatedUser = await prisma.user.update({
    where: {
      id: currentUser?.id,
    },
    data: {
      followingIds: updateFollowingIds,
    },
  });

  return NextResponse.json(updatedUser);
}
