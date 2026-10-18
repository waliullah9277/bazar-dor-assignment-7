import { Product } from "@/types/types";
import Link from "next/link";
import React from "react";

const TodayPriceDown = ({ products }: { products: Product[] }) => {
    const up = products
        .filter((p) => p.change.dir === "down")
        .sort((a, b) => a.change.pct - b.change.pct)
        .slice(0, 6);

    const unitNames: Record<string, string> = {
        kg: "কেজি",
        liter: "লিটার",
        dozen: "ডজন",
        piece: "পিস",
    };

    return (
        <section className="w-full py-6 max-w-7xl mx-auto">
            <div className="mb-5 flex items-center gap-2 px-3 mx-5">
                <span className="text-green-600">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="22"
                        height="22"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                    >
                        <path d="M12 20 2 4h20L12 20z" />
                    </svg>
                </span>

                <h2 className="text-xl font-bold sm:text-2xl">
                    আজ দাম কমেছে
                </h2>
            </div>

            <Link href={"/"} className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 mx-5">
                {up.map((product) => (
                    <article
                        key={product.id}
                        className="rounded-3xl border border-transparent hover:border-emerald-600 bg-[#fbfdfb] p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md"
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
                                    প্রতি {unitNames[String(product.unit).trim().toLowerCase()] ?? "একক"}
                                </p>
                            </div>
                        </div>

                        {/* Price and increase */}
                        <div className="mt-5 flex items-end justify-between gap-3">
                            <div>
                                <p className="mb-1 text-sm text-gray-500">
                                    আজকের দাম
                                </p>
                                <p className="text-2xl font-semibold text-gray-950">
                                    ৳{Number(product.today).toLocaleString("bn-BD")}
                                    <span className="ml-1 text-base font-normal">
                                        টাকা
                                    </span>
                                </p>
                            </div>

                            <div className="shrink-0 rounded-full bg-[#f0f5f0] px-3 py-2 text-sm font-semibold text-green-600">
                                ▼{" "}
                                {Math.abs(Number(product.change.pct)).toLocaleString(
                                    "bn-BD",
                                    {
                                        maximumFractionDigits: 2,
                                    }
                                )}
                                %
                            </div>
                        </div>
                    </article>
                ))}
            </Link>

            {up.length === 0 && (
                <p className="rounded-xl bg-gray-50 py-8 text-center text-gray-500">
                    বর্তমানে দাম বেড়েছে এমন কোনো পণ্যের তথ্য পাওয়া যায়নি।
                </p>
            )}
        </section>
    );
};

export default TodayPriceDown;
