import "./plugins/vuetify";
import "./mixin/recomputed";

import App from "./App.vue";
import Vue from "vue";
import VueRouter from "vue-router";
import router from "./router";
import store from "./store";

Vue.config.productionTip = false;

Vue.use(VueRouter);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
