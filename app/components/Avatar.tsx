"use client";

import { useCallback } from "react";
import useUser from "../hooks/useUser";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface AvatarProps {
  userId: string;
  isLarge?: boolean; //small for followBar, large for profile page
  hasBorder?: boolean;
}

const Avatar: React.FC<AvatarProps> = ({ userId, isLarge, hasBorder }) => {
  //custom hook lấy data của 1 user bất kỳ bằng id
  const { data: fetchedUser } = useUser(userId);

  const router = useRouter();

  const onClick = useCallback(
    (event: any) => {
      event.stopPropagation();

      const url = `/users/${userId}`;

      router.push(url);
    },
    [userId, router]
  );

  return (
    <div
      className={`
        ${hasBorder ? "border-4 border-black" : ""} 
        ${isLarge ? "h-32" : "h-12"}
        ${isLarge ? "w-32" : "w-12"}
        rounded-full hover:opacity-90
        transition relative cursor-pointer 
  `}
    >
      <Image
        fill
        alt="Avatar"
        onClick={onClick}
        src={fetchedUser?.profileImage || "/images/placeholder.png"}
        style={{ objectFit: "cover", borderRadius: "100%" }}
      />
    </div>
  );
};

export default Avatar;
