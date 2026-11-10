'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import {
    AiOutlineClose,
    AiOutlineMinus,
    AiOutlinePlus,
    AiOutlineDelete,
} from 'react-icons/ai'
import { TbShoppingCartFilled } from 'react-icons/tb'
import { useCart } from '@/context/CartContext'
import { useLanguage } from '@/context/LanguageContext'
import { MdDelete } from 'react-icons/md'
import CheckoutModal from './CheckoutModal'

const CartSidebar = () => {
    const [isCheckoutOpen, setIsCheckoutOpen] = useState(false)
    const { t, tp } = useLanguage()
    const {
        items,
        isOpen,
        closeCart,
        removeFromCart,
        updateQuantity,
        subtotal,
        totalItems,
    } = useCart()

    return (
        <>
            {/* Background Overlay */}
            <div
                onClick={closeCart}
                className={`fixed inset-0 bg-black/40 z-40 transition-opacity duration-300 ${isOpen
                    ? 'opacity-100'
                    : 'opacity-0 pointer-events-none'
                    }`}
            />

            {/* Cart Sidebar */}
            <aside
                className={`fixed top-0 right-0 h-[100dvh] w-full max-w-[400px] bg-white dark:bg-gray-900 z-50 shadow-xl flex flex-col transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'
                    }`}
            >
                {/* Header */}
                <div className="flex items-center justify-between px-5 py-5 border-b border-gray-200 dark:border-gray-800 shrink-0">
                    <div className="flex items-center gap-3 min-w-0">
                        <TbShoppingCartFilled
                            size={27}
                            className="text-[#1976D2] dark:text-blue-400 shrink-0"
                        />

                        <h2 className="text-xl sm:text-xl font-bold text-gray-800 dark:text-gray-100 whitespace-nowrap">
                            {t('cart.title')}
                        </h2>

                        <span className="w-7 h-7 rounded-full bg-[#1976D2] text-white text-sm flex items-center justify-center shrink-0">
                            {totalItems}
                        </span>
                    </div>

                    <button
                        onClick={closeCart}
                        aria-label={t('cart.close')}
                        className="p-1 text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-100 transition-colors cursor-pointer shrink-0"
                    >
                        <AiOutlineClose size={25} />
                    </button>
                </div>

                {/* Cart Items */}
                <div className="flex-1 overflow-y-auto px-5 py-6">
                    {items.length === 0 ? (
                        <p className="text-center text-gray-500 dark:text-gray-400 mt-10">
                            {t('cart.empty')}
                        </p>
                    ) : (
                        <ul className="flex flex-col gap-6">
                            {items.map((item) => (
                                <li key={item.id} className="flex gap-5">
                                    {/* Left Side: Image + Quantity */}
                                    <div className="w-[88px] shrink-0 flex flex-col items-center">
                                        <div className="relative w-[88px] h-[88px] rounded-2xl overflow-hidden bg-gray-100 dark:bg-gray-800">
                                            <Image
                                                src={item.image}
                                                alt={tp(item, 'name')}
                                                fill
                                                sizes="88px"
                                                className="object-cover"
                                            />
                                        </div>

                                        {/* Quantity Below Image */}
                                        <div className="relative z-10 flex items-center justify-center gap-1 mt-4">
                                            <p className="text-base text-gray-600 dark:text-gray-300 ml-15">{t('cart.quantity')}</p>
                                            <button
                                                onClick={() =>
                                                    updateQuantity(item.id, item.quantity - 1)
                                                }
                                                disabled={item.quantity <= 1}
                                                aria-label={t('cart.decrease')}
                                                className="p-1 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed"
                                            >
                                                <AiOutlineMinus size={17} />
                                            </button>

                                            <span className="w-8 h-8 border border-gray-200 dark:border-gray-700 flex items-center justify-center text-sm text-gray-600 dark:text-gray-300">
                                                {item.quantity}
                                            </span>

                                            <button
                                                onClick={() =>
                                                    updateQuantity(item.id, item.quantity + 1)
                                                }
                                                aria-label={t('cart.increase')}
                                                className="p-1 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 cursor-pointer"
                                            >
                                                <AiOutlinePlus size={17} />
                                            </button>
                                        </div>
                                    </div>

                                    {/* Right Side: Product Details */}
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-start justify-between gap-2">
                                            <h3 className="text-base sm:text-lg font-bold text-gray-800 dark:text-gray-100 leading-6">
                                                {tp(item, 'name')}
                                            </h3>

                                            <button
                                                onClick={() => removeFromCart(item.id)}
                                                aria-label={t('cart.remove', { name: tp(item, 'name') })}
                                                className="text-red-500 hover:text-red-700 transition-colors cursor-pointer shrink-0"
                                            >
                                                <MdDelete size={21} />
                                            </button>
                                        </div>

                                        <p className="text-base text-gray-500 dark:text-gray-400 mt-1">
                                            ${Number(item.price).toFixed(2)}
                                        </p>

                                        <p className="text-base font-bold text-[#1976D2] dark:text-blue-400 mt-1">
                                            ${(Number(item.price) * item.quantity).toFixed(2)}
                                        </p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                {/* Fixed Bottom Summary */}
                <div className="border-t border-gray-200 dark:border-gray-800 px-5 pt-6 pb-5 shrink-0 bg-white dark:bg-gray-900">
                    <div className="flex items-center justify-between gap-3 mb-5">
                        <span className="text-xl font-bold text-gray-800 dark:text-gray-100">
                            {t('cart.total')}
                        </span>

                        <span className="min-w-[130px] text-center text-lg font-bold text-white bg-[#1976D2] px-5 py-2 rounded-full">
                            ${Number(subtotal).toFixed(2)}
                        </span>
                    </div>

                    <button
                        onClick={() => setIsCheckoutOpen(true)}
                        disabled={items.length === 0}
                        className="w-full bg-[#1976D2] text-white py-4 rounded-2xl font-bold text-base hover:bg-[#1565C0] transition-colors shadow-md cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {t('cart.checkout')}
                    </button>
                </div>
            </aside>

            <CheckoutModal
                isOpen={isCheckoutOpen}
                onClose={() => setIsCheckoutOpen(false)}
            />
        </>
    )
}

export default CartSidebar;