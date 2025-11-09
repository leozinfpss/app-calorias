"use client"

import { ChevronLeft } from "lucide-react"
import Image from "next/image"

type QuizProgressProps = {
  current: number
  total: number
  onBack: () => void
}

export function QuizProgress({ current, total, onBack }: QuizProgressProps) {
  const progress = (current / total) * 100

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between relative">
        <button
          onClick={onBack}
          className="text-muted-foreground hover:text-foreground transition-colors z-10"
          aria-label="Voltar"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <div className="absolute left-1/2 -translate-x-1/2">
          <Image src="/calor-ia-logo.png" alt="Calor.IA Logo" width={140} height={40} className="h-9 w-auto" />
        </div>
        {/* Empty div for flex balance */}
        <div className="w-6" />
      </div>

      <div className="w-full h-1 bg-gray-200 rounded-full overflow-hidden">
        <div className="h-full bg-orange-500 transition-all duration-300 ease-out" style={{ width: `${progress}%` }} />
      </div>
    </div>
  )
}
