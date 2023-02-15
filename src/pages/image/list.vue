<template>
  <el-container class="bg-white rounded" :style="{ height: h + 'px' }">
    <el-header class="image-header">
      <el-button type="primary" size="small" @click="handleOpenCreate"
        >新增图片分类</el-button
      >
      <el-button type="warning" size="small" @click="handleOpenUpload"
        >上传图片</el-button
      >
    </el-header>
    <el-container>
      <!-- 图库侧边组件 -->
      <image-aside ref="ImageAsideRef" @change="handleAsideChange" />
      <!-- 图库主体组件 -->
      <image-main ref="ImageMainRef" />
    </el-container>
  </el-container>
</template>
<script setup>
import { ref } from 'vue'
import imageAside from '~/components/imageAside.vue'
import imageMain from '~/components/imageMain.vue'

// 图库页面部分高度测算
const windowHeight = window.innerHeight || document.body.clientHeight
const h = windowHeight - 50 - 44 - 64

// 引入抽屉组件
// 新增图片分类
const ImageAsideRef = ref(null)
const handleOpenCreate = () => ImageAsideRef.value.handleCreate()
// 上传图片
const ImageMainRef = ref(null)
const handleOpenUpload = () => ImageMainRef.value.handleUpload()


const handleAsideChange = (image_class_id) => {
  // 根据 ImageMainRef 调用 imageMain 暴露出来的 loadData 方法 更新数据
  ImageMainRef.value.loadData(image_class_id)
}
</script>
<style>
.image-header {
  border-bottom: 1px solid #eeeeee;
  @apply flex items-center;
}
</style>