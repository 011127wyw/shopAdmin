<template>
  <!-- :style="{width:$store.state.asideWidth}" 动态绑定 折叠菜单栏宽度 -->
  <div class="f-menu" :style="{ width: $store.state.asideWidth }">
    <el-menu
      :collapse="isCollapse"
      :collapse-transition="false"
      unique-opened
      :default-active="defaultActive"
      class="border-0"
      @select="handleSelect"
    >
      <template v-for="(item, index) in asideMenus" :key="index">
        <!-- 遍历循环一级菜单 -->
        <el-sub-menu
          v-if="item.child && item.child.length > 0"
          :index="item.name"
        >
          <template #title>
            <el-icon><component :is="item.icon"></component></el-icon>
            <span>{{ item.name }}</span>
          </template>
          <!-- 遍历循环二级菜单 -->
          <el-menu-item
            v-for="(item2, index2) in item.child"
            :key="index2"
            :index="item2.frontpath"
          >
            <el-icon><component :is="item2.icon"></component></el-icon>
            <span>{{ item2.name }}</span>
          </el-menu-item>
        </el-sub-menu>
        <el-menu-item v-else :index="item.frontpath">
          <el-icon><component :is="item.icon"></component></el-icon>
          <span>{{ item.name }}</span>
        </el-menu-item>
      </template>
    </el-menu>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useRouter, useRoute, onBeforeRouteUpdate } from 'vue-router'
import { useStore } from 'vuex'

const router = useRouter()
const store = useStore()

// 菜单选中和路由关联
const route = useRoute()
// 默认选中
const defaultActive = ref(route.path)
// 修复标签导航跳转但是菜单不跳转的问题
onBeforeRouteUpdate((to, from) => {
  defaultActive.value = to.path
})

// 是否折叠
const isCollapse = computed(() => !(store.state.asideWidth == '250px'))


const asideMenus = computed(() => store.state.menus)

const handleSelect = (e) => {
  router.push(e)
}

</script>

<style>
.f-menu {
  transition: all 0.5s;
  top: 50px;
  bottom: 0;
  left: 0;
  overflow-y: auto;
  overflow-x: hidden;
  @apply shadow-violet-300 fixed bg-light-50;
}
</style> 