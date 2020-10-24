 const urls = {
   qrLoginImg: '/login/getLoginUrl', // 获取二维码登录图片
   qrLogin: '/login/getLoginInfo', // 获取二维码登录情况
   userInfo: '/userInfo', // 用户信息
 }


 const fns = {
   login() {
     return axios.get(urls.qrLoginImg)
   },
   qrLogin(){
    return axios.get(urls.qrLogin)
   }

 }


 export default XHRData;