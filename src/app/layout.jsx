"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import SignOut from "@/Components/signout";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="w-[100vw] h-[100vh] flex flex-col">
         
            <div className="h-[5vh] w-100 bg-white text-black border-b-2 flex flex-row gap-8 justify-center items-center ">
              <a href="/">Home</a>
              <a href="/formManager">Form-Manager</a>
              <div className="ml-5"><SignOut /></div>
            </div>
          <div className="h-[95vh] w-100 bg-white text-black">{children}</div>
        </div>
      </body>
    </html>
  );
}
