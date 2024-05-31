import request from '@/utils/request';

export function page(params: any) {
  return request({
    url: '/fixedAssets/assets/scrap/page',
    method: 'get',
    params,
  });
}

export function getById(id: string) {
  return request({
    url: `/fixedAssets/assets/scrap/${id}`,
    method: 'get',
  });
}
/**
 * 新增资产报废
 * @param data
 * @returns
 */
export function add(data: any) {
  return request({
    url: '/fixedAssets/assets/scrap/save',
    method: 'post',
    data,
  });
}
