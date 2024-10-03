import Cookies from 'js-cookie';

const accessToken = 'access_token';
const refreshToken = 'refresh_token';
/**
 * 获取accessToken
 */
export function getAccessToken() {
  return Cookies.get(accessToken);
}
/**
 * 设置accessToken
 */
export function setAccessToken(token: string) {
  Cookies.set(accessToken, token);
}

/**
 * 获取refreshToken
 */
export function getRefreshToken() {
  return Cookies.get(refreshToken);
}
/**
 * 设置refreshToken
 */
export function setRefreshToken(token: string) {
  Cookies.set(refreshToken, token);
}

/**
 * 移除token
 */
export function removeToken() {
  Cookies.remove(accessToken);
  Cookies.remove(refreshToken);
}

export function hashToken() {
  return !!Cookies.get(accessToken);
}
