'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { AiFillStar, AiOutlineArrowLeft } from 'react-icons/ai'
import { TbTruckDelivery } from 'react-icons/tb'
import { MdOutlineVerifiedUser } from 'react-icons/md'
import AddToCartButton from '@/components/common/AddToCartButton'
import { useLanguage } from '@/context/LanguageContext'

const ProductDetails = ({ product }) => {
    const { t, tp, categoryLabel } = useLanguage()

    return (
        <div className='bg-[#F5F5F5] dark:bg-gray-950 flex-1 py-8'>
            <div className='max-w-5xl mx-auto px-4'>
                <Link
                    href='/'
                    className='inline-flex items-center gap-2 text-sm font-semibold text-[#1976D2] dark:text-blue-400 hover:text-[#1565C0] dark:hover:text-blue-300 mb-6 transition-colors'
                >
                    <AiOutlineArrowLeft size={18} />
                    {t('product.back')}
                </Link>

                <div className='bg-white dark:bg-gray-900 rounded-4xl shadow-sm overflow-hidden grid grid-cols-1 md:grid-cols-2 p-10'>
                    <div className='relative aspect-square'>
                        <Image
                            src={product.image}
                            alt={tp(product, 'name')}
                            fill
                            priority
                            sizes='(max-width: 768px) 100vw, 50vw'
                            className='object-cover rounded-4xl'
                        />
                    </div>

                    <div className='p-6 md:p-8 flex flex-col gap-4'>
                        <span className='self-start text-xs font-semibold text-white bg-[#1976D2] px-4 py-1.5 rounded-full'>
                            {categoryLabel(product.category)}
                        </span>

                        <h1 className='text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-100'>
                            {tp(product, 'name')}
                        </h1>

                        <div className='flex items-center gap-1 text-amber-500'>
                            <AiFillStar size={18} />
                            <AiFillStar size={18} />
                            <span className='text-sm text-gray-500 dark:text-gray-400 ml-1'>
                                {t('product.rating', { rating: product.rating })}
                            </span>
                        </div>

                        <p className='text-2xl font-bold text-[#1976D2] dark:text-blue-400'>
                            ${product.price}
                        </p>

                        <p className='text-gray-600 dark:text-gray-300 leading-relaxed'>
                            {tp(product, 'description')}
                        </p>

                        <div className='flex flex-wrap items-center gap-6 py-3 border-y border-gray-100 dark:border-gray-800'>
                            <div className='flex items-center gap-2 text-gray-600 dark:text-gray-300'>
                                <TbTruckDelivery size={22} className='text-[#1976D2] dark:text-blue-400' />
                                <span className='text-sm font-medium'>{t('product.freeShipping')}</span>
                            </div>
                            <div className='flex items-center gap-2 text-gray-600 dark:text-gray-300'>
                                <MdOutlineVerifiedUser size={22} className='text-[#1976D2] dark:text-blue-400' />
                                <span className='text-sm font-medium'>{t('product.warranty')}</span>
                            </div>
                        </div>

                        <AddToCartButton product={product} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductDetails
