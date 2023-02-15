import { getinfo } from '~/api/manage.js'
import { createStore } from 'vuex'
import {removeToken} from '~/composables/auth.js'


// 创建一个新的 store 实例
const store = createStore({
  state () {
    return {
        // 用户信息
     user:{},
      
    //  收起侧边菜单 侧边宽度（变化）
    asideWidth:"250px",

        // menu 菜单数据
        menus:{},
        ruleNames:{}
    }
  },
  mutations: {
    // 记录用户信息 
    SET_USERINFO(state,user){
        state.user = user
    },

    SET_MENUS(state,menus){
        state.menus = menus
    },

    SET_RULENAMES(state,ruleNames){
      state.ruleNames = ruleNames
    },
    
    // 展开/收起侧边
    handleAsideWidth(state){
       switch (state.asideWidth) {
        case '250px':
          state.asideWidth = '64px'
          break;
       
        case '64px':
          state.asideWidth = '250px'
          break;
       }
    }      
  },
  actions:{
    // 封装 登录时获取用户信息
    getinfo({commit}){
         // 获取用户相关信息
        return new Promise((resolve,reject) => {
            getinfo().then(result => {
                // 获取到信息后将信息传给 vuex/store
                commit("SET_USERINFO", result)
                commit("SET_MENUS",result.menus)
                commit("SET_RULENAMES",result.ruleNames)
                resolve(result)
              }).catch(err => reject(err))
        })
    },

    // 退出登录
    logout({commit}){
        // 移除 cookie 里的 token
        removeToken()
      // 清楚当前用户状态 即 清楚 user 里面的信息
    //   调用 mutations 并传空对象
      commit('SET_USERINFO',{})
    }
  }
})

export default store