import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import App from './App.vue'
import 'virtual:windi.css'
import {router} from './router'
import store from '~/store/index.js'


const app = createApp(App)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }

app.use(ElementPlus)
app.use(router)
app.use(store)

// 引入全局路由守卫
import './permission'

// 引入全局 loading 进度条样式
import 'nprogress/nprogress.css'

import permission from '~/directives/permission.js'
app.use(permission)

app.mount('#app')
