const POST = 'post',
  GET = 'get';

const XHRData = {
  qrLoginImg: ['/login/getLoginUrl'], // 获取二维码登录图片
  qrLogin: ['/login/getLoginInfo', POST], // 获取二维码登录情况
  userInfo: ['/userInfo'], // 用户信息
  sendMsg: ['/vc/web_im/v1/web_im/send_msg', POST], // 发送私信
  oldMsg: ['/vc/svr_sync/v1/svr_sync/fetch_session_msgs'], // 歷史私信
  unread: ['/vc/session_svr/v1/session_svr/single_unread'], // 未读私信
  newMsg: ['/vc/session_svr/v1/session_svr/new_sessions'], // 新私信
  search: ['/search/'], // 搜索
  followings: ['/pro/relation/followings'], // 关注
  followers: ['/pro/relation/followers'], // 粉丝
  xxx: ['/xxx'],
}
//  has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource
Object.keys(XHRData)
  .map(key => XHRData[key])
  .filter(val => val.length === 1)
  .forEach(val => val.push(GET));

export default XHRData;