'use client'
import { authClient } from '@/lib/auth-client';
import { redirect } from 'next/navigation';
import React, { useState } from 'react';
import toast from 'react-hot-toast';

const SignUpPage = () => {

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [passwordError, setPasswordError] = useState("");


    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);

        const password = formData.get("password") as string;
        const confirmPassword = formData.get("confirmPassword") as string;

        // দুইটা password মিলিয়ে দেখা
        if (password !== confirmPassword) {
            setPasswordError("দুটি পাসওয়ার্ড মিলছে না! আবার চেষ্টা করুন।");
            return;
        }

        setPasswordError("");

        const user = {
            name: formData.get("name") as string,
            email: formData.get("email") as string,
            password,
        };

        // console.log(user);

        const { data, error } = await authClient.signUp.email({
            ...user,
            callbackURL: '/',
        });

        if (data) {
            // console.log("Sign Up Successfully", data);
            toast.success("আপনার অ্যাকাউন্ট সফলভাবে তৈরি হয়েছে!");
            redirect('/signin');
        } else {
            const message =
                error?.message === "User already exists. Use another email."
                    ? "এই ইমেইল দিয়ে ইতোমধ্যে অ্যাকাউন্ট খোলা হয়েছে। অন্য ইমেইল ব্যবহার করুন।"
                    : error?.message ?? "সাইন আপ ব্যর্থ হয়েছে। আবার চেষ্টা করুন।";

            toast.error(message, {
                style: {
                    whiteSpace: "nowrap",
                    maxWidth: "none",
                },
            });
        }
    };


    const handleGoogleAccount = async () => {
        await authClient.signIn.social({
            provider: "google",
        });
    }

    const handleGithubAccount = async () => {
        await authClient.signIn.social({
            provider: "github",
        });
    }


    return (

        <div className="flex min-h-screen items-center justify-center bg-base-200 px-4 py-10">
            <fieldset className="fieldset w-full max-w-md rounded-2xl border border-base-300 bg-base-100 p-6 shadow-xl sm:p-8">
                <div className="mb-5 text-center">
                    <h1 className="text-2xl font-bold">
                        নতুন অ্যাকাউন্ট তৈরি করুন
                    </h1>
                    <p className="mt-2 text-sm text-base-content/60">
                        আপনার তথ্য দিয়ে নিবন্ধন সম্পন্ন করুন
                    </p>
                </div>

                <form onSubmit={onSubmit} className="space-y-5">
                    <div>
                        <label className="mb-2 block text-sm font-semibold text-base-content">
                            আপনার নাম
                        </label>
                        <input
                            type="text"
                            name="name"
                            placeholder="সম্পূর্ণ নাম লিখুন"
                            className="input input-bordered w-full rounded-xl bg-base-100 transition focus:outline-primary"
                            required
                        />
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-semibold text-base-content">
                            ইমেইল ঠিকানা
                        </label>
                        <input
                            type="email"
                            name="email"
                            placeholder="আপনার ইমেইল লিখুন"
                            className="input input-bordered w-full rounded-xl bg-base-100 transition focus:outline-primary"
                            required
                        />
                    </div>


                    <div>
                        <label className="mb-2 block text-sm font-semibold text-base-content">
                            পাসওয়ার্ড
                        </label>

                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                placeholder="পাসওয়ার্ড দিন"
                                className="input input-bordered w-full rounded-xl bg-base-100 pr-12 transition focus:outline-primary"
                                minLength={8}
                                required
                            />

                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute inset-y-0 right-3 flex cursor-pointer items-center text-base-content/60 hover:text-base-content"
                                aria-label={showPassword ? "পাসওয়ার্ড লুকান" : "পাসওয়ার্ড দেখুন"}
                            >
                                {showPassword ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="h-5 w-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 3l18 18M10.6 10.6a2 2 0 002.8 2.8M9.9 5.2A10.8 10.8 0 0121 12a11.8 11.8 0 01-3.1 4.3M6.2 6.2A11.8 11.8 0 003 12a10.8 10.8 0 005.2 5.8" />
                                    </svg>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="h-5 w-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.5 12s3.5-7 9.5-7 9.5 7 9.5 7-3.5 7-9.5 7-9.5-7-9.5-7z" />
                                        <circle cx="12" cy="12" r="3" />
                                    </svg>
                                )}
                            </button>
                        </div>

                        <p className="mt-2 text-xs text-base-content/50">
                            কমপক্ষে ৮ অক্ষরের পাসওয়ার্ড দিন
                        </p>
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-semibold text-base-content">
                            পাসওয়ার্ড নিশ্চিত করুন
                        </label>

                        <div className="relative">
                            <input
                                onChange={() => setPasswordError("")}
                                type={showConfirmPassword ? "text" : "password"}
                                name="confirmPassword"
                                placeholder="আবার পাসওয়ার্ড লিখুন"
                                className="input input-bordered w-full rounded-xl bg-base-100 pr-12 transition focus:outline-primary"
                                minLength={8}
                                required
                            />

                            <button
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="absolute inset-y-0 right-3 flex cursor-pointer items-center text-base-content/60 hover:text-base-content"
                                aria-label={showConfirmPassword ? "পাসওয়ার্ড লুকান" : "পাসওয়ার্ড দেখুন"}
                            >
                                {showConfirmPassword ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="h-5 w-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 3l18 18M10.6 10.6a2 2 0 002.8 2.8M9.9 5.2A10.8 10.8 0 0121 12a11.8 11.8 0 01-3.1 4.3M6.2 6.2A11.8 11.8 0 003 12a10.8 10.8 0 005.2 5.8" />
                                    </svg>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="h-5 w-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.5 12s3.5-7 9.5-7 9.5 7 9.5 7-3.5 7-9.5 7-9.5-7-9.5-7z" />
                                        <circle cx="12" cy="12" r="3" />
                                    </svg>
                                )}
                            </button>
                        </div>
                        {passwordError && (
                            <p className="mt-2 text-sm font-medium text-red-500">
                                {passwordError}
                            </p>
                        )}
                    </div>


                    <button
                        type="submit"
                        className="mt-2 w-full cursor-pointer rounded-xl bg-green-600 py-3 font-semibold text-white shadow-md transition duration-300 hover:bg-green-700 hover:shadow-lg"
                    >
                        সাইন আপ করুন
                    </button>
                </form>

                {/* Social Login Divider */}
                <div className="my-5 flex items-center">
                    <div className="flex-1 border-t border-base-300" />
                    <span className="px-4 text-xs font-medium text-base-content/50">
                        অথবা এর মাধ্যমে চালিয়ে যান
                    </span>
                    <div className="flex-1 border-t border-base-300" />
                </div>

                {/* Google Sign In */}
                <button
                    type="button"
                    onClick={handleGoogleAccount}
                    className="flex h-11 w-full items-center justify-center gap-3 rounded-lg border border-base-300 bg-base-100 px-4 text-sm font-semibold text-base-content shadow-sm transition-all cursor-pointer duration-300 hover:border-gray-400 hover:bg-base-200 active:scale-[0.98]"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 48 48"
                        className="h-5 w-5 shrink-0"
                        aria-hidden="true"
                    >
                        <path
                            fill="#EA4335"
                            d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 3.05 13.22l7.98 6.19C12.93 13.72 18.01 9.5 24 9.5Z"
                            transform="translate(0 4)"
                        />
                        <path
                            fill="#4285F4"
                            d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6C44.4 37.98 46.98 31.91 46.98 24.55Z"
                        />
                        <path
                            fill="#FBBC05"
                            d="M10.53 28.59A14.4 14.4 0 0 1 9.75 24c0-1.59.27-3.13.76-4.59l-7.98-6.19A23.9 23.9 0 0 0 0 24c0 3.87.93 7.52 2.56 10.78l7.97-6.19Z"
                            transform="translate(1 0)"
                        />
                        <path
                            fill="#34A853"
                            d="M24 48c6.48 0 11.93-2.13 15.91-5.8l-7.73-6c-2.14 1.43-4.89 2.27-8.18 2.27-5.99 0-11.07-4.22-12.89-9.91l-7.98 6.19C6.58 42.62 14.62 48 24 48Z"
                        />
                    </svg>

                    <span>Continue with Google</span>
                </button>

                {/* GitHub Sign In - UI Only */}
                <button
                    onClick={handleGithubAccount}
                    type="button"
                    className="mt-3 flex h-11 w-full items-center justify-center gap-3 rounded-lg border border-base-300 bg-base-100 px-4 text-sm font-semibold text-base-content shadow-sm transition-all cursor-pointer duration-300 hover:border-gray-400 hover:bg-base-200 active:scale-[0.98]"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="h-5 w-5 shrink-0"
                        aria-hidden="true"
                    >
                        <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M12 .75a11.25 11.25 0 0 0-3.56 21.92c.56.1.77-.24.77-.54v-2.1c-3.14.68-3.8-1.33-3.8-1.33-.51-1.3-1.25-1.65-1.25-1.65-1.02-.7.08-.69.08-.69 1.13.08 1.73 1.16 1.73 1.16 1 .1.75 2.02 3.02 1.53.1-.73.4-1.23.72-1.55-2.5-.29-5.13-1.25-5.13-5.56 0-1.23.44-2.24 1.16-3.03-.12-.29-.5-1.44.11-2.99 0 0 .95-.3 3.1 1.16a10.8 10.8 0 0 1 5.64 0c2.15-1.46 3.1-1.16 3.1-1.16.61 1.55.23 2.7.11 2.99.72.79 1.16 1.8 1.16 3.03 0 4.32-2.64 5.27-5.15 5.55.41.36.77 1.04.77 2.1v3.14c0 .3.2.65.78.54A11.25 11.25 0 0 0 12 .75Z"
                        />
                    </svg>

                    <span>Continue with GitHub</span>
                </button>

                <p className="mt-5 text-center text-sm text-base-content/70">
                    আগে থেকেই অ্যাকাউন্ট আছে?
                    <a
                        href="/signin"
                        className="link link-primary ml-1 font-semibold"
                    >
                        সাইন ইন করুন
                    </a>
                </p>
            </fieldset>
        </div>

    );
};

export default SignUpPage;