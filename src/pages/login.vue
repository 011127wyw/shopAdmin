<template>
  <el-row class="login-container">
    <el-col class="login-panel">
      <span class="login-logo">——login——</span>

      <el-form ref="formRef" :model="ruleForm" :rules="rules">
        <el-form-item prop="username">
          <el-input v-model="ruleForm.username" placeholder="请输入账号">
            <template #prefix>
              <el-icon><User /></el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="ruleForm.password"
            placeholder="请输入密码"
            type="password"
            show-password
          >
            <template #prefix>
              <el-icon><Lock /></el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button round type="primary" @click="onSubmit" :loading="loading"
            >登 录</el-button
          >
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<script setup>
import { ref, reactive, onMounted, onBeforeUnmount } from 'vue'
import { login } from '~/api/manage.js'
import { useRouter } from 'vue-router';
import { setToken } from '~/composables/auth.js'
import { toast } from '~/composables/util.js'
import { useStore } from 'vuex'


const store = useStore()

//防止重复点击按钮请求登录
const loading = ref(false)

const router = useRouter()

const ruleForm = reactive({
  username: '',
  password: ''
})

const rules = {
  username: [
    {
      required: true,
      message: "请输入有效的账号！",
      trigger: blur

    }
  ],
  password: [
    {
      required: true,
      message: "请输入有效的密码！",
      trigger: blur

    }
  ]
}

const formRef = ref(null)

const onSubmit = () => {
  formRef.value.validate((valid) => {
    if (!valid) {
      return false
    }
    loading.value = true
    // 在manage.js中定义的login方法体返回的是 promise 所以下面可以使用 then
    login(ruleForm.username, ruleForm.password)
      .then(res => {
        console.log(res)

        // 登陆成功消息通知
        toast("登陆成功")

        // 存储taken
        setToken(res.token)


        // 跳转到后台首页
        router.push('/')

      })
      .finall(() => {
        loading.value = false
      })

  })

};


// 监听回车事件
function onKeyUp(e) {
  if (e.key == "Enter")
    onSubmit()
}

// 生命周期-onMount 页面渲染完成 添加键盘监听
onMounted(() => {
  document.addEventListener("keyup", onKeyUp)
})

// 生命周期-onMount 页面渲染完成 移除键盘监听
onBeforeUnmount(() => {
  document.removeEventListener("keyup", onKeyUp)
})



</script>

<style scoped>
.login-container {
  position: relative;
  width: 100%;
  height: 947px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: linear-gradient(
    94.3deg,
    rgba(26, 33, 64, 1) 10.9%,
    rgba(81, 84, 115, 1) 87.1%
  );
  /* overflow: hidden; */
}

.login-container::before {
  position: absolute;
  content: "";
  z-index: 2;
  width: 450px;
  height: 450px;
  top: 50%;
  left: 50%;
  background-color: #ffe53b;
  transform: translate(-100%, -80%);
  border-radius: 50%;
  background-image: linear-gradient(147deg, #ffe53b 0%, #ff2425 74%);
  box-shadow: 0px 0px 0px 0px rgba(255, 255, 255, 0.2);
  animation: pulse 1.5s infinite;
}

.login-container::after {
  position: absolute;
  content: "";
  z-index: 2;
  width: 300px;
  height: 300px;
  top: 50%;
  left: 50%;
  background-color: #fa8bff;
  background-image: linear-gradient(
    45deg,
    #fa8bff,
    0%,
    #2bd2ff 50%,
    #2bff88 90%
  );
  border-radius: 50%;
  box-shadow: 0px 0px 0px 0px rgba(255, 255, 255, 0.2);
  animation: pulse 1.5s infinite;
}

@keyframes pulse {
  0% {
    box-shadow: 0 0 0 50px rgba(255, 255, 255, 0.2);
  }

  100% {
    box-shadow: 0 0 0 0 rgba(255, 255, 255, 0);
  }
}

.login-panel {
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 3;
  width: 300px;
  left: 40%;
  background-color: rgba(255, 255, 255, 0.1);
  padding: 45px 30px;
  border-radius: 8px;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(20px);
}

.login-logo {
  text-align: center;
  font-size: large;
  color: rgb(189, 224, 51);
  margin-bottom: 20px;
  margin-top: -10px;
}

.el-input {
  width: 221px;
  height: 50px;
  border-radius: 8px;
  background-color: transparent;
  border: 1px solid rgba(255, 255, 255, 0.5);
  margin-bottom: 15px;
  /* padding-left: 15px; */
  color: #fff;
  outline: none;
}

.el-input::placeholder {
  color: #fff;
}

.el-button {
  width: 100%;
  height: 50px;
  margin-top: 20px;
  border: 0;
  background-image: linear-gradient(
    to right,
    #02aab0 0%,
    #00cdac 51%,
    #02aab0 100%
  );
  background-size: 200% auto;
  color: #fff;
  border-radius: 8px;
  outline: none;
  cursor: pointer;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  transition: all ease 0.4s;
}

.el-button:hover {
  background-position: right center;
  color: #fff;
  text-decoration: none;
}
</style>