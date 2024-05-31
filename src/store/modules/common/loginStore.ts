import { defineStore } from 'pinia';
import { setToken, removeToken } from '@/utils/token';
import { userLogin } from '@/api/login/login';
import { getUserInfo } from '@/api/sys/user';
import { routersStore } from '@/store/modules/common/router';
import { tabsStore } from '@/store/modules/common/tabs';
import router from '@/router';
import { websocketStore } from '@/store/modules/common/websocketStore';

export const loginStore = defineStore('loginStore', {
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
      // const useWebsocketStore = websocketStore();
      // useWebsocketStore.connectWebsocket(data.sysUser.sysUserId);
    },
    logOut() {
      console.log('退出登录');
      const useRoutersStore = routersStore();
      useRoutersStore.clearRoutes();
      const useTabsStore = tabsStore();
      useTabsStore.resetStore();
      const useWebsocketStore = websocketStore();
      useWebsocketStore.closeWebSocket();
      // 清除token
      removeToken();
      router.push('/login');
    },
  },
});
