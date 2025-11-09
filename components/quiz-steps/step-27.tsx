"use client"

import { useState, useEffect } from "react"
import type { QuizData } from "@/app/quiz/page"
import { useLanguage } from "@/lib/language-context"
import { Check } from "lucide-react"

type Step27Props = {
  onNext: (data: Partial<QuizData>) => void
}

export function QuizStep27({ onNext }: Step27Props) {
  const { language } = useLanguage()
  const [progress, setProgress] = useState(0)
  const [activeStep, setActiveStep] = useState(0)

  const content = {
    "pt-BR": {
      title: "Finalizando os preparativos...",
      steps: ["Analisando seus dados", "Calculando sua pontuação de saúde", "Calculando os macros", "Revisando tudo"],
    },
    en: {
      title: "Finalizing preparations...",
      steps: ["Analyzing your data", "Calculating your health score", "Calculating macros", "Reviewing everything"],
    },
    es: {
      title: "Finalizando los preparativos...",
      steps: ["Analizando tus datos", "Calculando tu puntuación de salud", "Calculando las macros", "Revisando todo"],
    },
  }

  const { title, steps } = content[language]

  useEffect(() => {
    const duration = 5000 // 5 seconds total
    const interval = 50
    const increment = (interval / duration) * 100

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer)
          setTimeout(() => onNext({}), 500)
          return 100
        }
        return Math.min(prev + increment, 100)
      })
    }, interval)

    return () => {
      clearInterval(timer)
    }
  }, [onNext])

  useEffect(() => {
    const stepPercentage = 100 / steps.length
    const currentStep = Math.min(Math.floor(progress / stepPercentage), steps.length - 1)
    setActiveStep(currentStep)
  }, [progress, steps.length])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen space-y-12 animate-in fade-in duration-500 py-8">
      {/* Progress Circle */}
      <div className="relative">
        <svg className="w-48 h-48 transform -rotate-90">
          <circle cx="96" cy="96" r="88" stroke="currentColor" strokeWidth="12" fill="none" className="text-gray-200" />
          <circle
            cx="96"
            cy="96"
            r="88"
            stroke="currentColor"
            strokeWidth="12"
            fill="none"
            className="text-black transition-all duration-300 ease-out"
            strokeDasharray={`${2 * Math.PI * 88}`}
            strokeDashoffset={`${2 * Math.PI * 88 * (1 - progress / 100)}`}
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-5xl font-bold">{Math.round(progress)}%</span>
        </div>
      </div>

      <h2 className="text-2xl font-bold text-center">{title}</h2>

      {/* Steps List */}
      <div className="space-y-4 w-full max-w-md px-4">
        {steps.map((step, index) => {
          const isCompleted = index < activeStep
          const isActive = index === activeStep
          const isUpcoming = index > activeStep

          return (
            <div key={index} className="flex items-center gap-4 transition-all duration-500">
              {/* Step Circle */}
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500 ${
                  isCompleted ? "bg-green-500 scale-100" : isActive ? "bg-gray-400 scale-100" : "bg-gray-200 scale-95"
                }`}
              >
                {isCompleted && (
                  <Check className="w-7 h-7 text-white animate-in zoom-in duration-300" strokeWidth={3} />
                )}
              </div>
              {/* Step Text */}
              <p
                className={`text-lg transition-all duration-500 ${
                  isCompleted
                    ? "text-gray-400 font-normal"
                    : isActive
                      ? "text-gray-900 font-bold"
                      : "text-gray-400 font-normal"
                }`}
              >
                {step}
              </p>
            </div>
          )
        })}
      </div>
    </div>
  )
}
