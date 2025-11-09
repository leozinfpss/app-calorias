"use client"

import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import type { QuizData } from "@/app/quiz/page"

type Step12Props = {
  onNext: (data: {}) => void
  quizData: QuizData
}

export function QuizStep12({ onNext, quizData }: Step12Props) {
  const [daysRemaining, setDaysRemaining] = useState<number | null>(null)

  useEffect(() => {
    // Data do início do verão no hemisfério sul (21 de dezembro)
    const currentYear = new Date().getFullYear()
    const summerStart = new Date(currentYear, 11, 21) // Mês 11 = dezembro (0-indexed)

    // Se já passou do verão deste ano, calcular para o próximo ano
    if (new Date() > summerStart) {
      summerStart.setFullYear(currentYear + 1)
    }

    const today = new Date()
    const diffTime = summerStart.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    setDaysRemaining(diffDays)
  }, [])

  const getGoalText = () => {
    if (quizData.goal === "lose") {
      return {
        action: "perder o peso",
        feeling: "insatisfeito",
      }
    } else if (quizData.goal === "maintain") {
      return {
        action: "manter seu peso",
        feeling: "insatisfeito",
      }
    } else {
      return {
        action: "ganhar o peso",
        feeling: "insatisfeito",
      }
    }
  }

  const getMessage = () => {
    const goalText = getGoalText()

    if (daysRemaining === null) {
      return { title: "Carregando...", description: "" }
    }

    if (daysRemaining <= 0) {
      return {
        title: "Já chegou o verão e você não pode mais perder tempo!",
        description: `Comece HOJE a ${goalText.action} que você deseja e transforme seu corpo ainda neste verão.`,
      }
    }

    return {
      title: `Faltam apenas ${daysRemaining} dias para chegada do verão e você tem duas escolhas:`,
      description: `Começar HOJE e ${goalText.action} que você deseja... ou adiar de novo e passar mais um verão se sentindo ${goalText.feeling} com seu corpo.`,
    }
  }

  const message = getMessage()

  return (
    <div className="h-full flex flex-col justify-center px-4 py-6">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-3 text-center">
          <h1 className="text-2xl font-bold text-foreground leading-tight text-balance">{message.title}</h1>
          {message.description && (
            <p className="text-sm text-muted-foreground leading-relaxed text-balance">{message.description}</p>
          )}
        </div>

        <Button
          onClick={() => onNext({})}
          className="w-full bg-foreground hover:bg-foreground/90 text-background py-5 text-base font-semibold rounded-lg"
        >
          Continuar
        </Button>
      </div>
    </div>
  )
}
