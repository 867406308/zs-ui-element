import request from '@/utils/request';

// 用户密码登录
export function userLogin(data: any) {
  return request({
    url: '/auth/login',
    method: 'post',
    data,
  });
}
