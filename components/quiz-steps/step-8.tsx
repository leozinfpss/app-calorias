"use client"

import { useState } from "react"
import type { QuizData } from "@/app/quiz/page"
import { useLanguage } from "@/lib/language-context"
import { Button } from "@/components/ui/button"

type Step8Props = {
  onNext: (data: Partial<QuizData>) => void
  initialWeight?: number
  goal?: string
}

export function QuizStep8({ onNext, initialWeight = 70, goal }: Step8Props) {
  const { t, language } = useLanguage()
  const isGaining = goal === "gain"
  const isMaintaining = goal === "maintain"

  const minWeight = isMaintaining ? initialWeight - 2 : isGaining ? initialWeight : Math.max(40, initialWeight - 20)
  const maxWeight = isMaintaining ? initialWeight + 2 : isGaining ? initialWeight + 20 : initialWeight
  const defaultTarget = isMaintaining ? initialWeight : isGaining ? initialWeight + 2.5 : initialWeight - 2.5

  const [targetWeight, setTargetWeight] = useState(defaultTarget)

  const difference = Math.abs(targetWeight - initialWeight)
  const goalLabel = isGaining ? t("step7Gain") : isMaintaining ? t("step7Maintain") : t("step7Lose")

  return (
    <div className="h-full flex flex-col justify-center px-4 py-4">
      <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="space-y-1.5 text-center">
          <h2 className="text-lg font-bold text-balance">{t("step7Title")}</h2>
          <p className="text-xs text-muted-foreground">{goalLabel}</p>
        </div>

        <div className="space-y-4">
          <div className="text-center space-y-1">
            <div className="text-3xl font-bold">{targetWeight.toFixed(1)} kg</div>
            {difference > 0 && (
              <div className="text-base font-semibold text-green-600">
                {isGaining ? "+" : "-"}
                {difference.toFixed(1)} kg
              </div>
            )}
          </div>

          <div className="space-y-3">
            <input
              type="range"
              min={minWeight}
              max={maxWeight}
              step={0.5}
              value={targetWeight}
              onChange={(e) => setTargetWeight(Number(e.target.value))}
              className="w-full h-2 bg-muted rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-foreground"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>{minWeight.toFixed(1)} kg</span>
              <span>{maxWeight.toFixed(1)} kg</span>
            </div>
          </div>

          <div className="text-center">
            <div className="text-xl font-bold">{initialWeight} kg</div>
            <div className="text-xs text-muted-foreground">
              {language === "pt-BR" ? "Peso atual" : language === "en" ? "Current weight" : "Peso actual"}
            </div>
          </div>
        </div>

        <Button onClick={() => onNext({ targetWeight })} size="lg" className="w-full rounded-xl py-4">
          {t("continue")}
        </Button>
      </div>
    </div>
  )
}
