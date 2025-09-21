import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import { fileURLToPath, URL } from 'node:url'

// https://vite.dev/config/
export default defineConfig({
  // 如果这是个人/组织主页(用户名.github.io)，保持 base: '/'
  // 如果这是项目仓库，将 base 修改为 '/仓库名称/'
  base: '/DECO27-syoukai/',
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
