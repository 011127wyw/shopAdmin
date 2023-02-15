<!-- 店铺及交易提示组件 -->
<template>
    <el-card shadow="never" class="mt-5">
        <template #header>
            <div class="flex justify-between">
                <span class="text-sm">{{ title }}</span>
                <el-tag type="danger" effect="plain">
                    {{ tip }}
                </el-tag>
            </div>
        </template>
        <!-- card body -->
        <el-row :gutter="20">
            <el-col :span="6" :offset="0" v-for="(item,index) in btns" :key="index">
                <el-card shadow="hover" class="border-0 bg-light-400">
                    <div class="flex flex-col justify-center items-center">
                        <span class="text-xl mb-2">{{item.value}}</span>
                        <span class="tx-xs text-gray-500">{{item.label}}</span>
                    </div>
                    <!-- card body -->
                </el-card>

            </el-col>
        </el-row>

    </el-card>

</template>

<script setup>
defineProps({
    title: String,
    tip: String,
    btns:Array
})
</script>

<style>

</style>