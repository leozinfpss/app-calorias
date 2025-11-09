"use client"

import type { QuizData } from "@/app/quiz/page"
import { useLanguage } from "@/lib/language-context"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { Snail, Rabbit, Zap } from "lucide-react"

type Step10Props = {
  onNext: (data: Partial<QuizData>) => void
  quizData?: QuizData
}

export function QuizStep10({ onNext, quizData }: Step10Props) {
  const { language } = useLanguage()
  const [speed, setSpeed] = useState(1.0)

  const speedOptions = [
    { value: 0.3, label: "Lento", icon: Snail, labelEn: "Slow", labelEs: "Lento" },
    { value: 1.0, label: "Recomendado", icon: Rabbit, labelEn: "Recommended", labelEs: "Recomendado" },
    { value: 2.0, label: "Rápido", icon: Zap, labelEn: "Fast", labelEs: "Rápido" },
  ]

  const getPaceMessage = () => {
    const messages = {
      "pt-BR": {
        slow: "Ritmo lento",
        recommended: "Ritmo recomendado",
        fast: "Ritmo rápido",
      },
      en: {
        slow: "Slow pace",
        recommended: "Recommended pace",
        fast: "Fast pace",
      },
      es: {
        slow: "Ritmo lento",
        recommended: "Ritmo recomendado",
        fast: "Ritmo rápido",
      },
    }

    if (speed < 0.7) {
      return messages[language].slow
    } else if (speed <= 1.3) {
      return messages[language].recommended
    } else {
      return messages[language].fast
    }
  }

  const getSubtitle = () => {
    const goal = quizData?.goal

    const subtitles = {
      "pt-BR": {
        lose: "Velocidade de perda de peso por semana",
        gain: "Velocidade de ganho de peso por semana",
        maintain: "Velocidade de ajuste de peso por semana",
      },
      en: {
        lose: "Weight loss speed per week",
        gain: "Weight gain speed per week",
        maintain: "Weight adjustment speed per week",
      },
      es: {
        lose: "Velocidad de pérdida de peso por semana",
        gain: "Velocidad de ganancia de peso por semana",
        maintain: "Velocidad de ajuste de peso por semana",
      },
    }

    if (goal === "maintain") {
      return subtitles[language].maintain
    } else if (goal === "lose") {
      return subtitles[language].lose
    } else {
      return subtitles[language].gain
    }
  }

  const content = {
    "pt-BR": {
      title: "Qual a velocidade que você quer atingir seu objetivo?",
    },
    en: {
      title: "What speed do you want to reach your goal?",
    },
    es: {
      title: "¿A qué velocidad quieres alcanzar tu objetivo?",
    },
  }

  const { title } = content[language]
  const subtitle = getSubtitle()

  return (
    <div className="h-full flex flex-col justify-center px-4 py-4">
      <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="space-y-1.5 text-center">
          <h2 className="text-lg font-bold text-balance">{title}</h2>
          <p className="text-muted-foreground text-xs">{subtitle}</p>
        </div>

        <div className="text-center">
          <div className="text-2xl font-bold">{speed.toFixed(1)} kg por semana</div>
        </div>

        <div className="flex justify-around items-center gap-4">
          {speedOptions.map((option) => {
            const Icon = option.icon
            const isActive = Math.abs(speed - option.value) < 0.1
            return (
              <div
                key={option.value}
                className={`flex flex-col items-center gap-2 transition-all ${isActive ? "opacity-100" : "opacity-50"}`}
              >
                <Icon size={20} className={isActive ? "text-orange-500" : "text-gray-400"} />
              </div>
            )
          })}
        </div>

        <div>
          <input
            type="range"
            min="0.3"
            max="2.0"
            step="0.1"
            value={speed}
            onChange={(e) => setSpeed(Number.parseFloat(e.target.value))}
            className="w-full h-2 bg-muted rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-foreground"
          />
        </div>

        <div className="text-center">
          <p className="text-muted-foreground text-xs bg-muted py-2 rounded-lg transition-all">{getPaceMessage()}</p>
        </div>

        <Button onClick={() => onNext({ weightLossSpeed: speed })} size="lg" className="w-full rounded-xl py-4">
          {language === "pt-BR" ? "Continuar" : language === "en" ? "Continue" : "Continuar"}
        </Button>
      </div>
    </div>
  )
}
