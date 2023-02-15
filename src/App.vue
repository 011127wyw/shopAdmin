<script setup>

</script>

<template>
  <router-view></router-view>
</template>

<style >
  body {
    @apply bg-gray-100
  }
#nprogress .bar {
  background-color: #e3bbbb !important;
  height: 3px !important;
}

/* 全局修改滚动条样式 */
::-webkit-scrollbar{
  width: 4px;
  height: 6px;
}
/* 滚动条边角 */
::-webkit-scrollbar-corner {
  display: block;
}
/* 滚动条小方块 */
::-webkit-scrollbar-thumb {
  border-radius: 8px;
  background-color: rgba(0,0,0,0.2);
}
/* 滚动条轨道 */
::-webkit-scrollbar-thumb,
::-webkit-scrollbar-track{
  border-right-color: transparent;
  border-left-color: transparent;
  background-color: rgba(0,0,0,0.1);
}
</style>
