'use client'

import React from 'react'
import { TbShoppingCartPlus } from 'react-icons/tb'
import { useCart } from '@/context/CartContext'
import { useLanguage } from '@/context/LanguageContext'

const AddToCartButton = ({ product }) => {
    const { addToCart } = useCart()
    const { t } = useLanguage()

    return (
        <button
            onClick={() => addToCart(product)}
            className='mt-auto w-full bg-[#1976D2] text-white py-3 rounded-xl font-bold hover:bg-[#1565C0] transition-colors cursor-pointer flex items-center justify-center gap-2'
        >
            <TbShoppingCartPlus size={22} />
            {t('product.addToCart')}
        </button>
    )
}

export default AddToCartButton
