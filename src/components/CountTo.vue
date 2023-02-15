<!-- 销售统计组件 -->
<template>
   <div>
        <!-- 防止动画的时候小数点跳动太多 使用 toFixed() 方法来限制小数 -->
        {{d.num.toFixed(0)}}
   </div>
</template>

<script setup>
import {reactive,watch} from 'vue'
import gsap from 'gsap'

// 接收参数 需要滚动到哪一个值(即传入的参数)
const props = defineProps({
    value:{
        type:Number,
        default:0
    }
})

// 默认值为 0 
const d = reactive({
    num:0
})

function AnimatedToValue(){
    gsap.to(d,{
        duration:0.5,
        num:props.value
    })
}

AnimatedToValue()

// 监听 props 有没有变化，如果变化了重新执行 动画效果
watch(() => props.value,() => AnimatedToValue())
</script>

<style>

</style>