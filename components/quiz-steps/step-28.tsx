"use client"

import { useState, useEffect } from "react"
import type { QuizData } from "@/app/quiz/page"
import { useLanguage } from "@/lib/language-context"
import { Check, Heart, Edit2, X } from "lucide-react"
import { getSupabaseBrowserClient } from "@/lib/supabase/client"

type Step28Props = {
  onNext: (data: Partial<QuizData>) => void
  quizData: QuizData
}

type EditDialog = {
  type: "calories" | "carbs" | "protein" | "fats" | null
  value: number
}

function calculateAge(birthDate?: { day: number; month: number; year: number }): number {
  if (!birthDate) return 30 // default age
  const today = new Date()
  const birth = new Date(birthDate.year, birthDate.month - 1, birthDate.day)
  let age = today.getFullYear() - birth.getFullYear()
  const monthDiff = today.getMonth() - birth.getMonth()
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--
  }
  return age
}

function calculateBMR(weight: number, height: number, age: number, gender?: string): number {
  // Mifflin-St Jeor Equation
  if (gender === "female") {
    return 10 * weight + 6.25 * height - 5 * age - 161
  } else {
    return 10 * weight + 6.25 * height - 5 * age + 5
  }
}

function calculateTDEE(bmr: number, activityLevel?: string): number {
  // Activity multipliers
  const multipliers: { [key: string]: number } = {
    sedentary: 1.2,
    light: 1.375,
    moderate: 1.55,
    active: 1.725,
    "very-active": 1.9,
  }
  return bmr * (multipliers[activityLevel || "moderate"] || 1.55)
}

function calculateNutrition(quizData: QuizData) {
  const weight = quizData.weight || 70
  const height = quizData.height || 170
  const age = calculateAge(quizData.birthDate)
  const gender = quizData.gender
  const goal = quizData.goal
  const activityLevel = quizData.workouts
  const targetWeight = quizData.targetWeight || weight
  const actualWeightChange = targetWeight - weight

  const bmr = calculateBMR(weight, height, age, gender)
  const tdee = calculateTDEE(bmr, activityLevel)

  let calories = Math.round(tdee)
  let healthScore = 8

  if (goal === "lose") {
    // Deficit of 20% for weight loss
    calories = Math.round(tdee * 0.8)
    healthScore = 10
  } else if (goal === "gain") {
    // Surplus of 10% for weight gain
    calories = Math.round(tdee * 1.1)
    healthScore = 9
  } else {
    // Maintenance
    calories = Math.round(tdee)
    healthScore = 10
  }

  // Calculate macros (protein: 30%, carbs: 45%, fats: 25%)
  const protein = Math.round((calories * 0.3) / 4) // 4 cal per gram
  const carbs = Math.round((calories * 0.45) / 4) // 4 cal per gram
  const fats = Math.round((calories * 0.25) / 9) // 9 cal per gram

  return { calories, protein, carbs, fats, weightChange: actualWeightChange, healthScore }
}

