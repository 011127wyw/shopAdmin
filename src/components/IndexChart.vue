<!-- 柱状图组件 -->
<template>
    <el-card shadow="never"  class="mt-5">
        <template #header>
        <div class="flex justify-between">
            <span>订单统计</span>
            <div>
                <el-check-tag :checked="current == item.value" 
                style="margin-right: 8px" v-for="(item,index) in options" 
                :key="index" @click="handleChoose(item.value)">{{item.text}}</el-check-tag>
            </div>
        </div>
        </template>
        <!-- card body -->
        <div id="chart" ref="el" style="width: 100%;height: 300px;"></div>
    </el-card>
    
</template>

<script setup>
import {ref,onMounted, onBeforeUnmount} from 'vue'
import * as echarts from 'echarts';
import {getStatistics3} from '~/api/index.js'
// 引入屏幕适配 vueuse 
import { useResizeObserver } from '@vueuse/core';
import { entries } from 'lodash';

    // el-check-tag 默认当前选中  
    const current = ref("week")

    const options = [
        {
            text:"近一个月",
            value:"month"
        },
        {
            text:"近一周",
            value:"week"    
        },
        {
            text:"近24小时",
            value:"hour"
        }
    ]

// 点击切换 Chart 时间选项
const handleChoose  = (type) => {
    current.value = type
    // 调用 getData() 重新获取数据
    getData()
}



// 定义 echarts 柱状图
var myChart = null
onMounted(() => {
    var chartDom = document.getElementById('chart');
    // 在 permissio.js 文件中 权限判断可能删除这个节点 因此 没有这个节点时 不要去初始化图表
   if(chartDom){
    myChart = echarts.init(chartDom);

    getData()
   }
})

function getData(){

   let option = {
  xAxis: {
    type: 'category',
    data: []
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      data: [],
      type: 'bar',
      showBackground: true,
      backgroundStyle: {
        color: 'rgba(180, 180, 180, 0.2)'
      }
    }
  ]
};

// 数据加载 loading
myChart.showLoading()

// option && myChart.setOption(option);
getStatistics3(current.value).then(res => {
    option.xAxis.data = res.x
    option.series[0].data = res.y

    myChart.setOption(option);

}).finally(() => {
    myChart.hideLoading()
})


//  解决 echarts 白屏  => 页面销毁
 onBeforeUnmount(() => {
    if(myChart) echarts.dispose(myChart)
 })
}

// 调用 vueUse 方法解决屏幕大小变化适配问题
const el = ref(null)
useResizeObserver(el,(entries) => myChart.resize())
</script>

<style>

</style>