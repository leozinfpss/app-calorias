"use client"

import type { QuizData } from "@/app/quiz/page"
import { useLanguage } from "@/lib/language-context"
import { createBrowserClient } from "@supabase/ssr"
import { useState } from "react"

type Step29QuickLoginProps = {
  onNext: (data: Partial<QuizData>) => void
}

export function QuizStep29QuickLogin({ onNext }: Step29QuickLoginProps) {
  const { language } = useLanguage()
  const [loading, setLoading] = useState(false)

  const content = {
    "pt-BR": {
      title: "Login rápido",
      subtitle: "Entre com uma das opções abaixo para salvar seu progresso",
      googleButton: "Continuar com Google",
      appleButton: "Continuar com Apple",
      skipButton: "Pular",
      orText: "ou",
    },
    en: {
      title: "Quick login",
      subtitle: "Sign in with one of the options below to save your progress",
      googleButton: "Continue with Google",
      appleButton: "Continue with Apple",
      skipButton: "Skip",
      orText: "or",
    },
    es: {
      title: "Inicio rápido",
      subtitle: "Inicia sesión con una de las opciones a continuación para guardar tu progreso",
      googleButton: "Continuar con Google",
      appleButton: "Continuar con Apple",
      skipButton: "Saltar",
      orText: "o",
    },
  }

  const { title, subtitle, googleButton, appleButton, skipButton } = content[language]

  const handleGoogleLogin = async () => {
    if (loading) return

    try {
      setLoading(true)
      const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      )

      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/quiz`,
        },
      })

      if (error) {
        console.error("[v0] Google login error:", error)
        alert("Erro ao fazer login com Google. Por favor, tente novamente.")
        setLoading(false)
      }
    } catch (error) {
      console.error("[v0] Google login exception:", error)
      alert("Erro ao fazer login com Google. Por favor, tente novamente.")
      setLoading(false)
    }
  }

  const handleAppleLogin = async () => {
    if (loading) return

    try {
      setLoading(true)
      const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      )

      const { error } = await supabase.auth.signInWithOAuth({
        provider: "apple",
        options: {
          redirectTo: `${window.location.origin}/quiz`,
        },
      })

      if (error) {
        console.error("[v0] Apple login error:", error)
        alert("Erro ao fazer login com Apple. Por favor, tente novamente.")
        setLoading(false)
      }
    } catch (error) {
      console.error("[v0] Apple login exception:", error)
      alert("Erro ao fazer login com Apple. Por favor, tente novamente.")
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-6 py-12">
      <div className="w-full max-w-md space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="space-y-4 text-center">
          <h2 className="text-3xl font-bold text-balance">{title}</h2>
          <p className="text-lg text-gray-600">{subtitle}</p>
        </div>

        <div className="space-y-4">
          <button
            onClick={handleGoogleLogin}
            disabled={loading}
            className="w-full bg-white border-2 border-gray-300 hover:border-gray-400 text-gray-900 py-5 px-6 rounded-2xl text-base font-semibold transition-all active:scale-[0.98] flex items-center justify-center gap-3 shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg className="w-6 h-6" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            {loading ? "Carregando..." : googleButton}
          </button>

          <button
            onClick={handleAppleLogin}
            disabled={loading}
            className="w-full bg-black hover:bg-gray-900 text-white py-5 px-6 rounded-2xl text-base font-semibold transition-all active:scale-[0.98] flex items-center justify-center gap-3 shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
            </svg>
            {loading ? "Carregando..." : appleButton}
          </button>
        </div>

        <div className="text-center">
          <button
            onClick={() => onNext({})}
            disabled={loading}
            className="text-gray-600 py-4 text-base font-medium hover:text-gray-900 disabled:opacity-50"
          >
            {skipButton}
          </button>
        </div>
      </div>
    </div>
  )
}
