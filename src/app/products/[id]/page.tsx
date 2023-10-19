import notFound from "@/app/not-found";
import { PriceTag } from "@/components/PriceTag";
import { prisma } from "@/lib/db/prisma";
import Image from "next/image";
import { cache } from "react";
import AddToCartButton from "./AddToCartButton";
import { incrementProductQuantity } from "./actions";

interface ProductPageProps {
    params: {
        id: string,
    }
}

const getProduct = cache(async (id: string) => {
    const product = await prisma.product.findUnique({where: {id}})
    if (!product) notFound();
    return product;
});

interface MetaData {
    title: string;
    description: string;
    image: string;
}

export async function generateMetaData(
    { params: {id} }: ProductPageProps
) : Promise<MetaData> {
    const product = await getProduct(id);

    return {
        title: product.name + ' - Flowmmazon',
        description: product.description,
        openGraph: {
            images: [{ url: product.imageUrl }]
        }
    }
}

export default async function ProductPage(
    { params: {id} }: ProductPageProps
) {
    const product = await getProduct(id);

    return (
        <div className="flex flex-col lg:flex-row lg:items-center gap-5">
            <Image
                src={product.imageUrl}
                alt={product.name}
                width={500}
                height={500}
                className="rounded-lg"
                priority
            />
            <div>
                <h1 className="text-5xl font-bold mt-5">{product.name}</h1>
                <PriceTag price={product.price} className="mt-4" />
                <p className="py-6">{product.description}</p>
                <AddToCartButton productId={product.id} incrementProductQuantity={incrementProductQuantity} />
            </div>
        </div>
    );
}