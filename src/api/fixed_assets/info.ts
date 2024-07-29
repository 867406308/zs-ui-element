import request from '@/utils/request';

export function queryAssetsInfoPage(params: any) {
  return request({
    url: '/fixedAssets/assets/info/page',
    method: 'get',
    params,
  });
}

export function getById(id: string) {
  return request({
    url: `/fixedAssets/assets/info/${id}`,
    method: 'get',
  });
}

export function save(data: any) {
  return request({
    url: '/fixedAssets/assets/info/save',
    method: 'post',
    data,
  });
}

export function stockIn(data: any) {
  return request({
    url: '/fixedAssets/assets/info/stockIn',
    method: 'post',
    data,
  });
}

export function getBySerialNoList(data: any) {
  return request({
    url: '/fixedAssets/assets/info/getBySerialNoList',
    method: 'post',
    data,
  });
}

export function getTotalPrice() {
  return request({
    url: `/fixedAssets/assets/info/getTotalPrice`,
    method: 'get',
  });
}

export function exportExcel(params: any) {
  return request({
    url: '/fixedAssets/assets/info/export',
    method: 'get',
    params,
    responseType: 'blob',
  });
}
