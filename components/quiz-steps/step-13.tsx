"use client"

import { useState } from "react"
import type { QuizData } from "@/app/quiz/page"
import { useLanguage } from "@/lib/language-context"
import { Button } from "@/components/ui/button"

type Step13Props = {
  onNext: (data: Partial<QuizData>) => void
  quizData: QuizData
}

export function QuizStep13({ onNext, quizData }: Step13Props) {
  const { language } = useLanguage()
  const [selected, setSelected] = useState<string | null>(null)

  const getTitleByGoal = () => {
    const goal = quizData.goal

    if (language === "pt-BR") {
      if (goal === "maintain") {
        return "Há quanto tempo você passa os verões sem controle sobre seu peso?"
      } else if (goal === "lose") {
        return "Há quanto tempo você passa os verões querendo perder peso?"
      }
      return "Há quanto tempo você passa os verões querendo ganhar peso?"
    } else if (language === "en") {
      if (goal === "maintain") {
        return "How many summers have you spent without control over your weight?"
      } else if (goal === "lose") {
        return "How many summers have you spent wanting to lose weight?"
      }
      return "How many summers have you spent wanting to gain weight?"
    } else {
      if (goal === "maintain") {
        return "¿Cuánto tiempo pasas los veranos sin control sobre tu peso?"
      } else if (goal === "lose") {
        return "¿Cuánto tiempo pasas los veranos queriendo perder peso?"
      }
      return "¿Cuánto tiempo pasas los veranos queriendo ganar peso?"
    }
  }

  const content = {
    "pt-BR": {
      options: [
        "Este seria o primeiro",
        "2-3 verões perdidos",
        "4-5 verões... já perdi a conta",
        "Prefiro não pensar nisso",
      ],
    },
    en: {
      options: [
        "This would be the first",
        "2-3 lost summers",
        "4-5 summers... I've already lost count",
        "I prefer not to think about it",
      ],
    },
    es: {
      options: [
        "Este sería el primero",
        "2-3 veranos perdidos",
        "4-5 veranos... ya perdí la cuenta",
        "Prefiero no pensar en eso",
      ],
    },
  }

  const { options } = content[language]

  return (
    <div className="flex flex-col h-full max-h-[calc(100vh-200px)] animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="space-y-1.5 text-center mb-4">
        <h2 className="text-lg font-bold text-balance px-2">{getTitleByGoal()}</h2>
      </div>

      <div className="flex-1 overflow-y-auto space-y-2 mb-4 pr-1">
        {options.map((option, index) => (
          <button
            key={index}
            onClick={() => setSelected(option)}
            style={{ animationDelay: `${index * 50}ms` }}
            className={`w-full p-3 text-center rounded-xl transition-all duration-300 animate-slide-up text-sm ${
              selected === option ? "bg-foreground text-background scale-[1.02]" : "bg-muted hover:bg-muted/80"
            }`}
          >
            {option}
          </button>
        ))}
      </div>

      <Button
        onClick={() => selected && onNext({ summerAttempts: selected })}
        disabled={!selected}
        size="lg"
        className="w-full rounded-xl py-4"
      >
        Continuar
      </Button>
    </div>
  )
}
