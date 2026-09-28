import React, { useState, useEffect } from 'react'

export default function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState(null)
  const [showInstallBanner, setShowInstallBanner] = useState(false)

  useEffect(() => {
    const handleBeforeInstallPrompt = (e) => {
      // Browser ka default chhota popup roko
      e.preventDefault()
      // Event ko state mein save karo
      setDeferredPrompt(e)
      // Custom banner show karo
      setShowInstallBanner(true)
    }

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
    }
  }, [])

  const handleInstallClick = async () => {
    if (!deferredPrompt) return

    // Real install dialog show karo
    deferredPrompt.prompt()

    const { outcome } = await deferredPrompt.userChoice
    if (outcome === 'accepted') {
      console.log('App install ho gayi!')
    }

    // Event reset karo aur banner hatao
    setDeferredPrompt(null)
    setShowInstallBanner(false)
  }

  if (!showInstallBanner) return null

  return (
    <div className="install-banner">
      <div className="install-text">
        <strong>📲 GaonMart App Install Karein</strong>
        <p>Bina Play Store ke seedhe phone screen par chalayein!</p>
      </div>
      <div className="install-actions">
        <button className="btn-install" onClick={handleInstallClick}>
          Install Karein
        </button>
        <button
          className="btn-dismiss"
          onClick={() => setShowInstallBanner(false)}
        >
          ✕
        </button>
      </div>
    </div>
  )
}