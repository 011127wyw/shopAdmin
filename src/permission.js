// 权限验证相关
import { router, addRoutes } from '~/router'
import { getToken } from '~/composables/auth.js'
import { toast, showFullLoading, hideFullLoading } from '~/composables/util.js'
import store from './store'

//全局前置守卫 

// 优化点击菜单加载速度 解决:点击一次会触发两次getinfo()
let hasGetInfo = false

router.beforeEach(async (to, from, next) => {
    // 显示全屏 loading 进度条
    showFullLoading()


    // 先获取 token
    const token = getToken()

    // 没有登录强制跳转回 login 页面
    if (!token && to.path != "/login") {
        // 提示没登录
        toast("请先登录！", "error")
        return next({ path: "/login" })
    }

    // 防止 回退按钮重复登录
    if (token && to.path == "/login") {
        toast("请勿重复登录", "error")
        return next({ path: from.path ? from.path : '/' })
    }

    let hasNewRoutes = false
    // 如果用户登录了，自动获取用户信息，并存储在 vuex 当中
    if (token && !hasGetInfo) {
        let { menus } = await store.dispatch("getinfo")
        hasGetInfo = true
        // 动态添加路由
        hasNewRoutes = addRoutes(menus)
    }

    // 设置页面标题
    let title = (to.meta.title ? to.meta.title : "") + "wyw后台"
    document.title = title

    // 放行
    hasNewRoutes ? next(to.fullpath) : next()
})


//  全局后置钩子
router.afterEach((to, from) => {
    hideFullLoading()
})