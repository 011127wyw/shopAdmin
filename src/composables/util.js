// 登录消息弹窗封装
import { ElNotification, ElMessageBox } from 'element-plus'
import nProgress from 'nprogress'


export function toast(message, type = "success", dangerouslyUseHTMLString = true) {
  ElNotification({
    message,
    type,
    // 使危险提示显示为字符串 隐藏HTML节点
    dangerouslyUseHTMLString,
    duration: 2000
  })
}

// 退出登录消息弹窗封装
export function showModel(content = "提示内容", type = "warning", title = "") {
  return ElMessageBox.confirm(
    content,
    title,
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type,
    }
  )

}

// 消息输入框
export function showPrompt(tip, value = "") {
  return ElMessageBox.prompt(tip, '', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    inputValue: value
  })
}

// 显示全屏 loading 进度条
export function showFullLoading() {
  nProgress.start()
}
// 隐藏全屏 loading 进度条
export function hideFullLoading() {
  nProgress.done()
}


// 将 query 对象转成 url 参数 
// 实际用法就是在 发请求时 url 地址后有参数 直接 将 query 对象转成 url 参数 替代
export function queryParams(query) {
  let q = []
  for (const key in query) {
    if (query[key]) {
      // encodeURIComponent 将字符串转成 url 编码  防止参数丢失
      q.push(`${key}=${encodeURIComponent(query[key])}`)
    }
  }
  // 参数之间用 & 连接
  let r = q.join("&")
  // 如果 r 有值 则前面加一个？ 没有则为空
  r = r ? ("?" + r) : ""

  return r
}