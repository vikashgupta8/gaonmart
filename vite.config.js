import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: 'auto',
      devOptions: {
        enabled: true, // 👈 Isse local dev mode (localhost) mein PWA trigger hoga
      },
      manifest: {
        name: 'Vikash Mart - Aapki Apni Dukaan',
        short_name: 'Vikash Mart',
        description: 'Kirana aur har zarurat ka samaan, seedhe aapke ghar!',
        theme_color: '#0b8f08',
        background_color: '#ffffff',
        display: 'standalone',
        start_url: '/',
        icons: [
          {
            src: '/logo.svg',
            sizes: '192x192 512x512',
            type: 'image/svg+xml',
            purpose: 'any maskable'
          }
        ]
      }
    })
  ]
})