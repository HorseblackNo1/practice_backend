import { createApp } from "vue";
// import './style.css'
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

import "./styles/element-variables.scss";
import "@/styles/index.scss"; // global css

import router from "./router"; //引入 route table
import { createPinia } from 'pinia' //引入全局状态管理
import App from "./App.vue";

import './permission'

const app = createApp(App);

// 引入 elementPuls icon
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
app.use(ElementPlus);
app.use(router);
app.use(createPinia())
app.mount("#app");
