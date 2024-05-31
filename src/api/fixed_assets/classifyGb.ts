import request from '@/utils/request';

export function getClassifyGbTree(params: any) {
  return request({
    url: '/fixedAssets/assets/classifyGb/tree',
    method: 'get',
    params,
  });
}
export function getById(id: string) {
  return request({
    url: `/fixedAssets/assets/classifyGb/${id}`,
    method: 'get',
  });
}

export function save(data: any) {
  return request({
    url: '/fixedAssets/assets/classifyGb/save',
    method: 'post',
    data,
  });
}

export function edit(data: any) {
  return request({
    url: '/fixedAssets/assets/classifyGb/update',
    method: 'put',
    data,
  });
}
export function remove(id: string) {
  return request({
    url: '/fixedAssets/assets/classifyGb/' + id,
    method: 'delete',
  });
}
