import React from 'react'
import { notFound } from 'next/navigation'
import Header from '@/components/common/Header'
import ProductDetails from '@/components/ProductDetails'
import { products, getProductById } from '@/data/products'

export function generateStaticParams() {
    return products.map((product) => ({ id: String(product.id) }))
}

export default async function ProductPage({ params }) {
    const { id } = await params
    const product = getProductById(id)

    if (!product) notFound()

    return (
        <>
            <Header />
            <ProductDetails product={product} />
        </>
    )
}
