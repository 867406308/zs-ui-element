import request from '@/utils/request';

export function postPage(params: any) {
  return request({
    url: '/system/sys/post/page',
    method: 'get',
    params,
  });
}

// 获取岗位列表
export function getList(params: any) {
  return request({
    url: '/system/sys/post/list',
    method: 'get',
    params,
  });
}

export function getById(id: string) {
  return request({
    url: `/system/sys/post/${id}`,
    method: 'get',
  });
}

export function save(data: any) {
  return request({
    url: '/system/sys/post/save',
    method: 'post',
    data,
  });
}

export function edit(data: any) {
  return request({
    url: '/system/sys/post/update',
    method: 'put',
    data,
  });
}

export function del(id: String) {
  return request({
    url: '/system/sys/post/' + id,
    method: 'delete',
  });
}
