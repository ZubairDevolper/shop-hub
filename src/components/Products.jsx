'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { AiOutlineSearch, AiFillStar } from 'react-icons/ai';
import { TbShoppingCartPlus } from 'react-icons/tb';
import { MdRemoveRedEye } from 'react-icons/md';
import { useCart } from '@/context/CartContext';
import Link from 'next/link';
import { products } from '@/data/products';
const categories = ['All', 'Electronics', 'Fashion', 'Sports', 'Home']

const Products = () => {
    const [activeCategory, setActiveCategory] = useState('All')
    const { addToCart } = useCart()

    const filteredProducts = 
        activeCategory === 'All'
            ? products
            : products.filter((product) => product.category === activeCategory)

    return (
        <>
            <div className="bg-[#F5F5F5]">
                <div className='max-w-7xl mx-auto py-7 flex justify-center items-center flex-col gap-3'>
                    <h1 className='text-4xl font-bold text-center'>Discover Amazing Products</h1>
                    <p className='text-base text-center text-gray-500 my-2'>Shop the latest trends and best deals</p>

                    <div className='relative w-full max-w-[300px] sm:max-w-[400px] md:max-w-[500px] lg:max-w-[600px]'>
                        <AiOutlineSearch className='absolute left-4 top-1/2 -translate-y-1/2 text-gray-700' size={25} />
                        <input
                            type='text'
                            placeholder='Search products...'
                            className='w-full pl-11 pr-4 py-3 rounded-lg border border-gray-400 bg-transparent text-gray-700 outline-none focus:border-[#1976D2] focus:ring-2 focus:ring-[#1976D2]/20'
                        />
                    </div>

                </div>

                <div className='max-w-6xl mx-auto px-4'>
                    <div className='flex items-center justify-start sm:justify-center gap-2 sm:gap-3 overflow-x-auto overflow-y-hidden pb-2 mb-8 w-full'>
                        {categories.map((category) => (
                            <button
                                key={category}
                                onClick={() => setActiveCategory(category)}
                                className={`shrink-0 whitespace-nowrap px-3 sm:px-4 py-2 rounded-full text-xs sm:text-[14px] font-medium border transition-colors cursor-pointer ${activeCategory === category
                                    ? 'bg-[#1976D2] text-white border-[#1976D2]'
                                    : 'bg-transparent text-gray-700 border-gray-300 hover:bg-gray-200'
                                    }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
                        {filteredProducts.map((product) => (
                            <div
                                key={product.id}
                                className='bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow group   hover:scale-95 transition-transform duration-300'
                            >
                                <div className='relative aspect-square bg-gray-100 overflow-hidden'>

                                    <p className='absolute top-2 right-2 z-10 text-sm text-white font-semibold bg-[#1976D2] px-4 h-7 flex items-center justify-center rounded-full'>
                                        {product.category}
                                    </p>

                                    <Image
                                        src={product.image}
                                        alt={product.name}
                                        fill
                                        sizes='(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw'
                                    />

                                </div>
                                <div className='p-4'>

                                    <h3 className='mt-1 text-lg font-bold text-gray-800 truncate'>
                                        {product.name}
                                    </h3>
                                    <div className='flex items-center gap-1 mt-2 text-amber-500'>
                                        <AiFillStar size={16} /> 
                                        <AiFillStar size={16} /> 
                                        <span className='text-sm text-gray-500'>({product.rating})</span>
                                    </div>
                                    <span className='text-lg font-bold text-blue-700'>${product.price}</span>
                                    <div className='flex items-center justify-between mt-4'>
                                        <Link
                                            href={`/product/${product.id}`}
                                            className='flex items-center gap-2 text-blue-700 hover:text-blue-900 transition-colors cursor-pointer'
                                        >
                                            <MdRemoveRedEye className='text-blue-600' />
                                            <span className='text-sm font-semibold text-blue-700'>View</span>
                                        </Link>
                                        <button  
                                            aria-label={`Add ${product.name} to cart`}
                                            onClick={() => addToCart(product)}
                                            className='bg-[#1976D2] text-white p-1 rounded-xl px-2 hover:bg-[#1565C0] cursor-pointer transition-colors flex items-center gap-2'
                                        >
                                            <TbShoppingCartPlus size={20} />
                                            <h1 className='font-semibold'>Add</h1>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>

        </>
    )
}

export default Products
