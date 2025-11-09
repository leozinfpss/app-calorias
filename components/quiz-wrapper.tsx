import type React from "react"
interface QuizWrapperProps {
  children: React.ReactNode
  hasScroll?: boolean
}

export function QuizWrapper({ children, hasScroll = false }: QuizWrapperProps) {
  return (
    <div className="flex flex-col h-full">
      {hasScroll ? (
        <div className="flex-1 overflow-y-auto px-6 py-6">{children}</div>
      ) : (
        <div className="flex-1 flex flex-col justify-center px-6 py-6">{children}</div>
      )}
    </div>
  )
}
