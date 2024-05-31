import request from '@/utils/request';

export function getClassifySchoolTree(params: any) {
  return request({
    url: '/fixedAssets/assets/classifySchool/tree',
    method: 'get',
    params,
  });
}
export function getById(id: string) {
  return request({
    url: `/fixedAssets/assets/classifySchool/${id}`,
    method: 'get',
  });
}

export function save(data: any) {
  return request({
    url: '/fixedAssets/assets/classifySchool/save',
    method: 'post',
    data,
  });
}

export function edit(data: any) {
  return request({
    url: '/fixedAssets/assets/classifySchool/update',
    method: 'put',
    data,
  });
}
export function remove(id: string) {
  return request({
    url: '/fixedAssets/assets/classifySchool/' + id,
    method: 'delete',
  });
}
