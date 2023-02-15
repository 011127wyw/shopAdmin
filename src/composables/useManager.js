import { ref, reactive } from 'vue'
import { logout,updatepassword } from '~/api/manage.js'
import { showModel,toast } from '~/composables/util.js'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'


export function useRepassword() {

  const router = useRouter()
  const store = useStore()


    // 修改密码 弹窗
    const formDrawerRef = ref(null)
  
    const ruleForm = reactive({
      oldpassword: "",
      password: "",
      repassword: ""
    })
  
  
    const rules = {
      oldpassword: [
        {
          required: true,
          message: "旧密码不能为空",
          trigger: blur
  
        }
      ],
      password: [
        {
          required: true,
          message: "新密码不能为空",
          trigger: blur
  
        }
      ],
      repassword: [
        {
          required: true,
          message: "确认密码不能为空",
          trigger: blur
  
        }
      ]
    }
  
    //防止重复点击按钮提交
  
    const formRef = ref(null)
  
    const onSubmit = () => {
      formRef.value.validate((valid) => {
        if (!valid) {
          return false
        }
        formDrawerRef.value.showLoading()
        updatepassword(ruleForm)
          .then(res => {
            toast("密码修改成功，请重新登录")
            store.dispatch("logout")
            router.push('/login')
          })
          .finally(() => {
            formDrawerRef.value.hideLoading()
          })
      })
  
    };
  
  
    const openRePassWordForm = () => formDrawerRef.value.open()
  
  
    return {
      formDrawerRef,
      ruleForm,
      rules,
      formRef,
      onSubmit,
      openRePassWordForm
    }
  
  }



  export function useLogout(){

    const router = useRouter()
    const store = useStore()

    function handleLogout() {
      showModel('确定退出登录嘛？').then(res => {
        logout().finally(() => {
          store.dispatch("logout")
          // 跳转回登录页
          router.push("/login")
          // 提示退出登录成功
          toast("退出登录成功")
      })
      })
    }
    return handleLogout
  }
