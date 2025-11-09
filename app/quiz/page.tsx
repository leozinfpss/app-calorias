"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { LanguageSelector } from "@/components/language-selector"
import { QuizProgress } from "@/components/quiz-progress"
import { QuizStep1 } from "@/components/quiz-steps/step-1"
import { QuizStep2 } from "@/components/quiz-steps/step-2"
import { QuizStep3 } from "@/components/quiz-steps/step-3"
import { QuizStep4 } from "@/components/quiz-steps/step-4"
import { QuizStep5 } from "@/components/quiz-steps/step-5"
import { QuizStep6 } from "@/components/quiz-steps/step-6"
import { QuizStep7 } from "@/components/quiz-steps/step-7"
import { QuizStep8 } from "@/components/quiz-steps/step-8"
import { QuizStep9 } from "@/components/quiz-steps/step-9"
import { QuizStep10 } from "@/components/quiz-steps/step-10"
import { QuizStep11 } from "@/components/quiz-steps/step-11"
import { QuizStep12 } from "@/components/quiz-steps/step-12"
import { QuizStep13 } from "@/components/quiz-steps/step-13"
import { QuizStep14 } from "@/components/quiz-steps/step-14"
import { QuizStep15 } from "@/components/quiz-steps/step-15"
import { QuizStep16 } from "@/components/quiz-steps/step-16"
import { QuizStep17 } from "@/components/quiz-steps/step-17"
import { QuizStep18 } from "@/components/quiz-steps/step-18"
import { QuizStep19 } from "@/components/quiz-steps/step-19"
import { QuizStep20 } from "@/components/quiz-steps/step-20"
import { QuizStep20a } from "@/components/quiz-steps/step-20a"
import { QuizStep20b } from "@/components/quiz-steps/step-20b"
import { QuizStep20c } from "@/components/quiz-steps/step-20c"
import { QuizStep21 } from "@/components/quiz-steps/step-21"
import { QuizStep22 } from "@/components/quiz-steps/step-22"
import { QuizStep23 } from "@/components/quiz-steps/step-23"
import { QuizStep24 } from "@/components/quiz-steps/step-24"
import { QuizStep25 } from "@/components/quiz-steps/step-25"
import { QuizStep26 } from "@/components/quiz-steps/step-26"
import { QuizStep27 } from "@/components/quiz-steps/step-27"
import { QuizStep28 } from "@/components/quiz-steps/step-28"
import { QuizStep29QuickLogin } from "@/components/quiz-steps/step-29-quick-login"
import { getSupabaseBrowserClient } from "@/lib/supabase/client"

export type QuizData = {
  workouts?: string
  goal?: string
  height?: number
  weight?: number
  gender?: string
  birthDate?: { day: number; month: number; year: number }
  targetWeight?: number
  source?: string
  weightLossSpeed?: number
  summerAttempts?: string
  endOfYearFeeling?: string
  obstacles?: string
  goals?: string
  summerFeeling?: string
  knowsCalories?: boolean
  name?: string
  email?: string
  phone?: string
  referralCode?: string
}

