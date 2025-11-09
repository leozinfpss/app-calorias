"use client"

import type { QuizData } from "@/app/quiz/page"
import { useLanguage } from "@/lib/language-context"

type Step20aProps = {
  onNext: (data: Partial<QuizData>) => void
  quizData: QuizData
}

export function QuizStep20a({ onNext, quizData }: Step20aProps) {
  const { language } = useLanguage()

  const getContent = () => {
    const goal = quizData.goal

    if (goal === "maintain") {
      return {
        "pt-BR": {
          title: "Ótimo, você já tem uma base!",
          subtitle: "Vamos te ajudar a usar esse conhecimento ao seu favor.",
          description: "O CalorIA agora vai te ajudar exatamente a alcançar seu objetivo de manter seu peso",
          button: "Continuar",
        },
        en: {
          title: "Great, you already have a foundation!",
          subtitle: "We'll help you use that knowledge to your advantage.",
          description: "CalorIA will now help you achieve your goal of maintaining your weight",
          button: "Continue",
        },
        es: {
          title: "¡Genial, ya tienes una base!",
          subtitle: "Te ayudaremos a usar ese conocimiento a tu favor.",
          description: "CalorIA ahora te ayudará a alcanzar tu objetivo de mantener tu peso",
          button: "Continuar",
        },
      }
    }

    if (goal === "lose") {
      return {
        "pt-BR": {
          title: "Ótimo, você já tem uma base!",
          subtitle: "Vamos te ajudar a usar esse conhecimento ao seu favor.",
          description: "O CalorIA agora vai te ajudar exatamente a alcançar seu objetivo de perder peso",
          button: "Continuar",
        },
        en: {
          title: "Great, you already have a foundation!",
          subtitle: "We'll help you use that knowledge to your advantage.",
          description: "CalorIA will now help you achieve your goal of losing weight",
          button: "Continue",
        },
        es: {
          title: "¡Genial, ya tienes una base!",
          subtitle: "Te ayudaremos a usar ese conocimiento a tu favor.",
          description: "CalorIA ahora te ayudará a alcanzar tu objetivo de perder peso",
          button: "Continuar",
        },
      }
    }

    // Default para "gain"
    return {
      "pt-BR": {
        title: "Ótimo, você já tem uma base!",
        subtitle: "Vamos te ajudar a usar esse conhecimento ao seu favor.",
        description: "O CalorIA agora vai te ajudar exatamente a alcançar seu objetivo de ganhar peso",
        button: "Continuar",
      },
      en: {
        title: "Great, you already have a foundation!",
        subtitle: "We'll help you use that knowledge to your advantage.",
        description: "CalorIA will now help you achieve your goal of gaining weight",
        button: "Continue",
      },
      es: {
        title: "¡Genial, ya tienes una base!",
        subtitle: "Te ayudaremos a usar ese conocimiento a tu favor.",
        description: "CalorIA ahora te ayudará a alcanzar tu objetivo de ganar peso",
        button: "Continuar",
      },
    }
  }

  const content = getContent()
  const { title, subtitle, description, button } = content[language]

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 py-12">
      <div className="space-y-4 text-center px-4">
        <h2 className="text-3xl font-bold text-balance">{title}</h2>
        <p className="text-lg text-muted-foreground">{subtitle}</p>
      </div>

      <div className="py-12">
        <p className="text-center text-base text-muted-foreground leading-relaxed px-6">{description}</p>
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
