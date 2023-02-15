import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import WindiCSS from 'vite-plugin-windicss'
import path, { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  // 别名配置
  resolve: {
    alias: {
      '~': path.resolve(__dirname, "src")
    }
  },
  server: {
    proxy: {
      // 解决login 登录跨域问题 使用/api来代理 服务器的 baseUrl
      '/api': {
        target: 'http://ceshi13.dishait.cn',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      },
    }
  },
  plugins: [vue(),
  WindiCSS()
  ]
})
