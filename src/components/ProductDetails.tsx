import Link from "next/link";
import { Product } from "@/types/types";

const unitMap: Record<string, string> = {
    kg: "কেজি",
    litre: "লিটার",
    dozen: "ডজন",
    piece: "পিস",
};


const formatNumber = (n: number) =>
    (Number.isInteger(n) ? n : Number(n.toFixed(2))).toLocaleString("bn-BD", {
        minimumFractionDigits: Number.isInteger(n) ? 0 : 2,
        maximumFractionDigits: 2,
    });

const ProductDetails = ({ product }: { product: Product }) => {
    const unitBn = unitMap[product.unit] ?? product.unit;
    const diff = Math.abs(product.today - product.yesterday);
    const isUp = product.change.dir === "up";

    // Market gulo avg onujayi sajano (kom theke besi)
    const rows = product.markets
        .map((m) => ({ ...m, avg: (m.min + m.max) / 2 }))
        .sort((a, b) => a.avg - b.avg);

    const lowest = product.markets.reduce((a, b) => (b.min < a.min ? b : a));
    const highest = product.markets.reduce((a, b) => (b.max > a.max ? b : a));

    return (
        <main className="container mx-auto px-3 py-4 sm:px-4 sm:py-6">
            {/* Breadcrumb */}
            <nav className="mb-4 flex flex-wrap items-center gap-1.5 text-xs text-gray-600">
                <Link href="/" className="hover:text-green-700">হোম</Link>
                <span>{`>`}</span>
                <Link
                    href={`/category/${product.category}`}
                    className="hover:text-green-700"
                >
                    {product.categoryNameBn}
                </Link>
                <span>{`>`}</span>
                <span className="text-gray-800">{product.nameBn}</span>
            </nav>

            {/* Top card */}
            <section className="flex flex-col gap-4 rounded-2xl border border-gray-200 bg-white p-4 sm:flex-row sm:items-center sm:justify-between sm:p-6">
                <div className="flex items-center gap-4">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-gray-100 text-3xl sm:h-16 sm:w-16">
                        {product.image}
                    </div>

                    <div className="min-w-0">
                        <h1 className="text-xl font-bold text-gray-900 sm:text-3xl">
                            {product.nameBn}
                        </h1>
                        <p className="text-xs text-gray-500 sm:text-sm">
                            প্রতি {unitBn} · {product.categoryNameBn}
                        </p>
                        <p className="mt-1.5 text-xs text-gray-800 sm:text-sm">
                            গতকালের তুলনায় আজ দাম{" "}
                            <span className="font-bold">
                                {isUp ? "বেড়েছে" : "কমেছে"}
                            </span>{" "}
                            · {formatNumber(diff)} টাকা
                        </p>
                    </div>
                </div>

                {/* Today price box */}
                <div className="rounded-xl bg-gray-100 px-6 py-3 text-center sm:min-w-40">
                    <p className="text-xs text-gray-500 sm:text-sm">আজকের দাম</p>
                    <p className="text-3xl font-bold text-gray-900 sm:text-4xl">
                        {formatNumber(product.today)}
                    </p>
                    <p className="text-xs text-gray-500 sm:text-sm">
                        টাকা / {unitBn}
                    </p>
                    <p
                        className={`mt-1 text-xs font-bold ${
                            isUp ? "text-red-600" : "text-green-700"
                        }`}
                    >
                        {isUp ? "▲" : "▼"} {formatNumber(product.change.pct)}%
                    </p>
                </div>
            </section>

            {/* Summary + Table card */}
            <section className="mt-4 rounded-2xl border border-gray-200 bg-white p-4 sm:mt-6 sm:p-6">
                <h2 className="text-base font-bold text-gray-900 sm:text-lg">
                    দামের সারসংক্ষেপ
                </h2>

                <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">
                    <div className="rounded-xl border border-gray-200 p-4">
                        <p className="text-[11px] text-gray-600">সর্বনিম্ন দাম</p>
                        <p className="mt-1 text-2xl font-bold text-green-700">
                            {formatNumber(lowest.min)}{" "}
                            <span className="text-sm font-medium">টাকা</span>
                        </p>
                        <p className="mt-1 text-[11px] text-gray-600">
                            সবচেয়ে কম দামের বাজার
                        </p>
                    </div>

                    <div className="rounded-xl border border-gray-200 p-4">
                        <p className="text-[11px] text-gray-600">সর্বাধিক দাম</p>
                        <p className="mt-1 text-2xl font-bold text-red-600">
                            {formatNumber(highest.max)}{" "}
                            <span className="text-sm font-medium">টাকা</span>
                        </p>
                        <p className="mt-1 text-[11px] text-gray-600">
                            সবচেয়ে বেশি দামের বাজার
                        </p>
                    </div>

                    <div className="rounded-xl border border-gray-200 p-4">
                        <p className="text-[11px] text-gray-600">গড় দাম</p>
                        <p className="mt-1 text-2xl font-bold text-green-700">
                            {formatNumber(product.today)}{" "}
                            <span className="text-sm font-medium">টাকা</span>
                        </p>
                        <p className="mt-1 text-[11px] text-gray-600">
                            প্রতি {unitBn}-এর হিসাব
                        </p>
                    </div>
                </div>

                <h2 className="mt-6 text-base font-bold text-gray-900 sm:text-lg">
                    বাজারভিত্তিক আজকের দাম
                </h2>

                <div className="mt-3 overflow-x-auto rounded-xl border border-gray-200">
                    <table className="w-full min-w-150 border-collapse text-sm">
                        <thead>
                            <tr className="text-left text-xs text-gray-500">
                                <th className="px-4 py-3 font-normal">বাজার</th>
                                <th className="px-4 py-3 font-normal">বিভাগ</th>
                                <th className="px-4 py-3 text-right font-normal">সর্বনিম্ন</th>
                                <th className="px-4 py-3 text-right font-normal">সর্বাধিক</th>
                                <th className="px-4 py-3 text-right font-normal">গড়</th>
                            </tr>
                        </thead>
                        <tbody>
                            {rows.map((row, i) => (
                                <tr
                                    key={`${row.market}-${row.division}`}
                                    className={`border-t border-gray-300 ${
                                        i % 2 === 1 ? "bg-green-50/60" : ""
                                    }`}
                                >
                                    <td className="px-4 py-3 font-medium text-gray-900">
                                        {row.market}
                                    </td>
                                    <td className="px-4 py-3 text-gray-700">
                                        {row.division}
                                    </td>
                                    <td className="px-4 py-3 text-right text-gray-700">
                                        {formatNumber(row.min)} টাকা
                                    </td>
                                    <td className="px-4 py-3 text-right text-gray-700">
                                        {formatNumber(row.max)} টাকা
                                    </td>
                                    <td className="px-4 py-3 text-right font-bold text-gray-900">
                                        {formatNumber(row.avg)} টাকা
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>
        </main>
    );
};

export default ProductDetails;