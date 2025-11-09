"use client"

import { useState } from "react"
import type { QuizData } from "@/app/quiz/page"
import { useLanguage } from "@/lib/language-context"
import { Button } from "@/components/ui/button"

type Step7Props = {
  onNext: (data: Partial<QuizData>) => void
}

export function QuizStep7({ onNext }: Step7Props) {
  const { t } = useLanguage()
  const [selected, setSelected] = useState<string | null>(null)

  const options = [
    { value: "lose", label: t("step2Option1") },
    { value: "maintain", label: t("step2Option2") },
    { value: "gain", label: t("step2Option3") },
  ]

  const handleSelect = (value: string) => {
    setSelected(value)
  }

  return (
    <div className="h-full flex flex-col justify-center px-4 py-6">
      <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="space-y-2 text-center">
          <h2 className="text-2xl font-bold text-balance">{t("step2Title")}</h2>
          <p className="text-sm text-muted-foreground text-balance">{t("step2Subtitle")}</p>
        </div>

        <div className="space-y-3">
          {options.map((option) => (
            <button
              key={option.value}
              onClick={() => handleSelect(option.value)}
              className={`w-full p-4 rounded-lg transition-all duration-300 text-base font-medium ${
                selected === option.value ? "bg-foreground text-background" : "bg-muted hover:bg-muted/80"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>

        <Button
          onClick={() => onNext({ goal: selected! })}
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
