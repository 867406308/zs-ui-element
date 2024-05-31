import request from '@/utils/request';

export function page(params: any) {
  return request({
    url: '/fixedAssets/assets/allot/page',
    method: 'get',
    params,
  });
}
