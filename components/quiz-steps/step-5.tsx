"use client"

import type { QuizData } from "@/app/quiz/page"
import { useState } from "react"
import { useLanguage } from "@/lib/language-context"
import { Button } from "@/components/ui/button"

type Step5Props = {
  onNext: (data: Partial<QuizData>) => void
}

export function QuizStep5({ onNext }: Step5Props) {
  const { t } = useLanguage()
  const [day, setDay] = useState(1)
  const [month, setMonth] = useState(1)
  const [year, setYear] = useState(2000)

  const days = Array.from({ length: 31 }, (_, i) => i + 1)
  const months = [
    { value: 1, label: { "pt-BR": "Janeiro", en: "January", es: "Enero" } },
    { value: 2, label: { "pt-BR": "Fevereiro", en: "February", es: "Febrero" } },
    { value: 3, label: { "pt-BR": "Março", en: "March", es: "Marzo" } },
    { value: 4, label: { "pt-BR": "Abril", en: "April", es: "Abril" } },
    { value: 5, label: { "pt-BR": "Maio", en: "May", es: "Mayo" } },
    { value: 6, label: { "pt-BR": "Junho", en: "June", es: "Junio" } },
    { value: 7, label: { "pt-BR": "Julho", en: "July", es: "Julio" } },
    { value: 8, label: { "pt-BR": "Agosto", en: "August", es: "Agosto" } },
    { value: 9, label: { "pt-BR": "Setembro", en: "September", es: "Septiembre" } },
    { value: 10, label: { "pt-BR": "Outubro", en: "October", es: "Octubre" } },
    { value: 11, label: { "pt-BR": "Novembro", en: "November", es: "Noviembre" } },
    { value: 12, label: { "pt-BR": "Dezembro", en: "December", es: "Diciembre" } },
  ]
  const years = Array.from({ length: 80 }, (_, i) => 2024 - i)

  const { language } = useLanguage()

  return (
    <div className="h-full flex flex-col justify-center px-4 py-6">
      <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="space-y-2 text-center">
          <h2 className="text-2xl font-bold text-balance">{t("step6Title")}</h2>
          <p className="text-sm text-muted-foreground text-balance">{t("step6Subtitle")}</p>
        </div>

        <div className="space-y-3">
          <div className="grid grid-cols-3 gap-2 text-center text-xs font-semibold text-muted-foreground">
            <div>{t("day")}</div>
            <div>{t("month")}</div>
            <div>{t("year")}</div>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <select
              value={day}
              onChange={(e) => setDay(Number(e.target.value))}
              className="w-full p-3 bg-muted rounded-lg text-center font-semibold text-sm focus:outline-none focus:ring-2 focus:ring-foreground transition-all"
            >
              {days.map((d) => (
                <option key={d} value={d}>
                  {String(d).padStart(2, "0")}
                </option>
              ))}
            </select>

            <select
              value={month}
              onChange={(e) => setMonth(Number(e.target.value))}
              className="w-full p-3 bg-muted rounded-lg text-center font-semibold text-sm focus:outline-none focus:ring-2 focus:ring-foreground transition-all"
            >
              {months.map((m) => (
                <option key={m.value} value={m.value}>
                  {m.label[language]}
                </option>
              ))}
            </select>

            <select
              value={year}
              onChange={(e) => setYear(Number(e.target.value))}
              className="w-full p-3 bg-muted rounded-lg text-center font-semibold text-sm focus:outline-none focus:ring-2 focus:ring-foreground transition-all"
            >
              {years.map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
          </div>
        </div>

        <Button
          onClick={() => onNext({ birthDate: { day, month, year } })}
          size="lg"
          className="w-full rounded-lg py-5 text-base"
        >
          {t("continue")}
        </Button>
      </div>
    </div>
  )
}
