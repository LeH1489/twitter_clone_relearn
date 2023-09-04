"use client";

import { useRouter } from "next/navigation";
import { FaFeather } from "react-icons/fa";
import { useCallback } from "react";
import useLoginModal from "@/app/hooks/useLoginModal";

const SidebarTweetButton = () => {
  const router = useRouter();
  const loginModal = useLoginModal();

  const handleLogout = useCallback(() => {
    loginModal.onOpen();
  }, []);

  return (
    <div onClick={handleLogout}>
      {/* mobile */}
      <div
        className="lg:hidden mt-6 bg-sky-500 h-14 w-14 p-4 rounded-full
      hover:bg-opacity-90 cursor-pointer transition
      flex items-center justify-center
      "
      >
        <FaFeather size={24} color="white" />
      </div>
      {/* desktop */}
      <div
        className="mt-6 hidden lg:block bg-sky-500 px-4 py-2 rounded-full 
      hover:bg-opacity-90 cursor-pointer transition"
      >
        <p className="hidden lg:block text-center font-semibold text-white text-[20px]">
          Tweet
        </p>
      </div>
    </div>
  );
};

export default SidebarTweetButton;
