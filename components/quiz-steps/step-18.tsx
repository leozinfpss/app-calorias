"use client"

import { useState } from "react"
import type { QuizData } from "@/app/quiz/page"
import { useLanguage } from "@/lib/language-context"
import { Button } from "@/components/ui/button"
import { Apple, Sun, Dumbbell, Smile } from "lucide-react"

type Step18Props = {
  onNext: (data: Partial<QuizData>) => void
  quizData: QuizData
}

export function QuizStep18({ onNext }: Step18Props) {
  const { language } = useLanguage()
  const [selected, setSelected] = useState<string | null>(null)

  const content = {
    "pt-BR": {
      title: "O que você gostaria de conquistar?",
      options: [
        { icon: Apple, text: "Comer e viver de forma mais saudável" },
        { icon: Sun, text: "Aumentar minha energia e humor" },
        { icon: Dumbbell, text: "Manter-me motivado e consistente" },
        { icon: Smile, text: "Sentir-me melhor com meu corpo" },
      ],
      button: "Continuar",
    },
    en: {
      title: "What would you like to achieve?",
      options: [
        { icon: Apple, text: "Eat and live healthier" },
        { icon: Sun, text: "Increase my energy and mood" },
        { icon: Dumbbell, text: "Stay motivated and consistent" },
        { icon: Smile, text: "Feel better about my body" },
      ],
      button: "Continue",
    },
    es: {
      title: "¿Qué te gustaría lograr?",
      options: [
        { icon: Apple, text: "Comer y vivir de forma más saludable" },
        { icon: Sun, text: "Aumentar mi energía y humor" },
        { icon: Dumbbell, text: "Mantenerme motivado y consistente" },
        { icon: Smile, text: "Sentirme mejor con mi cuerpo" },
      ],
      button: "Continuar",
    },
  }

  const { title, options, button } = content[language]

  return (
    <div className="flex flex-col h-full">
      <h2 className="text-lg font-bold text-center text-balance leading-tight pb-3 flex-shrink-0">{title}</h2>

      <div className="flex-1 overflow-y-auto space-y-2 min-h-0">
        {options.map((option, index) => {
          const Icon = option.icon
          return (
            <button
              key={index}
              onClick={() => setSelected(option.text)}
              className={`w-full p-3 text-left rounded-xl transition-colors flex items-center gap-3 ${
                selected === option.text ? "bg-black text-white" : "bg-muted hover:bg-muted/80"
              }`}
            >
              <Icon
                className={`w-5 h-5 flex-shrink-0 ${selected === option.text ? "text-white" : "text-muted-foreground"}`}
              />
              <span className="text-sm">{option.text}</span>
            </button>
          )
        })}
      </div>

      <Button
        onClick={() => selected && onNext({ goals: selected })}
        disabled={!selected}
        className="w-full bg-black hover:bg-gray-900 text-white py-4 text-sm font-semibold rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-3 flex-shrink-0"
      >
        {button}
      </Button>
    </div>
  )
}
