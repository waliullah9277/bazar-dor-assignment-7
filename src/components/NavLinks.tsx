import CategoryLink from "./CategoryLink";

interface INavLinks {
    id: string;
    slug: string;
    nameBn: string;
    icon: string;
}

const NavLinks = async () => {
    const res = await fetch(
        "https://openapi.programming-hero.com/api/bazardor/categories"
    );

    const navlinks: INavLinks[] = res.ok ? await res.json() : [];

    return (
        <nav className="w-full border-y border-gray-200 bg-white">
            <div className="container mx-auto px-1 sm:px-6 lg:px-8">
                <div className="flex gap-1 overflow-x-auto py-1 text-sm font-medium sm:gap-3 sm:text-base">
                    {navlinks.map((n) => (
                        <CategoryLink
                            key={n.id}
                            slug={n.slug}
                            nameBn={n.nameBn}
                            icon={n.icon}
                        />
                    ))}
                </div>
            </div>
        </nav>
    );
};

export default NavLinks;