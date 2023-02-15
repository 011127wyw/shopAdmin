import { useCookies } from '@vueuse/integrations/useCookies'

// token 封装
const TokenKey = "admin-token"
const cookie = useCookies()

// 获取 token
export function getToken(){
    return cookie.get(TokenKey)
}
// 设置 token
export function setToken(token){
    return cookie.set(TokenKey,token)
}
// 删除 token
export function removeToken(){
    return cookie.remove(TokenKey)
}