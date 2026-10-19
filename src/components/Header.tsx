import { ShoppingBasket } from "lucide-react";
import Link from "next/link";
import NavLinks from "./NavLinks";
import UserDetails from "./UserDetails";

const Header = () => {
    const date = new Date().toLocaleDateString("bn-BD", {
        dateStyle: "full",
    });

    return (
        <header className="sticky top-0 z-50 w-full bg-white">
            <nav className="navbar mx-auto max-w-7xl px-3 sm:px-6 lg:px-8">
                <div className="navbar-start">
                    <Link
                        href="/"
                        className="flex min-w-0 items-center gap-2 sm:gap-3"
                    >
                        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-green-600 sm:h-9 sm:w-9">
                            <ShoppingBasket
                                size={25}
                                strokeWidth={2}
                                className="text-gray-300 sm:h-6 sm:w-6"
                            />
                        </div>

                        <div className="min-w-0">
                            <h2 className="truncate text-[11px] font-bold leading-4 min-[360px]:text-xs sm:text-xl sm:leading-normal">
                                বাজার দর
                            </h2>

                            <p className="mt-0 truncate text-[8px] text-gray-500 min-[360px]:text-[9px] min-[360px]:leading-3 sm:mt-0.5 sm:text-sm sm:leading-5">
                                {date}
                            </p>
                        </div>
                    </Link>
                </div>

                <div className="navbar-end gap-1.5 sm:gap-2">
                    <UserDetails/>
                </div>
            </nav>

            {/* Navigation - Below Header */}
            <nav className="py-3">
                <NavLinks />
            </nav>
        </header>
    );
};

export default Header;