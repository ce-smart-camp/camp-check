import Vue from "vue";
import "./plugins/vuetify";
import VueRouter from "vue-router";
import Vuex from "vuex";

import App from "./App.vue";

import router from "./router";
import store from "./store";

Vue.config.productionTip = false;

Vue.use(VueRouter);
Vue.use(Vuex);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
