<!-- 权限管理界面表单之新增图片的组件封装 -->
<template>
  <div class="flex items-center">
    <el-icon v-if="modelValue" :size="20" class="mr-2">
      <component :is="modelValue"></component>
    </el-icon>
    <el-select
      :modelValue="modelValue"
      class="ml-2"
      placeholder="请选择菜单图标"
      filterable
      @change="handleChange"
    >
      <el-option v-for="item in icons" :key="item" :label="item" :value="item">
        <div class="flex items-center justify-between">
          <el-icon>
            <component :is="item"></component>
          </el-icon>
          <span class="text-gray-500">{{ item }}</span>
        </div>
      </el-option>
    </el-select>
  </div>
</template>

<script setup>
import { ref } from "vue"
import * as iconList from "@element-plus/icons-vue"

defineProps({
  modelValue: String
})
const icons = ref(Object.keys(iconList))

const emit = defineEmits(['update:modelValue'])
const handleChange = (icon) => {
  emit('update:modelValue', icon)
}
</script>

