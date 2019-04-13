import Vue from "vue";
import Vuex from "vuex";
import * as getters from "./getters";
import * as actions from "./actions";
import * as mutations from "./mutations";

Vue.use(Vuex);

const state = {
  is: {
    initAuth: null,
    login: null,
    setupDB: null
  },
  snapshot: {
    reg: null,
    qus: null,
    check: null
  },
  key: {
    reg: {},
    qus: {},
    check: {}
  },
  list: {
    reg: [],
    qus: [],
    check: []
  },
  pagination: {},
  search: null
};

const store = new Vuex.Store({
  state,
  getters,
  actions,
  mutations,
  strict: process.env.NODE_ENV !== "production"
});

if (module.hot) {
  module.hot.accept(["./getters", "./actions", "./mutations"], () => {
    store.hotUpdate({
      getters: require("./getters"),
      actions: require("./actions"),
      mutations: require("./mutations")
    });
  });
}

export default store;
