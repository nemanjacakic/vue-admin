import users from "~/api/users.js";

import {
  SET_USERS,
  ADD_USER,
  REMOVE_USER
} from "~/store/mutation-types";


const store = {
  namespaced: true,
  state: {
    users: [],
    usersMeta: {
      current_page: 1,
      from: 1,
      last_page: 1,
      per_page: 10,
      to: 1,
      total: 0
    },
  },
  mutations: {
    [SET_USERS](state, response) {
      state.users = response.data;
      state.usersMeta = response.meta;
    },
    [ADD_USER](state, user){
      state.users.push(user);
    },
    [REMOVE_USER](state, id) {
      state.users = state.users.filter(user => id !== user.id);
    }
  },
  actions: {
    get(_, id) {
      return users
        .get(id)
        .then(response => {
          return response.data;
        })
        .catch(error => {

          return Promise.reject(error);
        });
    },
    getAll({ commit }, params) {
      return users
        .getAll(params)
        .then(response => {
          commit(SET_USERS, response);

          return response;
        })
        .catch(error => {
          return Promise.reject(error);
        });
    },
    store({ commit }, data) {
      return users
        .store(data)
        .then(response => {
          commit(ADD_USER, response);

          return response;
        })
        .catch(({ response })  => {
          return Promise.reject(response.data);
        });
    },
    update(_, user) {
      return users
        .update(user)
        .then(response => {
          return response.data;
        })
        .catch(error => {
          return Promise.reject(error);
        });
    },
    destroy({ commit }, id) {
      return users
        .destroy(id)
        .then(response => {
          commit(REMOVE_USER, id);

          return response.data;
        })
        .catch(error => {
          return Promise.reject(error);
        });
    }
  }
};

export default store;
