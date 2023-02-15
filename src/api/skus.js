import axios from '~/axios'
// 商品规格列表
export function getSkusList(page) {
    return axios.get(`/admin/skus/${page}`)
}

// 增加商品规格
export function createSkus(data) {
    return axios.post("/admin/skus", data)
}

// 修改商品规格
export function updateSkus(id, data) {
    return axios.post("/admin/skus/" + id, data)
}

// 修改商品规格状态
export function updateSkusStatus(id, status) {
    return axios.post(`/admin/skus/${id}/update_status`, { status })
}

// 批量删除商品规格
export function deleteSkus(ids) {
    // 在删除时判断传入的参数是不是数组 不是的话则封装成数组
    ids = !Array.isArray(ids) ? [ids] : ids
    return axios.post(`/admin/skus/delete_all`, { ids })
}

