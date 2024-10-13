import { TanStackRouterVite } from '@tanstack/router-plugin/vite'
import react from '@vitejs/plugin-react'
import { defineConfig, externalizeDepsPlugin } from 'electron-vite'
import { resolve } from 'path'

export default defineConfig({
  main: {
    plugins: [externalizeDepsPlugin()],
    resolve: {
      alias: {
        '@main': resolve('src/main'),
        '@controller': resolve('src/main/database/controller'),
        '@entity': resolve('src/main/database/entity')
      }
    }
  },
  preload: {
    plugins: [externalizeDepsPlugin()],
    resolve: {
      alias: {
        '@main': resolve('src/main'),
        '@entity': resolve('src/main/database/entity')
      }
    }
  },
  renderer: {
    resolve: {
      alias: {
        '@renderer': resolve('./src/renderer/src')
      }
    },
    plugins: [
      TanStackRouterVite({
        routesDirectory: resolve('src/renderer/src/routes'),
        quoteStyle: 'single'
      }),
      react()
    ]
  }
})
