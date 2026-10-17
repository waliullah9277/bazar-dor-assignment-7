"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface ICategoryLink {
    slug: string;
    nameBn: string;
    icon: string;
}

const CategoryLink = ({ slug, nameBn, icon }: ICategoryLink) => {
    const pathname = usePathname();
    const href = `/categories/${slug}`;
    const isActive = pathname === href;

    return (
        <Link
            href={href}
            className={`shrink-0 rounded-lg px-3 py-2 transition-colors ${
                isActive
                    ? "bg-green-600 text-white"
                    : "text-gray-700 hover:bg-green-100 hover:text-green-700"
            }`}
        >
            <span className="mr-1">{icon}</span>
            {nameBn}
        </Link>
    );
};

export default CategoryLink;