import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import dbConnect from "@/lib/db";
import Navbar from "@/components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Social",
  description: "It is a like social network",
};

dbConnect()

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`bg-[#E0E0EF]  ${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar/>
        {children}
       
      </body>
    </html>
  );
}
