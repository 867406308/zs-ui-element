import axios from 'axios';
import { ElMessage } from 'element-plus';
import router from '@/router';
import { removeToken, getToken } from '@/utils/token';

const instance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL, //'http://39.101.195.100:8085/api', //
  timeout: 60000,
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
  },
});

let loadingInstance;

// loading开始 方法
function startLoading() {
  // element-ui loading 服务调用方式
  loadingInstance = ElLoading.service({
    lock: true,
    text: '拼命加载中...',
    spinner: 'el-icon-loading', // 自定义图标
    background: 'rgba(0, 0, 0, 0.8)',
  });
}

// loading结束 方法
function endLoading() {
  loadingInstance.close();
}

// 添加请求拦截器
instance.interceptors.request.use(
  (config) => {
    // 在发送请求之前做些什么
    const token = getToken();
    if (token) {
      // 添加 token 到请求头
      config.headers.Authorization = `Bearer ${token}`;
    }
    startLoading();
    return config;
  },
  function (error) {
    endLoading();
    // 对请求错误做些什么
    return Promise.reject(error);
  },
);

// 添加响应拦截器
instance.interceptors.response.use(
  (response) => {
    endLoading();
    // blob类型直接返回response
    if (
      response.request.responseType === 'blob' ||
      response.request.responseType === 'arraybuffer'
    ) {
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
          message: `${response.data.msg} ${response.data.data ?? ''}`,
          type: 'warning',
        });
        return;
    }
    return response.data;
  },
  (error) => {
    endLoading();
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
