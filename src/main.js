import './assets/main.css';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import { createApp } from 'vue/dist/vue.esm-bundler';
import { createPinia } from "pinia";
import route from "./router";
import App from './App.vue';
import i18n from './i18n';

const app = createApp(App);
app.use(createPinia());
app.use(route);
app.use(i18n);
app.mount("#app");