<!-- 添加规格 -->
<template>
  <el-form-item label="添加规格">
    <el-card
      shadow="never"
      class="w-full mb-3"
      v-for="item in sku_card_list"
      :key="item.id"
      v-loading="item.loading"
    >
      <template #header>
        <div class="flex items-center">
          <el-input
            v-model="item.text"
            placeholder="规格名称"
            style="width: 200px"
            @change="handleUpdate(item)"
          >
            <template #append>
              <el-icon>
                <more />
              </el-icon>
            </template>
          </el-input>
          <el-button size="small" class="ml-auto"
            ><el-icon><Top /></el-icon
          ></el-button>
          <el-button size="small"
            ><el-icon><Bottom /></el-icon
          ></el-button>
          <el-button size="small" @click="handleDelete(item)"
            ><el-icon><Delete /></el-icon
          ></el-button>
        </div>
      </template>
      <!-- card body -->
      <SkuCardItem :SkuCardId="item.id" />
    </el-card>
    <el-button
      type="success"
      size="small"
      :loading="btnLoading"
      @click="addSkuCardEvent"
      >添加规格</el-button
    >
  </el-form-item>
</template>

<script setup>
import SkuCardItem from './SkuCardItem.vue'
import { sku_card_list, addSkuCardEvent, btnLoading, handleUpdate, handleDelete } from '~/composables/useSku.js'
</script>

<style>
.el-card__header {
  @apply !p-2 bg-gray-50;
}
</style>