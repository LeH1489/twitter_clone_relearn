import bcrypt from "bcrypt";
import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";
import getCurrentUser from "@/app/libs/getCurrentUser";

//api handler registration
//(fetch data via route handler)
export async function GET(request: Request) {
  const currentUser = await getCurrentUser();

  //if not having current user
  if (!currentUser) {
    return NextResponse.error();
  }

  return NextResponse.json(currentUser);
}
