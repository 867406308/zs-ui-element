import axios from 'axios';
import { ElMessage } from 'element-plus';
import router from '@/router';
import { removeToken, getAccessToken, getRefreshToken } from '@/utils/token';
import { randomSm4Key } from '@/utils/cryptoUtils';
import { cryptoStore } from '@/store/modules/common/cryptoStore';
import { sm2Encrypt } from '@/utils/cryptoUtils';

const instance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL, //'http://39.101.195.100:8085/api', //
  timeout: 60000,
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
  },
});

// 添加请求拦截器
instance.interceptors.request.use(
  (request) => {
    // 登录接口，添加sm4key
    if (request.url === '/auth/login') {
      // 生成随机sm4key
      cryptoStore().setSm4Key(randomSm4Key());
      // 添加sm4key到请求头
      request.headers.cryptoKey = sm2Encrypt(cryptoStore().sm4Key);
    }
    // 在发送请求之前做些什么
    const accessToken = getAccessToken();
    if (accessToken) {
      // 添加 accessToken 到请求头
      request.headers.Authorization = `Bearer ${accessToken}`;
    }
    return request;
  },
  function (error) {
    console.log('error', error);
    // 对请求错误做些什么
    return Promise.reject(error);
  },
);

// 添加响应拦截器
instance.interceptors.response.use(
  (response) => {
    // console.log('response', response);
    // blob类型直接返回response
    if (['blob', 'arraybuffer'].includes(response.request.responseType)) {
      return response.data;
    }
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    let code = response?.data?.code;
    switch (code) {
      case 200:
        return response?.data;
      default:
        ElMessage({
          message: `${response.data.msg}`,
          type: 'warning',
        });
        return;
    }
    return response.data;
  },
  (error) => {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    const status: number = error.response?.status;
    const message: any =
      {
        400: '请求错误',
        401: '未授权，请登录',
        403: '拒绝访问',
        404: `请求地址出错: ${error.response?.config.url}`,
        408: '请求超时',
        500: '服务器内部错误',
        501: '服务未实现',
        502: '网关错误',
        503: '服务不可用',
        504: '网关超时',
        505: 'HTTP版本不受支持',
      }[status] || '网络连接异常,请检查网络情况。';

    ElMessage({ message, type: 'error' });
    if (status === 401) {
      removeToken();
      router.push('/login');
    }

    return Promise.reject(error);
  },
);

export default instance;
