import bcrypt from "bcrypt";
import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";
import getCurrentUser from "@/app/libs/getCurrentUser";

//api handler registration
//(fetch data via route handler)

//creat a post
export async function POST(request: Request) {
  const currentUser = await getCurrentUser();
  const userId = currentUser?.id || "";

  const bodyFromRequest = await request.json();

  const { body } = bodyFromRequest;

  const newPost = await prisma.post.create({
    data: {
      body: body,
      userId: userId,
    },
  });

  return NextResponse.json(newPost);
}

//get all of posts
export async function GET(request: Request) {
  const posts = await prisma.post.findMany({
    include: {
      user: true,
      comments: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return NextResponse.json(posts);
}
