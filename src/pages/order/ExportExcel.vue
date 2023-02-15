<template>
  <el-drawer title="导出订单" v-model="dialogVisible" size="30%">
    <el-form :model="form" label-width="80px">
      <el-form-item label="订单类型">
        <el-select v-model="form.tabs" placeholder="请选择">
          <el-option
            v-for="item in tabs"
            :key="item.key"
            :label="item.name"
            :value="item.key"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="时间范围">
        <el-date-picker
          v-model="form.time"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          value-format="YYYY-MM-DD"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit" :loading="loading"
          >导出</el-button
        >
      </el-form-item>
    </el-form>
  </el-drawer>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { exportOrder } from '~/api/order'
import { toast } from '~/composables/util'

defineProps({
  tabs: Array
})

const form = reactive({
  tabs: null,
  time: ""
})

const dialogVisible = ref(false)

const open = () => dialogVisible.value = true
const close = () => dialogVisible.value = false

const loading = ref(false)
const onSubmit = () => {
  if (!form.tabs) return toast('订单类型必填', 'error')
  loading.value = true
  let starttime = null
  let endtime = null
  if (form.time && Array.isArray(form.time)) {
    starttime = form.time[0]
    endtime = form.time[1]
  }
  exportOrder({
    tab: form.tabs,
    starttime,
    endtime
  }).then(data => {
    let url = window.URL.createObjectURL(new Blob([data]))
    let link = document.createElement('a')
    link.style.display = "none"
    link.href = url
    let filename = (new Date()).getTime() + ".xlsx"
    link.setAttribute("download", filename)
    document.body.appendChild(link)
    link.click()
    close()
  }).finally(() => {
    loading.value = false
  })
}

defineExpose({
  open
})
</script>

<style>
</style>