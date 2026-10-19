
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "সাইন ইন করুন | বাজার দর",
  description:
    "বাজার দর অ্যাকাউন্টে সাইন ইন করুন এবং নিত্যপ্রয়োজনীয় পণ্যের আজকের বাজার দর দেখুন।",
};

export default function SignInLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
