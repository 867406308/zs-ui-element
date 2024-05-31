import request from '@/utils/request';

export function dictTypePage(params: any) {
  return request({
    url: '/system/sys/dictType/page',
    method: 'get',
    params,
  });
}
export function dictDataPage(params: any) {
  return request({
    url: '/system/sys/dictData/page',
    method: 'get',
    params,
  });
}
export function getDictTypeList() {
  return request({
    url: '/system/sys/dictType/list',
    method: 'get',
  });
}

export function getDictTypeById(id: string) {
  return request({
    url: `/system/sys/dictType/${id}`,
    method: 'get',
  });
}

export function getDictDataById(id: string) {
  return request({
    url: `/system/sys/dictData/${id}`,
    method: 'get',
  });
}

export function dictTypeSave(data: any) {
  return request({
    url: '/system/sys/dictType/save',
    method: 'post',
    data,
  });
}

export function dictDataSave(data: any) {
  return request({
    url: '/system/sys/dictData/save',
    method: 'post',
    data,
  });
}

export function dictTypeEdit(data: any) {
  return request({
    url: '/system/sys/dictType/update',
    method: 'put',
    data,
  });
}
export function dictDataEdit(data: any) {
  return request({
    url: '/system/sys/dictData/update',
    method: 'put',
    data,
  });
}
export function dictTypeDelete(id: string) {
  return request({
    url: '/system/sys/dictType/' + id,
    method: 'delete',
  });
}

export function dictDataDelete(id: string) {
  return request({
    url: '/system/sys/dictData/' + id,
    method: 'delete',
  });
}

export function dictDataList(params: any) {
  return request({
    url: '/system/sys/dictData/list',
    method: 'get',
    params,
  });
}
