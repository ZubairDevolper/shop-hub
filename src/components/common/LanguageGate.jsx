'use client'

import { useEffect } from 'react'
import { supportedLanguages, translations } from '@/context/LanguageContext'

const SERVER_LANGUAGE = 'en'
const MAX_WAIT_MS = 5000

const escapeRegExp = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

const collectEnglishMarkers = () => {
    const markers = []
    const walk = (enNode, nlNode) => {
        if (typeof enNode === 'string') {
            if (typeof nlNode === 'string' && enNode !== nlNode) {
                markers.push(new RegExp('(^|[^\\w])' + escapeRegExp(enNode) + '($|[^\\w])'))
            }
            return
        }
        if (Array.isArray(enNode)) {
            enNode.forEach((value, index) => walk(value, nlNode?.[index]))
            return
        }
        if (enNode && typeof enNode === 'object') {
            Object.keys(enNode).forEach((key) => walk(enNode[key], nlNode?.[key]))
        }
    }
    walk(translations.en, translations.nl)
    return markers
}

let englishMarkers = null

const hasEnglishContent = (text) => {
    if (englishMarkers === null) englishMarkers = collectEnglishMarkers()
    return englishMarkers.some((marker) => marker.test(text))
}

const getDomText = () => {
    let text = ''
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
        acceptNode: (node) => {
            const tag = node.parentElement ? node.parentElement.tagName : ''
            return tag === 'SCRIPT' || tag === 'STYLE' || tag === 'NOSCRIPT' || tag === 'TEMPLATE'
                ? NodeFilter.FILTER_REJECT
                : NodeFilter.FILTER_ACCEPT
        },
    })
    while (walker.nextNode()) text += walker.currentNode.nodeValue + ' '
    return text
}

const LanguageGate = () => {
    useEffect(() => {
        const root = document.documentElement
        if (!root.classList.contains('lang-pending')) return

        let saved = null
        try {
            saved = window.localStorage.getItem('language')
        } catch {
            saved = null
        }
        const target = supportedLanguages.includes(saved) ? saved : SERVER_LANGUAGE

        const reveal = () => root.classList.remove('lang-pending')

        if (target === SERVER_LANGUAGE) {
            reveal()
            return
        }

        let cancelled = false
        const start = performance.now()
        const poll = () => {
            if (cancelled) return
            if (!hasEnglishContent(getDomText())) {
                reveal()
                return
            }
            if (performance.now() - start > MAX_WAIT_MS) {
                reveal()
                return
            }
            requestAnimationFrame(poll)
        }
        requestAnimationFrame(poll)

        return () => {
            cancelled = true
        }
    }, [])

    return null
}

export default LanguageGate
