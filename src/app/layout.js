import { Geist_Mono, Poppins, Roboto } from "next/font/google";
import "./globals.css";
import dbConnect from "@/lib/db";
import Navbar from "@/components/Navbar";
import CustomProvider from '@/store/customProvider';
import { ToastContainer } from "react-toastify";

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-poppins',
});
const roboto = Roboto({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
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
        className={`bg-[#E0E0EF] ${roboto.className}  ${poppins.variable} ${geistMono.variable} antialiased`}
      >
        
        <CustomProvider>
        <ToastContainer/>
        <Navbar/>
        {children}
        </CustomProvider>
      </body>
    </html>
  );
}
