"use client"

import { useLanguage, type Language } from "@/lib/language-context"
import { useState } from "react"

const languages = {
  "pt-BR": { flag: "🇧🇷", code: "PT" },
  en: { flag: "🇺🇸", code: "EN" },
  es: { flag: "🇪🇸", code: "ES" },
}

export function LanguageSelector() {
  const { language, setLanguage } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)

  const currentLang = languages[language]

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-gray-300 shadow-sm hover:shadow-md transition-shadow"
      >
        <span className="text-lg">{currentLang.flag}</span>
        <span className="text-sm font-medium">{currentLang.code}</span>
        <svg
          className={`w-4 h-4 text-gray-600 transition-transform ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute top-full mt-2 right-0 bg-white border border-gray-300 rounded-2xl shadow-lg overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
          {Object.entries(languages).map(([langKey, lang]) => (
            <button
              key={langKey}
              onClick={() => {
                setLanguage(langKey as Language)
                setIsOpen(false)
              }}
              className={`flex items-center gap-3 px-5 py-3 w-full hover:bg-gray-100 transition-colors ${
                language === langKey ? "bg-gray-50" : ""
              }`}
            >
              <span className="text-lg">{lang.flag}</span>
              <span className="text-sm font-medium">{lang.code}</span>
              {language === langKey && (
                <svg className="w-4 h-4 text-black ml-auto" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
