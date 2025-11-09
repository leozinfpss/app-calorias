"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Check } from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import { LanguageSelector } from "@/components/language-selector"

export default function SubscriptionPage() {
  const router = useRouter()
  const [selectedPlan, setSelectedPlan] = useState<"monthly" | "annual">("annual")
  const [isLoading, setIsLoading] = useState(false)
  const { currency, t } = useLanguage()

  const plans = {
    monthly: {
      name: t("monthly"),
      price: `${currency.symbol} ${currency.monthlyPrice}`,
      period: t("perMonth"),
      priceId: "price_monthly",
      savings: null,
      hasTrial: false,
    },
    annual: {
      name: t("annual"),
      price: `${currency.symbol} ${currency.annualPrice}`,
      period: t("perMonth"),
      total: `${currency.symbol} ${currency.annualTotal}${t("perYear")}`,
      priceId: "price_annual",
      savings: t("save33"),
      hasTrial: true,
    },
  }

  const features = [t("feature1"), t("feature2"), t("feature3"), t("feature4"), t("feature5"), t("feature6")]

  const handleSubscribe = async () => {
    setIsLoading(true)
    try {
      const plan = plans[selectedPlan]

      const response = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          priceId: plan.priceId,
          mode: "subscription",
          trialPeriodDays: plan.hasTrial ? 3 : undefined,
        }),
      })

      const { url } = await response.json()

      if (url) {
        window.location.href = url
      }
    } catch (error) {
      console.error("Erro ao criar checkout:", error)
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <header className="p-4 border-b border-gray-200 flex items-center justify-between">
        <button onClick={() => router.back()} className="text-black" aria-label="Voltar">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
        </button>
        <LanguageSelector />
      </header>

      {/* Content */}
      <main className="flex-1 px-6 py-8 flex flex-col">
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-black mb-2 text-balance">{t("choosePlan")}</h1>
          <p className="text-gray-600 mb-8">{t("planSubtitle")}</p>

          {/* Plan Cards */}
          <div className="space-y-4 mb-8">
            {/* Annual Plan */}
            <button
              onClick={() => setSelectedPlan("annual")}
              className={`w-full p-6 rounded-2xl border-2 transition-all text-left relative ${
                selectedPlan === "annual" ? "border-black bg-black text-white" : "border-gray-200 bg-white text-black"
              }`}
            >
              <span className="absolute -top-3 left-4 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                {t("recommended")}
              </span>
              {plans.annual.savings && (
                <span className="absolute -top-3 right-4 bg-black text-white px-3 py-1 rounded-full text-sm font-medium">
                  {plans.annual.savings}
                </span>
              )}
              <div className="flex items-start justify-between mt-2">
                <div className="flex-1">
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="text-4xl font-bold">{plans.annual.price}</span>
                    <span className="text-lg opacity-80">{plans.annual.period}</span>
                  </div>
                  <p className="text-sm opacity-80 mb-2">{plans.annual.total}</p>
                  <p className="font-medium">{plans.annual.name}</p>
                  <p className="text-sm mt-2 opacity-90">{t("freeTrial")}</p>
                </div>
                <div
                  className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                    selectedPlan === "annual" ? "border-white bg-white" : "border-gray-300"
                  }`}
                >
                  {selectedPlan === "annual" && <div className="w-3 h-3 rounded-full bg-black" />}
                </div>
              </div>
            </button>

            {/* Monthly Plan */}
            <button
              onClick={() => setSelectedPlan("monthly")}
              className={`w-full p-6 rounded-2xl border-2 transition-all text-left ${
                selectedPlan === "monthly" ? "border-black bg-black text-white" : "border-gray-200 bg-white text-black"
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="text-4xl font-bold">{plans.monthly.price}</span>
                    <span className="text-lg opacity-80">{plans.monthly.period}</span>
                  </div>
                  <p className="font-medium mt-2">{plans.monthly.name}</p>
                </div>
                <div
                  className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                    selectedPlan === "monthly" ? "border-white bg-white" : "border-gray-300"
                  }`}
                >
                  {selectedPlan === "monthly" && <div className="w-3 h-3 rounded-full bg-black" />}
                </div>
              </div>
            </button>
          </div>

          {/* Features */}
          <div className="space-y-3 mb-8">
            <p className="font-semibold text-black mb-4">{t("whatsIncluded")}</p>
            {features.map((feature, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-black flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="w-3 h-3 text-white" />
                </div>
                <span className="text-gray-700">{feature}</span>
              </div>
            ))}
          </div>

          {/* Trial Info */}
          <div className="bg-gray-50 rounded-xl p-4 mb-6">
            <p className="text-sm text-gray-700 text-center">
              {plans[selectedPlan].hasTrial ? (
                <>
                  <strong>{t("trialInfo")}</strong> {plans[selectedPlan].price}
                  {plans[selectedPlan].period}. {t("trialInfoEnd")}
                </>
              ) : (
                <>
                  {t("monthlyInfo")} {plans[selectedPlan].price}
                  {plans[selectedPlan].period}. {t("trialInfoEnd")}
                </>
              )}
            </p>
          </div>
        </div>

        {/* CTA Button */}
        <button
          onClick={handleSubscribe}
          disabled={isLoading}
          className="w-full bg-black text-white rounded-full py-4 font-semibold text-lg hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? t("processing") : plans[selectedPlan].hasTrial ? t("startTrial") : t("subscribeNow")}
        </button>

        <p className="text-xs text-gray-500 text-center mt-4">{t("terms")}</p>
      </main>
    </div>
  )
}
