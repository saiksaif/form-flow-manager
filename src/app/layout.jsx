"use client";
import { Inter } from "next/font/google";
import "./globals.css";
// import SignOut from "@/Components/signout";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="w-[100vw] h-[100vh] flex flex-col bg-white bgAnimOut">
          <div className="h-[95vh] w-100 bg-transparent text-black">{children}</div>
        </div>
      </body>
    </html>
  );
}
