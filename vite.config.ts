import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'CraftLabel',
        short_name: 'CraftLabel',
        theme_color: '#111111',
        icons: [
          {
            src: 'https://cdn-icons-png.flaticon.com/512/931/931949.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ]
});