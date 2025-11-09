"use client"

import { useState } from "react"
import type { QuizData } from "@/app/quiz/page"
import { useLanguage } from "@/lib/language-context"

type Step20Props = {
  onNext: (data: Partial<QuizData> & { knowsCalories?: boolean }) => void
  quizData: QuizData
}

export function QuizStep20({ onNext, quizData }: Step20Props) {
  const { language } = useLanguage()
  const [selectedAnswer, setSelectedAnswer] = useState<boolean | null>(null)

  const getContent = () => {
    const goal = quizData.goal

    if (goal === "maintain") {
      return {
        "pt-BR": {
          question: "Você sabe o que são calorias e sua importância para manter o peso?",
          yes: "Sim",
          no: "Não",
          continue: "Continuar",
        },
        en: {
          question: "Do you know what calories are and their importance for maintaining weight?",
          yes: "Yes",
          no: "No",
          continue: "Continue",
        },
        es: {
          question: "¿Sabes qué son las calorías y su importancia para mantener el peso?",
          yes: "Sí",
          no: "No",
          continue: "Continuar",
        },
      }
    }

    if (goal === "lose") {
      return {
        "pt-BR": {
          question: "Você sabe o que são calorias e sua importância para perder peso?",
          yes: "Sim",
          no: "Não",
          continue: "Continuar",
        },
        en: {
          question: "Do you know what calories are and their importance for losing weight?",
          yes: "Yes",
          no: "No",
          continue: "Continue",
        },
        es: {
          question: "¿Sabes qué son las calorías y su importancia para perder peso?",
          yes: "Sí",
          no: "No",
          continue: "Continuar",
        },
      }
    }

    // Default para "gain"
    return {
      "pt-BR": {
        question: "Você sabe o que são calorias e sua importância para ganhar peso?",
        yes: "Sim",
        no: "Não",
        continue: "Continuar",
      },
      en: {
        question: "Do you know what calories are and their importance for gaining weight?",
        yes: "Yes",
        no: "No",
        continue: "Continue",
      },
      es: {
        question: "¿Sabes qué son las calorías y su importancia para ganar peso?",
        yes: "Sí",
        no: "No",
        continue: "Continuar",
      },
    }
  }

  const content = getContent()
  const { question, yes, no, continue: continueText } = content[language]

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 flex flex-col justify-center space-y-4">
        <h2 className="text-lg font-bold text-center text-balance leading-tight px-2">{question}</h2>

        <div className="space-y-2">
          <button
            onClick={() => setSelectedAnswer(true)}
            className={`w-full py-4 px-4 text-sm font-medium rounded-xl transition-colors ${
              selectedAnswer === true ? "bg-black text-white" : "bg-gray-100 hover:bg-gray-200 text-gray-900"
            }`}
          >
            {yes}
          </button>

          <button
            onClick={() => setSelectedAnswer(false)}
            className={`w-full py-4 px-4 text-sm font-medium rounded-xl transition-colors ${
              selectedAnswer === false ? "bg-black text-white" : "bg-gray-100 hover:bg-gray-200 text-gray-900"
            }`}
          >
            {no}
          </button>
        </div>
      </div>

      <button
        onClick={() => selectedAnswer !== null && onNext({ knowsCalories: selectedAnswer })}
        disabled={selectedAnswer === null}
        className={`w-full py-4 text-sm font-semibold rounded-full transition-colors mt-4 flex-shrink-0 ${
          selectedAnswer !== null
            ? "bg-black hover:bg-gray-900 text-white cursor-pointer"
            : "bg-gray-400 text-gray-600 cursor-not-allowed"
        }`}
      >
        {continueText}
      </button>
    </div>
  )
}
