
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "আমার প্রোফাইল | বাজার দর",
  description:
    "আপনার বাজার দর অ্যাকাউন্টের প্রোফাইল দেখুন, ব্যক্তিগত তথ্য আপডেট করুন এবং অ্যাকাউন্ট পরিচালনা করুন।",
};

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
