
import dns from "dns/promises";

dns.setServers(["8.8.8.8", "8.8.4.4"]);

import type { Metadata } from "next";
import { Noto_Sans_Bengali } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import PriceTicker from "@/components/PriceTicker";
import Footer from "@/components/Footer";
import { Toaster } from "react-hot-toast";

const notoSansBengali = Noto_Sans_Bengali({
  subsets: ["bengali", "latin"]
});


export const metadata: Metadata = {
  title: 
    "আজকের বাজার দর | বাজার দর",
    // template: "%s | বাজার দর",
  description:
    "বাংলাদেশের নিত্যপ্রয়োজনীয় পণ্যের আজকের বাজার দর, বাজারভিত্তিক দাম এবং গতকালের সঙ্গে দামের পরিবর্তন জানুন।",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      // lang="en"
      lang="bn"
      data-theme="light"
      className={`${notoSansBengali.className} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-base-200">

        <Header />
        <PriceTicker />

        <main className="flex-1">
          {children}
        </main>
        <Toaster position="top-center" />
        
        <Footer />

      </body>
    </html>
  );
}
