import { ref } from 'vue'
import {useRoute,onBeforeRouteUpdate,useRouter} from 'vue-router'
import { useCookies } from '@vueuse/integrations/useCookies';

export function useTabList() {
    const router = useRouter()
const route = useRoute()
const cookie = useCookies()

const activeTab = ref(route.path)
const tabList = ref([
  {
    title: '后台首页',
    path: '/',
  }
])

// 添加标签导航
function addTab(tab){
  let noTab = tabList.value.findIndex(t=> t.path == tab.path) == -1
  if(noTab){
    tabList.value.push(tab)
  }
  cookie.set("tabList",tabList.value)
}

 onBeforeRouteUpdate((to,from) => {
  // 添加后处于激活状态
  activeTab.value = to.path
    addTab({title:to.meta.title,
    path:to.path
    })
 })

// 点击页面跳转
const changeTab = (t) => {
  activeTab.value = t
  router.push(t)
}

// 初始化标签导航栏
function initTabList(){
  let tbs = cookie.get("tabList")
  if(tbs){
    tabList.value = tbs
  }
}
initTabList()


const removeTab = (t => {
  // t 表示当前点击的路由路径
  let tabs = tabList.value
  let a = activeTab.value
  if(a == t){
  tabs.forEach((tab,index) => {
    if(tab.path == t){
      const nextTab = tabs[index+1] || tabs[index-1]
      if(nextTab){
         a = nextTab.path
      }
    }
  })
}
  activeTab.value = a
  // 点击删除路由标签
  tabList.value = tabList.value.filter(tab => tab.path != t )

  cookie.set("tabList",tabList.value)
})

// 下拉菜单
 const handleClose = (c) => {
      switch (c) {
        case "clearAll":
          // 清楚全部只剩下首页 就需要把标签切换回首页
          activeTab.value = "/"
          // 过滤只剩下首页
          tabList.value = [{
            title: '后台首页',
            path: '/'
          }]
          break;
      
        case "clearOther":
          // 过滤只剩下首页和当前激活
          tabList.value =  tabList.value.filter(tab => tab.path == '/' || tab.path == activeTab.value)
          break;
      }
      cookie.set("tabList",tabList.value)
 }


 return {
    activeTab,
    tabList,
    changeTab,
    removeTab,
    handleClose
 }
}
