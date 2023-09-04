import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import prisma from "@/app/libs/prismadb";

//func get current user without calling api
//(not a route, this is a direct communication from server component to database)
//dùng để protecting route (kiểm tra xem người dùng có đăng nhập hay không)
//và trả về user hiện tại
export default async function getCurrentUser() {
  //get data of user logging
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return null;
  }

  //find user whose email is equal to session.user.email
  const currentUser = await prisma.user.findUnique({
    where: {
      email: session.user.email as string,
    },
  });

  //not matched
  if (!currentUser) {
    return null;
  }

  return currentUser || null;
}
