import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import createCache from 'vuex-cache';

Vue.use(Vuex);

const state = {
  users: [],
  newUsers: [],
};

export const mutations = {
  userList(users) {
    state.users = users;
  },

  newUser(user) {
    state.newUsers.push(user);
  },
};

export const actions = {
  userList({ commit }) {
    return new Promise((resolve, reject) => {
      axios.get('/fetchUsers')
        .then((result) => {
          commit('userList', result.data?.json);
          resolve(result.data?.json);
        })
        .catch(() => { reject(); });
    });
  },

  newUser({ commit }, user) {
    commit('newUser', user);
  },
};

export const getters = {
  users: () => state.users,
};

export default new Vuex.Store({
  plugins: [createCache()],
  state,
  mutations,
  actions,
  getters,
});
