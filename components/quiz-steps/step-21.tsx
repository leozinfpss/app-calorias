"use client"

import { useState, useEffect } from "react"
import type { QuizData } from "@/app/quiz/page"
import {
  Camera,
  ChevronLeft,
  Flame,
  Beef,
  Bean as Bread,
  Sandwich,
  Heart,
  X,
  CheckCircle2,
  AlertCircle,
} from "lucide-react"

type Step21Props = {
  onNext: (data: Partial<QuizData>) => void
  onBack: () => void
  quizData: QuizData
}

export function QuizStep21({ onNext, onBack }: Step21Props) {
  const [tutorialStep, setTutorialStep] = useState(0)
  const [showCamera, setShowCamera] = useState(false)
  const [analyzing, setAnalyzing] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const [fadeIn, setFadeIn] = useState(false)
  const [showElements, setShowElements] = useState({
    image: false,
    title: false,
    calories: false,
    macros: false,
    health: false,
    analysis: false,
    strengths: false,
    improvements: false,
    ingredients: false,
    portions: false,
  })

  useEffect(() => {
    setTimeout(() => setFadeIn(true), 100)
  }, [])

  useEffect(() => {
    if (showResults) {
      const delays = [0, 150, 300, 450, 600, 750, 900, 1050, 1200]
      const elements = [
        "image",
        "title",
        "calories",
        "macros",
        "health",
        "analysis",
        "strengths",
        "improvements",
        "ingredients",
      ]

      elements.forEach((element, index) => {
        setTimeout(() => {
          setShowElements((prev) => ({ ...prev, [element]: true }))
        }, delays[index])
      })
    } else {
      setShowElements({
        image: false,
        title: false,
        calories: false,
        macros: false,
        health: false,
        analysis: false,
        strengths: false,
        improvements: false,
        ingredients: false,
        portions: false,
      })
    }
  }, [showResults])

  const handleContinueTutorial = () => {
    if (tutorialStep === 0) {
      setFadeIn(false)
      setTimeout(() => {
        setTutorialStep(1)
        setTimeout(() => setFadeIn(true), 50)
      }, 300)
    } else {
      setFadeIn(false)
      setTimeout(() => {
        setShowCamera(true)
        setTimeout(() => setFadeIn(true), 50)
      }, 300)
    }
  }

  const handleTakePhoto = () => {
    setAnalyzing(true)
    setTimeout(() => {
      setAnalyzing(false)
      setShowCamera(false)
      setShowResults(true)
      setTimeout(() => setFadeIn(true), 50)
    }, 2500)
  }

  const handleBack = () => {
    if (showResults) {
      setFadeIn(false)
      setTimeout(() => {
        setShowResults(false)
        setShowCamera(true)
        setTimeout(() => setFadeIn(true), 50)
      }, 300)
    } else if (showCamera) {
      setFadeIn(false)
      setTimeout(() => {
        setShowCamera(false)
        setTutorialStep(1)
        setTimeout(() => setFadeIn(true), 50)
      }, 300)
    }
  }

  const handleXClick = () => {
    onBack()
  }

  if (!showCamera && !showResults) {
    return (
      <div className="h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center p-4">
        <div className="relative w-full max-w-sm bg-black rounded-[3rem] shadow-2xl border-8 border-gray-800 overflow-hidden">
          {/* Phone notch */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-7 bg-gray-800 rounded-b-3xl z-30" />

          {/* Phone screen content */}
          <div className="relative h-[calc(100vh-2rem)] max-h-[800px] bg-black overflow-hidden">
            <div className="absolute inset-0 -z-10">
              <img src="/chicken-pasta-salad.jpg" alt="Background" className="w-full h-full object-cover opacity-90" />
              <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60" />
            </div>

            {/* X button */}
            <div className="absolute top-6 left-6 z-20">
              <button
                onClick={handleXClick}
                className="bg-black/30 backdrop-blur-md rounded-full p-2.5 hover:bg-black/40 active:scale-95 transition-all"
              >
                <X className="w-6 h-6 text-white" />
              </button>
            </div>

            <div className="flex-1 flex items-center justify-center px-8 h-full">
              <div className="relative w-full max-w-md aspect-[4/3]">
                <div className="absolute -top-1 -left-1 w-24 h-24 border-t-[5px] border-l-[5px] border-white rounded-tl-3xl shadow-lg shadow-white/20" />
                <div className="absolute -top-1 -right-1 w-24 h-24 border-t-[5px] border-r-[5px] border-white rounded-tr-3xl shadow-lg shadow-white/20" />
                <div className="absolute -bottom-1 -left-1 w-24 h-24 border-b-[5px] border-l-[5px] border-white rounded-bl-3xl shadow-lg shadow-white/20" />
                <div className="absolute -bottom-1 -right-1 w-24 h-24 border-b-[5px] border-r-[5px] border-white rounded-br-3xl shadow-lg shadow-white/20" />
              </div>
            </div>

            <div
              className={`absolute bottom-6 left-5 right-5 transition-all duration-500 ease-out ${
                fadeIn ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-8 scale-95"
              }`}
            >
              <div className="bg-white rounded-[28px] p-7 shadow-2xl backdrop-blur-xl">
                {tutorialStep === 0 ? (
                  <>
                    <p className="text-center text-gray-800 font-medium text-[17px] leading-relaxed mb-7 px-2">
                      Clique no botão pra tirar uma foto e ver como é dentro do app
                    </p>
                    <div className="flex justify-center gap-2.5 mb-6">
                      <div className="w-3 h-3 rounded-full bg-orange-500 shadow-sm" />
                      <div className="w-3 h-3 rounded-full bg-gray-300" />
                    </div>
                    <button
                      onClick={handleContinueTutorial}
                      className="w-full text-orange-500 font-bold text-[18px] py-3 active:scale-[0.98] transition-transform rounded-2xl hover:bg-orange-50"
                    >
                      Continue
                    </button>
                  </>
                ) : (
                  <>
                    <h3 className="text-center text-gray-900 font-bold text-[19px] mb-3.5 leading-snug">
                      Um pouco de experiência do app para você
                    </h3>
                    <p className="text-center text-gray-600 text-[15px] leading-relaxed mb-7 px-1">
                      Você vai centralizar o prato na área destacada
                    </p>
                    <div className="flex justify-center gap-2.5 mb-6">
                      <div className="w-3 h-3 rounded-full bg-gray-300" />
                      <div className="w-3 h-3 rounded-full bg-orange-500 shadow-sm" />
                    </div>
                    <button
                      onClick={handleContinueTutorial}
                      className="w-full text-orange-500 font-bold text-[18px] py-3 active:scale-[0.98] transition-transform rounded-2xl hover:bg-orange-50"
                    >
                      Continuar
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (showCamera && !showResults) {
    return (
      <div className="h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center p-4">
        <div className="relative w-full max-w-sm bg-black rounded-[3rem] shadow-2xl border-8 border-gray-800 overflow-hidden">
          {/* Phone notch */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-7 bg-gray-800 rounded-b-3xl z-30" />

          {/* Phone screen content */}
          <div
            className={`relative h-[calc(100vh-2rem)] max-h-[800px] bg-black transition-opacity duration-500 ${fadeIn ? "opacity-100" : "opacity-0"}`}
          >
            <div className="absolute inset-0">
              <img src="/chicken-pasta-salad.jpg" alt="Camera view" className="w-full h-full object-cover" />
            </div>

            <button
              onClick={handleBack}
              className="absolute top-6 left-6 z-20 bg-black/40 backdrop-blur-md rounded-full p-2.5 hover:bg-black/50 active:scale-95 transition-all"
            >
              <ChevronLeft className="w-7 h-7 text-white" />
            </button>

            <div className="absolute inset-0 flex items-center justify-center pointer-events-none px-8">
              <div className="relative w-full max-w-md aspect-[4/3]">
                <div className="absolute -top-1 -left-1 w-24 h-24 border-t-[5px] border-l-[5px] border-white rounded-tl-3xl shadow-lg shadow-white/20" />
                <div className="absolute -top-1 -right-1 w-24 h-24 border-t-[5px] border-r-[5px] border-white rounded-tr-3xl shadow-lg shadow-white/20" />
                <div className="absolute -bottom-1 -left-1 w-24 h-24 border-b-[5px] border-l-[5px] border-white rounded-bl-3xl shadow-lg shadow-white/20" />
                <div className="absolute -bottom-1 -right-1 w-24 h-24 border-b-[5px] border-r-[5px] border-white rounded-br-3xl shadow-lg shadow-white/20" />
              </div>
            </div>

            {analyzing && (
              <div className="absolute inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-30 animate-in fade-in duration-300">
                <div className="text-center">
                  <div className="inline-block w-16 h-16 border-[3px] border-white/20 border-t-white rounded-full animate-spin mb-5" />
                  <p className="text-white text-xl font-semibold tracking-tight">Analisando seu prato...</p>
                </div>
              </div>
            )}

            <div className="absolute bottom-12 inset-x-0 z-20">
              <div className="flex justify-center">
                <button
                  onClick={handleTakePhoto}
                  disabled={analyzing}
                  className="relative bg-white rounded-full p-5 shadow-2xl active:scale-95 transition-all disabled:opacity-50 hover:shadow-white/20"
                >
                  <div
                    className="absolute inset-0 rounded-full bg-white/50 animate-ping"
                    style={{ animationDuration: "2s" }}
                  />
                  <Camera className="relative w-10 h-10 text-gray-900" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (showResults) {
    return (
      <div
        className={`h-full bg-gradient-to-b from-gray-50 to-white overflow-y-auto transition-opacity duration-700 ${
          fadeIn ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="sticky top-0 bg-white/95 backdrop-blur-lg z-10 px-5 pt-6 pb-4 border-b border-gray-100">
          <button
            onClick={handleBack}
            className="text-gray-700 active:scale-95 transition-transform hover:bg-gray-100 rounded-full p-1"
          >
            <ChevronLeft className="w-7 h-7" />
          </button>
        </div>

        <div className="px-5 pb-8 space-y-6">
          <div
            className={`relative w-full aspect-[16/10] rounded-3xl overflow-hidden bg-gray-200 shadow-lg transition-all duration-700 ease-out ${
              showElements.image ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-6 scale-95"
            }`}
          >
            <img src="/chicken-pasta-salad.jpg" alt="Prato analisado" className="w-full h-full object-cover" />
          </div>

          <h1
            className={`text-2xl font-bold text-gray-900 leading-tight tracking-tight transition-all duration-700 ease-out ${
              showElements.title ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            Salada de Macarrão com Frango Grelhado e Iogurte Natural
          </h1>

          <div
            className={`bg-gradient-to-br from-orange-50 to-orange-100/50 rounded-3xl p-6 shadow-sm transition-all duration-700 ease-out ${
              showElements.calories ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-6 scale-95"
            }`}
          >
            <div className="flex items-center gap-5">
              <div className="bg-gradient-to-br from-orange-400 to-orange-500 rounded-2xl p-4 shadow-md shadow-orange-500/30">
                <Flame className="w-9 h-9 text-white drop-shadow-sm" fill="currentColor" />
              </div>
              <div>
                <p className="text-sm text-gray-700 font-semibold mb-1.5 tracking-wide">Calorias</p>
                <p className="text-6xl font-bold text-gray-900 tracking-tight">610</p>
              </div>
            </div>
          </div>

          <div
            className={`grid grid-cols-3 gap-3.5 transition-all duration-700 ease-out ${
              showElements.macros ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            <div className="bg-white rounded-2xl p-5 flex flex-col items-center text-center shadow-sm border border-gray-100">
              <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-xl p-3 mb-3.5 shadow-sm">
                <Beef className="w-6 h-6 text-red-600" />
              </div>
              <p className="text-xs text-gray-600 font-semibold mb-1.5">Proteínas</p>
              <p className="text-2xl font-bold text-gray-900">49g</p>
            </div>

            <div className="bg-white rounded-2xl p-5 flex flex-col items-center text-center shadow-sm border border-gray-100">
              <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl p-3 mb-3.5 shadow-sm">
                <Bread className="w-6 h-6 text-yellow-600" />
              </div>
              <p className="text-xs text-gray-600 font-semibold mb-1.5">Carbos</p>
              <p className="text-2xl font-bold text-gray-900">45g</p>
            </div>

            <div className="bg-white rounded-2xl p-5 flex flex-col items-center text-center shadow-sm border border-gray-100">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-3 mb-3.5 shadow-sm">
                <Sandwich className="w-6 h-6 text-blue-600" />
              </div>
              <p className="text-xs text-gray-600 font-semibold mb-1.5">Gorduras</p>
              <p className="text-2xl font-bold text-gray-900">21g</p>
            </div>
          </div>

          <div
            className={`bg-white rounded-3xl p-6 shadow-sm border border-gray-100 transition-all duration-700 ease-out ${
              showElements.health ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            <div className="flex items-center gap-5">
              <div className="bg-gradient-to-br from-red-50 to-pink-50 rounded-2xl p-4 shadow-sm">
                <Heart className="w-8 h-8 text-red-500 drop-shadow-sm" fill="currentColor" />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-center mb-3">
                  <p className="text-base font-bold text-gray-900">Pontuação de Saúde</p>
                  <p className="text-xl font-bold text-gray-900">9/10</p>
                </div>
                <div className="h-3 bg-gray-200 rounded-full overflow-hidden shadow-inner">
                  <div
                    className={`h-full bg-gradient-to-r from-green-500 to-green-400 rounded-full transition-all duration-1000 ease-out shadow-sm ${
                      showElements.health ? "w-[90%]" : "w-0"
                    }`}
                  />
                </div>
              </div>
            </div>
          </div>

          <div
            className={`bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-3xl p-6 shadow-sm border border-blue-200/50 transition-all duration-700 ease-out ${
              showElements.analysis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <div className="bg-blue-500 rounded-lg p-2">
                <Heart className="w-5 h-5 text-white" />
              </div>
              Análise Nutricional
            </h2>
            <div className="space-y-3 text-gray-700 leading-relaxed">
              <p className="flex items-start gap-2">
                <span className="text-blue-600 mt-0.5">•</span>
                <span>
                  <strong>Alta em proteínas magras (49g):</strong> frango e queijo branco são fontes de proteína de alta
                  qualidade.
                </span>
              </p>
              <p className="flex items-start gap-2">
                <span className="text-blue-600 mt-0.5">•</span>
                <span>
                  <strong>Carboidratos equilibrados (45g):</strong> vêm do macarrão integral e vegetais.
                </span>
              </p>
              <p className="flex items-start gap-2">
                <span className="text-blue-600 mt-0.5">•</span>
                <span>
                  <strong>Gorduras boas (21g):</strong> principalmente do abacate e azeite.
                </span>
              </p>
              <p className="flex items-start gap-2">
                <span className="text-blue-600 mt-0.5">•</span>
                <span>
                  Boa quantidade de <strong>fibras e micronutrientes</strong> (vitaminas A, C, E, cálcio e potássio).
                </span>
              </p>
            </div>
          </div>

          <div
            className={`bg-gradient-to-br from-green-50 to-green-100/50 rounded-3xl p-6 shadow-sm border border-green-200/50 transition-all duration-700 ease-out ${
              showElements.strengths ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <div className="bg-green-500 rounded-lg p-2">
                <CheckCircle2 className="w-5 h-5 text-white" />
              </div>
              Pontos Fortes
            </h2>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="bg-green-500 rounded-full p-1 mt-0.5">
                  <CheckCircle2 className="w-4 h-4 text-white" />
                </div>
                <p className="text-gray-700 flex-1">Rico em nutrientes e proteínas</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="bg-green-500 rounded-full p-1 mt-0.5">
                  <CheckCircle2 className="w-4 h-4 text-white" />
                </div>
                <p className="text-gray-700 flex-1">Baixo em gordura saturada</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="bg-green-500 rounded-full p-1 mt-0.5">
                  <CheckCircle2 className="w-4 h-4 text-white" />
                </div>
                <p className="text-gray-700 flex-1">Inclui gorduras boas e fibras</p>
              </div>
            </div>
          </div>

          <div
            className={`bg-gradient-to-br from-yellow-50 to-yellow-100/50 rounded-3xl p-6 shadow-sm border border-yellow-200/50 transition-all duration-700 ease-out ${
              showElements.improvements ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <div className="bg-yellow-500 rounded-lg p-2">
                <AlertCircle className="w-5 h-5 text-white" />
              </div>
              Como pode melhorar
            </h2>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="bg-yellow-500 rounded-full p-1 mt-0.5 flex-shrink-0">
                  <AlertCircle className="w-4 h-4 text-white" />
                </div>
                <p className="text-gray-700 flex-1">Adicione mais vegetais folhosos para aumentar fibras e vitaminas</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="bg-yellow-500 rounded-full p-1 mt-0.5 flex-shrink-0">
                  <AlertCircle className="w-4 h-4 text-white" />
                </div>
                <p className="text-gray-700 flex-1">Considere reduzir a porção de macarrão se busca perder peso</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="bg-yellow-500 rounded-full p-1 mt-0.5 flex-shrink-0">
                  <AlertCircle className="w-4 h-4 text-white" />
                </div>
                <p className="text-gray-700 flex-1">
                  Use temperos naturais para realçar o sabor sem adicionar calorias
                </p>
              </div>
            </div>
          </div>

          <div
            className={`space-y-4 pt-2 transition-all duration-700 ease-out ${
              showElements.ingredients ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            <h2 className="text-xl font-bold text-gray-900 tracking-tight">Ingredientes</h2>
            <div className="grid grid-cols-3 gap-3.5">
              <div className="bg-white rounded-2xl p-4 text-center shadow-sm border border-gray-100">
                <p className="text-[11px] font-bold text-gray-900 mb-2.5 leading-tight">Peito de frango grelhado</p>
                <p className="text-lg font-bold text-gray-900">330 Kcal</p>
              </div>
              <div className="bg-white rounded-2xl p-4 text-center shadow-sm border border-gray-100">
                <p className="text-[11px] font-bold text-gray-900 mb-2.5 leading-tight">Macarrão integral cozido</p>
                <p className="text-lg font-bold text-gray-900">110 Kcal</p>
              </div>
              <div className="bg-white rounded-2xl p-4 text-center shadow-sm border border-gray-100">
                <p className="text-[11px] font-bold text-gray-900 mb-2.5 leading-tight">Abacate</p>
                <p className="text-lg font-bold text-gray-900">65 Kcal</p>
              </div>
              <div className="bg-white rounded-2xl p-4 text-center shadow-sm border border-gray-100">
                <p className="text-[11px] font-bold text-gray-900 mb-2.5 leading-tight">Queijo branco em cubos</p>
                <p className="text-lg font-bold text-gray-900">70 Kcal</p>
              </div>
              <div className="bg-white rounded-2xl p-4 text-center shadow-sm border border-gray-100">
                <p className="text-[11px] font-bold text-gray-900 mb-2.5 leading-tight">Legumes variados</p>
                <p className="text-lg font-bold text-gray-900">45 Kcal</p>
              </div>
              <div className="bg-white rounded-2xl p-4 text-center shadow-sm border border-gray-100">
                <p className="text-[11px] font-bold text-gray-900 mb-2.5 leading-tight">Iogurte natural light</p>
                <p className="text-lg font-bold text-gray-900">25 Kcal</p>
              </div>
              <div className="bg-white rounded-2xl p-4 text-center shadow-sm border border-gray-100">
                <p className="text-[11px] font-bold text-gray-900 mb-2.5 leading-tight">Azeite de oliva</p>
                <p className="text-lg font-bold text-gray-900">30 Kcal</p>
              </div>
            </div>
          </div>

          <div
            className={`space-y-4 transition-all duration-700 ease-out ${
              showElements.ingredients ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            <h2 className="text-xl font-bold text-gray-900 tracking-tight">Porções</h2>
            <div className="grid grid-cols-3 gap-3.5">
              <div className="bg-white rounded-2xl p-4 text-center shadow-sm border border-gray-100">
                <p className="text-[11px] font-bold text-gray-900 mb-2.5 leading-tight">Peito de frango grelhado</p>
                <p className="text-lg font-bold text-gray-900">200g</p>
              </div>
              <div className="bg-white rounded-2xl p-4 text-center shadow-sm border border-gray-100">
                <p className="text-[11px] font-bold text-gray-900 mb-2.5 leading-tight">Macarrão integral</p>
                <p className="text-lg font-bold text-gray-900">80g</p>
              </div>
              <div className="bg-white rounded-2xl p-4 text-center shadow-sm border border-gray-100">
                <p className="text-[11px] font-bold text-gray-900 mb-2.5 leading-tight">Abacate</p>
                <p className="text-lg font-bold text-gray-900">40g</p>
              </div>
              <div className="bg-white rounded-2xl p-4 text-center shadow-sm border border-gray-100">
                <p className="text-[11px] font-bold text-gray-900 mb-2.5 leading-tight">Queijo branco</p>
                <p className="text-lg font-bold text-gray-900">30g</p>
              </div>
              <div className="bg-white rounded-2xl p-4 text-center shadow-sm border border-gray-100">
                <p className="text-[11px] font-bold text-gray-900 mb-2.5 leading-tight">Legumes variados</p>
                <p className="text-lg font-bold text-gray-900">100g</p>
              </div>
              <div className="bg-white rounded-2xl p-4 text-center shadow-sm border border-gray-100">
                <p className="text-[11px] font-bold text-gray-900 mb-2.5 leading-tight">Iogurte natural</p>
                <p className="text-lg font-bold text-gray-900">30g</p>
              </div>
              <div className="bg-white rounded-2xl p-4 text-center shadow-sm border border-gray-100">
                <p className="text-[11px] font-bold text-gray-900 mb-2.5 leading-tight">Azeite de oliva</p>
                <p className="text-lg font-bold text-gray-900">5g</p>
              </div>
            </div>
          </div>

          <button
            onClick={() => onNext({})}
            className="w-full bg-gradient-to-r from-gray-900 to-black hover:from-black hover:to-gray-900 text-white py-5 text-lg font-bold rounded-full transition-all mt-8 active:scale-[0.98] shadow-lg shadow-black/20"
          >
            Continuar
          </button>
        </div>
      </div>
    )
  }

  return null
}
