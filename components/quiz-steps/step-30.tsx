"use client"

import type { QuizData } from "@/app/quiz/page"
import { useLanguage } from "@/lib/language-context"
import { Shield } from "lucide-react"

type Step30Props = {
  onNext: (data: Partial<QuizData>) => void
}

export function QuizStep30({ onNext }: Step30Props) {
  const { language } = useLanguage()

  const content = {
    "pt-BR": {
      title: "Enviaremos um lembrete antes do fim do seu período gratuito",
      secure: "Seguro pela App Store",
      button: "Continuar",
      experiment: "Experimente sem compromisso!",
      privacy: "Privacidade",
      restore: "Restaurar Compras",
      terms: "Termos",
    },
    en: {
      title: "We'll send a reminder before your free period ends",
      secure: "Secure by App Store",
      button: "Continue",
      experiment: "Try without commitment!",
      privacy: "Privacy",
      restore: "Restore Purchases",
      terms: "Terms",
    },
    es: {
      title: "Enviaremos un recordatorio antes de que termine tu período gratuito",
      secure: "Seguro por App Store",
      button: "Continuar",
      experiment: "¡Prueba sin compromiso!",
      privacy: "Privacidad",
      restore: "Restaurar Compras",
      terms: "Términos",
    },
  }

  const { title, secure, button, experiment, privacy, restore, terms } = content[language]

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-between py-12 px-5">
      <div className="flex-1 flex flex-col items-center justify-center space-y-12 max-w-md w-full">
        <h1 className="text-3xl font-bold text-center text-balance">{title}</h1>

        <div className="relative animate-pulse">
          <svg className="w-64 h-64" viewBox="0 0 200 240" fill="none">
            <path
              d="M100 20 C100 20, 70 40, 70 80 L70 140 C70 180, 100 200, 100 200 C100 200, 130 180, 130 140 L130 80 C130 40, 100 20, 100 20Z"
              fill="#E5E7EB"
              className="transition-all"
            />
            <circle cx="140" cy="60" r="30" fill="#EF4444" className="animate-bounce" />
            <text
              x="140"
              y="70"
              textAnchor="middle"
              className="text-3xl font-bold fill-white"
              style={{ fontSize: "28px" }}
            >
              1
            </text>
          </svg>
        </div>

        <div className="flex items-center gap-2 text-gray-700">
          <Shield className="w-5 h-5" />
          <p className="text-sm font-medium">{secure}</p>
        </div>
      </div>

      <div className="w-full max-w-md space-y-4">
        <button
          onClick={() => onNext({})}
          className="w-full bg-black hover:bg-gray-900 text-white py-8 text-lg font-bold rounded-full transition-all active:scale-[0.98] shadow-lg"
        >
          {button}
        </button>

        <p className="text-center text-gray-600 text-sm">{experiment}</p>

        <div className="flex justify-center gap-8 text-xs text-gray-500 pt-2">
          <button className="hover:underline">{privacy}</button>
          <button className="hover:underline">{restore}</button>
          <button className="hover:underline">{terms}</button>
        </div>
      </div>
    </div>
  )
}
