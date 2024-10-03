import { sm4, sm2 } from 'sm-crypto';
import { stringToHex } from './stringUtils';
import { cryptoStore } from '@/store/modules/common/cryptoStore';
console.log('111');

const key: string = '5010d0bbd0b56f65';
// 公钥
const public_key: string =
  '04babc11e13cac8eec36457420c5fd7ee5ae2ce21df6a8907dbce8f667750a7069ab6054a6db718daa0b0bb49808db150704dff5d39358513ac472bee04120274e';
// 私钥
const private_key: string =
  '6a487bdb1e5752edbadd893fc21484d2c1f66ef9b062b607c3df3fb839c07efe';

/**
 * 随机sm4密钥
 */
export const randomSm4Key = () => {
  const randomString = stringToHex(generateRandomString(16));
  return randomString;
};

/**
 * SM4加密方法
 * @param data 需要加密的数据
 * @returns
 */
export const sm4Encrypt = (data: string) => {
  const useCryptoStore = cryptoStore();
  return sm4.encrypt(JSON.stringify(data), useCryptoStore.sm4Key);
};

/**
 * SM4解密方法
 * @param data 需要解密的数据
 * @returns
 */
export const sm4Decrypt = (data: string) => {
  const useCryptoStore = cryptoStore();
  const decryptedText = sm4.decrypt(data, useCryptoStore.sm4Key);
  return decryptedText.trim() === '' ? '' : JSON.parse(decryptedText);
};

/**
 * SM2加密方法
 * @param data 需要加密的数据
 * @returns
 */
export const sm2Encrypt = (data: string) => {
  return '04' + sm2.doEncrypt(JSON.stringify(data), public_key, 1);
};

/**
 * SM2解密方法
 * @param data 需要解密的数据
 * @returns
 */
export const sm2Decrypt = (data: string) => {
  return sm2.doDecrypt(data, private_key);
};

const generateRandomString = (length: number) => {
  var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var result = '';
  for (var i = length; i > 0; --i) {
    result += chars[Math.floor(Math.random() * chars.length)];
  }
  return result;
};
