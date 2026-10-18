import Image from "next/image";

const Banner = () => {
    const date = new Date().toLocaleDateString("bn-BD", {
        dateStyle: "full",
    });

    return (
        <section className="container mx-auto px-3 py-2 sm:px-4 sm:py-4">
            <div className="flex flex-col items-center justify-between gap-3 rounded-2xl bg-white p-3 sm:flex-row-reverse sm:gap-6 sm:rounded-3xl sm:p-5">
                {/* Image: mobile e upore, sm+ e dane */}
                <div className="w-3/5 shrink-0 sm:w-2/5 md:w-1/3">
                    <Image
                        src="/bazar-hero.png"
                        alt="বাজারের পণ্যের ছবি"
                        width={400}
                        height={400}
                        className="h-auto w-full"
                    />
                </div>

                {/* Text: mobile e niche, sm+ e bame */}
                <div className="min-w-0 flex-1 text-center sm:text-left">
                    <div className="mx-auto w-fit rounded-3xl bg-green-50 px-4 py-1.5 text-center sm:mx-0 sm:w-55 sm:py-2">
                        <p className="text-[11px] font-medium text-green-700 sm:text-sm md:text-base">
                            {date}
                        </p>
                    </div>

                    <h2 className="mt-2 w-full text-lg font-semibold leading-snug text-gray-900 sm:w-100 sm:text-2xl sm:leading-relaxed lg:text-4xl">
                        আজকের বাজারের দাম এক নজরে
                    </h2>

                    <p className="mt-2 w-full text-xs leading-relaxed text-gray-600 sm:mt-4 sm:w-150 sm:text-sm md:text-base">
                        চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম —
                        বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং
                        দামের পরিবর্তন এক জায়গায়।
                    </p>

                    <a
                        href="#সব-পণ্য"
                        className="btn btn-sm mt-3 border-none bg-green-700 text-white hover:bg-green-800 sm:btn-md sm:mt-6"
                    >
                        সব পণ্য দেখুন
                    </a>
                </div>
            </div>
        </section>
    );
};

export default Banner;