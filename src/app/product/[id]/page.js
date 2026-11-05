import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { AiFillStar, AiOutlineArrowLeft } from 'react-icons/ai'
import { TbTruckDelivery } from 'react-icons/tb'
import { MdOutlineVerifiedUser } from 'react-icons/md'
import Header from '@/components/common/Header'
import AddToCartButton from '@/components/common/AddToCartButton'
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

            <div className='bg-[#F5F5F5] flex-1 py-8'>
                <div className='max-w-5xl mx-auto px-4'>
                    <Link
                        href='/'
                        className='inline-flex items-center gap-2 text-sm font-semibold text-[#1976D2] hover:text-[#1565C0] mb-6 transition-colors'
                    >
                        <AiOutlineArrowLeft size={18} />
                        Back to Products
                    </Link>

                    <div className='bg-white rounded-4xl shadow-sm overflow-hidden grid grid-cols-1 md:grid-cols-2 p-10'>
                        <div className='relative aspect-square'>
                            <Image
                                src={product.image}
                                alt={product.name}
                                fill
                                priority
                                sizes='(max-width: 768px) 100vw, 50vw'
                                className='object-cover rounded-4xl'
                            />
                        </div>

                        <div className='p-6 md:p-8 flex flex-col gap-4'>
                            <span className='self-start text-xs font-semibold text-white bg-[#1976D2] px-4 py-1.5 rounded-full'>
                                {product.category}
                            </span>

                            <h1 className='text-2xl md:text-3xl font-bold text-gray-800'>
                                {product.name}
                            </h1>

                            <div className='flex items-center gap-1 text-amber-500'>
                                <AiFillStar size={18} />
                                <AiFillStar size={18} />
                                <span className='text-sm text-gray-500 ml-1'>
                                    ({product.rating} stars)
                                </span>
                            </div>

                            <p className='text-2xl font-bold text-[#1976D2]'>
                                ${product.price}
                            </p>

                            <p className='text-gray-600 leading-relaxed'>
                                {product.description}
                            </p>

                            <div className='flex flex-wrap items-center gap-6 py-3 border-y border-gray-100'>
                                <div className='flex items-center gap-2 text-gray-600'>
                                    <TbTruckDelivery size={22} className='text-[#1976D2]' />
                                    <span className='text-sm font-medium'>Free Shipping</span>
                                </div>
                                <div className='flex items-center gap-2 text-gray-600'>
                                    <MdOutlineVerifiedUser size={22} className='text-[#1976D2]' />
                                    <span className='text-sm font-medium'>1 Year Warranty</span>
                                </div>
                            </div>

                            <AddToCartButton product={product} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
