import request from '@/utils/request';

export function page(params: any) {
  return request({
    url: '/fixedAssets/assets/scrap/details/page',
    method: 'get',
    params,
  });
}

export function exportExcel(params: any) {
  return request({
    url: '/fixedAssets/assets/scrap/details/export',
    method: 'get',
    params,
    responseType: 'blob',
  });
}
