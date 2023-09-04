import bcrypt from "bcrypt";
import prisma from "@/app/libs/prismadb";
import { NextRequest, NextResponse } from "next/server";

//api handler registration
//(fetch data via route handler)
export async function GET(request: Request) {
  try {
    //get data from request

    const users = await prisma.user.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(users);
  } catch (error) {
    console.log(error);
  }
}
