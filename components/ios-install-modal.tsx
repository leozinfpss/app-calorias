"use client"

import { X } from "lucide-react"
import { useEffect, useState } from "react"
import Image from "next/image"

interface IOSInstallModalProps {
  onClose: () => void
}

export function IOSInstallModal({ onClose }: IOSInstallModalProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <div className="fixed inset-0 z-50 animate-in fade-in duration-200">
      {/* Backdrop escuro */}
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      <div
        className={`absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-2xl transform transition-all duration-300 ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
        }`}
        style={{ maxHeight: "85vh" }}
      >
        <div className="relative px-6 py-5">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors z-10"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>

          {/* Title */}
          <h2 className="text-xl font-semibold text-center mb-6 pr-8">Adicionar à tela inicial</h2>

          <div className="space-y-5">
            {/* Step 1 - Share button */}
            <div className="space-y-2.5">
              <p className="text-sm font-medium text-blue-600">1. Toque no ícone de compartilhar</p>

              {/* Safari toolbar mockup */}
              <div className="bg-gradient-to-b from-gray-200 to-gray-100 rounded-xl px-3 py-3 flex items-center justify-around shadow-sm">
                {/* Back arrow */}
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-gray-400">
                  <path
                    d="M15 18L9 12L15 6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>

                {/* Forward arrow */}
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-blue-500">
                  <path
                    d="M9 18L15 12L9 6"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>

                {/* Share icon with highlight */}
                <div className="relative">
                  <div className="absolute -inset-1.5 border-2 border-red-500 rounded-md" />
                  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" className="text-blue-500 relative">
                    <path
                      d="M14 18V8M14 8L10 12M14 8L18 12"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M8 14V20C8 20.5304 8.21071 21.0391 8.58579 21.4142C8.96086 21.7893 9.46957 22 10 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V14"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  {/* Hand pointer */}
                  <div className="absolute -bottom-6 -right-4 text-3xl">👆</div>
                </div>

                {/* Book icon */}
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-blue-500">
                  <path
                    d="M4 19.5C4 18.837 4.26339 18.2011 4.73223 17.7322C5.20107 17.2634 5.83696 17 6.5 17H20"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M6.5 2H20V22H6.5C5.83696 22 5.20107 21.7366 4.73223 21.2678C4.26339 20.7989 4 20.163 4 19.5V4.5C4 3.83696 4.26339 3.20107 4.73223 2.73223C5.20107 2.26339 5.83696 2 6.5 2V2Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>

                {/* Tabs icon */}
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-blue-500">
                  <rect x="3" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2" />
                  <rect x="14" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2" />
                  <rect x="3" y="14" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2" />
                  <rect x="14" y="14" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2" />
                </svg>
              </div>
            </div>

            {/* Step 2 - Add to Home Screen menu */}
            <div className="space-y-2.5">
              <p className="text-sm font-medium text-blue-600">
                2. Logo em seguida, toque em "Adicionar à Tela de Início"
              </p>

              {/* Menu mockup */}
              <div className="bg-gray-50 rounded-xl p-2 space-y-1">
                {/* Menu item 1 */}
                <div className="flex items-center justify-between px-4 py-3 bg-white rounded-lg">
                  <span className="text-sm text-gray-900">Adicionar à Nota Rápida</span>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="text-gray-600">
                    <rect x="3" y="3" width="14" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" />
                    <path d="M7 3V17M13 7H7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </div>

                {/* Menu item 2 */}
                <div className="flex items-center justify-between px-4 py-3 bg-white rounded-lg">
                  <span className="text-sm text-gray-900">Buscar na Página</span>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="text-gray-600">
                    <circle cx="9" cy="9" r="5" stroke="currentColor" strokeWidth="1.5" />
                    <path d="M13 13L17 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </div>

                {/* Menu item 3 - Highlighted */}
                <div className="relative">
                  <div className="flex items-center justify-between px-4 py-3 bg-white rounded-lg border-2 border-red-500">
                    <span className="text-sm font-semibold text-gray-900">Adicionar à Tela de Início</span>
                    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" className="text-gray-900">
                      <circle cx="11" cy="11" r="9" stroke="currentColor" strokeWidth="2" />
                      <path d="M11 7V15M7 11H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  </div>
                  {/* Hand pointer */}
                  <div className="absolute -bottom-5 -right-5 text-3xl">👆</div>
                </div>

                {/* Menu item 4 */}
                <div className="flex items-center justify-between px-4 py-3 bg-white rounded-lg">
                  <span className="text-sm text-gray-900">Marcador</span>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="text-gray-600">
                    <path
                      d="M10 3L13 9L17 10L13 13L12 17L10 14L8 17L7 13L3 10L7 9L10 3Z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* Step 3 - Confirmation dialog */}
            <div className="space-y-2.5 pt-2">
              <p className="text-sm font-medium text-blue-600">3. Clique em "Adicionar"</p>

              {/* Dialog mockup */}
              <div className="bg-gray-50 rounded-xl p-3 space-y-3">
                {/* Header with buttons */}
                <div className="flex items-center justify-between pb-3 border-b border-gray-200">
                  <button className="text-blue-600 text-sm font-medium">Cancelar</button>
                  <span className="font-medium text-sm text-gray-900">Adicionar à Tela de Início</span>
                  <div className="relative">
                    <button className="px-4 py-1.5 bg-blue-600 text-white rounded-md text-sm font-semibold border-2 border-red-500">
                      Adicionar
                    </button>
                    {/* Hand pointer */}
                    <div className="absolute -bottom-4 -right-4 text-2xl">👆</div>
                  </div>
                </div>

                {/* App preview */}
                <div className="flex items-center gap-3 px-2 py-2 bg-white rounded-lg">
                  <div className="w-14 h-14 flex-shrink-0 rounded-xl overflow-hidden bg-white border border-gray-200 shadow-sm">
                    <Image
                      src="/icon-192.png"
                      alt="Calor.IA"
                      width={56}
                      height={56}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-base text-gray-900">Calor.IA</p>
                    <p className="text-xs text-gray-400 truncate">https://app.caloria.site/</p>
                  </div>
                  <button className="w-5 h-5 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
                    <X className="w-3 h-3 text-gray-500" />
                  </button>
                </div>

                {/* Info text */}
                <p className="text-xs text-gray-500 text-center px-2 leading-relaxed">
                  Um ícone será adicionado à Tela de Início para acessar este site rapidamente.
                </p>
              </div>
            </div>

            {/* Arrow pointing down */}
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
