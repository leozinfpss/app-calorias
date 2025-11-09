"use client"

import type { QuizData } from "@/app/quiz/page"
import { useLanguage } from "@/lib/language-context"
import { TypingText } from "@/components/typing-text"
import { useState } from "react"

type Step20cProps = {
  onNext: (data: Partial<QuizData>) => void
  quizData: QuizData
}

export function QuizStep20c({ onNext, quizData }: Step20cProps) {
  const { language } = useLanguage()
  const [showExample, setShowExample] = useState(false)
  const [showConclusion, setShowConclusion] = useState(false)

  const getContent = () => {
    const goal = quizData.goal

    if (goal === "maintain") {
      return {
        "pt-BR": {
          title: "Como isso te ajuda a manter o peso?",
          description:
            "Para manter seu peso, você precisa consumir a mesma quantidade de calorias que seu corpo gasta diariamente.",
          example: "Se você gasta 2000 calorias por dia, deve consumir em torno de 2000 calorias para manter seu peso.",
          conclusion: "Com o CalorIA, você vai conseguir implementar isso de forma simples e segura!",
          button: "Continuar",
        },
        en: {
          title: "How does this help you maintain weight?",
          description:
            "To maintain your weight, you need to consume the same amount of calories that your body burns daily.",
          example:
            "If you burn 2000 calories per day, you should consume around 2000 calories to maintain your weight.",
          conclusion: "With CalorIA, you'll be able to implement this in a simple and safe way!",
          button: "Continue",
        },
        es: {
          title: "¿Cómo te ayuda esto a mantener el peso?",
          description:
            "Para mantener tu peso, necesitas consumir la misma cantidad de calorías que tu cuerpo gasta diariamente.",
          example: "Si gastas 2000 calorías por día, debes consumir alrededor de 2000 calorías para mantener tu peso.",
          conclusion: "¡Con CalorIA, podrás implementar esto de forma simple y segura!",
          button: "Continuar",
        },
      }
    }

    if (goal === "lose") {
      return {
        "pt-BR": {
          title: "Como isso te ajuda a perder peso?",
          description:
            "Para emagrecer, você precisa estar em déficit calórico, que é consumir menos calorias do que seu corpo gasta.",
          example:
            "Se você gasta 2000 calorias por dia, precisa comer cerca de 1500-1700 para emagrecer de forma saudável.",
          conclusion: "Com o CalorIA, você vai conseguir implementar isso de forma simples e segura!",
          button: "Continuar",
        },
        en: {
          title: "How does this help you lose weight?",
          description:
            "To lose weight, you need to be in a caloric deficit, which means consuming fewer calories than your body burns.",
          example:
            "If you burn 2000 calories per day, you need to eat around 1500-1700 to lose weight in a healthy way.",
          conclusion: "With CalorIA, you'll be able to implement this in a simple and safe way!",
          button: "Continue",
        },
        es: {
          title: "¿Cómo te ayuda esto a perder peso?",
          description:
            "Para adelgazar, necesitas estar en déficit calórico, que es consumir menos calorías de las que tu cuerpo gasta.",
          example:
            "Si gastas 2000 calorías por día, necesitas comer alrededor de 1500-1700 calorías por día para adelgazar de forma saludable.",
          conclusion: "¡Con CalorIA, podrás implementar esto de forma simple y segura!",
          button: "Continuar",
        },
      }
    }

    // Default para "gain"
    return {
      "pt-BR": {
        title: "Como isso te ajuda a ganhar peso?",
        description:
          "Para ganhar massa muscular, você precisa estar em superávit calórico, que é consumir mais calorias do que seu corpo gasta.",
        example:
          "Se você gasta 2000 calorias por dia, precisa comer cerca de 2300-2500 calorias por dia para ganhar peso.",
        conclusion: "Com o CalorIA, você vai conseguir implementar isso de forma simples e segura!",
        button: "Continuar",
      },
      en: {
        title: "How does this help you gain weight?",
        description:
          "To gain muscle mass, you need to be in a caloric surplus, which means consuming more calories than your body burns.",
        example: "If you burn 2000 calories per day, you need to eat around 2300-2500 calories per day to gain weight.",
        conclusion: "With CalorIA, you'll be able to implement this in a simple and safe way!",
        button: "Continue",
      },
      es: {
        title: "¿Cómo te ayuda esto a ganar peso?",
        description:
          "Para ganar masa muscular, necesitas estar en superávit calórico, que es consumir más calorías de las que tu cuerpo gasta.",
        example:
          "Si gastas 2000 calorías por día, necesitas comer alrededor de 2300-2500 calorías por día para ganar peso.",
        conclusion: "¡Con CalorIA, podrás implementar esto de forma simple y segura!",
        button: "Continuar",
      },
    }
  }

  const content = getContent()
  const { title, description, example, conclusion, button } = content[language]

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 py-6">
      <h2 className="text-3xl font-bold text-center text-balance px-4">{title}</h2>

      <div className="space-y-6 px-6">
        <p className="text-center text-muted-foreground text-base leading-relaxed">
          <TypingText text={description} speed={30} onComplete={() => setShowExample(true)} />
        </p>

        {showExample && (
          <div className="bg-gray-50 rounded-2xl p-6">
            <p className="text-center text-gray-900 text-base leading-relaxed">
              <TypingText text={example} speed={30} onComplete={() => setShowConclusion(true)} />
            </p>
          </div>
        )}

        {showConclusion && (
          <p className="text-center text-muted-foreground text-base leading-relaxed pt-4">
            <TypingText text={conclusion} speed={30} />
          </p>
        )}
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
