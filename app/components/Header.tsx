"use client";

import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { BiArrowBack } from "react-icons/bi";

interface HeaderProps {
  label: string;
  showBackArrow?: boolean;
}

const Header: React.FC<HeaderProps> = ({ label, showBackArrow }) => {
  const router = useRouter();

  //Navigate back in history.
  //Equivalent to clicking the browser’s back button. It executes window.history.back().
  const handleBack = useCallback(() => {
    router.back();
  }, [router]);
  return (
    <div className="border-b-[0.1px] border-gray-300 p-5">
      <div className="flex flex-row gap-7 items-center">
        {showBackArrow && (
          <BiArrowBack
            onClick={handleBack}
            color="black"
            size={20}
            className="cursor-pointer hover:opacity-70 transition"
          />
        )}
        <h1 className="text-black text-xl font-semibold">{label}</h1>
      </div>
    </div>
  );
};

export default Header;
