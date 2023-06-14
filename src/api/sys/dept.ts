import request from '@/utils/request';

// 获取部门
export function getDeptTree() {
  return request({
    url: '/sys/dept/tree',
    method: 'get',
  });
}

export function getById(id: string) {
  return request({
    url: `/sys/dept/${id}`,
    method: 'get',
  });
}

export function save(data: any) {
  return request({
    url: '/sys/dept/save',
    method: 'post',
    data,
  });
}

export function edit(data: any) {
  return request({
    url: '/sys/dept/update',
    method: 'put',
    data,
  });
}

export function remove(id: string) {
  return request({
    url: '/sys/dept/' + id,
    method: 'delete',
  });
}
