
'use client';

import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { redirect } from "next/navigation";
import toast from "react-hot-toast";

const UserDetails = () => {
    const { data: session } = authClient.useSession();
    const user = session?.user;

    const [isOpen, setIsOpen] = useState(false);

    const handleSignOut = async () => {
        const { error } = await authClient.signOut();

        if (error) {
            toast.error("সাইন আউট করা যায়নি!");
            return;
        }

        setIsOpen(false);
        toast.success("সফলভাবে সাইন আউট করেছেন!");

        setTimeout(() => {
            redirect("/signin");
        }, 1000);
    };

    return (
        <div className="ml-auto">
            {user ? (
                <div className="relative">
                    {/* Profile Avatar Button */}
                    <button
                        type="button"
                        onClick={() => setIsOpen(!isOpen)}
                        className="flex items-center w-auto gap-2 rounded-2xl p-2 transition hover:bg-base-200 cursor-pointer"
                        aria-label="প্রোফাইল মেনু"
                        aria-expanded={isOpen}
                    >
                        <div className="avatar">
                            <div className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-full border border-base-300 bg-green-600 text-lg font-semibold text-white">
                                {user.image ? (
                                    <Image
                                        src={user.image}
                                        alt={user.name || "User"}
                                        width={40}
                                        height={40}
                                        className="h-full w-full object-cover"
                                    />
                                ) : (
                                    user.name?.charAt(0).toUpperCase() || "U"
                                )}
                            </div>
                        </div>

                        <span className="max-w-32 truncate text-sm font-medium ">
                            {user.name}
                        </span>

                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""
                                }`}
                        >
                            <path
                                fillRule="evenodd"
                                d="M5.22 7.22a.75.75 0 011.06 0L10 10.94l3.72-3.72a.75.75 0 111.06 1.06l-4.25 4.25a.75.75 0 01-1.06 0L5.22 8.28a.75.75 0 010-1.06z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </button>

                    {/* Dropdown Menu */}
                    {isOpen && (
                        <>
                            <button
                                type="button"
                                aria-label="মেনু বন্ধ করুন"
                                className="fixed inset-0 z-40 cursor-default"
                                onClick={() => setIsOpen(false)}
                            />

                            <div className="absolute right-0 z-50 mt-2 w-64 overflow-hidden rounded-xl border border-base-300 bg-base-100 shadow-xl">
                                {/* User Info */}
                                <div className="border-b border-base-300 px-4 py-4">
                                    <p className="truncate text-sm font-semibold text-base-content">
                                        {user.name}
                                    </p>
                                    <p className="mt-1 truncate text-xs text-base-content/60">
                                        {user.email}
                                    </p>
                                </div>

                                {/* Profile Link */}
                                <Link
                                    href="/profile"
                                    onClick={() => setIsOpen(false)}
                                    className="flex items-center gap-3 px-4 py-3 text-sm transition hover:bg-base-200"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.8}
                                        stroke="currentColor"
                                        className="h-5 w-5"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.5 20.1a7.5 7.5 0 0115 0A17.9 17.9 0 0112 21.75c-2.7 0-5.25-.6-7.5-1.65z"
                                        />
                                    </svg>
                                    আমার প্রোফাইল
                                </Link>

                                {/* Sign Out */}
                                <div className="border-t border-base-300 p-2">
                                    <button
                                        type="button"
                                        onClick={handleSignOut}
                                        className="flex cursor-pointer w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-red-600 transition hover:bg-red-50"
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
                                </div>
                            </div>
                        </>
                    )}
                </div>
            ) : (
                <div className="flex items-center gap-2">
                    <Link
                        href="/signin"
                        className="btn btn-ghost btn-xs rounded-lg px-2 text-[11px] min-[360px]:btn-sm min-[360px]:px-3 min-[360px]:text-xs sm:btn-md sm:px-4 sm:text-sm lg:px-5"
                    >
                        সাইন ইন
                    </Link>

                    <Link
                        href="/signup"
                        className="btn btn-xs rounded-lg border-green-600 bg-green-600 px-2 text-[11px] text-white hover:border-green-700 hover:bg-green-700 min-[360px]:btn-sm min-[360px]:px-3 min-[360px]:text-xs sm:btn-md sm:px-4 sm:text-sm lg:px-5"
                    >
                        সাইন আপ
                    </Link>
                </div>
            )}
        </div>
    );
};

export default UserDetails;
