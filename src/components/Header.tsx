import Link from "next/link";
import NavLinks from "./NavLinks";
import UserDetails from "./UserDetails";

const Header = () => {
    const date = new Date().toLocaleDateString("bn-BD", {
        dateStyle: "full",
    });

    return (
        <header className="sticky top-0 z-50 w-full bg-white">
            <nav className="navbar mx-auto container px-3 sm:px-6 lg:px-8">
                <div className="navbar-start">
                    <Link
                        href="/"
                        className="flex min-w-0 items-center gap-2 sm:gap-3"
                    >
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-green-600 transition-transform duration-300 group-hover:scale-105 min-[360px]:h-10 min-[360px]:w-10 sm:h-11 sm:w-11 sm:rounded-2xl lg:h-12 lg:w-12">
                            <span className="text-lg brightness-0 invert min-[360px]:text-xl sm:text-2xl lg:text-[26px]">
                                🛒
                            </span>
                        </div>

                        <div className="min-w-0">
                            <h2 className="truncate text-[11px] font-bold leading-4 min-[360px]:text-lg sm:text-xl sm:leading-normal">
                                বাজার দর
                            </h2>

                            <p className="mt-0 text-[8px] leading-3 text-gray-500 whitespace-normal `break-words` min-[360px]:text-[13px] min-[360px]:leading-4 sm:mt-0.5 sm:text-sm sm:leading-5">
                                {date}
                            </p>
                        </div>
                    </Link>
                </div>

                <div className="navbar-end gap-1.5 sm:gap-2">
                    <UserDetails />
                </div>
            </nav>

            {/* Navigation - Below Header */}
            <nav className="mt-3">
                <NavLinks />
            </nav>
        </header>
    );
};

export default Header;