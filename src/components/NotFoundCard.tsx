import Link from "next/link";

interface NotFoundCardProps {
    title?: string;
    description?: string;
}

const NotFoundCard = ({
    title = "পেজটি পাওয়া যায়নি!",
    description = "দুঃখিত, আপনি যে পেজটি খুঁজছেন সেটি নেই বা সরিয়ে নেওয়া হয়েছে। সঠিক লিংক দিয়ে আবার চেষ্টা করুন।",
}: NotFoundCardProps) => {
    return (
        <section className="mx-auto flex min-h-[70vh] max-w-7xl items-center justify-center px-4 py-10">
            <div className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-green-100 bg-white p-6 text-center shadow-sm sm:p-10">
                {/* Soft green blobs */}
                <div className="pointer-events-none absolute -left-16 -top-16 h-40 w-40 rounded-full bg-green-100/70" />
                <div className="pointer-events-none absolute -bottom-16 -right-16 h-40 w-40 rounded-full bg-green-50" />

                <div className="relative">
                    {/* Icon */}
                    <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-50 text-4xl ring-8 ring-green-50/60 sm:h-24 sm:w-24 sm:text-5xl">
                        🔍
                    </div>

                    {/* 404 */}
                    <p className="mt-4 text-6xl font-extrabold tracking-tight text-green-700 sm:text-7xl">
                        ৪০৪
                    </p>

                    <h1 className="mt-2 text-xl font-bold text-gray-900 sm:text-2xl">
                        {title}
                    </h1>

                    <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-gray-500 sm:text-base">
                        {description}
                    </p>

                    {/* Buttons */}
                    <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
                        <Link
                            href="/"
                            className="btn border-none bg-green-700 text-white hover:bg-green-800"
                        >
                            হোম পেজে ফিরে যান
                        </Link>

                        <Link
                            href="/#সব-পণ্য"
                            className="btn btn-outline border-green-700 text-green-700 hover:border-green-700 hover:bg-green-700 hover:text-white"
                        >
                            সব পণ্য দেখুন
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default NotFoundCard;