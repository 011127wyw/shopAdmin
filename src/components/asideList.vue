<template>
  <!-- 图库侧边的列表 -->
  <div class="aside-list" :class="{ active: active }">
    <!-- truncate 表示超出的部分显示.... -->
    <span class="truncate">
      <slot />
    </span>
    <!-- text 文字按钮 -->
    <el-button
      class="ml-auto px-1"
      text
      type="primary"
      size="small"
      @click="$emit('edit')"
    >
      <el-icon :size="12">
        <Edit />
      </el-icon>
    </el-button>
    <!-- 阻止事件冒泡  案例：点击删除按钮时，页面会加载到删除的页面(冒泡)，解决这一问题 使用点击阻止冒泡给空回调 -->
    <span @click.stop="() => {}">
      <el-popconfirm
        title="是否删除该分类?"
        confirm-button-text="确认"
        cancel-button-text="取消"
        @confirm="$emit('delete')"
      >
        <template #reference>
          <el-button class="px-1" text type="primary" size="small">
            <el-icon :size="12">
              <Close />
            </el-icon>
          </el-button>
        </template>
      </el-popconfirm>
    </span>
  </div>
</template>

<script setup>
defineProps({
  active: {
    type: Boolean,
    default: false
  }
})

// 暴露两个事件出去
defineEmits(['edit', 'delete'])
</script>

<style>
.aside-list {
  border: 1px solid #f4f4f4;
  cursor: pointer;
  @apply flex items-center p-3 text-sm text-gray-600;
}

/*  active 激活状态下默认选中  */
.aside-list:hover,
.active {
  @apply bg-blue-50;
}
</style>