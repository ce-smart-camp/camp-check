import * as actions from "./actions";
import * as getters from "./getters";
import * as mutations from "./mutations";

import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const state = {
  is: {
    login: null
  },
  unsubscribe: {
    login: null,
    reg: null,
    qus: null,
    check: null,
    role: null,
    ownRole: null
  },
  key: {
    reg: {},
    qus: {},
    check: {},
    role: {}
  },
  list: {
    reg: [],
    qus: [],
    check: [],
    role: []
  },
  wait: [],
  pagination: {},
  search: null,
  role: {
    name: null,
    surname: null,
    nickname: null,
    email: null,
    q1: false,
    q2: false,
    check: false,
    more: false
  }
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
