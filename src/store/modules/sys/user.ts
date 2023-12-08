import { defineStore } from 'pinia';
import { setToken, removeToken } from '@/utils/token';
import { userLogin } from '@/api/login/login';
import { getUserInfo } from '@/api/sys/user';
import { routersStore } from '@/store/modules/router';
import router from '@/router';

export const useUserStore = defineStore('user', {
  state: () => {
    return {
      username: '',
      realName: '',
      avatar: '',
      token: '',
      permissions: [],
    };
  },
  getters: {
    getPermissions() {
      return this.permissions;
    },
  },
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
      this.username = data.sysUser.username;
      this.realName = data.sysUser.realName;
      this.avatar = data.sysUser.avatar;
      this.permissions = data.permissions ?? [];
    },
    logOut() {
      const useRoutersStore = routersStore();
      useRoutersStore.clearRoutes();
      // 清除token
      removeToken();
      router.push('/login');
    },
  },
});
