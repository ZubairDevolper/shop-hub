
'use client'

import React from 'react'
import { AiOutlineShop } from 'react-icons/ai'
import { TbShoppingCartFilled } from 'react-icons/tb'
import { useCart } from '@/context/CartContext'
import ThemeToggle from '@/components/common/ThemeToggle'
import LanguageSwitcher from '@/components/common/LanguageSwitcher'

const Header = () => {
    const { openCart, totalItems } = useCart()

    return (
        <div className="bg-[#1976D2] dark:bg-[#2E2E2E] text-white sticky top-0 z-40 shadow-md">
            <header className="max-w-[1500px] mx-auto py-4 flex items-center justify-between px-4">

                {/* Logo */}
                <div className="flex items-center gap-3">
                    <AiOutlineShop size={30} />
                    <h1 className=" sm:text-xl text-sm font-bold">Shop Hub</h1>
                </div>

                {/* Theme & Cart */}
                <div className="flex items-center gap-4">
                    <LanguageSwitcher />
                    <ThemeToggle />

                    <button
                        onClick={openCart}
                        aria-label="Open cart"
                        className="relative cursor-pointer"
                    >
                        <TbShoppingCartFilled size={25} />

                        {totalItems > 0 && (
                            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold min-w-4 h-4 px-1 rounded-full flex items-center justify-center">
                                {totalItems}
                            </span>
                        )}
                    </button>
                </div>

            </header>
        </div>
    )
}

export default Header
