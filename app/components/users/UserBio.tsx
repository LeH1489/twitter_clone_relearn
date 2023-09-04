"use client";

import useCurrentUser from "@/app/hooks/useCurrentUser";
import useUser from "@/app/hooks/useUser";
import { format } from "date-fns";
import { useMemo } from "react";
import Button from "../Button";
import { BiCalendar } from "react-icons/bi";
import useEditModal from "@/app/hooks/useEditModal";
import useFollow from "@/app/hooks/useFollow";

interface UserBioProps {
  userId: string;
}

const UserBio: React.FC<UserBioProps> = ({ userId }) => {
  //data user hiện tại
  const { data: currentUser } = useCurrentUser();

  //data user lấy bằng id trên url
  const { data: fetchedUser } = useUser(userId);

  const createdFormated = useMemo(() => {
    if (!fetchedUser?.createdAt) {
      return null;
    }

    return format(new Date(fetchedUser.createdAt), "MMMM yyyy");
  }, [fetchedUser?.createdAt]);

  //edit
  const editModal = useEditModal();

  //follow
  const { isFollowing, toggleFollow } = useFollow(userId);

  return (
    <div className="border-b-[0.1px] border-neutral-500 p-4">
      <div className="flex justify-end p-2">
        {currentUser?.id === userId ? (
          <Button secondary label="Edit" onClick={editModal.onOpen} />
        ) : (
          <Button
            label={isFollowing ? "Unfollow" : "Follow"}
            onClick={toggleFollow}
            secondary={isFollowing}
          />
        )}
      </div>
      <div className="mt-8 px-4">
        <div className="flex flex-col">
          <p className="text-black text-2xl font-semibold">
            {fetchedUser?.name}
          </p>
          <p className="text-md text-neutral-500">@{fetchedUser?.username}</p>
        </div>
        <div className="mt-4 flex flex-col">
          <p className="text-black">{fetchedUser?.bio}</p>
          <div className="flex flex-row gap-2 mt-4 items-center text-neutral-500">
            <BiCalendar size={24} />
            <p>Joined {createdFormated}</p>
          </div>
        </div>
        <div className="flex flex-row gap-6 mt-4 items-center">
          <div className="flex flex-row gap-1 items-center">
            <p className="text-black">
              {fetchedUser?.followingIds?.length || 0}
            </p>
            <p className="text-neutral-500">Following</p>
          </div>
          <div className="flex flex-row gap-1 items-center">
            <p className="text-black">{fetchedUser?.followersCount || 0}</p>
            <p className="text-neutral-500">Followers</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserBio;
