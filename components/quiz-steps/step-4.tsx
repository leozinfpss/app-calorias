"use client"

import { useState } from "react"
import type { QuizData } from "@/app/quiz/page"
import { useLanguage } from "@/lib/language-context"
import { Button } from "@/components/ui/button"

type Step4Props = {
  onNext: (data: Partial<QuizData>) => void
  initialData: QuizData
}

export function QuizStep4({ onNext, initialData }: Step4Props) {
  const { t } = useLanguage()
  const [height, setHeight] = useState(initialData.height || 170)
  const [weight, setWeight] = useState(initialData.weight || 70)

  const heights = Array.from({ length: 71 }, (_, i) => 140 + i)
  const weights = Array.from({ length: 121 }, (_, i) => 40 + i)

  return (
    <div className="h-full flex flex-col justify-center px-4 py-6">
      <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="space-y-2 text-center">
          <h2 className="text-2xl font-bold text-balance">{t("step4Title")}</h2>
          <p className="text-sm text-muted-foreground text-balance">{t("step4Subtitle")}</p>
        </div>

        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-2 text-center text-xs font-semibold text-muted-foreground">
            <div>{t("height")}</div>
            <div>{t("weight")}</div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <select
              value={height}
              onChange={(e) => setHeight(Number(e.target.value))}
              className="w-full p-3 bg-muted rounded-lg text-center font-semibold text-sm focus:outline-none focus:ring-2 focus:ring-foreground transition-all"
            >
              {heights.map((h) => (
                <option key={h} value={h}>
                  {h} cm
                </option>
              ))}
            </select>

            <select
              value={weight}
              onChange={(e) => setWeight(Number(e.target.value))}
              className="w-full p-3 bg-muted rounded-lg text-center font-semibold text-sm focus:outline-none focus:ring-2 focus:ring-foreground transition-all"
            >
              {weights.map((w) => (
                <option key={w} value={w}>
                  {w} kg
                </option>
              ))}
            </select>
          </div>
        </div>

        <Button onClick={() => onNext({ height, weight })} size="lg" className="w-full rounded-lg py-5 text-base">
          {t("continue")}
        </Button>
      </div>
    </div>
  )
}
