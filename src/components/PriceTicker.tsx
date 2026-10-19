
import MarqueeText from "react-marquee-text";

interface IProduct {
    id: number;
    nameBn: string;
    image: string;
    today: number;
    unit: string
    change: {
        dir: string
        pct: number
    }
}

const PriceTicker = async () => {
    const res = await fetch(
        "https://openapi.programming-hero.com/api/bazardor/products"
    );

    if (!res.ok) return null;

    const products: IProduct[] = await res.json();
    // console.log(products)

    const unitNames: Record<string, string> = {
        kg: "কেজি",
        litre: "লিটার",
        dozen: "ডজন",
        piece: "পিস",
    };

    return (
        <div className="border-b border-green-100 mb-3 font-medium">
            <MarqueeText direction="right" duration={10} pauseOnHover={true}>
                {products.map((product) => {
                    return (
                        <div
                            key={product.id}
                            className="mx-5 mb-3 flex items-center gap-2 text-sm"
                        >
                            <span>{product.image}</span>

                            <span className="font-medium text-gray-800">
                                {product.nameBn}
                            </span>

                            <span className="text-gray-900">
                                ৳{Number(product.today).toLocaleString("bn-BD")} টাকা/{unitNames[product.unit] ?? "একক"}
                            </span>

                            <span
                                className={
                                    product.change.dir === "up"
                                        ? "text-red-500"
                                        : product.change.dir === "down"
                                            ? "text-green-600"
                                            : "text-gray-500"
                                }
                            >
                                {product.change.dir === "up"
                                    ? "▲"
                                    : product.change.dir === "down"
                                        ? "▼"
                                        : "—"}

                                {" "}
                                {Math.abs(Number(product.change.pct)).toLocaleString("bn-BD", {
                                    minimumFractionDigits: 1,
                                    maximumFractionDigits: 2,
                                })}%
                            </span>
                        </div>
                    );
                })}
            </MarqueeText>
        </div>
    );
};

export default PriceTicker;
