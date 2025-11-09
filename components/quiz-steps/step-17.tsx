"use client"

import { useState } from "react"
import type { QuizData } from "@/app/quiz/page"
import { useLanguage } from "@/lib/language-context"
import { Button } from "@/components/ui/button"
import { Activity, Utensils, Users, Calendar } from "lucide-react"

type Step17Props = {
  onNext: (data: Partial<QuizData>) => void
  quizData: QuizData
}

export function QuizStep17({ onNext }: Step17Props) {
  const { language } = useLanguage()
  const [selected, setSelected] = useState<string | null>(null)

  const content = {
    "pt-BR": {
      title: "O que está te impedindo de atingir seus objetivos?",
      subtitle: "Selecione todas as opções que se aplicam",
      options: [
        { icon: Activity, text: "Falta de consistência" },
        { icon: Utensils, text: "Hábitos alimentares não saudáveis" },
        { icon: Users, text: "Falta de suporte" },
        { icon: Calendar, text: "Agenda ocupada" },
      ],
      button: "Continuar",
    },
    en: {
      title: "What's preventing you from achieving your goals?",
      subtitle: "Select all that apply",
      options: [
        { icon: Activity, text: "Lack of consistency" },
        { icon: Utensils, text: "Unhealthy eating habits" },
        { icon: Users, text: "Lack of support" },
        { icon: Calendar, text: "Busy schedule" },
      ],
      button: "Continue",
    },
    es: {
      title: "¿Qué te impide alcanzar tus objetivos?",
      subtitle: "Selecciona todas las opciones que se apliquen",
      options: [
        { icon: Activity, text: "Falta de consistencia" },
        { icon: Utensils, text: "Hábitos alimentarios no saludables" },
        { icon: Users, text: "Falta de apoyo" },
        { icon: Calendar, text: "Agenda ocupada" },
      ],
      button: "Continuar",
    },
  }

  const { title, subtitle, options, button } = content[language]

  return (
    <div className="flex flex-col h-full justify-center px-4 py-6 space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-balance leading-tight">{title}</h2>
        <p className="text-muted-foreground text-sm">{subtitle}</p>
      </div>

      <div className="space-y-3 max-h-[50vh] overflow-y-auto">
        {options.map((option, index) => {
          const Icon = option.icon
          return (
            <button
              key={index}
              onClick={() => setSelected(option.text)}
              className={`w-full p-4 text-left rounded-lg transition-colors flex items-center gap-3 ${
                selected === option.text ? "bg-foreground text-background" : "bg-muted hover:bg-muted/80"
              }`}
            >
              <Icon
                className={`w-5 h-5 flex-shrink-0 ${selected === option.text ? "text-background" : "text-muted-foreground"}`}
              />
              <span className="text-base font-medium">{option.text}</span>
            </button>
          )
        })}
      </div>

      <Button
        onClick={() => selected && onNext({ obstacles: selected })}
        disabled={!selected}
        className="w-full bg-foreground hover:bg-foreground/90 text-background py-5 text-base font-semibold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {button}
      </Button>
    </div>
  )
}
