import type { Metadata } from "next";
import { Noto_Sans_Bengali } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import PriceTicker from "@/components/PriceTicker";
import Footer from "@/components/Footer";

const notoSansBengali = Noto_Sans_Bengali({
  subsets: ["bengali", "latin"]
});


export const metadata: Metadata = {
  title: "Bazar Dor",
  description: "bazar dor app",
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

        <main>
          {children}
        </main>
        
        <Footer />

      </body>
    </html>
  );
}
