// 根据不同权限是否展示页面某些组件
import store from  "~/store"

function hasPermission(value,el=false){
    // 检查传入的参数是否是数组
    if(!Array.isArray(value)){
        throw new Error(`需要配置权限,例如 v-permission="['getStatistics3,GET']"`)
    }
    // 判断保存在 store 里面的 ruleNames 数组中是否有value 内的数组参数值
   const hasAuth =  value.findIndex(v =>  store.state.ruleNames.includes(v)) != -1
    // 如果有这个节点但是没权限 就删除这个子节点   
   if(el && !hasAuth){
    el.parentNode && el.parentNode.removeChild(el)
   }
   return hasAuth
}


export default {
    install(app){
        app.directive('permission',{
            mounted(el,binding) {
               hasPermission( binding.value,el)
            },
        })
    }
}