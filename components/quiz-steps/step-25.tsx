"use client"

import { useState } from "react"
import type { QuizData } from "@/app/quiz/page"
import { useLanguage } from "@/lib/language-context"

type Step25Props = {
  onNext: (data: Partial<QuizData>) => void
}

export function QuizStep25({ onNext }: Step25Props) {
  const { language } = useLanguage()
  const [phone, setPhone] = useState("")

  const content = {
    "pt-BR": {
      title: "Para finalizarmos",
      subtitle: "Compartilhe seu telefone conosco",
      label: "Telefone",
      placeholder: "Digite seu telefone",
      skip: "Pular",
      button: "Continuar",
    },
    en: {
      title: "To finish",
      subtitle: "Share your phone with us",
      label: "Phone",
      placeholder: "Enter your phone",
      skip: "Skip",
      button: "Continue",
    },
    es: {
      title: "Para finalizar",
      subtitle: "Comparte tu teléfono con nosotros",
      label: "Teléfono",
      placeholder: "Ingresa tu teléfono",
      skip: "Saltar",
      button: "Continuar",
    },
  }

  const { title, subtitle, label, placeholder, skip, button } = content[language]

  return (
    <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="space-y-2 text-center">
        <h2 className="text-xl font-bold text-balance">{title}</h2>
        <p className="text-sm text-gray-600">{subtitle}</p>
      </div>

      <div className="space-y-2">
        <label className="text-xs font-bold text-gray-900">{label}</label>
        <div className="flex gap-2">
          <div className="flex items-center gap-2 px-3 py-3 bg-gray-100 rounded-xl">
            <span className="text-lg">🇧🇷</span>
            <span className="text-sm font-medium">+55</span>
            <svg className="w-3 h-3 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder={placeholder}
            className="flex-1 px-4 py-3 bg-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all"
          />
        </div>
      </div>

      <button onClick={() => onNext({})} className="w-full text-gray-600 py-3 text-sm font-medium">
        {skip}
      </button>

      <button
        onClick={() => onNext({ phone })}
        disabled={!phone.trim()}
        className={`w-full py-4 text-base font-bold rounded-full transition-all ${
          phone.trim() ? "bg-black hover:bg-gray-900 text-white" : "bg-gray-200 text-gray-400 cursor-not-allowed"
        }`}
      >
        {button}
      </button>
    </div>
  )
}
