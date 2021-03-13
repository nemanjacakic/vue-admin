import Vue from "vue";
import Vuex from "vuex";

import auth from "./modules/auth.js";
import users from "./modules/users.js";
import roles from "./modules/roles.js";

import NProgress from "nprogress";

import { LOADING, FULL_PAGE_LOADING, SET_DRAWER } from "~/store/mutation-types";

Vue.use(Vuex);

NProgress.configure({ showSpinner: false });

export default new Vuex.Store({
  state: {
    loading: false,
    fullPageLoading: false,
    drawer: true
  },
  mutations: {
    [LOADING](state, loading) {
      state.loading = loading;

      if (loading === true) {
        NProgress.start();
      } else {
        NProgress.done();
        NProgress.remove();
      }
    },
    [FULL_PAGE_LOADING](state, fullPageLoading) {
      state.fullPageLoading = fullPageLoading;

      if (fullPageLoading === true) {
        NProgress.start();
      } else {
        NProgress.done();
        NProgress.remove();
      }
    },
    [SET_DRAWER](state, value) {
      state.drawer = value;
    }
  },
  modules: {
    auth,
    users,
    roles
  }
});
