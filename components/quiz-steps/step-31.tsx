"use client"

import { useState } from "react"
import type { QuizData } from "@/app/quiz/page"
import { useLanguage } from "@/lib/language-context"
import { Check, Bell, Crown, Lock, Shield } from "lucide-react"

type Step31Props = {
  onNext: (data: Partial<QuizData>) => void
}

export function QuizStep31({ onNext }: Step31Props) {
  const { language } = useLanguage()
  const [selectedPlan, setSelectedPlan] = useState<"annual" | "monthly">("annual")

  const content = {
    "pt-BR": {
      title: "Inicie sua experiência GRÁTIS de 3 dias. Não será cobrado do seu cartão agora",
      today: "Hoje",
      todayDesc: "Receba acesso total ao CalorIA para registrar suas refeições com IA",
      reminder: "Em 2 Dias - Lembrete",
      reminderDesc: "Vamos enviar um lembrete que o seu teste grátis está acabando",
      subscription: "Em 3 Dias",
      subscriptionDesc: "Sua inscrição vai começar 10 de novembro de 2025 se você não tiver cancelado",
      popular: "MAIS POPULAR",
      annual: "ANUAL",
      annualPrice: "R$ 149,90 / ano",
      annualMonthly: "equivalente a R$ 12,49/mês",
      monthly: "MENSAL",
      monthlyPrice: "R$ 59,90 / mês",
      cancel: "Cancele quando quiser!",
      button: "Comece de graça",
      privacy: "Privacidade",
      restore: "Restaurar Compras",
      terms: "Termos",
    },
    en: {
      title: "Start your 3-day FREE trial. Your card won't be charged now",
      today: "Today",
      todayDesc: "Get full access to CalorIA to track your meals with AI",
      reminder: "In 2 Days - Reminder",
      reminderDesc: "We'll send a reminder that your free trial is ending",
      subscription: "In 3 Days",
      subscriptionDesc: "Your subscription will start November 10, 2025 if you haven't canceled",
      popular: "MOST POPULAR",
      annual: "ANNUAL",
      annualPrice: "$149.90 / year",
      annualMonthly: "equivalent to $12.49/month",
      monthly: "MONTHLY",
      monthlyPrice: "$59.90 / month",
      cancel: "Cancel anytime!",
      button: "Start for free",
      privacy: "Privacy",
      restore: "Restore Purchases",
      terms: "Terms",
    },
    es: {
      title: "Inicia tu experiencia GRATIS de 3 días. No se cobrará a tu tarjeta ahora",
      today: "Hoy",
      todayDesc: "Obtén acceso total a CalorIA para registrar tus comidas con IA",
      reminder: "En 2 Días - Recordatorio",
      reminderDesc: "Enviaremos un recordatorio de que tu prueba gratuita está terminando",
      subscription: "En 3 Días",
      subscriptionDesc: "Tu suscripción comenzará el 10 de noviembre de 2025 si no has cancelado",
      popular: "MÁS POPULAR",
      annual: "ANUAL",
      annualPrice: "$149.90 / año",
      annualMonthly: "equivalente a $12.49/mes",
      monthly: "MENSUAL",
      monthlyPrice: "$59.90 / mes",
      cancel: "¡Cancela cuando quieras!",
      button: "Comienza gratis",
      privacy: "Privacidad",
      restore: "Restaurar Compras",
      terms: "Términos",
    },
  }

  const {
    title,
    today,
    todayDesc,
    reminder,
    reminderDesc,
    subscription,
    subscriptionDesc,
    popular,
    annual,
    annualPrice,
    annualMonthly,
    monthly,
    monthlyPrice,
    cancel,
    button,
    privacy,
    restore,
    terms,
  } = content[language]

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="flex-1 overflow-y-auto pb-32">
        <div className="max-w-md mx-auto px-5 pt-8 space-y-8">
          <h1 className="text-2xl font-bold text-center text-balance">{title}</h1>

          {/* Timeline */}
          <div className="relative py-4">
            <div className="absolute left-[52px] top-0 bottom-0 w-1 bg-gradient-to-b from-orange-500 via-orange-400 to-black" />

            <div className="space-y-6">
              {/* Today */}
              <div className="flex gap-4">
                <div className="relative flex-shrink-0">
                  <div className="w-20 h-20 bg-orange-500 rounded-full flex items-center justify-center z-10 relative">
                    <Lock className="w-9 h-9 text-white" />
                  </div>
                </div>
                <div className="flex-1 pt-3">
                  <h3 className="text-lg font-bold text-gray-900">{today}</h3>
                  <p className="text-sm text-gray-600 mt-1">{todayDesc}</p>
                </div>
              </div>

              {/* Reminder */}
              <div className="flex gap-4">
                <div className="relative flex-shrink-0">
                  <div className="w-20 h-20 bg-orange-500 rounded-full flex items-center justify-center z-10 relative">
                    <Bell className="w-9 h-9 text-white" />
                  </div>
                </div>
                <div className="flex-1 pt-3">
                  <h3 className="text-lg font-bold text-gray-900">{reminder}</h3>
                  <p className="text-sm text-gray-600 mt-1">{reminderDesc}</p>
                </div>
              </div>

              {/* Subscription */}
              <div className="flex gap-4">
                <div className="relative flex-shrink-0">
                  <div className="w-20 h-20 bg-black rounded-full flex items-center justify-center z-10 relative">
                    <Crown className="w-9 h-9 text-white" />
                  </div>
                </div>
                <div className="flex-1 pt-3">
                  <h3 className="text-lg font-bold text-gray-900">{subscription}</h3>
                  <p className="text-sm text-gray-600 mt-1">{subscriptionDesc}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Plans */}
          <div className="grid grid-cols-2 gap-4">
            {/* Annual Plan */}
            <button
              onClick={() => setSelectedPlan("annual")}
              className={`relative rounded-3xl p-5 transition-all ${
                selectedPlan === "annual"
                  ? "bg-white border-4 border-black shadow-lg scale-105"
                  : "bg-gray-50 border-4 border-gray-200"
              }`}
            >
              {selectedPlan === "annual" && (
                <>
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-orange-500 text-white text-xs font-bold px-4 py-1 rounded-full whitespace-nowrap">
                    {popular}
                  </div>
                  <div className="absolute top-3 right-3 bg-black rounded-full p-1">
                    <Check className="w-5 h-5 text-white" strokeWidth={3} />
                  </div>
                </>
              )}
              <div className="space-y-2 pt-2">
                <p className="text-lg font-bold text-gray-900">{annual}</p>
                <p className="text-base font-bold text-gray-900">{annualPrice}</p>
                <p className="text-xs text-gray-500">{annualMonthly}</p>
              </div>
            </button>

            {/* Monthly Plan */}
            <button
              onClick={() => setSelectedPlan("monthly")}
              className={`relative rounded-3xl p-5 transition-all ${
                selectedPlan === "monthly"
                  ? "bg-white border-4 border-black shadow-lg scale-105"
                  : "bg-gray-50 border-4 border-gray-200"
              }`}
            >
              {selectedPlan === "monthly" && (
                <div className="absolute top-3 right-3 bg-black rounded-full p-1">
                  <Check className="w-5 h-5 text-white" strokeWidth={3} />
                </div>
              )}
              <div className="space-y-2 pt-2">
                <p className="text-lg font-bold text-gray-900">{monthly}</p>
                <p className="text-base font-bold text-gray-900">{monthlyPrice}</p>
              </div>
            </button>
          </div>

          <div className="flex items-center justify-center gap-2 text-gray-700">
            <Shield className="w-5 h-5" />
            <p className="text-sm font-medium">{cancel}</p>
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-5">
        <div className="max-w-md mx-auto space-y-4">
          <button
            onClick={() => onNext({})}
            className="w-full bg-black hover:bg-gray-900 text-white py-8 text-lg font-bold rounded-full transition-all active:scale-[0.98] shadow-lg"
          >
            {button}
          </button>

          <div className="flex justify-center gap-8 text-xs text-gray-500">
            <button className="hover:underline">{privacy}</button>
            <button className="hover:underline">{restore}</button>
            <button className="hover:underline">{terms}</button>
          </div>
        </div>
      </div>
    </div>
  )
}
