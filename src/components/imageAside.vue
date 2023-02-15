<template>
  <!-- 封装的图库的侧边部分 -->
  <el-aside width="220px" class="image-aside" v-loading="loading">
    <div class="top">
      <!-- 侧边列表 -->
      <aside-list
        :active="activeId == item.id"
        v-for="(item, index) in list"
        :key="index"
        @edit="handleEdit(item)"
        @delete="handleDelete(item.id)"
        @click="handleChangeActiveId(item.id)"
        >{{ item.name }}</aside-list
      >
    </div>
    <div class="bottom">
      <el-pagination
        background
        layout="prev,next"
        :total="total"
        :current-page="currentPage"
        :page-size="limit"
        @current-change="getData"
      />
    </div>
  </el-aside>
  <!-- 新增图片抽屉组件 -->
  <form-drawer
    ref="formDrawerRef"
    :title="drawerTitle"
    destoryOnClose
    @submit="handleSubmit"
  >
    <el-form
      ref="formRef"
      :model="form"
      :rules="rules"
      label-width="80px"
      :inline="false"
    >
      <el-form-item label="相册名称" prop="name">
        <el-input v-model="form.name"></el-input> </el-form-item
      ><el-form-item label="排序" prop="order">
        <el-input-number v-model="form.order" :min="0" :max="1000" />
      </el-form-item>
    </el-form>
  </form-drawer>
</template>

<script setup>
import asideList from '~/components/asideList.vue'
import FormDrawer from './FormDrawer.vue';
import { reactive, ref, computed } from 'vue'
import { getImageClassList, createImageClass, updateImageClass, deleteImageClass } from '~/api/image_class';
import { toast } from '../composables/util';

// 加载动画
const loading = ref(false)
// 保存后端传来的列表数据
const list = ref([])

// 选中图库分类ID
// 动态选中列表
const activeId = ref(0)
const emit = defineEmits(['change'])
// 切换分类
function handleChangeActiveId(id) {
  activeId.value = id
  emit("change", id)
}


// 分页
// 当前页
const currentPage = ref(1)
// 总条数 （数据）
const total = ref(0)
// 每页多少条（数据）
const limit = ref(10)

// 获取数据  p 是哪里传来的
function getData(p = null) {
  if (typeof p == 'number') {
    currentPage.value = p
  }
  loading.value = true
  getImageClassList(currentPage.value).then(res => {
    // console.log(res);
    // 获取后端传来的总条数
    total.value = res.totalCount
    list.value = res.list
    // 进入页面默认激活选中第一个列表
    let item = list.value[0]
    if (item) {
      // activeId.value = item.id
      handleChangeActiveId(item.id)
    }
  }).finally(() => {
    loading.value = false
  })
}
getData()

const editId = ref(0)

// 定义抽屉的名称动态改变 
const drawerTitle = computed(() => editId.value ? "修改" : "新增")


const formDrawerRef = ref(null)
// 打开抽屉的 方法
const handleCreate = () => {
  editId.value = 0
  form.name = ""
  form.order = 50
  formDrawerRef.value.open()
}



// 将打开抽屉的方法暴露给父组件
defineExpose({
  handleCreate
})


const form = reactive({
  name: "",
  order: 50
})

const rules = {
  name: [{
    required: true,
    message: "图库名称不能为空",
    trigger: blur

  }]
}

const formRef = ref(null)
// 提交抽屉表单
const handleSubmit = () => {
  formRef.value.validate((valid) => {
    if (!valid) return
    formDrawerRef.value.showLoading()
    // 如果 editId > 0 那么就是修改 调用 updateImageClass 否则 createImageClass
    // 因为 createUmageClass 参数值和 form 一样 直接传入 form
    const fun = editId.value ? updateImageClass(editId.value, form) : createImageClass(form)
    fun.then(res => {
      toast(drawerTitle.value + "成功")
      // 刷新数据
      getData(editId.value ? currentPage.value : 1)
      // 关闭弹窗
      formDrawerRef.value.close()
    }).finally(() => {
      formDrawerRef.value.hideLoading()
    })
  })
}

// 列表编辑方法
const handleEdit = (row) => {
  editId.value = row.id
  form.name = row.name
  form.order = row.order
  formDrawerRef.value.open()
}

// 列表删除方法
const handleDelete = (id) => {
  loading.value = true
  deleteImageClass(id).then(res => {
    toast("删除成功")
    getData()
  }).finally(() => {
    loading.value = false
  })
}
</script>

<style>
.image-aside {
  border-right: 1px solid #eeeeee;
  position: relative;
}

.image-aside .top {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 50px;
  overflow-y: auto;
}
.image-aside .bottom {
  position: absolute;
  bottom: 0;
  height: 50px;
  left: 0;
  right: 0;
  @apply flex items-center justify-center;
}
</style>