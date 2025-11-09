"use client"

import { useLanguage } from "@/lib/language-context"
import { LanguageSelector } from "@/components/language-selector"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Download, Smartphone } from "lucide-react"
import { IOSInstallModal } from "@/components/ios-install-modal"
import { IOSChromeInstallModal } from "@/components/ios-chrome-install-modal"
import { AndroidChromeInstallModal } from "@/components/android-chrome-install-modal"

export default function WelcomePage() {
  const { t } = useLanguage()
  const router = useRouter()
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null)
  const [showInstallSection, setShowInstallSection] = useState(true)
  const [isInstalling, setIsInstalling] = useState(false)
  const [showIOSModal, setShowIOSModal] = useState(false)
  const [showIOSChromeModal, setShowIOSChromeModal] = useState(false)
  const [showAndroidModal, setShowAndroidModal] = useState(false)
  const [browserInfo, setBrowserInfo] = useState({ isIOS: false, isChrome: false, isAndroid: false, isSafari: false })
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)

    const isStandalone = () => {
      try {
        // Verifica se está rodando em modo standalone
        const isIOSStandalone = (window.navigator as any).standalone === true
        const isStandalone = window.matchMedia("(display-mode: standalone)").matches

        return isIOSStandalone || isStandalone
      } catch (error) {
        console.error("Erro ao verificar modo standalone:", error)
        return false
      }
    }

    // Se o app já está instalado, pular a tela de instalação
    if (isStandalone()) {
      setShowInstallSection(false)
      return
    }

    const detectBrowser = () => {
      try {
        const userAgent = window.navigator.userAgent.toLowerCase()
        const isIOS = /iphone|ipad|ipod/.test(userAgent)
        const isAndroid = /android/.test(userAgent)
        const isChrome = /chrome|crios/.test(userAgent) && !/edg/.test(userAgent)
        const isSafari = /safari/.test(userAgent) && !/chrome|crios/.test(userAgent)

        setBrowserInfo({ isIOS, isChrome, isAndroid, isSafari })
      } catch (error) {
        console.error("Erro ao detectar navegador:", error)
      }
    }

    detectBrowser()

    const handleBeforeInstallPrompt = (e: Event) => {
      try {
        e.preventDefault()
        setDeferredPrompt(e)
      } catch (error) {
        console.error("Erro no beforeinstallprompt:", error)
      }
    }

    const handleAppInstalled = async () => {
      try {
        setDeferredPrompt(null)
        setShowInstallSection(false)
      } catch (error) {
        console.error("Erro no appinstalled:", error)
      }
    }

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt)
    window.addEventListener("appinstalled", handleAppInstalled)

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt)
      window.removeEventListener("appinstalled", handleAppInstalled)
    }
  }, [])

  const handleInstall = async () => {
    if (browserInfo.isIOS && browserInfo.isChrome) {
      setShowIOSChromeModal(true)
      return
    }

    if (browserInfo.isIOS && browserInfo.isSafari) {
      setShowIOSModal(true)
      return
    }

    if (browserInfo.isAndroid && browserInfo.isChrome) {
      setShowAndroidModal(true)
      return
    }

    if (!deferredPrompt) {
      return
    }

    try {
      setIsInstalling(true)
      await deferredPrompt.prompt()

      const { outcome } = await deferredPrompt.userChoice

      if (outcome === "accepted") {
        setDeferredPrompt(null)
        setShowInstallSection(false)
      }
    } catch (error) {
      console.error("Erro ao instalar:", error)
    } finally {
      setIsInstalling(false)
    }
  }

  const handleSkipInstall = () => {
    setShowInstallSection(false)
  }

  const handleStartQuiz = () => {
    router.push("/quiz")
  }

  if (!isClient) {
    return (
      <div className="h-screen bg-white flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-black border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (showInstallSection) {
    return (
      <>
        {showIOSModal && <IOSInstallModal onClose={() => setShowIOSModal(false)} />}
        {showIOSChromeModal && <IOSChromeInstallModal onClose={() => setShowIOSChromeModal(false)} />}
        {showAndroidModal && <AndroidChromeInstallModal onClose={() => setShowAndroidModal(false)} />}

        <div className="h-screen bg-white flex flex-col items-center justify-between p-4 sm:p-6 overflow-hidden">
          <div className="w-full max-w-md space-y-4 sm:space-y-6 flex flex-col">
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/364e9243-d930-4002-9839-a4b5d64dff19-removebg-preview-wK7m9hDFNYaCL3YKFpiT18KBl71GTd.png"
                alt="Calor.IA"
                className="h-8 w-auto"
              />
              <LanguageSelector />
            </div>

            <div className="space-y-8 flex-1 flex flex-col justify-center">
              <div className="flex justify-center">
                <div className="w-20 h-20 bg-black rounded-2xl flex items-center justify-center">
                  <Smartphone className="w-10 h-10 text-white" />
                </div>
              </div>

              <div className="space-y-4 text-center">
                <h1 className="text-3xl font-bold text-balance">Instale o App</h1>
                <p className="text-gray-600 text-balance">
                  Para melhor experiência, instale o Calor.IA na tela inicial do seu celular.
                </p>
              </div>

              <div className="space-y-3">
                <button
                  onClick={handleInstall}
                  disabled={isInstalling}
                  className="w-full bg-black text-white py-5 rounded-full font-semibold hover:bg-gray-900 transition-all flex items-center justify-center gap-2 shadow-xl disabled:opacity-50 disabled:cursor-not-allowed text-lg"
                >
                  <Download className="w-6 h-6" />
                  {isInstalling ? "Instalando..." : "Ver instruções de instalação"}
                </button>

                <button
                  onClick={handleSkipInstall}
                  className="w-full text-gray-600 py-3 rounded-full font-medium hover:text-black transition-all text-sm"
                >
                  Pular por enquanto
                </button>

                <div className="space-y-4 bg-gray-50 rounded-2xl p-6">
                  <h3 className="font-semibold text-sm">Ou instale manualmente:</h3>

                  <div className="space-y-3 text-sm text-gray-600">
                    <div className="flex gap-3">
                      <div className="w-6 h-6 bg-black text-white rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold">
                        1
                      </div>
                      <p>
                        <strong>No iOS/Safari:</strong> Toque em{" "}
                        <span className="inline-flex items-center justify-center w-5 h-5 bg-blue-500 text-white rounded text-xs">
                          ⬆
                        </span>{" "}
                        Compartilhar → "Adicionar à Tela de Início"
                      </p>
                    </div>

                    <div className="flex gap-3">
                      <div className="w-6 h-6 bg-black text-white rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold">
                        2
                      </div>
                      <p>
                        <strong>No Android/Chrome:</strong> Toque no menu ⋮ (três pontos) → "Instalar app" ou "Adicionar
                        à tela inicial"
                      </p>
                    </div>

                    <div className="flex gap-3">
                      <div className="w-6 h-6 bg-black text-white rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold">
                        3
                      </div>
                      <p>Após instalar, abra o app pela tela inicial do seu celular</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }

  return (
    <div className="h-screen bg-white flex flex-col items-center justify-between p-4 sm:p-6 overflow-hidden">
      <div className="w-full max-w-md space-y-4 sm:space-y-6 flex flex-col">
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/364e9243-d930-4002-9839-a4b5d64dff19-removebg-preview-wK7m9hDFNYaCL3YKFpiT18KBl71GTd.png"
            alt="Calor.IA"
            className="h-8 w-auto"
          />
          <LanguageSelector />
        </div>

        <div className="relative w-full aspect-[9/16] max-h-[70vh] bg-black rounded-3xl overflow-hidden shadow-2xl">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/V%C3%ADdeo%20do%20WhatsApp%20de%202025-11-07%20%C3%A0%28s%29%2022.00.33_be2a35d6-x2FcJ0tJ4VTtaRB7GVriUns9kEvwQH.mp4"
          />
        </div>

        <div className="w-full max-w-md space-y-6 text-center pb-6">
          <h2 className="text-2xl font-bold text-balance px-4">Controle suas calorias de forma fácil</h2>

          <button
            onClick={handleStartQuiz}
            className="w-full bg-black text-white py-4 rounded-full font-semibold hover:bg-gray-900 transition-all hover:scale-105 shadow-xl"
          >
            Iniciar Quiz
          </button>

          <button
            onClick={() => router.push("/login")}
            className="text-sm text-gray-600 hover:text-black transition-colors block w-full"
          >
            Já tem uma conta? Entre aqui
          </button>
        </div>
      </div>
    </div>
  )
}
