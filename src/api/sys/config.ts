import request from '@/utils/request';

// 修改配置
export function edit(data: any) {
  return request({
    url: '/system/sys/config/update',
    method: 'post',
    data,
  });
}

// 获取网站信息配置
export function getWebsiteInfo() {
  return request({
    url: '/system/sys/config/website',
    method: 'get',
  });
}

// 获取文件上传配置
export function getUploadConfig() {
  return request({
    url: '/system/sys/config/file',
    method: 'get',
  });
}

// 获取邮件配置
export function getMailConfig() {
  return request({
    url: '/system/sys/config/mail',
    method: 'get',
  });
}

// 获取短信配置
export function getSmsConfig() {
  return request({
    url: '/system/sys/config/sms',
    method: 'get',
  });
}

// 获取支付配置
export function getPayConfig() {
  return request({
    url: '/system/sys/config/pay',
    method: 'get',
  });
}

// 获取其他配置
export function getOtherConfig() {
  return request({
    url: '/system/sys/config/other',
    method: 'get',
  });
}
