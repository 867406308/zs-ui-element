import request from '@/utils/request';

// 获取菜单导航
export function getNav() {
  return request({
    url: '/system/sys/menu/nav',
    method: 'get',
  });
}
// 获取菜单列表
export function getList(params: any) {
  return request({
    url: '/system/sys/menu/list',
    method: 'get',
    params,
  });
}

export function getById(id: string) {
  return request({
    url: `/system/sys/menu/${id}`,
    method: 'get',
  });
}

export function save(data: any) {
  return request({
    url: '/system/sys/menu/save',
    method: 'post',
    data,
  });
}

export function edit(data: any) {
  return request({
    url: '/system/sys/menu/update',
    method: 'put',
    data,
  });
}

export function del(id: string) {
  return request({
    url: '/system/sys/menu/' + id,
    method: 'delete',
  });
}
