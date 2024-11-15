import request from '@/utils/request';

export function page(params: any) {
  return request({
    url: '/fixedAssets/assets/inventory/page',
    method: 'get',
    params,
  });
}
export function save(data: any) {
  return request({
    url: '/fixedAssets/assets/inventory/createInventoryTask',
    method: 'post',
    data,
  });
}

export function getById(id: string) {
  return request({
    url: `/fixedAssets/assets/inventory/${id}`,
    method: 'get',
  });
}
