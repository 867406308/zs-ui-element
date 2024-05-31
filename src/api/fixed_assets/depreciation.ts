import request from '@/utils/request';

export function page(params: any) {
  return request({
    url: '/fixedAssets/assets/depreciation/page',
    method: 'get',
    params,
  });
}

/**
 * 资产折旧明细分页查询
 * @param params
 * @returns
 */
export function detailsPage(params: any) {
  return request({
    url: '/fixedAssets/assets/depreciation/details/page',
    method: 'get',
    params,
  });
}

export function oneKeyDepreciation(data: any) {
  return request({
    url: '/fixedAssets/assets/depreciation/oneKeyDepreciation',
    method: 'post',
    data,
  });
}
