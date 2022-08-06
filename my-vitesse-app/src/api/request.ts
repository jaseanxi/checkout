//对于axios二次封装  使用请求和响应拦截器
import axios from "axios"
//引入进度条
// import nprogress from "nprogress";
//start 进度条开始  done：进度条结束
// import store from '~/store';
//引入进度条样式
import "nprogress/nprogress.css";
//利用axios对象的方法create 去创建一个axios实例

//request就是axios 只不过稍微配置一下
const requests = axios.create({
  //基础路径
  baseURL: "/api",
  timeout: 50000,
})
//发请求之前，请求拦截器可以检测到，可以在请求发出去之前做一些事情

requests.interceptors.request.use((config) => {

  // //需要携带token给服务器
  // if (store.state.detail.uuid_token) {

  //   config.headers.userTempId = store.state.detail.uuid_token
  //   // console.log(config.headers.userTempId)
  // }

  // if (store.state.user.token) {
  //   config.headers.token = store.state.user.token
  // }


  return config;
})
requests.interceptors.response.use((res) => {


  return res.data
}, (error) => {

})
export default requests
