/**
 * 手机号验证
 */
export const isMobile = (s: string) => {
  return /^1[0-9]{10}$/.test(s);
};

/**
 * 邮箱验证
 */
export const isEmail = (s: string) => {
  return /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((.[a-zA-Z0-9_-]{2,3}){1,2})$/.test(s);
};

/**
 * 密码验证
 */
export const isPassword = (s: string) => {
  // return /^(?![0-9a-zA-Z]+$)[a-zA-Z0-9~!@#$%^&*?_-]{6,12}$/.test(s);
  return s.length >= 6;
};

/**
 * 电话号码验证
 */
export const isPhone = (s: string) => {
  return /^([0-9]{3,4}-)?[0-9]{7,8}$/.test(s);
};

/**
 * 是否是数组
 */
export const isArray = (arr: any) => {
  return Object.prototype.toString.call(arr) === '[object Array]';
};
