import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import { fileURLToPath, URL } from 'node:url'

// https://vite.dev/config/
export default defineConfig({
  base: '/',
  plugins: [
    vue(),
    vueDevTools(),
  ],
  build: {
    // 确保输出的JS文件有正确的MIME类型
    target: 'es2015',
    assetsDir: 'assets',
    chunkSizeWarningLimit: 10000,
    rollupOptions: {
      output: {
        // 确保资源文件路径正确
        manualChunks: undefined
      }
    }
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  server: {
    // 开发服务器配置，确保本地预览正常
    fs: {
      allow: ['..']
    }
  }
})
