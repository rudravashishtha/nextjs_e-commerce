import ProductCard from "@/components/ProductCard"
import { prisma } from "@/lib/db/prisma"
import { Metadata } from "next"

interface SearchPageProps {
    searchParams: { query: string }
}

export function generateMetadata({ searchParams: { query } }: SearchPageProps) : Metadata {
    return {
        title: `Search Results for "${query}" - Flowmazon`
    }
}

export default async function SearchPage({ searchParams: { query } }: SearchPageProps) {

    const products = await prisma.product.findMany({
        where: {
            OR: [
                {
                    name: {
                        contains: query,
                        mode: 'insensitive'
                    }
                },
                {
                    description: {
                        contains: query,
                        mode: 'insensitive'
                    }
                }
            ]
        },
        orderBy: {
            id: 'desc'
        }
    })

    if (products.length === 0) {
        return (
            <div className="text-center">No Products Found!</div>
        )
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8">
            {products.map(product => (
                <ProductCard product={product} key={product.id} />
            ))}
        </div>
    )
}
