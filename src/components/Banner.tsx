import Image from "next/image";
import Link from "next/link";

const Banner = () => {
    const date = new Date().toLocaleDateString("bn-BD", {
        dateStyle: "full",
    });

    return (
        <section className="container mx-auto px-4 py-2 sm:py-4">
            <div className="flex items-center justify-between gap-3 rounded-3xl bg-slate-100 p-3 sm:gap-6 sm:p-5">
                {/* Left side: Text */}
                <div className="flex-1">
                    <div className="bg-green-50 w-55 py-2 text-center rounded-3xl" >
                        <p className="text-xs font-medium text-green-700 sm:text-sm md:text-base">
                        {date}
                    </p>
                    </div>

                    <h2 className="w-100 mt-2 text-base font-semibold leading-relaxed text-gray-900 sm:text-2xl lg:text-4xl">
                        আজকের বাজারের দাম এক নজরে
                    </h2>

                    <p className="mt-2 w-150 text-xs leading-relaxed text-gray-600 sm:mt-4 sm:text-sm md:text-base">
                        চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম —
                        বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং
                        দামের পরিবর্তন এক জায়গায়।
                    </p>

                    <Link
                        href="/products"
                        className="btn btn-sm mt-3 border-none bg-green-700 text-white hover:bg-green-800 sm:btn-md sm:mt-6"
                    >
                        সব পণ্য দেখুন
                    </Link>
                </div>

                {/* Right side: Image */}
                <div className="w-2/5 shrink-0 md:w-1/3">
                    <Image
                        src="/bazar-hero.png"
                        alt="বাজারের পণ্যের ছবি"
                        width={400}
                        height={400}
                        className="h-auto w-full"
                    />
                </div>
            </div>
        </section>
    );
};

export default Banner;