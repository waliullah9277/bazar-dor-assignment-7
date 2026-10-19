
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "সাইন আপ করুন | বাজার দর",
  description:
    "বাজার দর-এ নতুন অ্যাকাউন্ট তৈরি করুন এবং নিত্যপ্রয়োজনীয় পণ্যের বাজার দর জানুন।",
};

export default function SignUpLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
