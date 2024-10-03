import request from '@/utils/request';

export function page(params: any) {
  return request({
    url: '/system/sys/job/page',
    method: 'get',
    params,
  });
}

export function save(data: any) {
  return request({
    url: '/system/sys/job/save',
    method: 'post',
    data,
  });
}

export function edit(data: any) {
  return request({
    url: '/system/sys/job/update',
    method: 'put',
    data,
  });
}

export function getById(id: string) {
  return request({
    url: `/system/sys/job/${id}`,
    method: 'get',
  });
}

export function del(data: any) {
  return request({
    url: '/system/sys/job/delete',
    method: 'post',
    data,
  });
}

export function batchDel(data: any) {
  return request({
    url: '/system/sys/job',
    method: 'delete',
    data,
  });
}

export function pause(data: any) {
  return request({
    url: '/system/sys/job/pause',
    method: 'post',
    data,
  });
}

export function resume(data: any) {
  return request({
    url: '/system/sys/job/resume',
    method: 'post',
    data,
  });
}

export function run(data: any) {
  return request({
    url: '/system/sys/job/run',
    method: 'post',
    data,
  });
}

export function logPage(params: any) {
  return request({
    url: '/system/sys/job/log/page',
    method: 'get',
    params,
  });
}
