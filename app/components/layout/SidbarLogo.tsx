"use client";
import { useRouter } from "next/navigation";
import { PiTwitterLogoFill } from "react-icons/pi";
const SidbarLogo = () => {
  const router = useRouter();
  return (
    <div
      onClick={() => router.push("/")}
      className="
      cursor-pointer 
      h-14 
      w-14 
      rounded-full 
      hover:bg-blue-300 
      hover:bg-opacity-10
      transition
      flex 
      items-center
      justify-center
      "
    >
      <PiTwitterLogoFill size={36} color="rgb(12,165,233)" />
    </div>
  );
};

export default SidbarLogo;
