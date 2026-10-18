import { Product } from "@/types/types";
import Link from "next/link";

interface ProductCardProps {
    products: Product[];
}

const CategoryCard = ({ products }: ProductCardProps) => {
    // console.log(products)

    const unitNames: Record<string, string> = {
        kg: "কেজি",
        liter: "লিটার",
        dozen: "ডজন",
        piece: "পিস",
    };
    return (
        <div>
            {products.length > 0 ? (
                <div className="mx-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {products.map((product) => {
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
                                href={`/product/${product.id}`}
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
        </div>
    );
};

export default CategoryCard;