export default function QuizPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [quizData, setQuizData] = useState<QuizData>({})
  const [isAnimating, setIsAnimating] = useState(false)
  const [skippedSteps, setSkippedSteps] = useState(false)

  const totalSteps = 33

  const getVisibleStep = () => {
    if (currentStep >= 20) {
      if (currentStep === 20) return 20
      if (currentStep === 21) return 21 // step-20a shows same progress
      if (currentStep === 22) return 22 // step-21 moves forward
      if (currentStep === 23) return 20 // step-20b (Vamos te explicar)
      if (currentStep === 24) return 21 // step-20c (Como isso te ajuda)
      if (currentStep === 25) return 22 // step-21 demo after explanation
      if (currentStep === 26) return 23 // Success stories
      if (currentStep === 27) return 24 // Name input
      if (currentStep === 28) return 25 // Email input
      if (currentStep === 29) return 26 // Phone input
      if (currentStep === 30) return 27 // Referral code
      if (currentStep === 31) return 28 // Loading screen
      if (currentStep === 32) return 29 // Results
      if (currentStep === 33) return 30 // Quick login
    }
    return currentStep
  }

  const handleNext = async (data: Partial<QuizData>) => {
    const updatedData = { ...quizData, ...data }
    setQuizData(updatedData)

    setIsAnimating(true)
    await new Promise((resolve) => setTimeout(resolve, 300))

    if (currentStep === 7 && data.goal === "maintain") {
      setCurrentStep(11)
      setSkippedSteps(true)
      setIsAnimating(false)
      return
    }

    if (currentStep === 20) {
      if (data.knowsCalories === true) {
        setCurrentStep(21) // Go to "Ótimo você já tem uma base" (step-20a)
      } else {
        setCurrentStep(23) // Go to "Vamos te explicar" (step-20b)
      }
      setIsAnimating(false)
      return
    }

    if (currentStep === 21) {
      setCurrentStep(22) // Go to demo (step-21)
      setIsAnimating(false)
      return
    }

    if (currentStep === 22) {
      setCurrentStep(26) // Go to Histórias de Sucesso (skip explanation steps)
      setIsAnimating(false)
      return
    }

    if (currentStep === 23) {
      setCurrentStep(24) // Go to "Como isso te ajuda?" (step-20c)
      setIsAnimating(false)
      return
    }

    if (currentStep === 24) {
      setCurrentStep(21) // Go to "Ótimo, você já tem uma base!" (step-20a)
      setIsAnimating(false)
      return
    }

    if (currentStep === 25) {
      setCurrentStep(26) // Go to Histórias de Sucesso
      setIsAnimating(false)
      return
    }

    if (currentStep === 26) {
      setCurrentStep(27) // Go to name input
      setIsAnimating(false)
      return
    }

    if (currentStep === 27) {
      setCurrentStep(28) // Go to email input
      setIsAnimating(false)
      return
    }

    if (currentStep === 28) {
      setCurrentStep(29) // Go to phone input
      setIsAnimating(false)
      return
    }

    if (currentStep === 29) {
      setCurrentStep(30) // Go to referral code
      setIsAnimating(false)
      return
    }

    if (currentStep === 30) {
      setCurrentStep(31) // Go to loading screen
      setIsAnimating(false)
      return
    }

    if (currentStep === 31) {
      setCurrentStep(32) // Go to results screen
      setIsAnimating(false)
      return
    }

    if (currentStep === 32) {
      setCurrentStep(33) // Go to quick login screen
      setIsAnimating(false)
      return
    }

    if (currentStep === 33) {
      await saveQuizToDatabase(updatedData)
      router.push("/subscription")
      return
    }

    if (currentStep < totalSteps) {
      setCurrentStep((prev) => prev + 1)
      setIsAnimating(false)
    } else {
      await saveQuizToDatabase(updatedData)
      router.push("/subscription")
    }
  }

  const saveQuizToDatabase = async (data: QuizData) => {
    try {
      const supabase = getSupabaseBrowserClient()

      const {
        data: { user },
      } = await supabase.auth.getUser()

      console.log("[v0] Saving quiz data to database, user:", user?.id || "anonymous")

      const { error } = await supabase.from("quiz_responses").insert({
        user_id: user?.id || null,
        workouts: data.workouts,
        goal: data.goal,
        height: data.height,
        weight: data.weight,
        gender: data.gender,
        birth_day: data.birthDate?.day,
        birth_month: data.birthDate?.month,
        birth_year: data.birthDate?.year,
        target_weight: data.targetWeight,
        source: data.source,
        weight_loss_speed: data.weightLossSpeed,
        summer_attempts: data.summerAttempts,
        end_of_year_feeling: data.endOfYearFeeling,
        obstacles: data.obstacles,
        goals: data.goals,
        name: data.name,
        email: data.email,
        phone: data.phone,
        referral_code: data.referralCode,
      })

      if (error) {
        console.error("[v0] Error saving quiz to database:", error)
      } else {
        console.log("[v0] Quiz saved successfully to database")
      }
    } catch (error) {
      console.error("[v0] Exception saving quiz:", error)
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setIsAnimating(true)
      setTimeout(() => {
        if (currentStep === 11 && skippedSteps) {
          setCurrentStep(7)
          setSkippedSteps(false)
        } else if (currentStep === 21) {
          if (quizData.knowsCalories === true) {
            setCurrentStep(20) // Back to calories question (Sim flow)
          } else {
            setCurrentStep(24) // Back to "Como isso te ajuda" (Não flow after explanation)
          }
        } else if (currentStep === 23) {
          setCurrentStep(20) // Back to calories question
        } else if (currentStep === 22) {
          setCurrentStep(21) // Back to "Ótimo base"
        } else if (currentStep === 24) {
          setCurrentStep(23) // Back to "Vamos te explicar"
        } else if (currentStep === 25) {
          setCurrentStep(24) // Back to "Como isso te ajuda"
        } else if (currentStep === 26) {
          // Check if came from "Sim" or "Não" flow
          if (quizData.knowsCalories === true) {
            setCurrentStep(22) // Back to demo (Sim flow)
          } else {
            setCurrentStep(25) // Back to demo (Não flow)
          }
        } else if (currentStep === 27) {
          setCurrentStep(26) // Back to success stories
        } else if (currentStep === 28) {
          setCurrentStep(27)
        } else if (currentStep === 29) {
          setCurrentStep(28)
        } else if (currentStep === 30) {
          setCurrentStep(29)
        } else if (currentStep === 31) {
          setCurrentStep(30)
        } else if (currentStep === 32) {
          setCurrentStep(31)
        } else if (currentStep === 33) {
          setCurrentStep(32)
        } else {
          setCurrentStep((prev) => prev - 1)
        }
        setIsAnimating(false)
      }, 300)
    } else {
      router.push("/")
    }
  }

  return (
    <div
      className="min-h-screen w-full bg-background flex items-center justify-center overflow-hidden"
      style={{
        height: "100dvh", // Dynamic viewport height for mobile browsers
        paddingTop: "env(safe-area-inset-top)",
        paddingBottom: "env(safe-area-inset-bottom)",
      }}
    >
      <div className="w-full max-w-md h-full flex flex-col px-4 py-1">
        {currentStep !== 22 && currentStep !== 25 && currentStep !== 31 && currentStep !== 32 && currentStep !== 33 && (
          <div className="flex-shrink-0 space-y-1.5 pb-2">
            <div className="flex justify-end">
              <LanguageSelector />
            </div>
            <QuizProgress current={getVisibleStep()} total={totalSteps} onBack={handleBack} />
          </div>
        )}

        <div
          key={currentStep}
          className={`flex-1 flex flex-col min-h-0 transition-all duration-300 ease-out ${
            isAnimating ? "opacity-0 translate-x-8" : "opacity-100 translate-x-0"
          }`}
        >
          {currentStep === 1 && <QuizStep1 onNext={handleNext} />}
          {currentStep === 2 && <QuizStep2 onNext={handleNext} />}
          {currentStep === 3 && <QuizStep3 onNext={handleNext} />}
          {currentStep === 4 && <QuizStep4 onNext={handleNext} initialData={quizData} />}
          {currentStep === 5 && <QuizStep5 onNext={handleNext} />}
          {currentStep === 6 && <QuizStep6 onNext={handleNext} />}
          {currentStep === 7 && <QuizStep7 onNext={handleNext} />}
          {currentStep === 8 && <QuizStep8 onNext={handleNext} initialWeight={quizData.weight} goal={quizData.goal} />}
          {currentStep === 9 && <QuizStep9 onNext={handleNext} quizData={quizData} />}
          {currentStep === 10 && <QuizStep10 onNext={handleNext} quizData={quizData} />}
          {currentStep === 11 && <QuizStep11 onNext={handleNext} quizData={quizData} />}
          {currentStep === 12 && <QuizStep12 onNext={handleNext} quizData={quizData} />}
          {currentStep === 13 && <QuizStep13 onNext={handleNext} quizData={quizData} />}
          {currentStep === 14 && <QuizStep14 onNext={handleNext} quizData={quizData} />}
          {currentStep === 15 && <QuizStep15 onNext={handleNext} quizData={quizData} />}
          {currentStep === 16 && <QuizStep16 onNext={handleNext} quizData={quizData} />}
          {currentStep === 17 && <QuizStep17 onNext={handleNext} quizData={quizData} />}
          {currentStep === 18 && <QuizStep18 onNext={handleNext} quizData={quizData} />}
          {currentStep === 19 && <QuizStep19 onNext={handleNext} quizData={quizData} />}
          {currentStep === 20 && <QuizStep20 onNext={handleNext} quizData={quizData} />}
          {currentStep === 21 && <QuizStep20a onNext={handleNext} quizData={quizData} />}
          {currentStep === 22 && <QuizStep21 onNext={handleNext} quizData={quizData} />}
          {currentStep === 23 && <QuizStep20b onNext={handleNext} quizData={quizData} />}
          {currentStep === 24 && <QuizStep20c onNext={handleNext} quizData={quizData} />}
          {currentStep === 25 && <QuizStep21 onNext={handleNext} quizData={quizData} />}
          {currentStep === 26 && <QuizStep22 onNext={handleNext} />}
          {currentStep === 27 && <QuizStep23 onNext={handleNext} />}
          {currentStep === 28 && <QuizStep24 onNext={handleNext} />}
          {currentStep === 29 && <QuizStep25 onNext={handleNext} />}
          {currentStep === 30 && <QuizStep26 onNext={handleNext} />}
          {currentStep === 31 && <QuizStep27 onNext={handleNext} />}
          {currentStep === 32 && <QuizStep28 onNext={handleNext} quizData={quizData} />}
          {currentStep === 33 && <QuizStep29QuickLogin onNext={handleNext} />}
        </div>
      </div>
    </div>
  )
}