function getTargetDate(): string {
  const today = new Date()
  const target = new Date(today)
  target.setDate(target.getDate() + 90)

  return target.toLocaleDateString("pt-BR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })
}

export function QuizStep28({ onNext, quizData }: Step28Props) {
  const { language } = useLanguage()
  const [showElements, setShowElements] = useState({
    checkmark: false,
    title: false,
    subtitle: false,
    goal: false,
    recommendation: false,
    macros: false,
    health: false,
    goals: false,
    research: false,
    button: false,
  })

  const [nutrition, setNutrition] = useState(calculateNutrition(quizData))
  const [editDialog, setEditDialog] = useState<EditDialog>({ type: null, value: 0 })
  const [isSaving, setIsSaving] = useState(false)

  const targetDate = getTargetDate()

  useEffect(() => {
    const delays = [100, 300, 500, 700, 900, 1100, 1300, 1500, 1700, 1900]
    const elements = [
      "checkmark",
      "title",
      "subtitle",
      "goal",
      "recommendation",
      "macros",
      "health",
      "goals",
      "research",
      "button",
    ]

    elements.forEach((element, index) => {
      setTimeout(() => {
        setShowElements((prev) => ({ ...prev, [element]: true }))
      }, delays[index])
    })
  }, [])

  const openEditDialog = (type: "calories" | "carbs" | "protein" | "fats") => {
    setEditDialog({ type, value: nutrition[type] })
  }

  const saveEditedValue = () => {
    if (editDialog.type) {
      setNutrition((prev) => ({
        ...prev,
        [editDialog.type!]: editDialog.value,
      }))
      setEditDialog({ type: null, value: 0 })
    }
  }

  const saveToDatabase = async () => {
    setIsSaving(true)
    try {
      const supabase = getSupabaseBrowserClient()

      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        console.log("[v0] No user found, skipping database save")
        onNext({})
        return
      }

      const today = new Date()
      const target = new Date(today)
      target.setDate(target.getDate() + 90)

      const { error } = await supabase.from("quiz_responses").upsert(
        {
          user_id: user.id,
          calories: nutrition.calories,
          protein: nutrition.protein,
          carbs: nutrition.carbs,
          fats: nutrition.fats,
          health_score: nutrition.healthScore,
          target_date: target.toISOString().split("T")[0],
          weight_change: nutrition.weightChange,
          updated_at: new Date().toISOString(),
        },
        {
          onConflict: "user_id",
        },
      )

      if (error) {
        console.error("[v0] Error saving to database:", error)
      } else {
        console.log("[v0] Successfully saved personalized plan to database")
      }
    } catch (error) {
      console.error("[v0] Error in saveToDatabase:", error)
    } finally {
      setIsSaving(false)
      onNext({})
    }
  }

  const getGoalText = () => {
    const goal = quizData.goal
    if (goal === "lose") return language === "pt-BR" ? "perder" : language === "en" ? "lose" : "perder"
    if (goal === "gain") return language === "pt-BR" ? "ganhar" : language === "en" ? "gain" : "ganar"
    return language === "pt-BR" ? "manter" : language === "en" ? "maintain" : "mantener"
  }

  const getGoalMessage = () => {
    const goal = quizData.goal
    const weightChange = Math.abs(nutrition.weightChange).toFixed(1)

    if (goal === "lose") {
      return language === "pt-BR" ? `${weightChange} kg até ${targetDate}` : `${weightChange} kg by ${targetDate}`
    } else if (goal === "gain") {
      return language === "pt-BR" ? `${weightChange} kg até ${targetDate}` : `${weightChange} kg by ${targetDate}`
    } else {
      return language === "pt-BR" ? `Manter o peso até ${targetDate}` : `Maintain weight until ${targetDate}`
    }
  }

  const content = {
    "pt-BR": {
      title: "Parabéns!",
      subtitle: "seu plano personalizado está pronto!",
      goalPrefix: "Você deve",
      goalSuffix: "peso:",
      recommendation: "Recomendação diária",
      edit: "Você pode editar isso a qualquer momento",
      calories: "Calorias",
      carbs: "Carbo",
      protein: "Proteína",
      fats: "Gorduras",
      healthScore: "Health Score",
      goalsTitle: "Como alcançar seus objetivos",
      goal1: "Use pontuações de saúde para melhorar sua rotina",
      goal2: "Acompanhe sua alimentação",
      goal3: "Siga sua recomendação diária de calorias",
      goal4: "Equilibre seus carboidratos, proteínas e gorduras",
      research: "Pesquisas que utilizamos para considerar nossos cálculos:",
      button: "Pegar os seus 3 dias grátis",
      editTitle: "Editar",
      save: "Salvar",
      cancel: "Cancelar",
    },
    en: {
      title: "Congratulations!",
      subtitle: "your personalized plan is ready!",
      goalPrefix: "You should",
      goalSuffix: "weight:",
      recommendation: "Daily recommendation",
      edit: "You can edit this at any time",
      calories: "Calories",
      carbs: "Carbs",
      protein: "Protein",
      fats: "Fats",
      healthScore: "Health Score",
      goalsTitle: "How to achieve your goals",
      goal1: "Use health scores to improve your routine",
      goal2: "Track your food intake",
      goal3: "Follow your daily calorie recommendation",
      goal4: "Balance your carbohydrates, proteins and fats",
      research: "Research we use to consider our calculations:",
      button: "Get your 3 free days",
      editTitle: "Edit",
      save: "Save",
      cancel: "Cancel",
    },
    es: {
      title: "¡Felicitaciones!",
      subtitle: "¡tu plan personalizado está listo!",
      goalPrefix: "Debes",
      goalSuffix: "peso:",
      recommendation: "Recomendación diaria",
      edit: "Puedes editar esto en cualquier momento",
      calories: "Calorías",
      carbs: "Carbohidratos",
      protein: "Proteína",
      fats: "Grasas",
      healthScore: "Puntuación de Salud",
      goalsTitle: "Cómo alcanzar tus objetivos",
      goal1: "Usa puntuaciones de salud para mejorar tu rutina",
      goal2: "Sigue tu alimentación",
      goal3: "Sigue tu recomendación diaria de calorías",
      goal4: "Equilibra tus carbohidratos, proteínas y grasas",
      research: "Investigaciones que utilizamos para considerar nuestros cálculos:",
      button: "Obtén tus 3 días gratis",
      editTitle: "Editar",
      save: "Guardar",
      cancel: "Cancelar",
    },
  }

  const {
    title,
    subtitle,
    goalPrefix,
    goalSuffix,
    recommendation,
    edit,
    calories,
    carbs,
    protein,
    fats,
    healthScore,
    goalsTitle,
    goal1,
    goal2,
    goal3,
    goal4,
    research,
    button,
    editTitle,
    save,
    cancel,
  } = content[language]

  return (
    <div className="min-h-screen bg-white">
      <div className="pb-32 overflow-y-auto max-h-screen">
        <div className="max-w-md mx-auto px-5 pt-12 space-y-8">
          <div
            className={`flex justify-center transition-all duration-700 ${showElements.checkmark ? "opacity-100 scale-100" : "opacity-0 scale-50"}`}
          >
            <div className="bg-black rounded-full p-6">
              <Check className="w-12 h-12 text-white" strokeWidth={3} />
            </div>
          </div>

          <div
            className={`text-center space-y-2 transition-all duration-700 ${showElements.title ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
          >
            <h1 className="text-4xl font-bold">{title}</h1>
            <p className="text-gray-600 text-lg">{subtitle}</p>
          </div>

          <div
            className={`text-center space-y-2 transition-all duration-700 ${showElements.goal ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
          >
            {quizData.goal !== "maintain" && (
              <>
                <p className="text-base text-gray-700">
                  {goalPrefix} <strong>{getGoalText()}</strong> {goalSuffix}
                </p>
                <div className="bg-gray-100 rounded-2xl py-4 px-6">
                  <p className="text-gray-600 font-medium">{getGoalMessage()}</p>
                </div>
              </>
            )}
          </div>

          <div
            className={`bg-gray-50 rounded-3xl p-6 space-y-6 transition-all duration-700 ${showElements.recommendation ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
          >
            <div>
              <h2 className="text-xl font-bold mb-1">{recommendation}</h2>
              <p className="text-sm text-gray-600">{edit}</p>
            </div>

            <div
              className={`grid grid-cols-2 gap-4 transition-all duration-700 ${showElements.macros ? "opacity-100" : "opacity-0"}`}
            >
              <button
                onClick={() => openEditDialog("calories")}
                className="bg-white rounded-2xl p-6 text-center hover:bg-gray-50 transition-colors"
              >
                <p className="text-sm text-gray-600 mb-3">{calories}</p>
                <div className="relative w-28 h-28 mx-auto">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle
                      cx="56"
                      cy="56"
                      r="50"
                      stroke="currentColor"
                      strokeWidth="8"
                      fill="none"
                      className="text-gray-200"
                    />
                    <circle
                      cx="56"
                      cy="56"
                      r="50"
                      stroke="currentColor"
                      strokeWidth="8"
                      fill="none"
                      className="text-black transition-all duration-1000"
                      strokeDasharray={`${2 * Math.PI * 50}`}
                      strokeDashoffset={`${2 * Math.PI * 50 * 0.15}`}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-3xl font-bold">{nutrition.calories}</span>
                  </div>
                </div>
                <Edit2 className="w-5 h-5 text-gray-400 mx-auto mt-3" />
              </button>

              <button
                onClick={() => openEditDialog("carbs")}
                className="bg-white rounded-2xl p-6 text-center hover:bg-gray-50 transition-colors"
              >
                <p className="text-sm text-gray-600 mb-3">{carbs}</p>
                <div className="relative w-28 h-28 mx-auto">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle
                      cx="56"
                      cy="56"
                      r="50"
                      stroke="currentColor"
                      strokeWidth="8"
                      fill="none"
                      className="text-gray-200"
                    />
                    <circle
                      cx="56"
                      cy="56"
                      r="50"
                      stroke="currentColor"
                      strokeWidth="8"
                      fill="none"
                      className="text-orange-400 transition-all duration-1000"
                      strokeDasharray={`${2 * Math.PI * 50}`}
                      strokeDashoffset={`${2 * Math.PI * 50 * 0.3}`}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-3xl font-bold">{nutrition.carbs}g</span>
                  </div>
                </div>
                <Edit2 className="w-5 h-5 text-gray-400 mx-auto mt-3" />
              </button>

              <button
                onClick={() => openEditDialog("protein")}
                className="bg-white rounded-2xl p-6 text-center hover:bg-gray-50 transition-colors"
              >
                <p className="text-sm text-gray-600 mb-3">{protein}</p>
                <div className="relative w-28 h-28 mx-auto">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle
                      cx="56"
                      cy="56"
                      r="50"
                      stroke="currentColor"
                      strokeWidth="8"
                      fill="none"
                      className="text-gray-200"
                    />
                    <circle
                      cx="56"
                      cy="56"
                      r="50"
                      stroke="currentColor"
                      strokeWidth="8"
                      fill="none"
                      className="text-red-400 transition-all duration-1000"
                      strokeDasharray={`${2 * Math.PI * 50}`}
                      strokeDashoffset={`${2 * Math.PI * 50 * 0.45}`}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-3xl font-bold">{nutrition.protein}g</span>
                  </div>
                </div>
                <Edit2 className="w-5 h-5 text-gray-400 mx-auto mt-3" />
              </button>

              <button
                onClick={() => openEditDialog("fats")}
                className="bg-white rounded-2xl p-6 text-center hover:bg-gray-50 transition-colors"
              >
                <p className="text-sm text-gray-600 mb-3">{fats}</p>
                <div className="relative w-28 h-28 mx-auto">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle
                      cx="56"
                      cy="56"
                      r="50"
                      stroke="currentColor"
                      strokeWidth="8"
                      fill="none"
                      className="text-gray-200"
                    />
                    <circle
                      cx="56"
                      cy="56"
                      r="50"
                      stroke="currentColor"
                      strokeWidth="8"
                      fill="none"
                      className="text-blue-400 transition-all duration-1000"
                      strokeDasharray={`${2 * Math.PI * 50}`}
                      strokeDashoffset={`${2 * Math.PI * 50 * 0.5}`}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-3xl font-bold">{nutrition.fats}g</span>
                  </div>
                </div>
                <Edit2 className="w-5 h-5 text-gray-400 mx-auto mt-3" />
              </button>
            </div>

            <div
              className={`bg-white rounded-2xl p-6 flex items-center gap-4 transition-all duration-700 ${showElements.health ? "opacity-100" : "opacity-0"}`}
            >
              <div className="bg-red-50 rounded-xl p-3">
                <Heart className="w-8 h-8 text-red-500" fill="currentColor" />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-center mb-2">
                  <p className="font-bold text-gray-900">{healthScore}</p>
                  <p className="text-2xl font-bold">{nutrition.healthScore}/10</p>
                </div>
                <div className="h-2.5 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-green-500 rounded-full transition-all duration-1000"
                    style={{ width: `${nutrition.healthScore * 10}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          <div
            className={`bg-gray-50 rounded-3xl p-6 space-y-4 transition-all duration-700 ${showElements.goals ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
          >
            <h2 className="text-xl font-bold">{goalsTitle}</h2>

            <div className="space-y-3">
              <div className="bg-white rounded-2xl p-5 flex items-center gap-4">
                <div className="bg-gray-100 rounded-xl p-3">
                  <Heart className="w-6 h-6 text-gray-700" />
                </div>
                <p className="text-sm text-gray-800 flex-1">{goal1}</p>
              </div>

              <div className="bg-white rounded-2xl p-5 flex items-center gap-4">
                <div className="bg-gray-100 rounded-xl p-3">
                  <Heart className="w-6 h-6 text-gray-700" />
                </div>
                <p className="text-sm text-gray-800 flex-1">{goal2}</p>
              </div>

              <div className="bg-white rounded-2xl p-5 flex items-center gap-4">
                <div className="bg-gray-100 rounded-xl p-3">
                  <svg className="w-6 h-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <p className="text-sm text-gray-800 flex-1">{goal3}</p>
              </div>

              <div className="bg-white rounded-2xl p-5 flex items-center gap-4">
                <div className="bg-gray-100 rounded-xl p-3">
                  <svg className="w-6 h-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                  </svg>
                </div>
                <p className="text-sm text-gray-800 flex-1">{goal4}</p>
              </div>
            </div>
          </div>

          <div
            className={`space-y-3 transition-all duration-700 ${showElements.research ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
          >
            <p className="text-sm font-bold text-gray-900">{research}</p>
            <ul className="space-y-2 text-sm text-blue-600">
              <li>• Basal Metabolic Rate (BMR) - Healthline</li>
              <li>• Calorie Counting Made Easy - Harvard Health</li>
              <li>• Metabolic Rate Research - PubMed</li>
              <li>• BMR Estimation Accuracy - Mayo Clinic Proceedings</li>
              <li>• Best BMR Equations - MacroFactor</li>
            </ul>
          </div>
        </div>
      </div>

      <div
        className={`fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-5 transition-all duration-700 ${showElements.button ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
      >
        <div className="max-w-md mx-auto">
          <button
            onClick={saveToDatabase}
            disabled={isSaving}
            className="w-full bg-black hover:bg-gray-900 text-white py-5 text-lg font-bold rounded-full transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSaving ? "Salvando..." : button}
          </button>
        </div>
      </div>

      {editDialog.type && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold">
                {editTitle}{" "}
                {editDialog.type === "calories"
                  ? calories
                  : editDialog.type === "carbs"
                    ? carbs
                    : editDialog.type === "protein"
                      ? protein
                      : fats}
              </h3>
              <button
                onClick={() => setEditDialog({ type: null, value: 0 })}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div>
              <input
                type="number"
                value={editDialog.value}
                onChange={(e) => setEditDialog({ ...editDialog, value: Number.parseInt(e.target.value) || 0 })}
                className="w-full text-4xl font-bold text-center border-2 border-gray-200 rounded-2xl py-4 focus:border-black focus:outline-none"
              />
              <p className="text-center text-gray-500 mt-2">{editDialog.type === "calories" ? "" : "g"}</p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setEditDialog({ type: null, value: 0 })}
                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-900 py-4 rounded-full font-semibold transition-colors"
              >
                {cancel}
              </button>
              <button
                onClick={saveEditedValue}
                className="flex-1 bg-black hover:bg-gray-900 text-white py-4 rounded-full font-semibold transition-colors"
              >
                {save}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
