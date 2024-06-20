import request from '@/utils/request';

export function page(params: any) {
  return request({
    url: '/fixedAssets/assets/allot/page',
    method: 'get',
    params,
  });
}

export function getById(id: string) {
  return request({
    url: `/fixedAssets/assets/allot/${id}`,
    method: 'get',
  });
}

export function save(data: any) {
  return request({
    url: '/fixedAssets/assets/allot/save',
    method: 'post',
    data,
  });
}
