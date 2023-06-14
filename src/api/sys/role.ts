import request from '@/utils/request';

export function rolePage(params: any) {
  return request({
    url: '/sys/role/page',
    method: 'get',
    params,
  });
}

// 获取角色
export function getList() {
  return request({
    url: '/sys/role/list',
    method: 'get',
  });
}

export function getById(id: string) {
  return request({
    url: `/sys/role/${id}`,
    method: 'get',
  });
}

export function save(data: any) {
  return request({
    url: '/sys/role/save',
    method: 'post',
    data,
  });
}

export function edit(data: any) {
  return request({
    url: '/sys/role/update',
    method: 'put',
    data,
  });
}
