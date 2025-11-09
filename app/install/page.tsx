"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Download, Smartphone, CheckCircle2 } from "lucide-react"

export default function InstallPage() {
  const router = useRouter()
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null)
  const [isInstalled, setIsInstalled] = useState(false)
  const [isStandalone, setIsStandalone] = useState(false)

  useEffect(() => {
    // Check if app is already installed (standalone mode)
    const checkStandalone = () => {
      const isStandaloneMode =
        window.matchMedia("(display-mode: standalone)").matches ||
        (window.navigator as any).standalone ||
        document.referrer.includes("android-app://")

      setIsStandalone(isStandaloneMode)
      setIsInstalled(isStandaloneMode)
    }

    checkStandalone()

    // Listen for install prompt
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e)
    }

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt)

    // Listen for successful installation
    window.addEventListener("appinstalled", () => {
      setIsInstalled(true)
      setDeferredPrompt(null)
    })

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt)
    }
  }, [])

  const handleInstall = async () => {
    if (!deferredPrompt) {
      // If no install prompt, show instructions
      return
    }

    deferredPrompt.prompt()
    const { outcome } = await deferredPrompt.userChoice

    if (outcome === "accepted") {
      setIsInstalled(true)
      setDeferredPrompt(null)
    }
  }

  const handleContinue = () => {
    if (isInstalled || isStandalone) {
      router.push("/quiz")
    }
  }

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md space-y-8">
        {/* Icon */}
        <div className="flex justify-center">
          <div className="w-20 h-20 bg-foreground rounded-2xl flex items-center justify-center">
            <Smartphone className="w-10 h-10 text-background" />
          </div>
        </div>

        {/* Content */}
        <div className="space-y-4 text-center">
          <h1 className="text-3xl font-bold text-balance">{isInstalled ? "App Instalado!" : "Instale o App"}</h1>

          {isInstalled ? (
            <div className="space-y-4">
              <div className="flex justify-center">
                <CheckCircle2 className="w-16 h-16 text-foreground" />
              </div>
              <p className="text-muted-foreground text-balance">Perfeito! O CaloriaBR está instalado no seu celular.</p>
            </div>
          ) : (
            <p className="text-muted-foreground text-balance">
              Para melhor experiência, instale o CaloriaBR na tela inicial do seu celular antes de continuar.
            </p>
          )}
        </div>

        {/* Installation Steps */}
        {!isInstalled && (
          <div className="space-y-4 bg-muted/50 rounded-2xl p-6">
            <h3 className="font-semibold text-sm">Como instalar:</h3>

            <div className="space-y-3 text-sm text-muted-foreground">
              <div className="flex gap-3">
                <div className="w-6 h-6 bg-foreground text-background rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold">
                  1
                </div>
                <p>Toque no botão "Instalar App" abaixo</p>
              </div>

              <div className="flex gap-3">
                <div className="w-6 h-6 bg-foreground text-background rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold">
                  2
                </div>
                <p>Confirme a instalação quando solicitado</p>
              </div>

              <div className="flex gap-3">
                <div className="w-6 h-6 bg-foreground text-background rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold">
                  3
                </div>
                <p>O ícone do CaloriaBR aparecerá na sua tela inicial</p>
              </div>
            </div>

            {!deferredPrompt && !isStandalone && (
              <div className="text-xs text-muted-foreground pt-2 border-t border-border">
                <p className="font-semibold mb-2">Não vê a opção de instalar?</p>
                <p className="mb-1">
                  No iOS/Safari: Toque em <span className="font-semibold">Compartilhar</span> →{" "}
                  <span className="font-semibold">Adicionar à Tela de Início</span>
                </p>
                <p>
                  No Android/Chrome: Toque em <span className="font-semibold">⋮</span> →{" "}
                  <span className="font-semibold">Instalar app</span>
                </p>
              </div>
            )}
          </div>
        )}

        {/* Action Button */}
        <div className="space-y-3">
          {isInstalled || isStandalone ? (
            <button
              onClick={handleContinue}
              className="w-full bg-foreground text-background py-4 rounded-full font-semibold hover:opacity-90 transition-opacity"
            >
              Continuar para o Quiz
            </button>
          ) : (
            <>
              {deferredPrompt && (
                <button
                  onClick={handleInstall}
                  className="w-full bg-foreground text-background py-4 rounded-full font-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                >
                  <Download className="w-5 h-5" />
                  Instalar App
                </button>
              )}

              <button
                onClick={() => router.push("/quiz")}
                className="w-full text-center text-sm text-muted-foreground hover:text-foreground transition-colors py-2"
              >
                Pular por enquanto
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
