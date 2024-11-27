import { createApp } from 'vue';
import App from './App.vue';
import 'element-plus/theme-chalk/src/message.scss';
import 'element-plus/theme-chalk/src/message-box.scss';
import './styles/index.scss';
import router from './router';
import pinia from './store';
import directive from '@/directive';
import VXETable from 'vxe-table';
import 'vxe-table/lib/style.css';
import 'default-passive-events';
import 'virtual:svg-icons-register';
import iconSprite from '@/assets/icons/svgSprite/sprite.svg';

console.log('%cZsAdmin', 'font-size: 54px;font-weight: bold; color: #16A085;');
function useTable(app: App) {
  app.use(VXETable);
}

const app = createApp(App);

// 挂载
app.config.globalProperties.$iconSprite = iconSprite;

app.use(pinia);
app.use(router);
app.use(directive);
app.use(useTable);
app.mount('#app');
