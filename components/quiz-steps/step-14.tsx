"use client"

import type { QuizData } from "@/app/quiz/page"
import { useLanguage } from "@/lib/language-context"
import { Button } from "@/components/ui/button"

type Step14Props = {
  onNext: (data: Partial<QuizData>) => void
  quizData: QuizData
}

export function QuizStep14({ onNext, quizData }: Step14Props) {
  const { language } = useLanguage()

  const getGoalText = () => {
    if (quizData.goal === "lose") {
      return {
        "pt-BR": "perdendo peso",
        en: "losing weight",
        es: "perdiendo peso",
      }
    } else if (quizData.goal === "maintain") {
      return {
        "pt-BR": "mantendo seu peso",
        en: "maintaining their weight",
        es: "manteniendo su peso",
      }
    } else {
      return {
        "pt-BR": "ganhando peso",
        en: "gaining weight",
        es: "ganando peso",
      }
    }
  }

  const goalText = getGoalText()

  const content = {
    "pt-BR": {
      title: "Cada verão que passa é uma oportunidade perdida.",
      description1: `Enquanto você adia, outras pessoas estão ${goalText["pt-BR"]} saudavelmente e conquistando seus objetivos. Indo à praia com confiança. Usando aquela roupa que sempre quiseram.`,
      description2:
        "Esse próximo verão pode ser o que você vai mais uma vez se arrepender de não ter começado... ou finalmente vai ser o melhor verão da sua vida!",
      button: "Continuar",
    },
    en: {
      title: "Every summer that passes is a lost opportunity.",
      description1: `While you delay, other people are ${goalText.en} healthily and achieving their goals. Going to the beach with confidence. Wearing the clothes they always wanted.`,
      description2:
        "This next summer can be the one you'll regret not starting again... or it can finally be the best summer of your life!",
      button: "Continue",
    },
    es: {
      title: "Cada verano que pasa es una oportunidad perdida.",
      description1: `Mientras postergas, otras personas están ${goalText.es} saludablemente y conquistando sus objetivos. Yendo a la playa con confianza. Usando esa ropa que siempre quisieron.`,
      description2:
        "¡Este próximo verano puede ser el que te arrepientas de no haber comenzado otra vez... o finalmente ser el mejor verano de tu vida!",
      button: "Continuar",
    },
  }

  const { title, description1, description2, button } = content[language]

  return (
    <div className="h-full flex flex-col justify-center px-4 py-4">
      <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="space-y-1.5 text-center">
          <h2 className="text-lg font-bold text-balance">{title}</h2>
        </div>

        <div className="space-y-3 text-center">
          <p className="text-muted-foreground text-xs text-balance">{description1}</p>
          <p className="text-muted-foreground text-xs text-balance">{description2}</p>
        </div>

        <Button onClick={() => onNext({})} size="lg" className="w-full rounded-xl py-4">
          {button}
        </Button>
      </div>
    </div>
  )
}
