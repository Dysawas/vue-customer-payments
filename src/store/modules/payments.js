import axios from "axios";

// root state object.
// each Vuex instance is just a single state tree.
const state = {
  payments: [],
  types: [],
  sources: [],
  statuses: [],
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
  setSources(state, sources) {
    state.sources = sources;
  },
  setTypes(state, types) {
    state.types = types;
  },
  setStatuses(state, statuses) {
    state.statuses = statuses;
  },
};

// actions are functions that cause side effects and can involve
// asynchronous operations.
const actions = {
  getAllPaymentsAsync: ({ commit }) => {
    axios
      .get("https://tests.szapi.ru/ts14/public_html/payments")
      .then((response) => commit("setPayments", response.data));
    axios
      .get("https://tests.szapi.ru/ts14/public_html/form_tss")
      .then((response) => {
        commit("setSources", response.data.sources);
        commit("setTypes", response.data.types);
        commit("setStatuses", response.data.statuses);
      });
  },
  filterByDate: ({ commit }, date) => {
    console.log(date);
    axios
      .get(`https://tests.szapi.ru/ts14/public_html/payments?date=${date}`)
      .then((response) => commit("setPayments", response.data));
  },
  filterBySourceId: ({ commit }, source_id) => {
    console.log(source_id);
    axios
      .get(
        `https://tests.szapi.ru/ts14/public_html/payments?source_id=${source_id}`
      )
      .then((response) => commit("setPayments", response.data));
  },
  filterPayments: ({ commit }, { date, source_id }) => {
    if (date && source_id) {
      axios
        .get(
          `https://tests.szapi.ru/ts14/public_html/payments?date=${date}&source_id=${source_id}`
        )
        .then((response) => commit("setPayments", response.data));
    } else if (date) {
      axios
        .get(`https://tests.szapi.ru/ts14/public_html/payments?date=${date}`)
        .then((response) => commit("setPayments", response.data));
    } else if (source_id) {
      axios
        .get(
          `https://tests.szapi.ru/ts14/public_html/payments?source_id=${source_id}`
        )
        .then((response) => commit("setPayments", response.data));
    }
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
