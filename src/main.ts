import { createApp } from 'vue';
import App from './App.vue';
import 'uno.css';
import 'element-plus/theme-chalk/src/message.scss';
import 'element-plus/theme-chalk/src/message-box.scss';
// import './styles/zs.scss';
import './styles/index.scss';
import router from './router';
import pinia from './store';
import directive from '@/directive';
import VXETable from 'vxe-table';
import 'vxe-table/lib/style.css';

console.log('%cZsAdmin', 'font-size: 54px;font-weight: bold; color: #16A085;');
function useTable(app: App) {
  app.use(VXETable);
}
const app = createApp(App);
app.use(pinia);
app.use(router);
app.use(directive);
app.use(useTable);
app.mount('#app');
