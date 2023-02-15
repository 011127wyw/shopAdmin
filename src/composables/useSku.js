import { ref } from 'vue'
import { createGoodsSkusCard, updateGoodsSkusCard, deleteGoodsSkusCard } from '~/api/goods'


// 当前商品 Id
export const goodsId = ref(0)

// 规格选项列表
export const sku_card_list = ref([])

// 初始化规格选项列表
export function initSkuCardList(d) {
    sku_card_list.value = d.goods_skus_card.map(item => {
        // 使每次修改的时候错误都能返回原来的value值 text 修改的值 name 原来的值
        item.text = item.name
        item.loading = false
        item.goods_skus_card_value.map(v => {
            v.text = v.value || '属性值'
            return v
        })
        // map 方法记得 return 不然 item 没有值
        return item
    })

}

// 添加规格选项的列表
export const btnLoading = ref(false)
export function addSkuCardEvent() {
    btnLoading.value = true
    createGoodsSkusCard({
        goods_id: goodsId.value, //商品ID
        name: "规格选项", //规格名称
        order: 50, //排序
        type: 0 //规格类型 0文字
    })
        .then(res => {
            sku_card_list.value.push({
                ...res,
                text: res.name,
                loading: false,
                goods_skus_card_value: []
            })
        })
        .finally(() => {
            btnLoading.value = false
        })
}

// 修改规格选项
export function handleUpdate(item) {
    item.loading = true
    updateGoodsSkusCard(item.id, {
        goods_id: item.goods_id, //商品ID
        name: item.text, //规格名称
        order: item.order, //排序
        type: 0 //规格类型 0文字
    })
        .then(res => {
            item.name = item.text
        })
        .catch(err => {
            item.text = item.name
        })
        .finally(() => {
            item.loading = false

        })
}

// 删除规格选项
export function handleDelete(item) {
    item.loading = true
    deleteGoodsSkusCard(item.id)
        .then(res => {
            const i = sku_card_list.value.findIndex(o => o.id == item.id)
            if (i != -1) {
                sku_card_list.value.splice(i, 1)
            }

        })
        .finally(() => {
            item.loading = false
        })
}

// 初始化规格的值
export function initSkuCardItem(id) {
    // 查询规格对应的 id 对应的 规格值对象
    const item = sku_card_list.value.find(o => o.id == id)
    return { item }
} 