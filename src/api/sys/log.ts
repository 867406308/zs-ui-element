import request from '@/utils/request';

export function logLoginPage(params: any) {
  return request({
    url: '/system/sys/log/login/page',
    method: 'get',
    params,
  });
}
