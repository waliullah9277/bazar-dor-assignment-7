"use client";

import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const ProfilePage = () => {
    const router = useRouter();
    const { data: session, isPending } = authClient.useSession();
    const user = session?.user;

    const [name, setName] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    // Login na thakle signin e pathao
    useEffect(() => {
        if (!isPending && !user) router.replace("/signin");
    }, [isPending, user, router]);

    const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const trimmed = (name ?? user?.name ?? "").trim();
        if (!trimmed) {
            toast.error("নাম খালি রাখা যাবে না।");
            return;
        }

        setLoading(true);
        const { error } = await authClient.updateUser({ name: trimmed });
        setLoading(false);

        if (error) {
            toast.error("প্রোফাইল আপডেট করা যায়নি, আবার চেষ্টা করুন।");
            return;
        }

        toast.success("আপনার প্রোফাইল সফলভাবে আপডেট করা হয়েছে।");
    };

    const handleSignOut = async () => {
        const { error } = await authClient.signOut();

        if (error) {
            toast.error("সাইন আউট করা যায়নি!");
            return;
        }

        toast.success("সফলভাবে সাইন আউট করেছেন!");
        router.push("/signin");
    };

    if (!user) return null;

    return (
        <main className="container mx-auto px-3 py-6 sm:px-4 sm:py-8">
            <div className="mx-auto max-w-2xl">
                <h1 className="text-xl font-bold text-gray-900 sm:text-2xl">
                    আমার প্রোফাইল
                </h1>
                <p className="mt-0.5 text-xs text-gray-500 sm:text-sm">
                    আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।
                </p>

                {/* User card */}
                <section className="mt-4 flex flex-col gap-4 rounded-2xl border border-gray-200 bg-white p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
                    <div className="flex items-center gap-4">
                        {/* Avatar: image thakle image, na thakle prothom okkhor */}
                        <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-gray-200 bg-green-600 text-2xl font-semibold text-white sm:h-16 sm:w-16">
                            {user.image ? (
                                <Image
                                    src={user?.image}
                                    alt={user.name || "User"}
                                    width={64}
                                    height={64}
                                    unoptimized
                                    className="h-full w-full object-cover"
                                />
                            ) : (
                                user.name?.charAt(0).toUpperCase() || "U"
                            )}
                        </div>

                        <div className="min-w-0">
                            <h2 className="truncate text-base font-semibold text-gray-900 sm:text-lg">
                                {user.name}
                            </h2>
                            <p className="truncate text-xs text-gray-500 sm:text-sm">
                                {user.email}
                            </p>
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={handleSignOut}
                        className="btn btn-sm btn-outline w-full border-red-500 text-red-600 hover:border-red-600 hover:bg-red-600 hover:text-white sm:w-auto"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-4 w-4"
                        >
                            <path d="M9 14L4 9l5-5" />
                            <path d="M4 9h10a6 6 0 010 12h-3" />
                        </svg>
                        সাইন আউট
                    </button>
                </section>

                {/* Info form */}
                <section className="mt-4 rounded-2xl border border-gray-200 bg-white p-4 sm:p-5">
                    <h2 className="text-sm font-semibold text-gray-900 sm:text-base">
                        তথ্য
                    </h2>

                    <form onSubmit={handleUpdate} className="mt-4 space-y-3 sm:px-4">
                        <div>
                            <label
                                htmlFor="name"
                                className="mb-1 block text-xs text-gray-700 sm:text-sm"
                            >
                                নাম
                            </label>
                            <input
                                id="name"
                                type="text"
                                value={name ?? user.name ?? ""}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="আপনার নাম লিখুন"
                                className="input input-bordered h-10 w-full border-gray-200 bg-white text-sm focus:border-green-600 focus:outline-none"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="btn h-10 min-h-10 w-full border-none bg-green-700 text-sm text-white hover:bg-green-800 disabled:bg-green-700/60 disabled:text-white"
                        >
                            {loading ? (
                                <span className="loading loading-spinner loading-sm" />
                            ) : (
                                "আপডেট"
                            )}
                        </button>
                    </form>
                </section>
            </div>
        </main>
    );
};

export default ProfilePage;