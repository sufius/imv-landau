import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import legacy from '@vitejs/plugin-legacy'
import vue2 from '@vitejs/plugin-vue2'
import Components from 'unplugin-vue-components/vite'
import {
  VuetifyResolver,
} from 'unplugin-vue-components/resolvers'


// https://vitejs.dev/config/
export default defineConfig({
  server: {
      proxy: {
          '/api': {
              target: 'http://localhost:85/api',
              changeOrigin: true,
              secure: false,
              ws: true,
              rewrite: (path) => path.replace(/^\/api/, '')
        }
      }
  },
  plugins: [
    vue2(),
    legacy({
      targets: ['ie >= 11'],
      additionalLegacyPolyfills: ['regenerator-runtime/runtime']
    }),
    Components({
      resolvers: [
        VuetifyResolver()
      ]
    })    
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
