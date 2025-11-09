"use client"

import type { QuizData } from "@/app/quiz/page"
import { Instagram, Facebook, Youtube, Search, MessageCircle, HelpCircle } from "lucide-react"
import { useState } from "react"
import { useLanguage } from "@/lib/language-context"
import { Button } from "@/components/ui/button"

type Step6Props = {
  onNext: (data: Partial<QuizData>) => void
}

const TikTokIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.68v13.67a2.4 2.4 0 1 1-2.4-2.4c.09 0 .19.005.28 0v-3.68a5.8 5.8 0 0 0-.74-.05A6.1 6.1 0 0 0 5 12.1V6.61h3.68V6.88a9.1 9.1 0 0 0 10.5-10.34v-3.6a7.65 7.65 0 0 1 .3 1.75z" />
  </svg>
)

export function QuizStep6({ onNext }: Step6Props) {
  const { t } = useLanguage()
  const [selected, setSelected] = useState<string | null>(null)

  const options = [
    { value: "instagram", label: "Instagram", icon: Instagram },
    { value: "facebook", label: "Facebook", icon: Facebook },
    { value: "tiktok", label: "TikTok", icon: TikTokIcon },
    { value: "youtube", label: "YouTube", icon: Youtube },
    { value: "google", label: "Google", icon: Search },
    { value: "whatsapp", label: "WhatsApp", icon: MessageCircle },
    { value: "outro", label: t("other"), icon: HelpCircle },
  ]

  const handleSelect = (value: string) => {
    setSelected(value)
  }

  const handleContinue = () => {
    if (selected) {
      onNext({ source: selected })
    }
  }

  return (
    <div className="h-full flex flex-col justify-center px-4 py-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="space-y-6">
        <div className="space-y-2 text-center">
          <h2 className="text-2xl font-bold text-balance">{t("step8Title")}</h2>
          <p className="text-sm text-muted-foreground text-balance">{t("step8Subtitle")}</p>
        </div>

        <div className="space-y-3 max-h-[50vh] overflow-y-auto">
          {options.map((option) => {
            const Icon = option.icon
            return (
              <button
                key={option.value}
                onClick={() => handleSelect(option.value)}
                disabled={false}
                className={`w-full p-4 rounded-lg transition-all duration-300 flex items-center gap-3 ${
                  selected === option.value ? "bg-foreground text-background" : "bg-muted hover:bg-muted/80"
                }`}
              >
                {Icon && <Icon className="w-5 h-5" />}
                {!Icon && <div className="w-5 h-5" />}
                <span className="font-semibold text-base">{option.label}</span>
              </button>
            )
          })}
        </div>

        <Button onClick={handleContinue} disabled={!selected} size="lg" className="w-full rounded-lg py-5 text-base">
          {t("continue")}
        </Button>
      </div>
    </div>
  )
}
