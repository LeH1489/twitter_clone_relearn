"use client";

import { BsHouseDoor, BsBell } from "react-icons/bs";
import { BiUser } from "react-icons/bi";
import { BiLogOut } from "react-icons/bi";
import SidebarLogo from "./SidbarLogo";
import SidebarItems from "./SidebarItems";
import SidebarTweetButton from "./SidebarTweetButton";
import useCurrentUser from "@/app/hooks/useCurrentUser";
import { signOut } from "next-auth/react";

const Sidebar = () => {
  const { data: currentUser } = useCurrentUser();

  const items = [
    {
      label: "Home",
      href: "/",
      icon: BsHouseDoor,
    },
    {
      label: "Notifications",
      href: "/notifications",
      icon: BsBell,
      auth: true,
      alert: currentUser?.hasNotification,
    },
    {
      label: "Profile",
      href: `/users/${currentUser?.id}`,
      icon: BiUser,
      auth: true,
    },
  ];

  return (
    <div className="col-span-1 h-full pr-4 md:pr-6">
      <div className="flex flex-col items-center">
        <div className="lg:w-[230px] fixed space-y-2">
          <SidebarLogo />
          {items.map((logoItem) => (
            <SidebarItems
              key={logoItem.href}
              href={logoItem.href}
              label={logoItem.label}
              icon={logoItem.icon}
              auth={logoItem.auth}
              alert={logoItem.alert}
            />
          ))}
          {currentUser && (
            <SidebarItems
              icon={BiLogOut}
              label="Logout"
              onClick={() => signOut()}
            />
          )}
          <SidebarTweetButton />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
