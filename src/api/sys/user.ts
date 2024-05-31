import request from '@/utils/request';

// 获取用户信息
export function getUserInfo() {
  return request({
    url: '/system/sys/user/getUserInfo',
    method: 'get',
  });
}

export function userPage(params: any) {
  return request({
    url: '/system/sys/user/page',
    method: 'get',
    params,
  });
}

export function getUserList(params: any) {
  return request({
    url: '/system/sys/user/list',
    method: 'get',
    params,
  });
}

export function getById(id: string) {
  return request({
    url: `/system/sys/user/${id}`,
    method: 'get',
  });
}

export function save(data: any) {
  return request({
    url: '/system/sys/user/save',
    method: 'post',
    data,
  });
}

export function edit(data: any) {
  return request({
    url: '/system/sys/user/update',
    method: 'put',
    data,
  });
}

export function resetPassword(data: any) {
  return request({
    url: '/system/sys/user/resetPassword',
    method: 'put',
    data,
  });
}
export function del(id: string) {
  return request({
    url: '/system/sys/user/' + id,
    method: 'delete',
  });
}

export function exportExcel(params: any) {
  return request({
    url: '/system/sys/user/export',
    method: 'get',
    params,
    responseType: 'blob',
  });
}
