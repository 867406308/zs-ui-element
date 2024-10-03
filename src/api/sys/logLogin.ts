import request from '@/utils/request';

export function logLoginPage(params: any) {
  return request({
    url: '/system/sys/log/login/page',
    method: 'get',
    params,
  });
}

export function logLoginToday(data: any) {
  return request({
    url: '/system/sys/log/login/todayList',
    method: 'get',
    data,
  });
}

export function exportExcel(params: any) {
  return request({
    url: '/system/sys/log/login/export',
    method: 'get',
    params,
    responseType: 'blob',
  });
}
