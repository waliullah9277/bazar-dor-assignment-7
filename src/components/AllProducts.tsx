"use client";

import { Product } from "@/types/types";
import Link from "next/link";
import React, { useState } from "react";


const AllProducts = ({ products }: { products: Product[] }) => {
    const [sortBy, setSortBy] = useState<
        "default" | "price-low" | "price-high"
    >("default");

    const sortedProducts = [...products];

    if (sortBy === "price-low") {
        sortedProducts.sort((a, b) => a.today - b.today);
    } else if (sortBy === "price-high") {
        sortedProducts.sort((a, b) => b.today - a.today);
    }

    const unitNames: Record<string, string> = {
        kg: "কেজি",
        liter: "লিটার",
        dozen: "ডজন",
        piece: "পিস",
    };

    return (
        <section className="mx-auto w-full max-w-7xl py-6">
            {/* Heading and sorting */}
            <div className="mx-5 mb-5 flex flex-row items-center justify-between gap-3 px-3">
                <div className="min-w-0">
                    <h2 className="text-xl font-bold text-gray-900 sm:text-2xl">
                        সকল পণ্য
                    </h2>

                    <p className="mt-1 text-sm font-medium text-gray-500">
                        মোট {products.length.toLocaleString("bn-BD")} টি পণ্য
                        দেখানো হচ্ছে
                    </p>
                </div>

                {/* Sort dropdown */}
                <div className="flex shrink-0 items-center justify-end gap-2">
                    <label className="whitespace-nowrap text-sm text-[#26352B] sm:text-base">
                        সাজানো
                    </label>

                    <details className="dropdown dropdown-end">
                        <summary className="flex min-h-10 min-w-0 cursor-pointer list-none items-center justify-center whitespace-nowrap rounded-xl border-2 border-slate-200 bg-[#F8FBF9] px-2 py-1 text-sm text-[#26352B] shadow-none sm:min-h-11 sm:px-4 sm:text-base">
                            {sortBy === "default"
                                ? "ডিফল্ট ▼"
                                : sortBy === "price-low"
                                    ? "দাম: কম থেকে বেশি"
                                    : "দাম: বেশি থেকে কম"}
                        </summary>

                        <ul className="menu dropdown-content z-50 mt-2 w-48 gap-1 rounded-3xl bg-[#F8FBF9] p-3 text-base text-[#26352B] shadow-xl">
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

            {/* Product grid */}
            {sortedProducts.length > 0 ? (
                <div className="mx-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {sortedProducts.map((product) => {
                        const direction = product.change.dir;

                        const changeStyle =
                            direction === "up"
                                ? {
                                    color: "text-red-600",
                                    background: "bg-red-50",
                                    icon: "▲",
                                }
                                : direction === "down"
                                    ? {
                                        color: "text-emerald-600",
                                        background: "bg-emerald-50",
                                        icon: "▼",
                                    }
                                    : {
                                        color: "text-gray-500",
                                        background: "bg-gray-100",
                                        icon: "—",
                                    };

                        return (
                            <Link
                                key={product.id}
                                href={`/products/${product.slug}`}
                                className="block rounded-3xl border border-transparent bg-[#fbfdfb] p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-emerald-600 hover:shadow-md"
                            >
                                {/* Product information */}
                                <div className="flex items-center gap-4">
                                    <div className="flex h-18 w-18 shrink-0 items-center justify-center rounded-2xl bg-[#f0f5f0] text-3xl">
                                        {product.image}
                                    </div>

                                    <div className="min-w-0">
                                        <h3 className="truncate text-lg font-bold text-gray-950 sm:text-xl">
                                            {product.nameBn}
                                        </h3>

                                        <p className="text-sm text-gray-500">
                                            প্রতি{" "}
                                            {unitNames[
                                                String(product.unit)
                                                    .trim()
                                                    .toLowerCase()
                                            ] ?? "একক"}
                                        </p>
                                    </div>
                                </div>

                                {/* Price and price change */}
                                <div className="mt-5 flex items-end justify-between gap-3">
                                    <div>
                                        <p className="mb-1 text-sm text-gray-500">
                                            আজকের দাম
                                        </p>

                                        <p className="text-2xl font-semibold text-gray-950">
                                            ৳
                                            {Number(
                                                product.today
                                            ).toLocaleString("bn-BD")}
                                            <span className="ml-1 text-base font-normal">
                                                টাকা
                                            </span>
                                        </p>
                                    </div>

                                    <div
                                        className={`shrink-0 rounded-full px-3 py-2 text-sm font-semibold ${changeStyle.background} ${changeStyle.color}`}
                                    >
                                        {changeStyle.icon}{" "}
                                        {Math.abs(Number(product.change.pct)).toLocaleString("bn-BD", {
                                            minimumFractionDigits: 1,
                                            maximumFractionDigits: 2,
                                        })}%
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            ) : (
                <p className="mx-5 rounded-xl bg-gray-50 py-8 text-center text-gray-500">
                    কোনো পণ্যের তথ্য পাওয়া যায়নি।
                </p>
            )}
        </section>
    );
};

export default AllProducts;