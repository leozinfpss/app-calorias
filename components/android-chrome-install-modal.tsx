"use client"

import { X } from "lucide-react"
import { useEffect, useState } from "react"
import Image from "next/image"

interface AndroidChromeInstallModalProps {
  onClose: () => void
}

export function AndroidChromeInstallModal({ onClose }: AndroidChromeInstallModalProps) {
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
        <div className="relative px-6 py-5">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors z-10"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>

          <h2 className="text-xl font-semibold text-center mb-6 pr-8">Adicionar à tela inicial</h2>

          <div className="space-y-5">
            {/* Step 1 - Menu */}
            <div className="space-y-2.5">
              <p className="text-sm font-medium text-blue-600">
                1. Toque no menu (três pontos) no canto superior direito
              </p>

              <div className="bg-gray-50 rounded-xl px-3 py-3 flex items-center justify-between shadow-sm">
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full bg-gray-300" />
                  <div className="h-4 w-32 bg-gray-300 rounded" />
                </div>
                <div className="relative">
                  <div className="absolute -inset-1.5 border-2 border-red-500 rounded-md" />
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-gray-700 relative">
                    <circle cx="12" cy="5" r="1.5" fill="currentColor" />
                    <circle cx="12" cy="12" r="1.5" fill="currentColor" />
                    <circle cx="12" cy="19" r="1.5" fill="currentColor" />
                  </svg>
                  <div className="absolute -bottom-6 -right-4 text-3xl">👆</div>
                </div>
              </div>
            </div>

            {/* Step 2 - Add to Home Screen */}
            <div className="space-y-2.5">
              <p className="text-sm font-medium text-blue-600">2. Toque em "Adicionar à tela inicial"</p>

              <div className="bg-gray-50 rounded-xl p-2 space-y-1">
                <div className="flex items-center gap-3 px-4 py-3 bg-white rounded-lg">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="text-gray-600">
                    <path
                      d="M10 3V13M10 13L6 9M10 13L14 9"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path d="M3 17H17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                  <span className="text-sm text-gray-900">Fazer download</span>
                </div>

                <div className="relative">
                  <div className="flex items-center gap-3 px-4 py-3 bg-white rounded-lg border-2 border-red-500">
                    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" className="text-gray-900">
                      <rect
                        x="4"
                        y="4"
                        width="14"
                        height="14"
                        rx="2"
                        stroke="currentColor"
                        strokeWidth="2"
                        fill="none"
                      />
                      <path d="M11 8V14M8 11H14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                    <span className="text-sm font-semibold text-gray-900">Adicionar à tela inicial</span>
                  </div>
                  <div className="absolute -bottom-5 -right-5 text-3xl">👆</div>
                </div>

                <div className="flex items-center gap-3 px-4 py-3 bg-white rounded-lg">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="text-gray-600">
                    <path
                      d="M10 3L13 9L17 10L13 13L12 17L10 14L8 17L7 13L3 10L7 9L10 3Z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                  </svg>
                  <span className="text-sm text-gray-900">Adicionar aos favoritos</span>
                </div>

                <div className="flex items-center gap-3 px-4 py-3 bg-white rounded-lg">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="text-gray-600">
                    <circle cx="10" cy="10" r="7" stroke="currentColor" strokeWidth="1.5" />
                    <path d="M10 6V10L13 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                  <span className="text-sm text-gray-900">Histórico</span>
                </div>
              </div>
            </div>

            {/* Step 3 - Install */}
            <div className="space-y-2.5 pt-2">
              <p className="text-sm font-medium text-blue-600">3. Clique em "Instalar"</p>

              <div className="bg-gray-50 rounded-xl p-4 space-y-3">
                <div className="flex items-center gap-3 bg-white rounded-lg p-3 border border-gray-200">
                  <div className="w-12 h-12 flex-shrink-0 rounded-xl overflow-hidden bg-white shadow-sm">
                    <Image
                      src="/icon-192.png"
                      alt="Calor.IA"
                      width={48}
                      height={48}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm text-gray-900">Calor.IA</p>
                    <p className="text-xs text-gray-400 truncate">app.caloria.site</p>
                  </div>
                </div>

                <div className="relative">
                  <button className="w-full py-3 bg-blue-600 text-white rounded-lg text-sm font-semibold border-2 border-red-500">
                    Instalar
                  </button>
                  <div className="absolute -bottom-4 -right-4 text-2xl">👆</div>
                </div>

                <p className="text-xs text-gray-500 text-center">O app será adicionado à sua tela inicial</p>
              </div>
            </div>

            <div className="flex justify-center pt-3 pb-2">
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
