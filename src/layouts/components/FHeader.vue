<template>
  <div class="f-header">
    <span class="logo">
      <el-icon class="mr-2"><ChromeFilled /></el-icon>
      IGANG
    </span>
    <el-icon class="icon-btn" @click="$store.commit('handleAsideWidth')">
      <Fold v-if="$store.state.asideWidth == '250px'" />
      <Expand v-else />
    </el-icon>

    <el-tooltip effect="dark" content="刷新" placement="bottom" :hide-after="0">
      <el-icon class="icon-btn" @click="handleRefresh"><Refresh /></el-icon>
    </el-tooltip>

    <div class="ml-auto flex justify-center items-center">
      <el-tooltip
        effect="dark"
        content="全屏"
        placement="bottom"
        :hide-after="0"
      >
        <el-icon class="icon-btn" @click="toggle">
          <FullScreen v-if="!isFullscreen" />
          <Aim v-else />
        </el-icon>
      </el-tooltip>

      <el-dropdown class="dropdown" @command="handleCommand">
        <span class="flex justify-center items-center text-light-50">
          <el-avatar class="mr-2" :size="25" :src="$store.state.user.avatar" />
          {{ $store.state.user.username }}
          <el-icon class="ml-2">
            <arrow-down />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="rePassWord">修改密码</el-dropdown-item>
            <el-dropdown-item command="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
  <!-- 修改密码弹窗 -->
  <form-drawer
    ref="formDrawerRef"
    title="修改密码"
    destoryOnClose
    @submit="onSubmit"
  >
    <el-form ref="formRef" :model="ruleForm" :rules="rules" label-width="80px">
      <el-form-item prop="oldpassword" label="旧密码">
        <el-input
          type="password"
          show-password
          v-model="ruleForm.oldpassword"
          placeholder="请输入旧密码"
        ></el-input>
      </el-form-item>
      <el-form-item prop="password" label="新密码">
        <el-input
          type="password"
          show-password
          v-model="ruleForm.password"
          placeholder="请输入新密码"
        ></el-input>
      </el-form-item>
      <el-form-item prop="repassword" label="确认密码">
        <el-input
          type="password"
          show-password
          v-model="ruleForm.repassword"
          placeholder="请确认密码"
        ></el-input>
      </el-form-item>
    </el-form>
  </form-drawer>
</template>

<script setup>
import { useFullscreen } from "@vueuse/core";
// 引入抽屉组件
import FormDrawer from '~/components/FormDrawer.vue';
// 引入 修改密码 API
import { useRepassword, useLogout } from '~/composables/useManager.js'


const { formDrawerRef,
  ruleForm,
  rules,
  formRef,
  onSubmit,
  openRePassWordForm } = useRepassword()

// 使用 { handleLogout } 导入会导致 报错
const handleLogout = useLogout()

// 全屏按钮
const {
  //  是否全屏状态
  isFullscreen,
  //  切换全屏
  toggle } = useFullscreen()

// 下拉菜单
const handleCommand = function (c) {
  switch (c) {
    case "logout":
      try {
        handleLogout()
      } catch (error) {
        console.log(err);
      }
      break;

    case "rePassWord":
      openRePassWordForm()
      break;
  }
}

// 刷新页面按钮
const handleRefresh = () => location.reload()







</script>

<style>
.f-header {
  @apply flex items-center bg-pink-300 text-light-50 fixed top-0 left-0 right-0;
  height: 50px;
  z-index: 1000;
}

.logo {
  width: 250px;
  @apply flex justify-center items-center  text-xl font-thin;
}

.icon-btn {
  @apply flex justify-center items-center;
  width: 42px;
  height: 50px;
  cursor: pointer;
}

.icon-btn:hover {
  @apply bg-pink-200;
}

.f-header .dropdown {
  height: 64px;
  cursor: pointer;
  @apply flex justify-center items-center mx-5;
}
</style>