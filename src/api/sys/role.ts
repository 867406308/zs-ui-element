import request from '@/utils/request';

export function rolePage(params: any) {
  return request({
    url: '/system/sys/role/page',
    method: 'get',
    params,
  });
}

// 获取角色
export function getList() {
  return request({
    url: '/system/sys/role/list',
    method: 'get',
  });
}

export function getById(id: string) {
  return request({
    url: `/system/sys/role/${id}`,
    method: 'get',
  });
}

export function save(data: any) {
  return request({
    url: '/system/sys/role/save',
    method: 'post',
    data,
  });
}

export function edit(data: any) {
  return request({
    url: '/system/sys/role/update',
    method: 'put',
    data,
  });
}
export function del(id: string) {
  return request({
    url: '/system/sys/role/' + id,
    method: 'delete',
  });
}
