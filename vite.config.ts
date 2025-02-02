import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [react(), VitePWA({
    registerType: 'autoUpdate',
    includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg'],
    manifest: {
      name: 'Radio Gaúcha com delay',
      short_name: 'Radio Delay',
      description: 'Rádio Gaúcha com delay para sincronizar com a TV',
      theme_color: '#ffffff',
      background_color: '#ffffff',
      display: 'standalone',
      icons: [
        {
          src: '/android-icon-192x192.png',
          sizes: '192x192',
          type: 'image/png'
        },
        {
          src: '/apple-icon-180x180.png',
          sizes: '180x180',
          type: 'image/png'
        },
        {
          src: '/apple-icon-152x152.png',
          sizes: '152x152',
          type: 'image/png'
        }
      ]
    }
  })],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})