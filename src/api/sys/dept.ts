import request from '@/utils/request';

// 获取部门
export function getDeptTree(params: any) {
  return request({
    url: '/system/sys/dept/tree',
    method: 'get',
    params,
  });
}

export function getById(id: string) {
  return request({
    url: `/system/sys/dept/${id}`,
    method: 'get',
  });
}

export function save(data: any) {
  return request({
    url: '/system/sys/dept/save',
    method: 'post',
    data,
  });
}

export function edit(data: any) {
  return request({
    url: '/system/sys/dept/update',
    method: 'put',
    data,
  });
}

export function remove(id: string) {
  return request({
    url: '/system/sys/dept/' + id,
    method: 'delete',
  });
}

export function getDeptPostTree() {
  return request({
    url: '/system/sys/dept/getDeptPostTree',
    method: 'get',
  });
}
