"use client"

import type { QuizData } from "@/app/quiz/page"
import { useLanguage } from "@/lib/language-context"
import { Star } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"

type Step22Props = {
  onNext: (data: Partial<QuizData>) => void
}

export function QuizStep22({ onNext }: Step22Props) {
  const { language } = useLanguage()

  const content = {
    "pt-BR": {
      title: "Histórias de Sucesso",
      subtitle: "Veja o que nossos usuários alcançaram",
      users: "+50K de usuários com o CalorIA",
      message: "Você está no caminho certo!",
      description: "Junte-se a milhares de usuários satisfeitos e comece sua jornada hoje",
      button: "Continuar",
    },
    en: {
      title: "Success Stories",
      subtitle: "See what our users have achieved",
      users: "+50K users with CalorIA",
      message: "You're on the right track!",
      description: "Join thousands of satisfied users and start your journey today",
      button: "Continue",
    },
    es: {
      title: "Historias de Éxito",
      subtitle: "Ve lo que nuestros usuarios han logrado",
      users: "+50K usuarios con CalorIA",
      message: "¡Estás en el camino correcto!",
      description: "Únete a miles de usuarios satisfeitos y comienza tu viaje hoy",
      button: "Continuar",
    },
  }

  const { title, subtitle, users, message, description, button } = content[language]

  return (
    <div className="h-full flex flex-col justify-center px-4 py-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="space-y-6">
        <div className="space-y-3 text-center">
          <h2 className="text-2xl font-bold text-balance">{title}</h2>

          <div className="flex justify-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className="w-5 h-5 fill-yellow-400 text-yellow-400"
                style={{ animationDelay: `${i * 100}ms` }}
              />
            ))}
          </div>

          <p className="text-base font-bold text-gray-900">{subtitle}</p>

          <div className="flex justify-center -space-x-3">
            <div className="w-10 h-10 rounded-full border-4 border-white overflow-hidden relative">
              <Image src="/images/user-testimonial-1.png" alt="User testimonial" fill className="object-cover" />
            </div>
            <div className="w-10 h-10 rounded-full border-4 border-white overflow-hidden relative">
              <Image src="/images/user-testimonial-2.png" alt="User testimonial" fill className="object-cover" />
            </div>
            <div className="w-10 h-10 rounded-full border-4 border-white overflow-hidden relative">
              <Image src="/images/user-testimonial-3.png" alt="User testimonial" fill className="object-cover" />
            </div>
          </div>

          <p className="text-sm font-semibold text-gray-700">{users}</p>
        </div>

        <div className="bg-green-50 rounded-lg p-4 space-y-2">
          <div className="flex justify-center">
            <div className="bg-green-500 rounded-full p-2">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
          <h3 className="text-base font-bold text-center text-gray-900">{message}</h3>
          <p className="text-center text-gray-700 text-sm">{description}</p>
        </div>

        <Button onClick={() => onNext({})} size="lg" className="w-full rounded-lg py-5 text-base">
          {button}
        </Button>
      </div>
    </div>
  )
}
