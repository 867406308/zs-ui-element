import request from '@/utils/request';

// 获取菜单
export function getList() {
  return request({
    url: '/sys/menu/list',
    method: 'get',
  });
}

export function getById(id: string) {
  return request({
    url: `/sys/menu/${id}`,
    method: 'get',
  });
}

export function save(data: any) {
  return request({
    url: '/sys/menu/save',
    method: 'post',
    data,
  });
}

export function edit(data: any) {
  return request({
    url: '/sys/menu/update',
    method: 'put',
    data,
  });
}

export function del(id: string) {
  return request({
    url: '/sys/menu/' + id,
    method: 'delete',
  });
}
