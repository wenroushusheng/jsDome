import axios from 'axios'
import qs from 'Qs'

import { getObjOwnVal } from '@/util/es.js'
import responseHandle from './responseHandle'
import urls from './url.js'
import sendXHR from './sendXHR.js'

axios.interceptors.response.use(responseHandle);
// axios.defaults.baseURL = '/bili';
axios.defaults.timeout = 8000;
axios.defaults.withCredentials = true;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.headers.get['Content-Type'] = 'application/json; charset=utf-8';
axios.defaults.transformRequest = data => qs.stringify(data);


export default function (baseArg, ...args) {
  const [url, method] = getObjOwnVal(urls, baseArg);
  return axios[method](url, ...args);
}