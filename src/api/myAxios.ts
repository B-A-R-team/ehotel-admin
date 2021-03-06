import axios from 'axios';

import storageUtils from '../utils/storageUtils';
import { message } from 'antd';
// Add a request interceptor 阻截器
axios.interceptors.request.use(function (config) {
  // Do something before request is sent
  const timestamp = storageUtils.getTime();

  if (Number(timestamp) < Date.now()) {
    storageUtils.clearAll();
  }

  const token = storageUtils.getToken();
  if (token) {
    config.headers.Authorization = token;
  }
  // const { method, data } = config;
  // if (method && method.toLowerCase() === 'post' && typeof data === 'object') {
  //   config.data = JSON.stringify(data);
  // }
  return config;
});
//响应拦截器
axios.interceptors.response.use(
  function (response) {
    return response.data;
  },
  function (error) {
    console.log(error);
    message.error('请求出错' + error.message);
    return new Promise(() => {});
  }
);
export default axios;
