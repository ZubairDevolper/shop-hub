'use client'

import { useEffect, useRef, useState } from 'react'
import { AiOutlineCheck, AiOutlineDown, AiOutlineGlobal } from 'react-icons/ai'
import { languages, useLanguage } from '@/context/LanguageContext'

const LanguageSwitcher = () => {
    const { language, setLanguage, t } = useLanguage()
    const [open, setOpen] = useState(false) 
    const containerRef = useRef(null)

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (containerRef.current && !containerRef.current.contains(event.target)) {
                setOpen(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    const activeLanguage = languages.find((item) => item.code === language)

    return (
        <div ref={containerRef} className='relative'>
            <button
                type='button'
                onClick={() => setOpen((prev) => !prev)}
                aria-label={t('header.changeLanguage')}
                aria-expanded={open}
                className='flex h-8 items-center gap-1.5 rounded-full border border-white/30 px-2.5 text-sm text-white transition-colors hover:bg-white/10 cursor-pointer'
            >
                <AiOutlineGlobal size={18} />
                <span className='font-semibold'>{activeLanguage?.code.toUpperCase()}</span>
                <AiOutlineDown
                    size={12}
                    className={`transition-transform ${open ? 'rotate-180' : ''}`}
                />
            </button>

            {open && (
                <div className='absolute right-0 top-full mt-2 w-40 overflow-hidden rounded-lg border border-gray-200 bg-white py-1 text-gray-800 shadow-lg z-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100'>
                    {languages.map((item) => (
                        <button
                            key={item.code}
                            type='button'
                            onClick={() => {
                                setLanguage(item.code)
                                setOpen(false)
                            }}
                            className={`flex w-full items-center justify-between px-4 py-2 text-left text-sm transition-colors hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer ${language === item.code
                                ? 'font-semibold text-[#1976D2] dark:text-blue-400'
                                : ''
                                }`}
                        >
                            <span>{item.label}</span>
                            {language === item.code && <AiOutlineCheck size={16} />}
                        </button>
                    ))}
                </div>
            )}
        </div>
    )
}

export default LanguageSwitcher
