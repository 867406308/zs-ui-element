import request from '@/utils/request';

export function noticePage(params: any) {
  return request({
    url: '/system/sys/notice/page',
    method: 'get',
    params,
  });
}

export function save(data: any) {
  return request({
    url: '/system/sys/notice/save',
    method: 'post',
    data,
  });
}
export function edit(data: any) {
  return request({
    url: '/system/sys/notice/update',
    method: 'put',
    data,
  });
}

export function del(id: String) {
  return request({
    url: '/system/sys/notice/' + id,
    method: 'delete',
  });
}
export function getById(id: string) {
  return request({
    url: `/system/sys/notice/${id}`,
    method: 'get',
  });
}

/**
 * 获取最新通知
 * @param num
 */
export function getLimit(num: number) {
  return request({
    url: `/system/sys/notice/limit/${num}`,
    method: 'get',
  });
}
