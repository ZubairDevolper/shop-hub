'use client'

import React from 'react'
import { TbShoppingCartPlus } from 'react-icons/tb'
import { useCart } from '@/context/CartContext'

const AddToCartButton = ({ product }) => {
    const { addToCart } = useCart()

    return (
        <button
            onClick={() => addToCart(product)}
            className='mt-auto w-full bg-[#1976D2] text-white py-3 rounded-xl font-bold hover:bg-[#1565C0] transition-colors cursor-pointer flex items-center justify-center gap-2'
        >
            <TbShoppingCartPlus size={22} />
            Add to Cart
        </button>
    )
}

export default AddToCartButton
