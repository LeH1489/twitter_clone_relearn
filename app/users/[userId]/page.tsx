"use client";

import Header from "@/app/components/Header";
import PostFeed from "@/app/components/posts/PostFeed";
import UserBio from "@/app/components/users/UserBio";
import UserHero from "@/app/components/users/UserHero";
import useUser from "@/app/hooks/useUser";
import { ClipLoader } from "react-spinners";

interface IParams {
  userId?: string | undefined;
}

const UserView = ({ params }: { params: IParams }) => {
  const { data: fetchedData, isLoading } = useUser(params.userId as string);

  if (isLoading || !fetchedData) {
    return (
      <div className="flex justify-center items-center h-full">
        <ClipLoader color="lightblue" size={80} />
      </div>
    );
  }

  return (
    <>
      <Header label={fetchedData?.name} showBackArrow />
      <UserHero userId={params.userId as string} />
      <UserBio userId={params.userId as string} />
      <PostFeed userId={params.userId as string} />
    </>
  );
};

export default UserView;
