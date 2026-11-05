'use client'

import React from 'react';
import { AiOutlineShop } from "react-icons/ai";
import { TbSettingsFilled, TbShoppingCartFilled } from 'react-icons/tb';
import { useCart } from '@/context/CartContext';

const Header = () => {
    const { openCart, totalItems } = useCart();

    return (
        <>
            <div className="bg-[#1976D2] text-white sticky top-0 z-40 shadow-md">
                <header className="max-w-[1500px] mx-auto py-5 flex items-center justify-between px-4">
                    <div className="flex items-center gap-3">
                        <AiOutlineShop size={30} />
                        <h1 className="text-xl font-bold cursor-pointer">Shop Hubb</h1>
                    </div>
                    <div className="flex items-center gap-3">
                        {/* dark light mode */}
                        <div>
                            <TbSettingsFilled size={25} />
                        </div>  

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

        </>
    )
}

export default Header;
