"use client"

import type { QuizData } from "@/app/quiz/page"
import { useState } from "react"
import { useLanguage } from "@/lib/language-context"
import { Button } from "@/components/ui/button"

type Step2Props = {
  onNext: (data: Partial<QuizData>) => void
}

export function QuizStep2({ onNext }: Step2Props) {
  const { t } = useLanguage()
  const [selected, setSelected] = useState<string | null>(null)

  const options = [
    { value: "0-2", label: "0-2", description: t("step1Option1Sub") },
    { value: "3-5", label: "3-5", description: t("step1Option2Sub") },
    { value: "6+", label: "6+", description: t("step1Option3Sub") },
  ]

  const handleSelect = (value: string) => {
    setSelected(value)
  }

  return (
    <div className="h-full flex flex-col justify-center px-4 py-6">
      <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="space-y-2 text-center">
          <h2 className="text-2xl font-bold text-balance">{t("step1Title")}</h2>
          <p className="text-sm text-muted-foreground text-balance">{t("step1Subtitle")}</p>
        </div>

        <div className="space-y-3">
          {options.map((option) => (
            <button
              key={option.value}
              onClick={() => handleSelect(option.value)}
              className={`w-full p-4 rounded-lg transition-all duration-300 space-y-0.5 text-left ${
                selected === option.value ? "bg-foreground text-background" : "bg-muted hover:bg-muted/80"
              }`}
            >
              <div className="font-semibold text-base">{option.label}</div>
              <div className={`text-xs ${selected === option.value ? "text-background/80" : "text-muted-foreground"}`}>
                {option.description}
              </div>
            </button>
          ))}
        </div>

        <Button
          onClick={() => onNext({ workouts: selected! })}
          disabled={!selected}
          size="lg"
          className="w-full rounded-lg py-5 text-base"
        >
          {t("continue")}
        </Button>
      </div>
    </div>
  )
}
