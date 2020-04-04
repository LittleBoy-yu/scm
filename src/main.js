// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import { mapState } from 'vuex'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import store from '@/store/index.js'
import '@/util/api.js'
import Cookies from 'js-cookie'
import $ from 'jquery'
Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.prototype.$axios=axios
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
  data: {
    path:''
  },
  mounted() {
    var that = this
    //设置超时退出
    let did =false
      var currentTime = new Date().getTime();
      var timeOut = 30 * 60 * 1000; //设置超时时间： 10分
      // $(function(){
      //     /* 鼠标移动事件 */
      //     $(document).mouseover(function(){
      //         lastTime = new Date().getTime(); //更新操作时间

      //     });
      // });
      function testTime(){
          let lastTime = sessionStorage.getItem('time');
          if(lastTime==null||did==true){
            return
          }else{
            currentTime = new Date().getTime(); //更新当前时间
            if(currentTime - lastTime > timeOut){ //判断是否超时
                alert("无操作时间过长,请重新登录");
                Cookies.remove("account");
                Cookies.remove("token");
                Cookies.remove("models");
                 that.$router.push({
                   path:"/"
                 })
                did =true
          }else{did=false}
          }
      }

      /* 定时器  间隔1秒检测是否长时间未操作页面  */
      window.setInterval(testTime, 1000);
  },
})

router.beforeEach((to, from, next) => {
  if(to.meta.requireAuth){
    // console.log("to",to);
    // console.log("from",from);
    let account = Cookies.get('account')
    if(account){
      next()
    }else{
      alert("请先登录")
      next({
        path:'/',
        // query:{redirect:to.fullPath}
      })
    }
  }else{
    next()
  }
  })
