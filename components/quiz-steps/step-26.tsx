"use client"

import { useState } from "react"
import type { QuizData } from "@/app/quiz/page"
import { useLanguage } from "@/lib/language-context"

type Step26Props = {
  onNext: (data: Partial<QuizData>) => void
}

export function QuizStep26({ onNext }: Step26Props) {
  const { language } = useLanguage()
  const [code, setCode] = useState("")

  const content = {
    "pt-BR": {
      title: "Você tem um código de indicação?",
      subtitle: "Você pode pular esta etapa",
      label: "Código de Indicação",
      placeholder: "Código de Indicação",
      skip: "Pular",
      button: "Continuar",
    },
    en: {
      title: "Do you have a referral code?",
      subtitle: "You can skip this step",
      label: "Referral Code",
      placeholder: "Referral Code",
      skip: "Skip",
      button: "Continue",
    },
    es: {
      title: "¿Tienes un código de referencia?",
      subtitle: "Puedes saltar este paso",
      label: "Código de Referencia",
      placeholder: "Código de Referencia",
      skip: "Saltar",
      button: "Continuar",
    },
  }

  const { title, subtitle, label, placeholder, skip, button } = content[language]

  return (
    <div className="h-full flex flex-col justify-center px-4 py-4">
      <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="space-y-2 text-center">
          <h2 className="text-2xl font-bold text-balance">{title}</h2>
          <p className="text-sm text-gray-600">{subtitle}</p>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold text-gray-900">{label}</label>
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder={placeholder}
            className="w-full px-4 py-3 bg-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all"
          />
        </div>

        <div className="flex justify-center">
          <button
            onClick={() => onNext({})}
            className="text-gray-500 hover:text-gray-700 text-sm font-medium transition-colors"
          >
            {skip}
          </button>
        </div>

        <button
          onClick={() => onNext({ referralCode: code })}
          disabled={!code.trim()}
          className={`w-full py-4 text-base font-bold rounded-xl transition-all active:scale-[0.98] ${
            code.trim() ? "bg-black hover:bg-gray-900 text-white" : "bg-gray-200 text-gray-400 cursor-not-allowed"
          }`}
        >
          {button}
        </button>
      </div>
    </div>
  )
}
