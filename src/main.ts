import { createApp } from 'vue';
import App from './App.vue';
import 'uno.css';
import 'element-plus/theme-chalk/src/message.scss';
import 'element-plus/theme-chalk/src/message-box.scss';
import router from './router';
import pinia from './store';

const app = createApp(App);
app.use(pinia);
app.use(router);
app.mount('#app');
