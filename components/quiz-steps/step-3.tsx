"use client"

import type { QuizData } from "@/app/quiz/page"
import { useLanguage } from "@/lib/language-context"
import { DietComparisonChart } from "@/components/diet-comparison-chart"
import { Button } from "@/components/ui/button"

type Step3Props = {
  onNext: (data: Partial<QuizData>) => void
}

export function QuizStep3({ onNext }: Step3Props) {
  const { t } = useLanguage()

  return (
    <div className="h-full flex flex-col justify-center px-4 py-6">
      <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="space-y-3 text-center">
          <h2 className="text-2xl font-bold text-balance">{t("step3InfoTitle")}</h2>
          <p className="text-sm text-muted-foreground text-balance leading-relaxed">{t("step3InfoSubtitle")}</p>

          <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden bg-background my-2">
            <DietComparisonChart />
          </div>
        </div>

        <Button onClick={() => onNext({})} size="lg" className="w-full rounded-lg py-5 text-base">
          {t("continue")}
        </Button>
      </div>
    </div>
  )
}
