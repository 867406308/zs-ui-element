import request from '@/utils/request';

export function logErrorPage(params: any) {
  return request({
    url: '/system/sys/log/error/page',
    method: 'get',
    params,
  });
}

export function exportExcel(params: any) {
  return request({
    url: '/system/sys/log/error/export',
    method: 'get',
    params,
    responseType: 'blob',
  });
}
