<template>
  <div v-for="tag in item.goods_skus_card_value" :key="tag.id">
    {{ tag.text }}
  </div>
</template>

<script setup>
import { initSkuCardItem } from "~/composables/useSku.js"

const props = defineProps({
  SkuCardId: [Number, String]
})

const { item } = initSkuCardItem(props.SkuCardId)
</script>

<style>
</style>