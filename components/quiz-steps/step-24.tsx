"use client"

import { useState } from "react"
import type { QuizData } from "@/app/quiz/page"
import { useLanguage } from "@/lib/language-context"

type Step24Props = {
  onNext: (data: Partial<QuizData>) => void
}

export function QuizStep24({ onNext }: Step24Props) {
  const { language } = useLanguage()
  const [email, setEmail] = useState("")

  const content = {
    "pt-BR": {
      title: "Agora vamos criar sua conta",
      subtitle: "Digite seu melhor e-mail",
      label: "Email",
      placeholder: "Digite seu email",
      skip: "Pular",
      button: "Continuar",
    },
    en: {
      title: "Now let's create your account",
      subtitle: "Enter your best email",
      label: "Email",
      placeholder: "Enter your email",
      skip: "Skip",
      button: "Continue",
    },
    es: {
      title: "Ahora vamos a crear tu cuenta",
      subtitle: "Ingresa tu mejor correo electrónico",
      label: "Email",
      placeholder: "Ingresa tu email",
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
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={placeholder}
            className="w-full px-4 py-3 bg-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all"
          />
        </div>

        <button onClick={() => onNext({})} className="w-full text-gray-600 py-3 text-sm font-medium">
          {skip}
        </button>

        <button
          onClick={() => onNext({})}
          disabled={!email.trim()}
          className={`w-full py-4 text-base font-bold rounded-xl transition-all ${
            email.trim() ? "bg-black text-white hover:bg-gray-900" : "bg-gray-200 text-gray-400 cursor-not-allowed"
          }`}
        >
          {button}
        </button>
      </div>
    </div>
  )
}
