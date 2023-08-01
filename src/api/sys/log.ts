import request from '@/utils/request';

export function logLoginPage(params: any) {
  return request({
    url: '/sys/log/login/page',
    method: 'get',
    params,
  });
}
