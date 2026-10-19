
import type { Metadata } from "next";

interface Props {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { slug } = await params;

  const res = await fetch(
    `https://openapi.programming-hero.com/api/bazardor/products/${slug}`,
    {
      next: { revalidate: 60 },
    }
  );

  if (!res.ok) {
    return {
      title: "প্রোডাক্ট পাওয়া যায়নি",
    };
  }

  const product = await res.json();

  return {
    title: `${product.nameBn ?? product.name} এর আজকের দাম | বাজার দর`,
    description: `${product.nameBn ?? product.name} এর আজকের বাজার দর এবং বিস্তারিত তথ্য জানুন।`,
  };
}

export default function ProductLayout({ children }: Props) {
  return children;
}
