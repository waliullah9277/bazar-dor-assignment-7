
import ProductDetails from "@/components/ProductDetails";
import { Product } from "@/types/types";
import Link from "next/link";

interface ProductPageProps {
    params: Promise<{ slug: string }>;
}

const getProduct = async (id: string): Promise<Product | null> => {

    const res = await fetch(
        `https://openapi.programming-hero.com/api/bazardor/products/${id}`,
        {
            next: { revalidate: 60 },
        }
    );

    if (res.status === 404) {
        return null;
    }

    if (!res.ok) {
        throw new Error(`Failed to fetch product: ${res.status}`);
    }

    const product: Product = await res.json();

    return product;
}

const ProductPage = async ({
    params,
}: ProductPageProps) => {
    const { slug } = await params;

    const product = await getProduct(slug);

    if (!product) {
        return (
            <main className="container mx-auto px-5 py-16">
                <div className="mx-auto max-w-md rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm">
                    <div className="mb-4 text-5xl">🔍</div>

                    <h1 className="mb-2 text-xl font-bold text-gray-900">
                        প্রোডাক্ট পাওয়া যায়নি!
                    </h1>

                    <p className="mb-6 text-gray-500">
                        দুঃখিত, এই প্রোডাক্টটি খুঁজে পাওয়া যায়নি।
                        সঠিক লিংক দিয়ে আবার চেষ্টা করো।
                    </p>

                    <Link
                        href="/"
                        className="inline-block rounded-lg bg-green-600 px-5 py-3 font-medium text-white transition hover:bg-green-700"
                    >
                        হোম পেজে ফিরে যাও
                    </Link>
                </div>
            </main>
        );
    }

    return (
        <main className="container mx-auto">
            <ProductDetails product={product}/>
        </main>
    );
}


export default ProductPage;