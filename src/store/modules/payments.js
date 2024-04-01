import axios from "axios";

// root state object.
// each Vuex instance is just a single state tree.
const state = {
  payments: [],
};

// mutations are operations that actually mutate the state.
// each mutation handler gets the entire state tree as the
// first argument, followed by additional payload arguments.
// mutations must be synchronous and can be recorded by plugins
// for debugging purposes.
const mutations = {
  setPayments(state, payments) {
    state.payments = payments;
  },
};

// actions are functions that cause side effects and can involve
// asynchronous operations.
const actions = {
  getAllPaymentsAsync: ({ commit }) => {
    axios
      .get("https://tests.szapi.ru/ts14/public_html/payments")
      .then((response) => commit("setPayments", response.data));
  },
};

// getters are functions.
const getters = {};

// A Vuex instance is created by combining the state, mutations, actions,
// and getters.
export default {
  state,
  getters,
  actions,
  mutations,
};
