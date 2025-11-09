"use client"

import { useState } from "react"
import type { QuizData } from "@/app/quiz/page"
import { useLanguage } from "@/lib/language-context"
import { Button } from "@/components/ui/button"

type Step15Props = {
  onNext: (data: Partial<QuizData>) => void
  quizData: QuizData
}

export function QuizStep15({ onNext, quizData }: Step15Props) {
  const { language } = useLanguage()
  const [selected, setSelected] = useState<string | null>(null)
  const weightDifference = Math.abs((quizData.targetWeight || 0) - (quizData.weight || 0)).toFixed(1)

  const getTitle = () => {
    if (quizData.goal === "maintain") {
      return {
        "pt-BR": `Como você se sentiria se chegasse no final do ano com sua meta de manter seu peso?`,
        en: `How would you feel if you reached the end of the year with your goal of maintaining your weight?`,
        es: `¿Cómo te sentirías si llegaras al final del año con tu meta de mantener tu peso?`,
      }
    } else if (quizData.goal === "lose") {
      return {
        "pt-BR": `Como você se sentiria se chegasse no final do ano com sua meta de perder ${weightDifference}kg?`,
        en: `How would you feel if you reached the end of the year with your goal of losing ${weightDifference}kg?`,
        es: `¿Cómo te sentirías si llegaras al final del año con tu meta de perder ${weightDifference}kg?`,
      }
    } else {
      return {
        "pt-BR": `Como você se sentiria se chegasse no final do ano com sua meta de ganhar ${weightDifference}kg?`,
        en: `How would you feel if you reached the end of the year with your goal of gaining ${weightDifference}kg?`,
        es: `¿Cómo te sentirías si llegaras al final del año con tu meta de ganhar ${weightDifference}kg?`,
      }
    }
  }

  const titles = getTitle()

  const content = {
    "pt-BR": {
      title: titles["pt-BR"],
      options: ["Não ia mudar nada", "Iria ficar muito feliz", "Não teria mais inseguranças", "Iria ficar realizado"],
      button: "Continuar",
    },
    en: {
      title: titles.en,
      options: [
        "Nothing would change",
        "I would be very happy",
        "I would have no more insecurities",
        "I would feel fulfilled",
      ],
      button: "Continue",
    },
    es: {
      title: titles.es,
      options: ["No cambiaría nada", "Estaría muy feliz", "No tendría más inseguridades", "Me sentiría realizado"],
      button: "Continuar",
    },
  }

  const { title, options, button } = content[language]

  return (
    <div className="h-full flex flex-col justify-center px-4 py-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-center text-balance">{title}</h2>

        <div className="space-y-2">
          {options.map((option, index) => (
            <button
              key={index}
              onClick={() => setSelected(option)}
              className={`w-full p-3 text-center rounded-xl transition-colors text-sm ${
                selected === option ? "bg-black text-white" : "bg-muted hover:bg-muted/80"
              }`}
            >
              {option}
            </button>
          ))}
        </div>

        <Button
          onClick={() => selected && onNext({ endOfYearFeeling: selected })}
          disabled={!selected}
          size="lg"
          className="w-full rounded-xl py-4"
        >
          {button}
        </Button>
      </div>
    </div>
  )
}
