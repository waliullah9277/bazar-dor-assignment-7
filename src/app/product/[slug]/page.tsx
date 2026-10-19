
import NotFoundCard from "@/components/NotFoundCard";
import ProductDetails from "@/components/ProductDetails";
import { Product } from "@/types/types";

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
            <NotFoundCard
            title="প্রোডাক্ট পাওয়া যায়নি!"
            description="দুঃখিত, এই প্রোডাক্টটি খুঁজে পাওয়া যায়নি। সঠিক লিংক দিয়ে আবার চেষ্টা করুন।"
        />
        );
    }

    return (
        <main className="container mx-auto">
            <ProductDetails product={product}/>
        </main>
    );
}


export default ProductPage;