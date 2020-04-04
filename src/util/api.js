import axios from 'axios'
import Vue from 'vue'
import Cookies from 'js-cookie'
axios.interceptors.request.use(function (config) {
    sessionStorage.setItem('time',new Date().getTime());
    // 添加请求头信息
    var token=Cookies.get('token')
    config.headers.Authorization = token;
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    let result = response.data;
    if(result.code===1){
        // console.log(Vue)
    }
    return response;
    
  }, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  });