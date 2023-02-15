import axios from "axios";
import store from './store'
import { getToken } from '~/composables/auth'
import { toast } from '~/composables/util'


const service = axios.create({
  baseURL: '/api'
})

// 添加请求拦截器
service.interceptors.request.use(function (config) {

  const token = getToken()
  // // 获取之前登录时的 token   将token赋给请求头，发请求时带着token
  if (token) {
    config.headers["token"] = token
  }
  // 在发送请求之前做些什么
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
service.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  return response.request.responseType == "blob" ? response.data : response.data.data;
}, function (error) {
  const msg = error.response.data.msg || '请求失败'

  if (msg == '非法token,请先登录') {
    store.dispatch("logout").finally(() => location.reload())
  }

  toast(msg, "error")


  // 对响应错误做点什么
  return Promise.reject(error);
});


export default service