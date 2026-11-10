'use client'

import React, { useState } from 'react'
import {
    AiOutlineClose,
    AiOutlineCheck,
    AiOutlineCheckCircle,
} from 'react-icons/ai'
import { useCart } from '@/context/CartContext'
import { useLanguage } from '@/context/LanguageContext'

const emptyForm = {
    fullName: '',
    email: '',
    address: '',
    city: '',
    zip: '',
}

const inputClass =
    'w-full border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-3 text-sm text-gray-700 dark:text-gray-200 bg-transparent dark:bg-gray-800 outline-none focus:border-[#1976D2] focus:ring-2 focus:ring-[#1976D2]/20'

const CheckoutModal = ({ isOpen, onClose }) => {
    const { items, subtotal, clearCart } = useCart()
    const { t, tp } = useLanguage()
    const steps = t('checkout.steps')
    const [step, setStep] = useState(0)
    const [form, setForm] = useState(emptyForm)
    const [payment, setPayment] = useState('cod')
    const [card, setCard] = useState({ number: '', expiry: '', cvv: '' })
    const [placed, setPlaced] = useState(false)
    const [orderId, setOrderId] = useState('')

    if (!isOpen) return null

    const handleChange = (e) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleCardChange = (e) => {
        setCard((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (step < 2) {
            setStep((prev) => prev + 1)
            return
        }
        setOrderId(`SH-${Date.now().toString().slice(-6)}`)
        setPlaced(true)
        clearCart()
    }

    const handleClose = () => {
        setPlaced(false)
        setStep(0)
        setForm(emptyForm)
        setPayment('cod')
        setCard({ number: '', expiry: '', cvv: '' })
        onClose()
    }

    const grandTotal = subtotal

    return (
        <div className='fixed inset-0 z-[60] flex items-center justify-center p-4'>
            <div onClick={handleClose} className='absolute inset-0 bg-black/50' />

            <div className='relative z-[70] bg-white dark:bg-gray-900 w-full max-w-[600px] max-h-[90dvh] overflow-y-auto rounded-2xl shadow-2xl'>
                {placed ? (
                    <div className='flex flex-col items-center justify-center text-center px-6 py-14'>
                        <AiOutlineCheckCircle size={70} className='text-green-500' />
                        <h2 className='mt-5 text-2xl font-bold text-gray-800 dark:text-gray-100'>{t('checkout.orderPlaced')}</h2>
                        <p className='mt-2 text-gray-500 dark:text-gray-400'>
                            {t('checkout.thankYou')}
                        </p>
                        <p className='mt-3 text-sm font-semibold text-gray-700 dark:text-gray-300'>
                            {t('checkout.orderId')} <span className='text-[#1976D2] dark:text-blue-400'>{orderId}</span>
                        </p>
                        <button
                            onClick={handleClose}
                            className='mt-8 bg-[#1976D2] text-white px-8 py-3 rounded-xl font-semibold hover:bg-[#1565C0] transition-colors cursor-pointer'
                        >
                            {t('checkout.continueShopping')}
                        </button>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit}>
                        {/* Header */}
                        <div className='px-6 py-2'>
                            <h2 className='text-xl font-bold text-gray-800 dark:text-gray-100'>{t('checkout.title')}</h2>

                        </div>

                        {/* Stepper */}
                        <div className='flex items-center gap-2 px-6 py-5 overflow-x-auto'>
                            {steps.map((label, i) => (
                                <React.Fragment key={label}>
                                    <button
                                        type='button'
                                        onClick={() => i < step && setStep(i)}
                                        disabled={i > step}
                                        className={`flex items-center gap-2 shrink-0 ${i > step ? 'cursor-not-allowed' : 'cursor-pointer'
                                            }`}
                                    >
                                        <span
                                            className={`w-7 h-7 rounded-full flex items-center justify-center text-sm font-semibold border ${i <= step
                                                ? 'bg-[#1976D2] text-white border-[#1976D2]'
                                                : 'bg-white dark:bg-gray-800 text-gray-400 dark:text-gray-500 border-gray-300 dark:border-gray-700'
                                                }`}
                                        >
                                            {i < step ? <AiOutlineCheck size={14} /> : i + 1}
                                        </span>
                                        <span
                                            className={`text-sm font-medium whitespace-nowrap ${i <= step ? 'text-[#1976D2] dark:text-blue-400' : 'text-gray-400 dark:text-gray-500'
                                                }`}
                                        >
                                            {label}
                                        </span>
                                    </button>

                                    {i < steps.length - 1 && (
                                        <span
                                            className={`flex-1 min-w-6 h-px ${i < step ? 'bg-[#1976D2]' : 'bg-gray-200 dark:bg-gray-700'
                                                }`}
                                        />
                                    )}
                                </React.Fragment>
                            ))}
                        </div>

                        {/* Step Content */}
                        <div className='px-6 py-6 min-h-[320px]'>
                            {step === 0 && (
                                <div className='flex flex-col gap-5'>

                                    <div>

                                        <input
                                            id='fullName'
                                            type='text'
                                            name='fullName'
                                            value={form.fullName}
                                            onChange={handleChange}
                                            required
                                            placeholder={t('checkout.fullName')}
                                            className={inputClass}
                                        />
                                    </div>

                                    <div>

                                        <input
                                            id='email'
                                            type='email'
                                            name='email'
                                            value={form.email}
                                            onChange={handleChange}
                                            required
                                            placeholder={t('checkout.email')}
                                            className={inputClass}
                                        />
                                    </div>

                                    <div>

                                        <input
                                            id='address'
                                            type='text'
                                            name='address'
                                            value={form.address}
                                            onChange={handleChange}
                                            required
                                            placeholder={t('checkout.address')}
                                            className={inputClass}
                                        />
                                    </div>

                                    <div className='grid grid-cols-2 gap-4'>
                                        <div>

                                            <input
                                                id='city'
                                                type='text'
                                                name='city'
                                                value={form.city}
                                                onChange={handleChange}
                                                required
                                                placeholder={t('checkout.city')}
                                                className={inputClass}
                                            />
                                        </div>
                                        <div>

                                            <input
                                                id='zip'
                                                type='text'
                                                name='zip'
                                                value={form.zip}
                                                onChange={handleChange}
                                                required
                                                placeholder={t('checkout.zip')}
                                                className={inputClass}
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}

                            {step === 1 && (
                                <div className='flex flex-col gap-5'>
                                    <h3 className='text-base font-bold text-gray-800 dark:text-gray-100'>{t('checkout.payment')}</h3>

                                    <label className='flex items-center gap-3 border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-3 cursor-pointer'>
                                        <input
                                            type='radio'
                                            name='payment'
                                            value='cod'
                                            checked={payment === 'cod'}
                                            onChange={(e) => setPayment(e.target.value)}
                                            className='accent-[#1976D2]'
                                        />
                                        <span className='text-sm text-gray-700 dark:text-gray-300'>{t('checkout.cod')}</span>
                                    </label>

                                    <label className='flex items-center gap-3 border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-3 cursor-pointer'>
                                        <input
                                            type='radio'
                                            name='payment'
                                            value='card'
                                            checked={payment === 'card'}
                                            onChange={(e) => setPayment(e.target.value)}
                                            className='accent-[#1976D2]'
                                        />
                                        <span className='text-sm text-gray-700 dark:text-gray-300'>{t('checkout.card')}</span>
                                    </label>

                                    {payment === 'card' && (
                                        <div className='flex flex-col gap-4 pt-2'>
                                            <div>
                                                <label htmlFor='cardNumber' className='block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1.5'>
                                                    {t('checkout.cardNumber')}
                                                </label>
                                                <input
                                                    id='cardNumber'
                                                    type='text'
                                                    name='number'
                                                    value={card.number}
                                                    onChange={handleCardChange}
                                                    placeholder='1234 5678 9012 3456'
                                                    className={inputClass}
                                                />
                                            </div>
                                            <div className='grid grid-cols-2 gap-4'>
                                                <div>
                                                    <label htmlFor='cardExpiry' className='block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1.5'>
                                                        {t('checkout.expiry')}
                                                    </label>
                                                    <input
                                                        id='cardExpiry'
                                                        type='text'
                                                        name='expiry'
                                                        value={card.expiry}
                                                        onChange={handleCardChange}
                                                        placeholder='MM/YY'
                                                        className={inputClass}
                                                    />
                                                </div>
                                                <div>
                                                    <label htmlFor='cardCvv' className='block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1.5'>
                                                        {t('checkout.cvv')}
                                                    </label>
                                                    <input
                                                        id='cardCvv'
                                                        type='text'
                                                        name='cvv'
                                                        value={card.cvv}
                                                        onChange={handleCardChange}
                                                        placeholder='123'
                                                        className={inputClass}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}

                            {step === 2 && (
                                <div className='flex flex-col gap-5'>
                                    <h3 className='text-base font-bold text-gray-800 dark:text-gray-100'>{t('checkout.review')}</h3>

                                    <div className='border border-gray-200 dark:border-gray-800 rounded-xl p-4'>
                                        <h4 className='text-sm font-semibold text-gray-800 dark:text-gray-100 mb-2'>{t('checkout.shippingTo')}</h4>
                                        <p className='text-sm text-gray-600 dark:text-gray-300'>{form.fullName}</p>
                                        <p className='text-sm text-gray-600 dark:text-gray-300'>{form.address}</p>
                                        <p className='text-sm text-gray-600 dark:text-gray-300'>
                                            {form.city}, {form.zip}
                                        </p>
                                        <p className='text-sm text-gray-600 dark:text-gray-300'>{form.email}</p>
                                    </div>

                                    <div className='border border-gray-200 dark:border-gray-800 rounded-xl p-4 max-h-48 overflow-y-auto flex flex-col gap-3'>
                                        {items.map((item) => (
                                            <div key={item.id} className='flex items-center justify-between gap-3 text-sm'>
                                                <span className='text-gray-700 dark:text-gray-300 truncate'>
                                                    {tp(item, 'name')} <span className='text-gray-400 dark:text-gray-500'>x{item.quantity}</span>
                                                </span>
                                                <span className='font-semibold text-gray-800 dark:text-gray-100 shrink-0'>
                                                    ${(Number(item.price) * item.quantity).toFixed(2)}
                                                </span>
                                            </div>
                                        ))}
                                    </div>

                                    <div className='flex items-center justify-between text-sm text-gray-600 dark:text-gray-300'>
                                        <span>{t('checkout.paymentMethod')}</span>
                                        <span className='font-semibold text-gray-800 dark:text-gray-100'>
                                            {payment === 'cod' ? t('checkout.cod') : t('checkout.card')}
                                        </span>
                                    </div>

                                    <div className='flex items-center justify-between border-t border-gray-200 dark:border-gray-800 pt-3'>
                                        <span className='font-bold text-gray-800 dark:text-gray-100'>{t('checkout.total')}</span>
                                        <span className='font-bold text-lg text-[#1976D2] dark:text-blue-400'>
                                            ${grandTotal.toFixed(2)}
                                        </span>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Footer */}
                        <div className='flex items-center justify-end gap-3 px-6 pb-5'>
                            <button
                                type='button'
                                onClick={handleClose}
                                className='px-6 py-2.5 rounded-lg font-semibold text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer'
                            >
                                {t('checkout.cancel')}
                            </button>
                            <button
                                type='submit'
                                disabled={items.length === 0}
                                className='px-8 py-2.5 rounded-lg font-semibold bg-[#1976D2] text-white hover:bg-[#1565C0] transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed'
                            >
                                {step === 2 ? t('checkout.placeOrder') : t('checkout.next')}
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    )
}

export default CheckoutModal
