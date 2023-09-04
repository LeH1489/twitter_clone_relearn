import "./globals.css";
import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import FollowBar from "./components/layout/FollowBar";
import Sidebar from "./components/layout/Sidebar";
import Modal from "./components/modals/Modal";
import LoginModal from "./components/modals/LoginModal";
import RegisterModal from "./components/modals/RegisterModal";
import ToasterProvider from "./provider/ToasterProvider";
import { SessionProvider } from "next-auth/react";
import AuthContext from "./context/AuthContext";
import EditModal from "./components/modals/EditModal";

const inter = Nunito({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FreeTweet",
  description: "TwitterClone relearning",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthContext>
          <ToasterProvider />
          <EditModal />
          <RegisterModal />
          <LoginModal />
          <div className="h-screen bg-white">
            <div className="container max-w-6xl h-full mx-auto xl:px-30">
              <div className="grid grid-cols-4 h-full">
                <Sidebar />
                <div className="col-span-3 lg:col-span-2 border-x-[0.1px] border-gray-100">
                  {children}
                </div>
                <FollowBar />
              </div>
            </div>
          </div>
        </AuthContext>
      </body>
    </html>
  );
}
