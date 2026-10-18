import AllProducts from "@/components/AllProducts";
import Banner from "@/components/Banner";
import TodayPriceUp from "@/components/TodayPriceUp";
import TodayPriceDown from "@/components/TodaysPriceDown";
import { Product } from "@/types/types";

const getProducts = async (): Promise<Product[]> => {
  const res = await fetch("https://openapi.programming-hero.com/api/bazardor/products")

  const products = await res.json()
  return products;

}

export default async function Home() {

  const products = await getProducts();

  return (
    <div>
      <Banner />
      <TodayPriceUp products={products} />
      <TodayPriceDown products={products} />
      <section id="সব-পণ্য" className="scroll-mt-32">
        <AllProducts products={products} />
      </section>
    </div>
  );
}
