import type { Metadata } from "next";

type Props = {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { slug } = await params;

  const res = await fetch(
    `https://openapi.programming-hero.com/api/bazardor/categories/${slug}`
  );

  if (!res.ok) {
    return {
      title: "ক্যাটাগরি পাওয়া যায়নি",
    };
  }

  const result = await res.json();
  const category = result.data ?? result;

  return {
    title: `আজকের ${category.nameBn} এর দাম | বাজার দর`,
    description: `${category.nameBn} এর আজকের বাজার দর দেখুন।`,
  };
}

export default function CategoryLayout({
  children,
}: Props) {
  return <>{children}</>;
}