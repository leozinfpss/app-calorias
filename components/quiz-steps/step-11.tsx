"use client"

import type { QuizData } from "@/app/quiz/page"
import { useState } from "react"
import { Button } from "@/components/ui/button"

type Step11Props = {
  onNext: (data: Partial<QuizData>) => void
  quizData: QuizData
}

export function QuizStep11({ onNext, quizData }: Step11Props) {
  const [selected, setSelected] = useState<string | null>(null)

  const options = [
    { id: "frustrated", label: "Frustrado e arrependido de não ter agido antes" },
    { id: "hiding", label: "Evitando situações e se escondendo de novo" },
    { id: "conformed", label: "Conformado, já acostumei com isso" },
    { id: "determined", label: "Determinado a mudar ainda este ano" },
  ]

  const handleSelect = (optionId: string) => {
    setSelected(optionId)
  }

  const getQuestionText = () => {
    const goal = quizData.goal || "gain"

    if (goal === "maintain") {
      return "Imagina chegar no PICO do verão sem ter mantido o peso que você quer... Como você vai se sentir?"
    } else if (goal === "lose") {
      return "Imagina chegar no PICO do verão sem ter perdido o peso que você quer... Como você vai se sentir?"
    }
    return "Imagina chegar no PICO do verão sem ter ganhado o peso que você quer... Como você vai se sentir?"
  }

  return (
    <div className="flex flex-col h-full max-h-[calc(100vh-200px)] animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="space-y-1.5 text-center mb-4">
        <h2 className="text-lg font-bold text-balance px-2">{getQuestionText()}</h2>
      </div>

      <div className="flex-1 overflow-y-auto space-y-2 mb-4 pr-1">
        {options.map((option, index) => (
          <button
            key={option.id}
            onClick={() => handleSelect(option.id)}
            style={{ animationDelay: `${index * 50}ms` }}
            className={`w-full text-center p-3 rounded-xl transition-all duration-300 animate-slide-up ${
              selected === option.id ? "bg-foreground text-background scale-[1.02]" : "bg-muted hover:bg-muted/80"
            }`}
          >
            <span className={`text-sm ${selected === option.id ? "text-background" : "text-foreground"}`}>
              {option.label}
            </span>
          </button>
        ))}
      </div>

      <Button
        onClick={() => onNext({ summerFeeling: selected! })}
        disabled={!selected}
        size="lg"
        className="w-full rounded-xl py-4"
      >
        Continuar
      </Button>
    </div>
  )
}
