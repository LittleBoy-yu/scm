import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import Cookies from 'js-cookie'

const qs = require('querystring')
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loginUser: Cookies.get('username'),
    token: Cookies.get('token'),
    models:Cookies.get('models')
},
mutations: { //同步数据放到这里
  setLogin(state, payload){
    state.loginUser = payload
},
setToken(state, payload){
    state.token = payload
},
setModels(state, payload){
  state.models =payload
}
},
actions: { //异步数据放到这里 axios一般都异步
  login({commit}, payload){
    return new Promise((resolve, reject) => {
        axios({
            url: 'api/sys/login',
            method: 'post',
            data: qs.stringify(payload)
        }).then(resp => {
          console.log(resp.data.data.user.models)
       
            let result = resp.data;
            let arr=""
            result.data.user.models.map(item=>{
              arr+=item.modelCode
            })
            console.log(arr);
            
            
            if(result.code===2){
                // 提交mutation:更改state
                
                
                commit('setLogin', result.data.user.account)
                commit('setToken', result.data.token)
                commit('setModels', result.data.user.models)
                // Cookie存储
              
                Cookies.set('account', result.data.user.account)
                Cookies.set('token', result.data.token)
                Cookies.set('models', arr)
              
                resolve(result.data)
            }else{
                reject(result.message)
            }
        }).catch(error => {
            console.log(error);
            reject(error)
        })
    })
}
}
})