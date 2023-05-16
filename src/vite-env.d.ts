/// <reference types="vite/client" />
// 解决typescript 不能引入.vue后缀
declare module '*.vue' {
  import { DefineComponent } from 'vue';
  const component: DefineComponent<{}, {}, any>;
  export default component;
}
