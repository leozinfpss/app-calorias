"use client"

import { useState, useEffect } from "react"

type TypingTextProps = {
  text: string
  speed?: number
  delay?: number
  className?: string
  onComplete?: () => void
}

export function TypingText({ text, speed = 30, delay = 0, className = "", onComplete }: TypingTextProps) {
  const [displayedText, setDisplayedText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)
  const [hasStarted, setHasStarted] = useState(false)

  useEffect(() => {
    // Espera o delay inicial antes de começar
    const startTimeout = setTimeout(() => {
      setHasStarted(true)
    }, delay)

    return () => clearTimeout(startTimeout)
  }, [delay])

  useEffect(() => {
    if (!hasStarted) return

    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + text[currentIndex])
        setCurrentIndex((prev) => prev + 1)
      }, speed)

      return () => clearTimeout(timeout)
    } else if (currentIndex === text.length && onComplete) {
      onComplete()
    }
  }, [currentIndex, text, speed, hasStarted, onComplete])

  return <span className={className}>{displayedText}</span>
}
