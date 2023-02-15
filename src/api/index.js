import axios from '~/axios'

// 后台首页 最上方 card 接口
export function getStatistics1(){
    return axios.get('/admin/statistics1')
}

// 图表接口
export function getStatistics3(type){
    return axios.get('/admin/statistics3?type=' + type)
}

// 店铺及交易提示接口
export function getStatistics2(){
    return axios.get('/admin/statistics2')
}