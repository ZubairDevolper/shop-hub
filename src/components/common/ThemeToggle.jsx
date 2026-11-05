
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

    if (!mounted) {
        return (
            <button
                type="button"
                aria-label="Change theme"
                className="h-10 w-10 rounded-full border border-gray-300"
            />
        )
    }

    return (
        <button
            type="button"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            className="flex h-10 w-10 items-center justify-center
            rounded-full border border-gray-300 bg-white text-gray-800
            transition-colors hover:bg-gray-100
            dark:border-gray-700 dark:bg-gray-800 dark:text-yellow-300 
            dark:hover:bg-gray-700"
        >
            {theme === 'light' ? (
                <TbSettingsFilled size={25} />
            ) : (
                <AiOutlineSun size={22} />
            )}
        </button>
    )
}

export default ThemeToggle
