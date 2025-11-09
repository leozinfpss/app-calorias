"use client"

import type { QuizData } from "@/app/quiz/page"
import { useLanguage } from "@/lib/language-context"
import { TypingText } from "@/components/typing-text"
import { useState } from "react"

type Step20bProps = {
  onNext: (data: Partial<QuizData>) => void
  quizData: QuizData
}

export function QuizStep20b({ onNext }: Step20bProps) {
  const { language } = useLanguage()
  const [showSubtitle, setShowSubtitle] = useState(false)
  const [showExample1, setShowExample1] = useState(false)
  const [showExample2, setShowExample2] = useState(false)
  const [showExample3, setShowExample3] = useState(false)

  const content = {
    "pt-BR": {
      title: "Vamos te explicar!",
      description: "Calorias são a energia que os alimentos fornecem ao seu corpo.",
      subtitle: "Cada comida tem uma quantidade diferente:",
      examples: ["1 banana = ~90 calorias", "1 fatia de pão = ~80 calorias", "1 colher de arroz = ~40 calorias"],
      button: "Continuar",
    },
    en: {
      title: "Let's explain!",
      description: "Calories are the energy that food provides to your body.",
      subtitle: "Each food has a different amount:",
      examples: ["1 banana = ~90 calories", "1 slice of bread = ~80 calories", "1 spoon of rice = ~40 calories"],
      button: "Continue",
    },
    es: {
      title: "¡Vamos a explicar!",
      description: "Las calorías son la energía que los alimentos proporcionan a tu cuerpo.",
      subtitle: "Cada comida tiene una cantidad diferente:",
      examples: ["1 plátano = ~90 calorías", "1 rebanada de pan = ~80 calorías", "1 cucharada de arroz = ~40 calorías"],
      button: "Continuar",
    },
  }

  const { title, description, subtitle, examples, button } = content[language]

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 py-8">
      <h2 className="text-3xl font-bold text-center text-balance px-4">{title}</h2>

      <div className="space-y-6 px-4">
        <p className="text-center text-muted-foreground text-base leading-relaxed">
          <TypingText text={description} speed={30} onComplete={() => setShowSubtitle(true)} />
        </p>

        <div className="space-y-4 py-6">
          {showSubtitle && (
            <p className="text-center text-muted-foreground font-medium">
              <TypingText text={subtitle} speed={30} onComplete={() => setShowExample1(true)} />
            </p>
          )}
          <div className="space-y-2">
            {showExample1 && (
              <p className="text-center text-gray-900 text-base">
                <TypingText text={examples[0]} speed={25} onComplete={() => setShowExample2(true)} />
              </p>
            )}
            {showExample2 && (
              <p className="text-center text-gray-900 text-base">
                <TypingText text={examples[1]} speed={25} onComplete={() => setShowExample3(true)} />
              </p>
            )}
            {showExample3 && (
              <p className="text-center text-gray-900 text-base">
                <TypingText text={examples[2]} speed={25} />
              </p>
            )}
          </div>
        </div>
      </div>

      <button
        onClick={() => onNext({})}
        className="w-full bg-black hover:bg-gray-900 text-white py-8 text-lg font-semibold rounded-full transition-colors"
      >
        {button}
      </button>
    </div>
  )
}
