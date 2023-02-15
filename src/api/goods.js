import axios from "~/axios";
import { queryParams } from "~/composables/util";

// 商品列表
export function getGoodsList(page, query = {}) {
    let r = queryParams(query)
    return axios.get(`/admin/goods/${page}${r}`)
}

// 增加商品
export function createGoods(data) {
    return axios.post("/admin/goods", data)
}

// 修改商品
export function updateGoods(id, data) {
    return axios.post(`/admin/goods/${id}`, data)
}

// 批量上架/下架商品
export function updateGoodsStatus(ids, status) {
    return axios.post("/admin/goods/changestatus", {
        ids,
        status
    })
}

// 批量删除商品 删除商品
export function deleteGoods(ids) {
    return axios.post(`/admin/goods/delete_all`, { ids })
}

// 彻底删除
export function destroyGoods(ids) {
    return axios.post(`/admin/goods/destroy`, {
        ids
    })
}


// 批量恢复
export function restoreGoods(ids) {
    return axios.post(`/admin/goods/restore`, { ids })
}



// 查看商品
export function readGoods(id) {
    return axios.get(`/admin/goods/read/${id}`)
}

// 设置商品轮播图
export function setGoodsBanner(id, data) {
    return axios.post(`/admin/goods/banners/${id}`, data)
}

// 设置商品规格
export function updateGoodsSkus(id, data) {
    return axios.post(`/admin/goods/updateskus/${id}`, data)
}

// 添加商品规格 
export function createGoodsSkusCard(data) {
    return axios.post(`/admin/goods_skus_card`, data)
}

// 修改规格选项
export function updateGoodsSkusCard(id, data) {
    return axios.post(`/admin/goods_skus_card/${id}`, data)
}

// 删除规格选项
export function deleteGoodsSkusCard(id) {
    return axios.post(`/admin/goods_skus_card/${id}/delete`)
}