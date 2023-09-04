"use client";

import useCurrentUser from "@/app/hooks/useCurrentUser";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { IconType } from "react-icons";
import useLoginModal from "@/app/hooks/useLoginModal";
import { BsDot } from "react-icons/bs";

interface SidebarItemsProps {
  label: string;
  icon: IconType;
  href?: string;
  onClick?: () => void;
  auth?: boolean;
  alert?: boolean;
}

const SidebarItems: React.FC<SidebarItemsProps> = ({
  label,
  icon: Icon,
  href,
  onClick,
  auth,
  alert,
}) => {
  const router = useRouter();
  const loginModal = useLoginModal();

  const { data: currentUser } = useCurrentUser();

  const handleClick = useCallback(() => {
    //for logout func
    if (onClick) {
      return onClick();
    }

    if (auth && !currentUser) {
      loginModal.onOpen();
    } else if (href) {
      //for router (home, notificaitions, profile)
      router.push(href);
    }
  }, [router, onClick, href, currentUser, auth, loginModal]);

  return (
    <div onClick={handleClick} className="flex flex-row items-center">
      {/* phần này dành cho mobile lg: hidden*/}
      <div
        className="lg:hidden relative h-14 w-14 rounded-full hover:bg-gray-500 hover:bg-opacity-10
      flex items-center justify-center p-4 cursor-pointer
      "
      >
        <Icon size={28} color="black" />
        {alert ? (
          <BsDot className="text-sky-500 absolute -top-4 left-0" size={70} />
        ) : null}
      </div>
      {/* phần này dành cho desktop lg:...*/}
      <div
        className="relative hidden lg:flex items-center gap-4 p-4 rounded-full
      hover:bg-gray-500 hover:bg-opacity-10 cursor-pointer"
      >
        <Icon size={24} color="black" />
        <p className="hidden lg:block text-black">{label}</p>
        {alert ? (
          <BsDot className="text-sky-500 absolute -top-4 left-0" size={70} />
        ) : null}
      </div>
    </div>
  );
};

export default SidebarItems;
