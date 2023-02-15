import axios from '~/axios'
// 会员等级列表
export function getUserLevelList(page) {
    return axios.get(`/admin//user_level/${page}`)
}

// 增加等级列表
export function createUserLevel(data) {
    return axios.post("/admin/user_level", data)
}

// 修改等级列表
export function updateUserLevel(id, data) {
    return axios.post("/admin/user_level/" + id, data)
}

// 修改等级列表状态
export function updateUserLevelStatus(id, status) {
    return axios.post(`/admin/user_level/${id}/update_status`, { status })
}

// 删除等级列表
export function deleteUserLevel(id) {
    return axios.post(`/admin/user_level/${id}/delete`)
}

