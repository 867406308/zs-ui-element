import request from '@/utils/request';

export function logLoginPage(params: any) {
  return request({
    url: '/system/sys/log/login/page',
    method: 'get',
    params,
  });
}

export function logErrorPage(params: any) {
  return request({
    url: '/system/sys/log/error/page',
    method: 'get',
    params,
  });
}

export function logOperationPage(params: any) {
  return request({
    url: '/system/sys/log/operation/page',
    method: 'get',
    params,
  });
}
