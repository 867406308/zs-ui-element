import request from '@/utils/request';

export function postPage(params: any) {
  return request({
    url: '/sys/post/page',
    method: 'get',
    params,
  });
}

export function getList() {
  return request({
    url: '/sys/post/list',
    method: 'get',
  });
}

export function getById(id: string) {
  return request({
    url: `/sys/post/${id}`,
    method: 'get',
  });
}

export function save(data: any) {
  return request({
    url: '/sys/post/save',
    method: 'post',
    data,
  });
}

export function edit(data: any) {
  return request({
    url: '/sys/post/update',
    method: 'put',
    data,
  });
}
