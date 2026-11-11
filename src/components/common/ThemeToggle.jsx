
'use client'

import { useEffect, useState } from 'react'
import { AiOutlineSun, AiOutlineMoon } from 'react-icons/ai'

const ThemeToggle = () => {
    const [theme, setTheme] = useState('light')
    const [mounted, setMounted] = useState(false) 

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme') || 'light'

        setTheme(savedTheme)

        document.documentElement.classList.toggle(
            'dark',
            savedTheme === 'dark'
        )

        setMounted(true)
    }, [])

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light'

        setTheme(newTheme)

        document.documentElement.classList.toggle(
            'dark',
            newTheme === 'dark'
        )

        localStorage.setItem('theme', newTheme)
    }

    if (!mounted) return null

    return (
        <button
            type="button"
            onClick={toggleTheme} 
            aria-label="Change theme"
            className="flex h-8 w-8 items-center justify-center
            rounded-full border border-gray-300
            bg-gray-100 text-gray-800
            transition-colors hover:bg-gray-200
            dark:border-gray-700 dark:bg-gray-800
            dark:text-yellow-300 dark:hover:bg-gray-700 cursor-pointer"
        >
            {theme === 'light' ? (
                <AiOutlineMoon size={22} /> 
            ) : (
                <AiOutlineSun size={22} />
            )}
        </button>
    )
}

export default ThemeToggle;
