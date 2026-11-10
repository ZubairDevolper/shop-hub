
'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { AiOutlineSearch, AiFillStar } from 'react-icons/ai'
import { TbShoppingCartPlus } from 'react-icons/tb'
import { MdRemoveRedEye } from 'react-icons/md'
import { AiOutlineCheckCircle } from 'react-icons/ai'
import { FiCheckCircle } from 'react-icons/fi'
import { useCart } from '@/context/CartContext'
import Link from 'next/link'
import { products } from '@/data/products'
import { useLanguage } from '@/context/LanguageContext'
import { IoCheckmarkCircleOutline } from 'react-icons/io5'

const categories = ['All', 'Electronics', 'Fashion', 'Sports', 'Home']

const Products = () => {
    const [activeCategory, setActiveCategory] = useState('All')
    const [showPopup, setShowPopup] = useState(false)
    const [popupProduct, setPopupProduct] = useState('')

    const { addToCart, items } = useCart()
    const { t, tp, categoryLabel } = useLanguage()

    // Popup automatically hide after 2 seconds
    useEffect(() => {
        if (!showPopup) return

        const timer = setTimeout(() => {
            setShowPopup(false)
        }, 2000)

        return () => clearTimeout(timer)
    }, [showPopup])

    // Add product to cart
    const handleAddToCart = (product) => {
        addToCart(product)

        setPopupProduct(tp(product, 'name'))
        setShowPopup(true)
    }

    const filteredProducts =
        activeCategory === 'All'
            ? products
            : products.filter(
                (product) => product.category === activeCategory
            )

    return (
        <>
            <div className="bg-[#F5F5F5] dark:bg-gray-950">

                {/* Success Popup */}
                {showPopup && (
                    <div className="fixed bottom-5 right-5 z-[100] animate-in slide-in-from-right duration-300">
                        <div className="flex items-center gap-3 bg-green-900 dark:bg-gray-800 shadow-xl border border-gray-200 dark:border-gray-700 rounded-xl p-3 min-w-[280px]">

                            <FiCheckCircle
                                size={25}
                                className="text-white shrink-0"
                            />

                            <p className="text-sm text-white dark:text-gray-300">
                                {popupProduct} added successfully.
                            </p>

                        </div>
                    </div>
                )}

                {/* Heading and Search */}
                <div className="max-w-7xl mx-auto py-7 flex justify-center items-center flex-col gap-3">

                    <h1 className="text-4xl font-bold text-center text-black dark:text-white">
                        {t('products.title')}
                    </h1>

                    <p className="text-base text-center text-gray-500 dark:text-gray-400">
                        {t('products.subtitle')}
                    </p>

                    <div className="relative w-full max-w-[300px] sm:max-w-[400px] md:max-w-[500px] lg:max-w-[600px]">

                        <AiOutlineSearch
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-700 dark:text-gray-300"
                            size={25}
                        />

                        <input
                            type="text"
                            placeholder={t('products.searchPlaceholder')}
                            className="w-full pl-11 pr-4 py-3 rounded-lg border border-gray-400 dark:border-gray-700 bg-transparent text-gray-700 dark:text-gray-200 outline-none focus:border-[#1976D2] focus:ring-2 focus:ring-[#1976D2]/20"
                        />

                    </div>
                </div>

                {/* Categories */}
                <div className="max-w-6xl mx-auto px-4">

                    <div className="flex items-center justify-start sm:justify-center gap-2 sm:gap-3 overflow-x-auto overflow-y-hidden pb-2 mb-8 w-full">

                        {categories.map((category) => (
                            <button
                                key={category}
                                onClick={() => setActiveCategory(category)}
                                className={`shrink-0 whitespace-nowrap px-3 sm:px-4 py-2 rounded-full text-xs sm:text-[14px] font-medium border transition-colors cursor-pointer ${activeCategory === category
                                    ? 'bg-[#1976D2] text-white border-[#1976D2]'
                                    : 'bg-transparent text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-700 hover:bg-gray-200 dark:hover:bg-gray-800'
                                    }`}
                            >
                                {categoryLabel(category)}
                            </button>
                        ))}

                    </div>

                    {/* Products Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

                        {filteredProducts.map((product) => {

                            // Check product in cart
                            const cartItem = items.find(
                                (item) => item.id === product.id
                            )

                            const isAdded = !!cartItem

                            const cartQuantity =
                                cartItem?.quantity ?? cartItem?.qty ?? 1

                            return (
                                <div
                                    key={product.id}
                                    className="bg-white dark:bg-gray-900 rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 ease-in-out group hover:-translate-y-2"
                                >

                                    {/* Product Image */}
                                    <div className="relative aspect-square bg-gray-100 dark:bg-gray-800 overflow-hidden">

                                        {/* Category Badge */}
                                        <p className="absolute top-2 right-2 z-10 text-sm text-white font-semibold bg-[#1976D2] px-4 h-7 flex items-center justify-center rounded-full">
                                            {categoryLabel(product.category)}
                                        </p>

                                        {/* Cart Quantity Badge */}
                                        {isAdded && (
                                            <div className="absolute top-2 left-2 z-20 bg-green-800 text-white text-sm font-bold px-1 py-1 rounded-full shadow-lg flex items-center gap-1">
                                                <IoCheckmarkCircleOutline size={20} />
                                                {cartQuantity} in cart
                                            </div>
                                        )}

                                        <Image
                                            src={product.image}
                                            alt={tp(product, 'name')}
                                            fill
                                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                                        />

                                    </div>

                                    {/* Product Details */}
                                    <div className="p-4">

                                        <h3 className="mt-1 text-lg font-bold text-gray-800 dark:text-gray-100 truncate">
                                            {tp(product, 'name')}
                                        </h3>

                                        <div className="flex items-center gap-1 mt-2 text-amber-500">
                                            <AiFillStar size={16} />
                                            <AiFillStar size={16} />

                                            <span className="text-sm text-gray-500 dark:text-gray-400">
                                                ({product.rating})
                                            </span>
                                        </div>

                                        <span className="text-lg font-bold text-blue-700 dark:text-blue-400">
                                            ${product.price}
                                        </span>

                                        {/* Buttons */}
                                        <div className="flex items-center justify-between mt-4">

                                            <Link
                                                href={`/product/${product.id}`}
                                                className="flex items-center gap-2 text-blue-700 dark:text-blue-400 hover:text-blue-900 dark:hover:text-blue-300 transition-colors cursor-pointer"
                                            >
                                                <MdRemoveRedEye className="text-blue-600 dark:text-blue-400" />

                                                <span className="text-sm font-semibold">
                                                    {t('products.view')}
                                                </span>
                                            </Link>

                                            {/* Add To Cart Button */}
                                            <button
                                                aria-label={t('products.addToCartAria', {
                                                    name: tp(product, 'name')
                                                })}
                                                onClick={() => handleAddToCart(product)}
                                                className={`text-white p-1 rounded-xl px-3 cursor-pointer transition-colors flex items-center gap-2 ${isAdded
                                                    ? 'bg-green-600'
                                                    : 'bg-[#1976D2]'
                                                    }`}
                                            >
                                                {!isAdded && <TbShoppingCartPlus size={20} />}

                                                <span className="font-semibold">
                                                    {isAdded ? 'Add more' : t('products.add')}
                                                </span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}

                    </div>
                </div>
            </div>
        </>
    )
}

export default Products
