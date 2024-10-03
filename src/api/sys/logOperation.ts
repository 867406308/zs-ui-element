import request from '@/utils/request';

export function logOperationPage(params: any) {
  return request({
    url: '/system/sys/log/operation/page',
    method: 'get',
    params,
  });
}

export function exportExcel(params: any) {
  return request({
    url: '/system/sys/log/operation/export',
    method: 'get',
    params,
    responseType: 'blob',
  });
}
