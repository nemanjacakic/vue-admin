import roles from "~/api/roles.js";

import {
  SET_ROLES
} from "~/store/mutation-types";


const store = {
  namespaced: true,
  state: {
    roles: []
  },
  mutations: {
    [SET_ROLES](state, roles) {
      state.roles = roles;
    }
  },
  actions: {
    getAll({ commit }, params) {
      return roles
        .getAll(params)
        .then(response => {
          commit(SET_ROLES, response.data);

          return response;
        })
        .catch(error => {
          return Promise.reject(error);
        });
    }
  }
};

export default store;
