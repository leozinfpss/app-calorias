"use client"

import type { QuizData } from "@/app/quiz/page"
import { useLanguage } from "@/lib/language-context"
import { Flame, Shield } from "lucide-react"

type Step29Props = {
  onNext: (data: Partial<QuizData>) => void
}

export function QuizStep29({ onNext }: Step29Props) {
  const { language } = useLanguage()

  const content = {
    "pt-BR": {
      title: "Queremos que você teste o CalorIA GRÁTIS",
      weekDays: ["S", "T", "Q", "Q", "S", "S", "D"],
      caloriasRestantes: "Calorias restantes",
      nenhum: "Nenhum alimento registrado",
      subtitle: "Clique no botão abaixo para escolher como quer registrar sua refeição",
      scanMeal: "Escanear Refeição",
      speakMeal: "Falar Refeição",
      typeMeal: "Digitar Refeição",
      foodBank: "Banco de Alimentos",
      close: "Fechar",
      noPay: "Sem pagamentos feito agora",
      button: "Teste por R$0",
      experiment: "Experimente sem compromisso!",
      privacy: "Privacidade",
      restore: "Restaurar Compras",
      terms: "Termos",
    },
    en: {
      title: "We want you to try CalorIA FREE",
      weekDays: ["S", "M", "T", "W", "T", "F", "S"],
      caloriasRestantes: "Remaining calories",
      nenhum: "No food recorded",
      subtitle: "Click the button below to choose how you want to record your meal",
      scanMeal: "Scan Meal",
      speakMeal: "Speak Meal",
      typeMeal: "Type Meal",
      foodBank: "Food Database",
      close: "Close",
      noPay: "No payments made now",
      button: "Try for $0",
      experiment: "Try without commitment!",
      privacy: "Privacy",
      restore: "Restore Purchases",
      terms: "Terms",
    },
    es: {
      title: "Queremos que pruebes CalorIA GRATIS",
      weekDays: ["D", "L", "M", "M", "J", "V", "S"],
      caloriasRestantes: "Calorías restantes",
      nenhum: "Ningún alimento registrado",
      subtitle: "Haz clic en el botón de abajo para elegir cómo quieres registrar tu comida",
      scanMeal: "Escanear Comida",
      speakMeal: "Hablar Comida",
      typeMeal: "Escribir Comida",
      foodBank: "Banco de Alimentos",
      close: "Cerrar",
      noPay: "Sin pagos hechos ahora",
      button: "Prueba por $0",
      experiment: "¡Prueba sin compromiso!",
      privacy: "Privacidad",
      restore: "Restaurar Compras",
      terms: "Términos",
    },
  }

  const {
    title,
    weekDays,
    caloriasRestantes,
    nenhum,
    subtitle,
    scanMeal,
    speakMeal,
    typeMeal,
    foodBank,
    close,
    noPay,
    button,
    experiment,
    privacy,
    restore,
    terms,
  } = content[language]

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="flex-1 overflow-y-auto pb-32">
        <div className="max-w-md mx-auto px-5 pt-8 space-y-6">
          <h1 className="text-2xl font-bold text-center">{title}</h1>

          <div className="flex justify-center gap-6 py-4">
            {weekDays.map((day, i) => (
              <div key={i} className={`text-center ${i === 3 ? "opacity-100" : "opacity-30"}`}>
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center mb-1 ${
                    i === 3 ? "bg-black text-white" : "bg-gray-100 text-gray-400"
                  }`}
                >
                  <span className="text-sm font-bold">{day}</span>
                </div>
                <span className="text-xs text-gray-600">{15 + i}</span>
                {i === 3 && (
                  <div className="flex justify-center mt-1">
                    <Flame className="w-4 h-4 text-orange-500 fill-orange-500" />
                    <span className="text-xs font-bold text-orange-500 ml-0.5">10</span>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="bg-gray-50 rounded-3xl p-8 text-center space-y-6">
            <div className="relative mx-auto w-48 h-48">
              <svg className="w-full h-full transform -rotate-90">
                <circle
                  cx="96"
                  cy="96"
                  r="88"
                  stroke="currentColor"
                  strokeWidth="16"
                  fill="none"
                  className="text-gray-200"
                />
                <circle
                  cx="96"
                  cy="96"
                  r="88"
                  stroke="currentColor"
                  strokeWidth="16"
                  fill="none"
                  className="text-black"
                  strokeDasharray={`${2 * Math.PI * 88}`}
                  strokeDashoffset={`${2 * Math.PI * 88 * 0.45}`}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <Flame className="w-12 h-12 text-orange-500 fill-orange-500 mb-2" />
                <span className="text-5xl font-bold">3144</span>
              </div>
            </div>

            <p className="text-lg font-semibold text-gray-700">{caloriasRestantes}</p>

            <div className="flex justify-center gap-8 pt-4">
              <div className="text-center">
                <div className="bg-white rounded-xl p-3 mb-2">
                  <svg className="w-6 h-6 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6z" />
                  </svg>
                </div>
                <p className="text-xs text-gray-600">Proteína</p>
                <p className="text-sm font-bold">0g</p>
                <p className="text-xs text-gray-500">/133g</p>
              </div>

              <div className="text-center">
                <div className="bg-white rounded-xl p-3 mb-2">
                  <svg className="w-6 h-6 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6z" />
                  </svg>
                </div>
                <p className="text-xs text-gray-600">Carboidratos</p>
                <p className="text-sm font-bold">0g</p>
                <p className="text-xs text-gray-500">/436g</p>
              </div>

              <div className="text-center">
                <div className="bg-white rounded-xl p-3 mb-2">
                  <svg className="w-6 h-6 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" />
                  </svg>
                </div>
                <p className="text-xs text-gray-600">Gorduras</p>
                <p className="text-sm font-bold">0g</p>
                <p className="text-xs text-gray-500">/73g</p>
              </div>
            </div>

            <div className="pt-4">
              <p className="text-gray-600 text-sm">{nenhum}</p>
              <p className="text-gray-500 text-xs mt-1">{subtitle}</p>
            </div>
          </div>

          <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 space-y-3">
            <div className="max-w-md mx-auto space-y-3">
              <button className="w-full bg-green-500 hover:bg-green-600 text-white py-4 text-base font-bold rounded-full transition-all">
                {scanMeal}
              </button>
              <div className="flex gap-3">
                <button className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-3.5 text-sm font-bold rounded-full">
                  {speakMeal}
                </button>
                <button className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-3.5 text-sm font-bold rounded-full">
                  {typeMeal}
                </button>
              </div>
              <button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3.5 text-sm font-bold rounded-full">
                {foodBank}
              </button>
              <button className="w-full text-gray-500 py-2 text-sm">{close}</button>
            </div>
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-t from-white via-white to-transparent pt-8 pb-4 px-5">
        <div className="max-w-md mx-auto space-y-4">
          <div className="flex items-center justify-center gap-2 text-gray-700">
            <Shield className="w-5 h-5" />
            <p className="text-sm font-medium">{noPay}</p>
          </div>

          <button
            onClick={() => onNext({})}
            className="w-full bg-black hover:bg-gray-900 text-white py-8 text-xl font-bold rounded-full transition-all active:scale-[0.98] shadow-lg"
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
    </div>
  )
}
