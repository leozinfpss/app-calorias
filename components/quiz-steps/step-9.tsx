"use client"

import type { QuizData } from "@/app/quiz/page"
import { useLanguage } from "@/lib/language-context"
import { Button } from "@/components/ui/button"

type Step9Props = {
  onNext: (data: Partial<QuizData>) => void
  quizData: QuizData
}

export function QuizStep9({ onNext, quizData }: Step9Props) {
  const { language } = useLanguage()
  const isGaining = quizData.goal === "gain"
  const isMaintaining = quizData.goal === "maintain"
  const weightDifference = Math.abs((quizData.targetWeight || 0) - (quizData.weight || 0))

  const content = {
    "pt-BR": {
      title: isGaining
        ? `Ganhar ${weightDifference.toFixed(1)} kg é uma meta realista. Não é nada difícil!`
        : isMaintaining
          ? "Manter seu peso é uma meta inteligente!"
          : `Perder ${weightDifference.toFixed(1)} kg é totalmente possível!`,
      subtitle: isGaining
        ? `90% dos usuários dizem que a mudança é notável depois de usar o CalorIA e não é fácil retroceder.`
        : isMaintaining
          ? "90% dos nossos usuários mantêm seu peso estável com o CalorIA."
          : "90% dos usuários dizem que a mudança é notável depois de usar o CalorIA e não é fácil retroceder.",
    },
    en: {
      title: isGaining
        ? `Gaining ${weightDifference.toFixed(1)} kg is a realistic goal. It's not difficult at all!`
        : isMaintaining
          ? "Maintaining your weight is a smart goal!"
          : `Losing ${weightDifference.toFixed(1)} kg is totally possible!`,
      subtitle: isGaining
        ? "90% of users say the change is noticeable after using CalorIA and it's not easy to go back."
        : isMaintaining
          ? "90% of our users maintain their stable weight with CalorIA."
          : "90% of users say the change is noticeable after using CalorIA and it's not easy to go back.",
    },
    es: {
      title: isGaining
        ? `Ganar ${weightDifference.toFixed(1)} kg es una meta realista. ¡No es nada difícil!`
        : isMaintaining
          ? "¡Mantener tu peso es una meta inteligente!"
          : `¡Perder ${weightDifference.toFixed(1)} kg es totalmente posible!`,
      subtitle: isGaining
        ? "90% de los usuarios dicen que el cambio es notable después de usar CalorIA y no es fácil retroceder."
        : isMaintaining
          ? "90% de nuestros usuarios mantienen su peso estable con CalorIA."
          : "90% de los usuarios dicen que el cambio es notable después de usar CalorIA y no es fácil retroceder.",
    },
  }

  const { title, subtitle } = content[language]

  return (
    <div className="h-full flex flex-col justify-center px-4 py-4">
      <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="space-y-4 text-center">
          <h2 className="text-lg font-bold text-balance">
            {title.split(weightDifference.toFixed(1))[0]}
            <span className="text-orange-500">{weightDifference.toFixed(1)} kg</span>
            {title.split(weightDifference.toFixed(1))[1]}
          </h2>

          <p className="text-muted-foreground text-balance text-xs">{subtitle}</p>
        </div>

        <Button onClick={() => onNext({})} size="lg" className="w-full rounded-xl py-4">
          {language === "pt-BR" ? "Continuar" : language === "en" ? "Continue" : "Continuar"}
        </Button>
      </div>
    </div>
  )
}
