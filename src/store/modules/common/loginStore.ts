import { defineStore } from 'pinia';
import { setAccessToken, setRefreshToken, removeToken } from '@/utils/token';
import { userLogin } from '@/api/login/login';
import { getUserInfo } from '@/api/sys/user';
import { routersStore } from '@/store/modules/common/router';
import { tabsStore } from '@/store/modules/common/tabs';
import router from '@/router';
import { sm2Encrypt, sm2Decrypt } from '@/utils/cryptoUtils';
import { websocketStore } from '@/store/modules/common/websocketStore';

export const loginStore = defineStore('loginStore', {
  state: () => {
    return {
      username: '',
      realName: '',
      avatar: '',
      accessToken: '',
      refreshToken: '',
      permissions: [],
    };
  },
  getters: {
    getPermissions() {
      return this.permissions;
    },
  },
  actions: {
    setAccessToken(token: string) {
      this.accessToken = token;
      setAccessToken(token);
    },
    setRefreshToken(token: string) {
      this.refreshToken = token;
      setRefreshToken(token);
    },
    async login(form: any) {
      const { data } = await userLogin(sm2Encrypt(form));
      this.setAccessToken(data?.accessToken);
      this.setRefreshToken(data?.refreshToken);
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
