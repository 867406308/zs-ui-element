import request from '@/utils/request';

export function page(params: any) {
  return request({
    url: '/fixedAssets/assets/inventory/details/page',
    method: 'get',
    params,
  });
}
