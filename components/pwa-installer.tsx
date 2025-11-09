"use client"

import { useEffect } from "react"

export function PWAInstaller() {
  useEffect(() => {
    // PWA funcionará apenas com manifest.json
    // No service worker needed - PWA will work with manifest.json only
    // The beforeinstallprompt event will be handled directly in page components
  }, [])

  return null
}
