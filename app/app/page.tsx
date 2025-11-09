"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Camera, ImageIcon, History, User, X, Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"

type CalorieResult = {
  dishName: string
  calories: number
  protein: number
  carbs: number
  fats: number
  confidence: number
}

export default function AppPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<"camera" | "history" | "profile">("camera")
  const [capturedImage, setCapturedImage] = useState<string | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [result, setResult] = useState<CalorieResult | null>(null)
  const [stream, setStream] = useState<MediaStream | null>(null)

  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (activeTab === "camera" && !capturedImage) {
      startCamera()
    }

    return () => {
      stopCamera()
    }
  }, [activeTab, capturedImage])

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment", width: { ideal: 1920 }, height: { ideal: 1080 } },
      })
      setStream(mediaStream)
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream
      }
    } catch (error) {
      console.error("[v0] Error accessing camera:", error)
    }
  }

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop())
      setStream(null)
    }
  }

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current
      const canvas = canvasRef.current

      canvas.width = video.videoWidth
      canvas.height = video.videoHeight

      const ctx = canvas.getContext("2d")
      if (ctx) {
        ctx.drawImage(video, 0, 0)
        const imageData = canvas.toDataURL("image/jpeg", 0.8)
        setCapturedImage(imageData)
        stopCamera()
        analyzeImage(imageData)
      }
    }
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        const imageData = event.target?.result as string
        setCapturedImage(imageData)
        stopCamera()
        analyzeImage(imageData)
      }
      reader.readAsDataURL(file)
    }
  }

  const analyzeImage = async (imageData: string) => {
    setIsAnalyzing(true)

    // Simular análise de IA (substituir com API real)
    setTimeout(() => {
      setResult({
        dishName: "Feijoada",
        calories: 650,
        protein: 35,
        carbs: 45,
        fats: 28,
        confidence: 92,
      })
      setIsAnalyzing(false)
    }, 2000)
  }

  const resetCamera = () => {
    setCapturedImage(null)
    setResult(null)
    startCamera()
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Main Content */}
      <main className="flex-1 relative overflow-hidden">
        {activeTab === "camera" && (
          <div className="h-full flex flex-col">
            {!capturedImage ? (
              <>
                {/* Camera View */}
                <div className="flex-1 relative bg-black">
                  <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover" />

                  {/* Camera Overlay */}
                  <div className="absolute inset-0 flex flex-col justify-between p-6">
                    <div className="text-center flex flex-col items-center">
                      <img
                        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/364e9243-d930-4002-9839-a4b5d64dff19-removebg-preview-wK7m9hDFNYaCL3YKFpiT18KBl71GTd.png"
                        alt="Calor.IA"
                        className="h-8 w-auto mb-2 drop-shadow-lg filter brightness-0 invert"
                      />
                      <p className="text-white/90 drop-shadow-lg">Aponte para o prato e tire uma foto</p>
                    </div>

                    {/* Frame Guide */}
                    <div className="flex-1 flex items-center justify-center">
                      <div className="w-72 h-72 border-4 border-white/50 rounded-3xl" />
                    </div>

                    {/* Camera Controls */}
                    <div className="flex items-center justify-center gap-8">
                      <button
                        onClick={() => fileInputRef.current?.click()}
                        className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center"
                      >
                        <ImageIcon className="w-6 h-6 text-white" />
                      </button>

                      <button
                        onClick={capturePhoto}
                        className="w-20 h-20 rounded-full bg-white flex items-center justify-center shadow-lg"
                      >
                        <div className="w-16 h-16 rounded-full border-4 border-black" />
                      </button>

                      <div className="w-14 h-14" />
                    </div>
                  </div>

                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileSelect}
                    className="hidden"
                  />
                  <canvas ref={canvasRef} className="hidden" />
                </div>
              </>
            ) : (
              <>
                {/* Image Review & Results */}
                <div className="flex-1 relative bg-black">
                  <img
                    src={capturedImage || "/placeholder.svg"}
                    alt="Captured food"
                    className="w-full h-full object-cover"
                  />

                  {/* Close Button */}
                  <button
                    onClick={resetCamera}
                    className="absolute top-6 right-6 w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center"
                  >
                    <X className="w-6 h-6 text-white" />
                  </button>

                  {/* Results Card */}
                  {isAnalyzing ? (
                    <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl p-6">
                      <div className="flex flex-col items-center gap-4 py-8">
                        <Loader2 className="w-12 h-12 animate-spin text-black" />
                        <p className="text-lg font-semibold">Analisando prato...</p>
                        <p className="text-sm text-gray-600">Identificando pratos brasileiros</p>
                      </div>
                    </div>
                  ) : (
                    result && (
                      <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl p-6 space-y-6">
                        <div className="flex items-start justify-between">
                          <div>
                            <h2 className="text-2xl font-bold mb-1">{result.dishName}</h2>
                            <p className="text-sm text-gray-600">Confiança: {result.confidence}%</p>
                          </div>
                          <div className="text-right">
                            <div className="text-3xl font-bold">{result.calories}</div>
                            <div className="text-sm text-gray-600">calorias</div>
                          </div>
                        </div>

                        {/* Macros */}
                        <div className="grid grid-cols-3 gap-4">
                          <div className="bg-gray-50 rounded-xl p-4 text-center">
                            <div className="text-2xl font-bold">{result.protein}g</div>
                            <div className="text-sm text-gray-600">Proteína</div>
                          </div>
                          <div className="bg-gray-50 rounded-xl p-4 text-center">
                            <div className="text-2xl font-bold">{result.carbs}g</div>
                            <div className="text-sm text-gray-600">Carboidratos</div>
                          </div>
                          <div className="bg-gray-50 rounded-xl p-4 text-center">
                            <div className="text-2xl font-bold">{result.fats}g</div>
                            <div className="text-sm text-gray-600">Gorduras</div>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <button
                            onClick={resetCamera}
                            className="py-3 border-2 border-black rounded-full font-semibold"
                          >
                            Nova foto
                          </button>
                          <button className="py-3 bg-black text-white rounded-full font-semibold">Salvar</button>
                        </div>
                      </div>
                    )
                  )}
                </div>
              </>
            )}
          </div>
        )}

        {activeTab === "history" && (
          <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">Histórico</h1>
            <div className="text-center py-12 text-gray-500">Suas refeições aparecerão aqui</div>
          </div>
        )}

        {activeTab === "profile" && (
          <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">Perfil</h1>
            <div className="space-y-4">
              <div className="bg-gray-50 rounded-xl p-4">
                <p className="text-sm text-gray-600 mb-1">Meta diária</p>
                <p className="text-2xl font-bold">2000 calorias</p>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Bottom Navigation */}
      <nav className="border-t border-gray-200 bg-white">
        <div className="flex items-center justify-around py-2">
          <button
            onClick={() => setActiveTab("history")}
            className={`flex flex-col items-center gap-1 px-6 py-2 ${
              activeTab === "history" ? "text-black" : "text-gray-400"
            }`}
          >
            <History className="w-6 h-6" />
            <span className="text-xs font-medium">Histórico</span>
          </button>

          <button
            onClick={() => setActiveTab("camera")}
            className={`flex flex-col items-center gap-1 px-6 py-2 ${
              activeTab === "camera" ? "text-black" : "text-gray-400"
            }`}
          >
            <Camera className="w-6 h-6" />
            <span className="text-xs font-medium">Câmera</span>
          </button>

          <button
            onClick={() => setActiveTab("profile")}
            className={`flex flex-col items-center gap-1 px-6 py-2 ${
              activeTab === "profile" ? "text-black" : "text-gray-400"
            }`}
          >
            <User className="w-6 h-6" />
            <span className="text-xs font-medium">Perfil</span>
          </button>
        </div>
      </nav>
    </div>
  )
}
