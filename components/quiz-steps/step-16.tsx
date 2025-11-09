"use client"

import type { QuizData } from "@/app/quiz/page"
import { useLanguage } from "@/lib/language-context"
import { Button } from "@/components/ui/button"

type Step16Props = {
  onNext: (data: Partial<QuizData>) => void
  quizData: QuizData
}

export function QuizStep16({ onNext, quizData }: Step16Props) {
  const { language } = useLanguage()

  const getTitles = () => {
    const goal = quizData.goal

    if (goal === "maintain") {
      return {
        "pt-BR": {
          title: "Mantenha seu peso melhor com o CalorIA",
          subtitle: "Estudos científicos mostram que usar o CalorIA aumenta sua taxa de sucesso",
        },
        en: {
          title: "Maintain your weight better with CalorIA",
          subtitle: "Scientific studies show that using CalorIA increases your success rate",
        },
        es: {
          title: "Mantén tu peso mejor con CalorIA",
          subtitle: "Los estudios científicos muestran que usar CalorIA aumenta tu tasa de éxito",
        },
      }
    }

    if (goal === "lose") {
      return {
        "pt-BR": {
          title: "Perca duas vezes mais peso com o CalorIA",
          subtitle: "Estudos científicos mostram que usar o CalorIA aumenta sua taxa de sucesso",
        },
        en: {
          title: "Lose twice as much weight with CalorIA",
          subtitle: "Scientific studies show that using CalorIA increases your success rate",
        },
        es: {
          title: "Pierde el doble de peso con CalorIA",
          subtitle: "Los estudios científicos muestran que usar CalorIA aumenta tu tasa de éxito",
        },
      }
    }

    return {
      "pt-BR": {
        title: "Ganhe duas vezes mais músculo com o CalorIA",
        subtitle: "Estudos científicos mostram que usar o CalorIA aumenta sua taxa de sucesso",
      },
      en: {
        title: "Gain twice as much muscle with CalorIA",
        subtitle: "Scientific studies show that using CalorIA increases your success rate",
      },
      es: {
        title: "Gana el doble de músculo con CalorIA",
        subtitle: "Los estudios científicos muestran que usar CalorIA aumenta tu tasa de éxito",
      },
    }
  }

  const titles = getTitles()

  const content = {
    "pt-BR": {
      ...titles["pt-BR"],
      standard: "Abordagem padrão",
      withSupport: "Com suporte CalorIA",
      footer: "O CalorIA facilita e te mantém comprometido",
      button: "Continuar",
    },
    en: {
      ...titles.en,
      standard: "Standard approach",
      withSupport: "With CalorIA support",
      footer: "CalorIA makes it easy and keeps you committed",
      button: "Continue",
    },
    es: {
      ...titles.es,
      standard: "Enfoque estándar",
      withSupport: "Con soporte CalorIA",
      footer: "CalorIA facilita y te mantiene comprometido",
      button: "Continuar",
    },
  }

  const { title, subtitle, standard, withSupport, footer, button } = content[language]

  return (
    <div className="h-full flex flex-col justify-center px-4 py-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="space-y-4">
        <div className="space-y-1.5 text-center">
          <h2 className="text-lg font-bold text-balance">{title}</h2>
          <p className="text-xs text-muted-foreground text-balance">{subtitle}</p>
        </div>

        <div className="bg-gray-100 rounded-2xl p-4">
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="flex flex-col items-center gap-2">
              <span className="text-xs font-medium text-gray-600 text-center">{standard}</span>
              <div className="relative w-full h-32 flex items-end justify-center">
                <div
                  className="bg-gray-300 rounded-2xl w-full transition-all duration-1000 ease-out animate-in slide-in-from-bottom-8 flex items-center justify-center"
                  style={{
                    height: "40%",
                    animationDelay: "200ms",
                    animationFillMode: "backwards",
                  }}
                >
                  <span className="text-2xl font-bold text-gray-700">20%</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-center gap-2">
              <span className="text-xs font-medium text-gray-600 text-center">{withSupport}</span>
              <div className="relative w-full h-32 flex items-end justify-center">
                <div
                  className="bg-black rounded-2xl w-full transition-all duration-1000 ease-out animate-in slide-in-from-bottom-8 flex items-center justify-center"
                  style={{
                    height: "100%",
                    animationDelay: "400ms",
                    animationFillMode: "backwards",
                  }}
                >
                  <span className="text-3xl font-bold text-white">2X</span>
                </div>
              </div>
            </div>
          </div>

          <p className="text-center text-gray-600 text-xs">{footer}</p>
        </div>

        <Button onClick={() => onNext({})} size="lg" className="w-full rounded-xl py-4">
          {button}
        </Button>
      </div>
    </div>
  )
}
