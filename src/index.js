import { createApp } from "vue";
import { createStore } from "vuex";
import store from './vuex/store';
import App from "./App.vue";
import { router } from "./router/router";

const app = createApp(App);

app.use(createStore(store));
app.use(router);
app.mount("#app");