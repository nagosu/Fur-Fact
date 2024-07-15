import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(),
    VitePWA({ 
      registerType: 'autoUpdate',
      includeAssets: [],
      devOptions:{
        enabled: true
      },
      manifest:{
        name: 'Fur-fact',
        short_name : 'Fur-fact',
        theme_color: '#40A5FD',
        icons: [
          {
            src: '/pwa-64x64.png',
            sizes: '64x64',
            type: 'image/png',
          },
          {
            src: '/pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src:'maskable-icon-512x512.png',
            sizes:'512x512',
            type:'image/png',
            purpose:'maskable'
          }
        ]
      }
    })],
  
})
