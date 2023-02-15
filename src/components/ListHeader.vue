<!-- 新增和刷新 -->
<template>
  <div class="flex items-center justify-between mb-4">
    <div>
      <el-button
        v-if="btns.includes('create')"
        type="primary"
        size="default"
        text
        @click="$emit('create')"
        >新增</el-button
      >

      <el-popconfirm
        v-if="btns.includes('delete')"
        title="是否批量删除选中的数据？"
        confirmButtonText="确认"
        cancelButtonText="取消"
        @confirm="$emit('delete')"
      >
        <template #reference>
          <el-button type="danger" size="default" text>批量删除</el-button>
        </template>
      </el-popconfirm>

      <slot />
    </div>

    <div>
      <el-tooltip
        effect="light"
        v-if="btns.includes('refresh')"
        content="刷新数据"
        placement="top"
      >
        <el-button size="small" text @click="$emit('refresh')">
          <el-icon :size="15">
            <Refresh />
          </el-icon>
        </el-button>
      </el-tooltip>
      <el-tooltip
        effect="light"
        v-if="btns.includes('download')"
        content="导出数据"
        placement="top"
      >
        <el-button size="small" text @click="$emit('download')">
          <el-icon :size="15">
            <Download />
          </el-icon>
        </el-button>
      </el-tooltip>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  layout: {
    type: String,
    default: "create,refresh"
  }
})
defineEmits(['create', 'refresh', 'delete', 'download'])

const btns = computed(() => props.layout.split(","))
</script>

<style>
</style>