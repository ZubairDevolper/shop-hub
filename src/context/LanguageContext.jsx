'use client'

import { useCallback, useSyncExternalStore } from 'react'

const STORAGE_KEY = 'language'
const supportedLanguages = ['en', 'nl']
const listeners = new Set()
let currentLanguage = null

const getSnapshot = () => {
    if (currentLanguage === null) {
        if (typeof window === 'undefined') return 'en'
        const saved = window.localStorage.getItem(STORAGE_KEY)
        currentLanguage = supportedLanguages.includes(saved) ? saved : 'en'
    }
    return currentLanguage
}

const getServerSnapshot = () => 'en'

const subscribe = (listener) => {
    listeners.add(listener)
    return () => listeners.delete(listener)
}

export const setLanguage = (language) => {
    if (!supportedLanguages.includes(language)) return
    currentLanguage = language
    if (typeof window !== 'undefined') {
        window.localStorage.setItem(STORAGE_KEY, language)
    }
    listeners.forEach((listener) => listener())
}

const translations = {
    en: {
        header: {
            brand: 'Shop Hub',
            changeLanguage: 'Change language',
        },
        products: {
            title: 'Discover Amazing Products',
            subtitle: 'Shop the latest trends and best deals',
            searchPlaceholder: 'Search products...',
            categories: {
                all: 'All',
                electronics: 'Electronics',
                fashion: 'Fashion',
                sports: 'Sports',
                home: 'Home',
            },
            view: 'View',
            add: 'Add',
            addToCartAria: 'Add {name} to cart',
        },
        product: {
            back: 'Back to Products',
            rating: '{rating} stars',
            freeShipping: 'Free Shipping',
            warranty: '1 Year Warranty',
            addToCart: 'Add to Cart',
        },
        cart: {
            title: 'Shopping Cart',
            empty: 'Your cart is empty.',
            quantity: 'Quantity:',
            total: 'Total:',
            checkout: 'Proceed to Checkout',
            close: 'Close cart',
            decrease: 'Decrease quantity',
            increase: 'Increase quantity',
            remove: 'Remove {name} from cart',
        },
        checkout: {
            title: 'Checkout',
            steps: ['Shipping Info', 'Payment', 'Review Order'],
            fullName: 'Full Name *',
            email: 'Email *',
            address: 'Address *',
            city: 'City *',
            zip: 'ZIP Code *',
            payment: 'Payment',
            cod: 'Cash on Delivery',
            card: 'Credit / Debit Card',
            cardNumber: 'Card Number',
            expiry: 'Expiry',
            cvv: 'CVV',
            review: 'Review Order',
            shippingTo: 'Shipping To',
            paymentMethod: 'Payment Method',
            total: 'Total',
            cancel: 'Cancel',
            next: 'Next',
            placeOrder: 'Place Order',
            orderPlaced: 'Order Placed!',
            thankYou: 'Thank you for your purchase. Your order has been confirmed.',
            orderId: 'Order ID:',
            continueShopping: 'Continue Shopping',
        },
        productsData: {
            1: {
                name: 'Wireless Headphones',
                description: 'Premium noise-cancelling wireless headphones with 30-hour battery life and superior sound quality.',
            },
            2: {
                name: 'Smart Watch Pro',
                description: 'Stay connected with a sleek smartwatch featuring heart-rate tracking, GPS, and a vibrant AMOLED display.',
            },
            3: {
                name: 'Bluetooth Speaker',
                description: 'Portable Bluetooth speaker delivering rich 360° sound, deep bass, and up to 12 hours of playtime.',
            },
            4: {
                name: 'Gaming Mouse',
                description: 'Ergonomic gaming mouse with adjustable DPI, programmable buttons, and responsive RGB lighting.',
            },
            5: {
                name: 'Denim Jacket',
                description: 'Classic denim jacket crafted from durable cotton with a comfortable fit for everyday style.',
            },
            6: {
                name: 'Running Sneakers',
                description: 'Lightweight running sneakers with breathable mesh and cushioned soles for all-day comfort.',
            },
            7: {
                name: 'Leather Backpack',
                description: 'Stylish leather backpack with spacious compartments and a padded laptop sleeve.',
            },
            8: {
                name: 'Aviator Sunglasses',
                description: 'Timeless aviator sunglasses with UV400 protection and a lightweight metal frame.',
            },
            9: {
                name: 'Modern Table Lamp',
                description: 'Minimalist table lamp with a warm ambient glow, perfect for bedrooms and workspaces.',
            },
            10: {
                name: 'Modern Table Lamp',
                description: 'Elegant table lamp with adjustable brightness and a contemporary design that complements any room.',
            },
            11: {
                name: 'Throw Blanket',
                description: 'Soft and cozy throw blanket made from premium fabric to keep you warm on chilly evenings.',
            },
            12: {
                name: 'Coffee Maker',
                description: 'Compact coffee maker brewing rich, aromatic coffee with a built-in timer and auto shut-off.',
            },
            13: {
                name: 'Running Shoes',
                description: 'High-performance running shoes with responsive cushioning and a durable grip outsole.',
            },
            14: {
                name: 'Sports Backpack',
                description: 'Durable sports backpack with multiple pockets and breathable straps for active days.',
            },
        },
    },
    nl: {
        header: {
            brand: 'Shop Hub',
            changeLanguage: 'Taal wijzigen',
        },
        products: {
            title: 'Ontdek geweldige producten',
            subtitle: 'Shop de nieuwste trends en beste aanbiedingen',
            searchPlaceholder: 'Zoek producten...',
            categories: {
                all: 'Alle',
                electronics: 'Elektronica',
                fashion: 'Mode',
                sports: 'Sport',
                home: 'Wonen',
            },
            view: 'Bekijk',
            add: 'Toevoegen',
            addToCartAria: 'Voeg {name} toe aan winkelwagen',
        },
        product: {
            back: 'Terug naar producten',
            rating: '{rating} sterren',
            freeShipping: 'Gratis verzending',
            warranty: '1 jaar garantie',
            addToCart: 'In winkelwagen',
        },
        cart: {
            title: 'Winkelwagen',
            empty: 'Je winkelwagen is leeg.',
            quantity: 'Aantal:',
            total: 'Totaal:',
            checkout: 'Doorgaan naar afrekenen',
            close: 'Winkelwagen sluiten',
            decrease: 'Aantal verlagen',
            increase: 'Aantal verhogen',
            remove: 'Verwijder {name} uit winkelwagen',
        },
        checkout: {
            title: 'Afrekenen',
            steps: ['Verzendgegevens', 'Betaling', 'Bestelling controleren'],
            fullName: 'Volledige naam *',
            email: 'E-mail *',
            address: 'Adres *',
            city: 'Stad *',
            zip: 'Postcode *',
            payment: 'Betaling',
            cod: 'Betalen bij levering',
            card: 'Creditcard / Debitcard',
            cardNumber: 'Kaartnummer',
            expiry: 'Vervaldatum',
            cvv: 'CVV',
            review: 'Bestelling controleren',
            shippingTo: 'Verzenden naar',
            paymentMethod: 'Betaalmethode',
            total: 'Totaal',
            cancel: 'Annuleren',
            next: 'Volgende',
            placeOrder: 'Bestelling plaatsen',
            orderPlaced: 'Bestelling geplaatst!',
            thankYou: 'Bedankt voor je aankoop. Je bestelling is bevestigd.',
            orderId: 'Bestelnummer:',
            continueShopping: 'Verder winkelen',
        },
        productsData: {
            1: {
                name: 'Draadloze hoofdtelefoon',
                description: 'Premium draadloze hoofdtelefoon met ruisonderdrukking, 30 uur batterijduur en superieure geluidskwaliteit.',
            },
            2: {
                name: 'Smartwatch Pro',
                description: 'Blijf verbonden met een stijlvolle smartwatch met hartslagmeting, GPS en een levendig AMOLED-display.',
            },
            3: {
                name: 'Bluetooth-luidspreker',
                description: 'Draagbare Bluetooth-luidspreker met rijk 360°-geluid, diepe bas en tot 12 uur speeltijd.',
            },
            4: {
                name: 'Gamingmuis',
                description: 'Ergonomische gamingmuis met instelbare DPI, programmeerbare knoppen en responsieve RGB-verlichting.',
            },
            5: {
                name: 'Spijkerjack',
                description: 'Klassiek spijkerjack van duurzaam katoen met een comfortabele pasvorm voor elke dag.',
            },
            6: {
                name: 'Hardloopsneakers',
                description: 'Lichtgewicht hardloopsneakers met ademend mesh en gedempte zolen voor comfort de hele dag.',
            },
            7: {
                name: 'Leren rugzak',
                description: 'Stijlvolle leren rugzak met ruime vakken en een gevoerde laptopvak.',
            },
            8: {
                name: 'Aviatorzonnebril',
                description: 'Tijdloze aviatorzonnebril met UV400-bescherming en een lichtgewicht metalen frame.',
            },
            9: {
                name: 'Moderne tafellamp',
                description: 'Minimalistische tafellamp met een warm sfeerlicht, perfect voor slaapkamers en werkruimtes.',
            },
            10: {
                name: 'Moderne tafellamp',
                description: 'Elegante tafellamp met instelbare helderheid en een eigentijds design dat in elke kamer past.',
            },
            11: {
                name: 'Plaid',
                description: 'Zachte en gezellige plaid van premium stof om je warm te houden op koude avonden.',
            },
            12: {
                name: 'Koffiezetapparaat',
                description: 'Compact koffiezetapparaat dat rijke, aromatische koffie zet met een ingebouwde timer en automatische uitschakeling.',
            },
            13: {
                name: 'Hardloopschoenen',
                description: 'Hoogwaardige hardloopschoenen met responsieve demping en een duurzame gripzool.',
            },
            14: {
                name: 'Sportrugzak',
                description: 'Duurzame sportrugzak met meerdere vakken en ademende banden voor actieve dagen.',
            },
        },
    },
}

export const languages = [
    { code: 'en', label: 'English' },
    { code: 'nl', label: 'Nederlands' },
]

const resolve = (source, path) =>
    path.split('.').reduce((value, key) => (value == null ? undefined : value[key]), source)

const format = (value, vars) => {
    if (typeof value !== 'string' || !vars) return value
    return value.replace(/\{(\w+)\}/g, (_, key) => vars[key] ?? `{${key}}`)
}

export const useLanguage = () => {
    const language = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
    const dictionary = translations[language] || translations.en

    const t = useCallback(
        (path, vars) => {
            const value = resolve(dictionary, path) ?? resolve(translations.en, path)
            return format(value ?? path, vars)
        },
        [dictionary]
    )

    const tp = useCallback(
        (product, field) => dictionary.productsData?.[product.id]?.[field] ?? product[field],
        [dictionary]
    )

    const categoryLabel = useCallback(
        (category) =>
            resolve(dictionary, `products.categories.${String(category).toLowerCase()}`) ??
            category,
        [dictionary]
    )

    return { language, setLanguage, t, tp, categoryLabel }
}
