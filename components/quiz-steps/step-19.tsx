"use client"

import { useEffect, useState } from "react"
import type { QuizData } from "@/app/quiz/page"
import { useLanguage } from "@/lib/language-context"
import { Trophy } from "lucide-react"

type Step19Props = {
  onNext: (data: Partial<QuizData>) => void
  quizData: QuizData
}

export function QuizStep19({ onNext, quizData }: Step19Props) {
  const { language } = useLanguage()
  const [isAnimated, setIsAnimated] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsAnimated(true), 100)
    return () => clearTimeout(timer)
  }, [])

  const getContent = () => {
    const goal = quizData.goal

    if (goal === "maintain") {
      return {
        "pt-BR": {
          title: "Você tem um grande potencial para manter seu peso",
          description:
            "Com base nos dados históricos do CalorIA, manter o peso de forma saudável é consistente quando você segue o plano, mantendo sua forma ideal!",
          button: "Continuar",
        },
        en: {
          title: "You have great potential to maintain your weight",
          description:
            "Based on CalorIA historical data, maintaining weight in a healthy way is consistent when you follow the plan, keeping your ideal shape!",
          button: "Continue",
        },
        es: {
          title: "Tienes un gran potencial para mantener tu peso",
          description:
            "Según los datos históricos de CalorIA, mantener el peso de forma saludable es consistente cuando sigues el plan, ¡manteniendo tu forma ideal!",
          button: "Continuar",
        },
      }
    }

    if (goal === "lose") {
      return {
        "pt-BR": {
          title: "Você tem um grande potencial para perder peso",
          description:
            "Com base nos dados históricos do CalorIA, a perda de peso saudável geralmente é gradual no início, mas após 7 dias, você perde peso de forma consistente!",
          button: "Continuar",
        },
        en: {
          title: "You have great potential for weight loss",
          description:
            "Based on CalorIA historical data, healthy weight loss is usually gradual at first, but after 7 days, you lose weight consistently!",
          button: "Continue",
        },
        es: {
          title: "Tienes un gran potencial para perder peso",
          description:
            "Según los datos históricos de CalorIA, la pérdida de peso saludable suele ser gradual al principio, pero después de 7 días, ¡pierdes peso de forma consistente!",
          button: "Continuar",
        },
      }
    }

    // Default para "gain"
    return {
      "pt-BR": {
        title: "Você tem um grande potencial para ganhar peso",
        description:
          "Com base nos dados históricos do CalorIA, o ganho de peso saudável geralmente é gradual no início, mas após 7 dias, você ganha massa de forma consistente!",
        button: "Continuar",
      },
      en: {
        title: "You have great potential for weight gain",
        description:
          "Based on CalorIA historical data, healthy weight gain is usually gradual at first, but after 7 days, you gain mass consistently!",
        button: "Continue",
      },
      es: {
        title: "Tienes un gran potencial para ganar peso",
        description:
          "Según los datos históricos de CalorIA, el aumento de peso saludable suele ser gradual al principio, pero después de 7 días, ¡ganas masa de forma consistente!",
        button: "Continuar",
      },
    }
  }

  const content = getContent()
  const { title, description, button } = content[language]

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 flex flex-col justify-center space-y-4">
        <h2 className="text-lg font-bold text-center text-balance leading-tight">{title}</h2>

        <div className="relative w-full h-48 px-2">
          <svg viewBox="0 0 400 300" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
            {/* Gradiente para área preenchida */}
            <defs>
              <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#fef3c7" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#fef3c7" stopOpacity="0.1" />
              </linearGradient>

              {/* Filtro para sombra suave */}
              <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur in="SourceAlpha" stdDeviation="3" />
                <feOffset dx="0" dy="2" result="offsetblur" />
                <feComponentTransfer>
                  <feFuncA type="linear" slope="0.3" />
                </feComponentTransfer>
                <feMerge>
                  <feMergeNode />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Área preenchida com animação */}
            <path
              d="M 30 240 Q 100 220, 180 150 Q 260 80, 350 50 L 350 260 L 30 260 Z"
              fill="url(#areaGradient)"
              className={`transition-all duration-1000 ease-out ${
                isAnimated ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            />

            {/* Linha do gráfico com animação */}
            <path
              d="M 30 240 Q 100 220, 180 150 Q 260 80, 350 50"
              stroke="#1f2937"
              strokeWidth="4"
              fill="none"
              strokeLinecap="round"
              className={`transition-all duration-1000 ease-out ${isAnimated ? "opacity-100" : "opacity-0"}`}
              style={{
                strokeDasharray: isAnimated ? "none" : "1000",
                strokeDashoffset: isAnimated ? "0" : "1000",
              }}
            />

            {/* Ponto 1 - 3 Dias */}
            <circle
              cx="30"
              cy="240"
              r="10"
              fill="#ffffff"
              stroke="#1f2937"
              strokeWidth="3"
              filter="url(#shadow)"
              className={`transition-all duration-500 delay-300 ${
                isAnimated ? "opacity-100 scale-100" : "opacity-0 scale-0"
              }`}
            />

            {/* Ponto 2 - 7 Dias */}
            <circle
              cx="180"
              cy="150"
              r="10"
              fill="#ffffff"
              stroke="#1f2937"
              strokeWidth="3"
              filter="url(#shadow)"
              className={`transition-all duration-500 delay-500 ${
                isAnimated ? "opacity-100 scale-100" : "opacity-0 scale-0"
              }`}
            />

            {/* Ponto 3 - 30 Dias com troféu */}
            <circle
              cx="350"
              cy="50"
              r="24"
              fill="#f59e0b"
              stroke="#1f2937"
              strokeWidth="3"
              filter="url(#shadow)"
              className={`transition-all duration-500 delay-700 ${
                isAnimated ? "opacity-100 scale-100" : "opacity-0 scale-0"
              }`}
            />
          </svg>

          {/* Labels com animação */}
          <div
            className={`absolute bottom-2 left-2 text-xs font-semibold text-gray-900 transition-all duration-500 delay-300 ${
              isAnimated ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
            }`}
          >
            3 Dias
          </div>
          <div
            className={`absolute top-1/2 left-1/2 -translate-x-1/2 translate-y-4 text-xs font-semibold text-gray-900 transition-all duration-500 delay-500 ${
              isAnimated ? "opacity-100 translate-y-4" : "opacity-0 translate-y-2"
            }`}
          >
            7 Dias
          </div>
          <div
            className={`absolute top-0 right-2 text-xs font-semibold text-gray-900 transition-all duration-500 delay-700 ${
              isAnimated ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
            }`}
          >
            30 Dias
          </div>

          {/* Ícone de troféu */}
          <div
            className={`absolute top-[22px] right-[70px] transition-all duration-500 delay-900 ${
              isAnimated ? "opacity-100 scale-100 rotate-0" : "opacity-0 scale-0 -rotate-12"
            }`}
          >
            <Trophy className="w-4 h-4 text-white" strokeWidth={2.5} />
          </div>
        </div>

        <p className="text-center text-muted-foreground text-xs leading-relaxed px-2">{description}</p>
      </div>

      <button
        onClick={() => onNext({})}
        className="w-full bg-black hover:bg-gray-900 text-white py-4 text-sm font-semibold rounded-full transition-colors mt-4 flex-shrink-0"
      >
        {button}
      </button>
    </div>
  )
}
