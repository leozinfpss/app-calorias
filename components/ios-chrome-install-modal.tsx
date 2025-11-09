"use client"

import { X } from "lucide-react"
import { useEffect, useState } from "react"

interface IOSChromeInstallModalProps {
  onClose: () => void
}

export function IOSChromeInstallModal({ onClose }: IOSChromeInstallModalProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <div className="fixed inset-0 z-50 animate-in fade-in duration-200">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      <div
        className={`absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-2xl transform transition-all duration-300 ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
        }`}
        style={{ maxHeight: "85vh" }}
      >
        <div className="relative px-5 py-4 overflow-y-auto" style={{ maxHeight: "85vh" }}>
          <button
            onClick={onClose}
            className="absolute top-3 right-3 w-7 h-7 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors z-10"
          >
            <X className="w-4 h-4 text-gray-600" />
          </button>

          <h2 className="text-lg font-semibold text-center mb-4 pr-8">Adicionar à tela inicial</h2>

          <div className="space-y-4">
            {/* Step 1 - Tap Share Icon */}
            <div className="space-y-2">
              <p className="text-sm font-medium text-blue-600">1. Toque no ícone de compartilhar</p>

              <div className="bg-gradient-to-b from-gray-700 to-gray-800 rounded-xl p-3 shadow-lg">
                <div className="flex items-center justify-between px-2">
                  <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                      <circle cx="12" cy="12" r="2" />
                      <circle cx="12" cy="6" r="2" />
                      <circle cx="12" cy="18" r="2" />
                    </svg>
                  </div>
                  <div className="flex-1 mx-3 bg-gray-600 rounded-lg px-3 py-1.5">
                    <p className="text-white text-xs truncate">app.caloria.site</p>
                  </div>
                  <div className="w-7 h-7 rounded border-2 border-blue-400 bg-blue-400/20 flex items-center justify-center">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#60A5FA" strokeWidth="2.5">
                      <path d="M8 12h8M12 8v8M20 12a8 8 0 11-16 0 8 8 0 0116 0z" />
                      <rect x="10" y="2" width="4" height="8" rx="1" fill="#60A5FA" />
                      <path d="M12 2v8" stroke="#60A5FA" strokeWidth="2" />
                      <path
                        d="M8 6l4-4 4 4"
                        stroke="#60A5FA"
                        strokeWidth="2"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="flex justify-end pr-8">
                <span className="text-3xl">👆</span>
              </div>
            </div>

            {/* Step 2 - Select Add to Home Screen */}
            <div className="space-y-2">
              <p className="text-sm font-medium text-blue-600">2. Toque em "Adicionar à Tela de Início"</p>

              <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
                <div className="divide-y divide-gray-200">
                  <div className="flex items-center justify-between px-4 py-2.5">
                    <span className="text-sm text-gray-700">Criar um QR code</span>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="3" width="8" height="8" />
                      <rect x="13" y="3" width="8" height="8" />
                      <rect x="3" y="13" width="8" height="8" />
                      <rect x="13" y="13" width="8" height="8" />
                    </svg>
                  </div>
                  <div className="flex items-center justify-between px-4 py-2.5">
                    <span className="text-sm text-gray-700">Buscar na página</span>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="11" cy="11" r="8" />
                      <path d="M21 21l-4.35-4.35" />
                    </svg>
                  </div>
                  <div className="flex items-center justify-between px-4 py-2.5 bg-red-50 border-2 border-red-500 relative">
                    <span className="text-sm font-medium text-gray-900">Adicionar à Tela de Início</span>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <rect x="5" y="7" width="14" height="14" rx="2" />
                      <path d="M9 3v4M15 3v4" strokeLinecap="round" />
                      <path d="M12 12h.01M12 16h.01" strokeLinecap="round" />
                    </svg>
                    <div className="absolute -right-1 top-1/2 -translate-y-1/2">
                      <span className="text-2xl">👆</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between px-4 py-2.5">
                    <span className="text-sm text-gray-700">Adicionar à Nova Nota Rápida</span>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M14 2H6a2 2 0 00-2-2h2M4 16v2a2 2 0 002 2h2m8-16h2a2 2 0 012 2v2m-4 12h2a2 2 0 002-2v-2" />
                      <path d="M14 2v6h6" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 3 - Tap Add Button */}
            <div className="space-y-2">
              <p className="text-sm font-medium text-blue-600">3. Clique em "Adicionar"</p>

              <div className="bg-gray-50 rounded-xl p-3 border border-gray-200">
                <div className="flex items-center justify-between mb-3 pb-2 border-b border-gray-300">
                  <button className="text-blue-600 text-sm font-medium">Cancelar</button>
                  <p className="text-sm font-semibold">Adicionar à Tela de Início</p>
                  <button className="text-blue-600 text-sm font-semibold border-2 border-red-500 bg-red-50 px-2 py-0.5 rounded relative">
                    Adicionar
                    <span className="absolute -right-8 top-0 text-2xl">👆</span>
                  </button>
                </div>

                <div className="flex items-start gap-3 bg-white rounded-lg p-3">
                  <div className="w-14 h-14 bg-gray-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M4 8V6a2 2 0 012-2h2M4 16v2a2 2 0 002 2h2m8-16h2a2 2 0 012 2v2m-4 12h2a2 2 0 002-2v-2"
                        stroke="black"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                      <circle cx="12" cy="12" r="3" stroke="black" strokeWidth="2" />
                      <circle cx="12" cy="10" r="0.5" fill="black" />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm truncate">Calor.IA</p>
                    <p className="text-xs text-gray-400 truncate mt-0.5">https://app.caloria.site/</p>
                  </div>
                  <button className="w-5 h-5 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
                    <X className="w-3 h-3 text-gray-500" />
                  </button>
                </div>

                <div className="mt-3 bg-gray-100 rounded-lg p-2.5">
                  <p className="text-xs text-gray-600 text-center">
                    Um ícone será adicionado à Tela de Início para acessar este site rapidamente.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex justify-center pt-2 pb-1">
              <svg width="40" height="50" viewBox="0 0 40 50">
                <path d="M20 5 L20 35" stroke="black" strokeWidth="6" strokeLinecap="round" />
                <path
                  d="M8 28 L20 40 L32 28"
                  stroke="black"
                  strokeWidth="6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
