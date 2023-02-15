<!-- 封装抽屉组件 -->
<template>
  <el-drawer
    v-model="showDrawer"
    :title="title"
    :size="size"
    :close-on-click-modal="false"
    :destroy-on-close="destoryOnClose"
  >
    <div class="formDrawer">
      <!-- 表单 -->
      <div class="body">
        <slot> </slot>
      </div>
      <!-- 按钮 -->
      <div class="actions">
        <el-button type="primary" @click="submit" :loading="loading">{{
          confirmText
        }}</el-button>
        <el-button type="primary" @click="close">取消</el-button>
      </div>
    </div>
  </el-drawer>
</template>

<script setup>
import { ref } from 'vue';

const showDrawer = ref(false)


// 打开抽屉
const open = () => showDrawer.value = true


// 关闭抽屉
const close = () => showDrawer.value = false


const props = defineProps({
  title: {
    type: String,
    default: '默认值'
  },
  size: {
    type: String,
    default: '30%',
  },
  destoryOnClose: {
    type: Boolean,
    default: false

  },
  confirmText: {
    type: String,
    default: '提交',
  }
})


const loading = ref(false)
const showLoading = () => loading.value = true
const hideLoading = () => loading.value = false

const emit = defineEmits(["submit"])
const submit = () => emit("submit")


// 向父组件暴露方法
defineExpose({
  open,
  close,
  showLoading,
  hideLoading
})

</script>

<style>
.formDrawer {
  width: 100%;
  height: 100%;
  @apply flex flex-col;
}

.formDrawer .body {
  overflow-y: auto;
  /* top: 0;
  left: 0;
  right: 0;
  bottom: 50px; */
}

.formDrawer .actions {
  height: 50px;
  @apply mt-auto flex justify-center items-center;
}
</style>