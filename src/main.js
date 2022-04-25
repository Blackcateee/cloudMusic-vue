import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import router from './router'
import store from './store'
import VueClipboard from 'vue-clipboard2'


createApp(App).use(store).use(router).use(VueClipboard).use(ElementPlus).mount('#app')
