"use client";

import CategoryCard from "@/components/CategoryCard";
import { Category, Product } from "@/types/types";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const CategoriesPage = () => {
    const params = useParams();
    const slug = params.slug as string;

    const [products, setProducts] = useState<Product[]>([]);
    const [category, setCategory] = useState<Category>();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [sortBy, setSortBy] = useState<
        "default" | "price-low" | "price-high"
    >("default");


    const sortedProducts = [...products].sort((a, b) => {
        if (sortBy === "price-low") {
            return a.today - b.today;
        }

        if (sortBy === "price-high") {
            return b.today - a.today;
        }

        return 0;
    });



    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                setError("");

                const [productsRes, categoryRes] = await Promise.all([
                    fetch(
                        `https://openapi.programming-hero.com/api/bazardor/products?category=${slug}`
                    ),
                    fetch(
                        `https://openapi.programming-hero.com/api/bazardor/categories/${slug}`
                    ),
                ]);

                if (
                    productsRes.status === 404 ||
                    categoryRes.status === 404
                ) {
                    setError("এই ক্যাটাগরিটি খুঁজে পাওয়া যায়নি।");
                    return;
                }

                if (!productsRes.ok || !categoryRes.ok) {
                    throw new Error("Failed to fetch data");
                }

                const productsData = await productsRes.json();
                const categoryData = await categoryRes.json();

                setProducts(productsData.data ?? productsData);
                setCategory(categoryData.data ?? categoryData);
            } catch (err) {
                console.error(err);
                setError("পণ্য লোড করা যায়নি। আবার চেষ্টা করো।");
            } finally {
                setLoading(false);
            }
        };

        if (slug) {
            fetchData();
        }
    }, [slug]);

    if (loading) {
        return <div className="text-center">পণ্য লোড হচ্ছে...</div>;
    }

    if (error) {
        return <div className="text-center font-bold mt-8 text-4xl">{error}</div>;
    }

    return (
        <div className="container mx-auto">

            <div className="mx-5 mb-5 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm sm:p-5">
                <div className="min-w-0">
                    <div className="flex items-center gap-3">
                        <span
                            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-green-50 text-2xl"
                            aria-hidden="true"
                        >
                            {category?.icon ?? "🛒"}
                        </span>

                        <h2 className="text-xl font-bold text-gray-900 sm:text-2xl">
                            {category?.nameBn ?? "সকল পণ্য"}
                        </h2>
                    </div>

                    <p className="mt-3 text-sm font-medium text-gray-500">
                        মোট {products.length.toLocaleString("bn-BD")} টি পণ্য দেখানো হচ্ছে
                    </p>
                </div>
            </div>


            <div className="mx-5 mb-5 flex items-center justify-between gap-3 px-3">
                {/* Left side: Product count */}
                <p className="text-sm font-medium text-gray-500">
                    মোট {sortedProducts.length.toLocaleString("bn-BD")} টি পণ্য দেখানো হচ্ছে
                </p>

                {/* Right side: Sort dropdown */}
                <div className="flex shrink-0 items-center gap-2">
                    <label className="whitespace-nowrap text-sm text-[#26352B] sm:text-base">
                        সাজানো
                    </label>

                    <details className="dropdown dropdown-end">
                        <summary className="flex min-h-10 cursor-pointer list-none items-center justify-center whitespace-nowrap rounded-xl border-2 border-slate-200 bg-[#F8FBF9] px-3 py-2 text-sm text-[#26352B] sm:min-h-11 sm:px-4 sm:text-base">
                            {sortBy === "default"
                                ? "ডিফল্ট ▼"
                                : sortBy === "price-low"
                                    ? "দাম: কম থেকে বেশি"
                                    : "দাম: বেশি থেকে কম"}
                        </summary>

                        <ul className="menu dropdown-content z-50 mt-2 w-48 gap-1 rounded-2xl bg-[#F8FBF9] p-3 text-base text-[#26352B] shadow-xl">
                            {[
                                { value: "default", label: "ডিফল্ট" },
                                { value: "price-low", label: "দাম: কম থেকে বেশি" },
                                { value: "price-high", label: "দাম: বেশি থেকে কম" },
                            ].map((option) => (
                                <li key={option.value}>
                                    <button
                                        type="button"
                                        className="flex items-start gap-2 whitespace-normal rounded-xl py-2 text-left hover:bg-[#EAF1EB]"
                                        onClick={(e) => {
                                            setSortBy(
                                                option.value as
                                                | "default"
                                                | "price-low"
                                                | "price-high"
                                            );

                                            e.currentTarget
                                                .closest("details")
                                                ?.removeAttribute("open");
                                        }}
                                    >
                                        <span className="w-4 shrink-0">
                                            {sortBy === option.value ? "✓" : ""}
                                        </span>
                                        <span>{option.label}</span>
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </details>
                </div>
            </div>


            {/* category card */}
            <CategoryCard products={sortedProducts} />

        </div>
    );
};

export default CategoriesPage;
