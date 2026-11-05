'use client'

import React, { createContext, useContext, useState } from 'react'

const CartContext = createContext(null)

export const CartProvider = ({ children }) => {
    const [items, setItems] = useState([])
    const [isOpen, setIsOpen] = useState(false)

    const addToCart = (product) => { 
        setItems((prev) => {
            const existing = prev.find((item) => item.id === product.id)
            if (existing) {
                return prev.map((item) =>
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                )
            }
            return [...prev, { ...product, quantity: 1 }]
        })
    }

    const removeFromCart = (id) => {
        setItems((prev) => prev.filter((item) => item.id !== id))
    }

    const updateQuantity = (id, quantity) => {
        if (quantity < 1) {
            removeFromCart(id)
            return
        }
        setItems((prev) =>
            prev.map((item) => (item.id === id ? { ...item, quantity } : item))
        )
    }

    const openCart = () => setIsOpen(true)
    const closeCart = () => setIsOpen(false)
    const clearCart = () => setItems([])

    const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)
    const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

    const value = {
        items,
        isOpen,
        addToCart,
        removeFromCart,
        updateQuantity,
        openCart,
        closeCart,
        clearCart,
        totalItems,
        subtotal,
    }

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export const useCart = () => {
    const context = useContext(CartContext)
    if (!context) {
        throw new Error('useCart must be used within CartProvider')
    }
    return context
}
