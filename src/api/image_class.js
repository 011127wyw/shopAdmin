// 图库列表数据
import axios from '~/axios'

export function getImageClassList(page){
    // 这里参数 limit 默认每页就是显示十条数据 可以不写
   return axios.get("/admin/image_class/" + page)
}

// 增加图库分类
export function createImageClass(data){
    return axios.post("/admin/image_class",data)
}

// 修改图库分类
export function updateImageClass(id,data){
    return axios.post("/admin/image_class/" + id,data)
}

// 删除图库分类
export function deleteImageClass(id){
    return axios.post(`/admin/image_class/${id}/delete`)
}

