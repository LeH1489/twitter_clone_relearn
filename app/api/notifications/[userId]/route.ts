import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

interface IParams {
  userId?: string;
}

//api handler registration
//(fetch data via route handler)
export async function GET(request: Request, { params }: { params: IParams }) {
  const { userId } = params;

  //if params from url is invalid
  if (!userId || typeof userId !== "string") {
    throw new Error("Invalid ID!");
  }

  const notifications = await prisma.notification.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      hasNotification: false,
    },
  });

  return NextResponse.json(notifications);
}
