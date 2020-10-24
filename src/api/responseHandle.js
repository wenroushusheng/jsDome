export default function (response) {
  let res = response.data;
  if (res.code === 0 || res.ch) {
    return res.data || res;
  } else if (res.status == 10) {
    if (location.hash != '#/index') {
      window.location.href = '/#/login';
      return Promise.reject(res);
    }
  } else {
    return Promise.reject(res)
  }
}

 