import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  // 代理http请求，解决跨域问题
  server: {
    host: 'localhost',
    port: 5173,
    proxy: {
      '/api': { //匹配请求路径中含有 /api 的请求
        // target: 'http://localhost:10086', //后端服务地址
        target: 'http://laptop:10086', //后端服务地址
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '') //去除路径中的/api，还原请求路径
      }
    }
  },
})

