"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"

interface ScrollPickerProps {
  value: number
  onChange: (value: number) => void
  min: number
  max: number
  step?: number
  unit: string
}

export function ScrollPicker({ value, onChange, min, max, step = 1, unit }: ScrollPickerProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [startY, setStartY] = useState(0)
  const [startValue, setStartValue] = useState(value)
  const containerRef = useRef<HTMLDivElement>(null)
  const itemHeight = 40

  const values = Array.from({ length: Math.floor((max - min) / step) + 1 }, (_, i) => min + i * step)
  const currentIndex = values.indexOf(value)

  const startIdx = Math.max(0, currentIndex - 2)
  const endIdx = Math.min(values.length - 1, currentIndex + 2)
  const visibleValues = values.slice(startIdx, endIdx + 1)

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true)
    setStartY(e.clientY)
    setStartValue(value)
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true)
    setStartY(e.touches[0].clientY)
    setStartValue(value)
  }

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return

      const delta = startY - e.clientY
      const itemsScrolled = Math.round(delta / itemHeight)
      const newValue = startValue + itemsScrolled * step

      if (newValue >= min && newValue <= max) {
        onChange(newValue)
      }
    }

    const handleTouchMove = (e: TouchEvent) => {
      if (!isDragging) return

      const delta = startY - e.touches[0].clientY
      const itemsScrolled = Math.round(delta / itemHeight)
      const newValue = startValue + itemsScrolled * step

      if (newValue >= min && newValue <= max) {
        onChange(newValue)
      }
    }

    const handleEnd = () => {
      setIsDragging(false)
    }

    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove)
      document.addEventListener("mouseup", handleEnd)
      document.addEventListener("touchmove", handleTouchMove)
      document.addEventListener("touchend", handleEnd)

      return () => {
        document.removeEventListener("mousemove", handleMouseMove)
        document.removeEventListener("mouseup", handleEnd)
        document.removeEventListener("touchmove", handleTouchMove)
        document.removeEventListener("touchend", handleEnd)
      }
    }
  }, [isDragging, startY, startValue, value, onChange, min, max, step])

  return (
    <div
      ref={containerRef}
      className="flex flex-col items-center justify-center select-none"
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
    >
      <div className="relative w-full overflow-hidden">
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
          <div
            className="absolute w-full h-10 bg-muted/50 rounded-lg border border-muted-foreground/20"
            style={{ top: `calc(50% - 20px)` }}
          />
        </div>

        <div className="flex flex-col items-center gap-0">
          {visibleValues.map((val, idx) => {
            const absoluteIndex = startIdx + idx
            const isSelected = val === value
            const distance = Math.abs(absoluteIndex - currentIndex)

            const opacity = isSelected ? 1 : distance === 1 ? 0.6 : 0.3

            return (
              <div
                key={val}
                className={`flex items-center justify-center w-full h-10 transition-all duration-200 ${
                  isSelected ? "text-lg font-semibold" : "text-sm"
                }`}
                style={{ opacity }}
              >
                {val} {unit}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
