import { defineStore } from 'pinia';

export const websocketStore = defineStore('websocket', {
  state: () => {
    return {
      ws: null,
      isConnected: false,
      message: '',
      messages: [],
    };
  },
  actions: {
    connectWebsocket(userId: string) {
      console.log('我刷新一下', this.isConnected);
      if (!this.isConnected) {
        let url = import.meta.env.VITE_BASE_URL;
        let newUrl = url.replace(/^https?:\/\//, '');
        console.log(newUrl);
        this.ws = new WebSocket(
          'ws://' + newUrl + '/websocket/' + userId + '/pc',
        );
        this.ws.onopen = () => {
          this.isConnected = true;
          console.log('websocket连接成功aaa', this.isConnected);
        };
        this.ws.onopen = () => this.websocketOnOpen();
        this.ws.onerror = (error) => this.websocketOnError(error);
        this.ws.onmessage = (e) => this.websocketOnMessage(e);
        this.ws.onclose = (e) => this.websocketOnClose(e);
      }
    },
    websocketOnOpen() {
      console.log('WebSocket连接成功');
      this.isConnected = true;
      console.log('websocket连接成功aaa', this.isConnected);
    },
    websocketOnError(error) {
      console.log('WebSocket发生错误：', error);
    },
    websocketOnMessage(e) {
      console.log('WebSocket接收到消息：', e.data);
      this.messages.push(e.data);
    },
    websocketOnClose(e) {
      console.log('WebSocket连接关闭：', e);
    },
    closeWebSocket() {
      console.log('关闭WebSocket连接111');
      // if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      //   this.ws.close();
      //   this.isConnected = false;
      //   console.log('WebSocket连接已关闭');
      // }
    },
    sendMessage(message) {
      this.ws.send(message);
    },
  },
});
