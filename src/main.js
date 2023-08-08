import './assets/main.css';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useCurrencyStore  } from './stores/store'; 

import { createApp } from 'vue';
import { createPinia } from "pinia";
import route from "./router";
import App from './App.vue';

const app = createApp(App);
app.use(createPinia());
app.use(route);
app.provide('currencyStore', useCurrencyStore ());
app.mount("#app");
