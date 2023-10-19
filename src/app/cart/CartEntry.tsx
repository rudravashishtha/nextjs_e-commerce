"use client";

import PriceTag from "@/components/PriceTag";
import { CartItemWithProduct } from "@/lib/db/cart";
import { formatPrice } from "@/lib/format";
import Image from "next/image";
import Link from "next/link";
import { useTransition } from "react";

interface CartEntryProps {
    cartItem: CartItemWithProduct,
    setProductQuantity: (productId: string, quantity: number) => Promise<void>,
}

export default function CartEntry({ cartItem: { product, quantity }, setProductQuantity, }: CartEntryProps) {

    const [isPending, startTransition] = useTransition();

    const quantityOptions: JSX.Element[] = [];
    for (let i = 1; i <= 99; i++) {
        quantityOptions.push(
            <option value={i} key={i}>
                {i}
            </option>
        )
    }

    return (
        <div>
            <div className="flex flex-wrap items-center gap-5">
                <Link href={`/products/${product.id}`}><Image
                src={product.imageUrl} 
                alt={product.name} 
                height={250} 
                width={250} 
                className="rounded-lg"
                />
                </Link>
                <div className="gap-1 flex flex-col">
                    <Link href={`/products/${product.id}`} className="font-bold">
                        {product.name}
                    </Link>
                    <div>
                        <PriceTag price={product.price} className="pt-3 pb-3" />
                    </div>
                    <div className="my-1 flex items-center gap-2">
                        Quantity:
                        <select className="select select-bordered select-sm w-full max-w-[80px]"
                        defaultValue={quantity}
                        onChange={e => {
                            const newQuantity = parseInt(e.currentTarget.value);
                            startTransition(async () => {
                                await setProductQuantity(product.id, newQuantity);
                            })
                        }}
                        >
                            <option value={0}>0 (Remove)</option>
                            {quantityOptions}
                        </select>
                    </div>
                    <div className="flex items-center gap-3">
                        Total: {formatPrice(product.price * quantity)}
                        {isPending && <span className="loading loading-spinner loading-md" />}
                    </div>
                </div>
            </div>
            <div className="divider" />
        </div>
    )
}