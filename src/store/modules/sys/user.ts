import { defineStore } from 'pinia';
import { setToken, removeToken } from '@/utils/token';
import { userLogin } from '@/api/login/login';
import { getUserInfo } from '@/api/sys/user';
import router from '@/router';

export const useUserStore = defineStore('user', {
  state: () => {
    return {
      username: '',
      realName: '',
      avatar: '',
      token: '',
    };
  },
  getters: {},
  actions: {
    setToken(token: string) {
      this.token = token;
      setToken(token);
    },
    async login(form: any) {
      const { data } = await userLogin(form);
      this.setToken(data);
    },
    async getUserInfo() {
      const { data } = await getUserInfo();
      console.log('获取个人信息', data);
      this.username = data.sysUser.username;
      this.realName = data.sysUser.realName;
      this.avatar = data.sysUser.avatar;
    },
    logOut() {
      // 清除token
      console.log(router.getRoutes());
      removeToken();
      router.push('/login');
    },
  },
});
