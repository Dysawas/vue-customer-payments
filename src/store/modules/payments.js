import axios from "axios";

// root state object.
// each Vuex instance is just a single state tree.
const state = {
  payments: [],
  types: [],
  sources: [],
  statuses: [],
  isOpenModal: false
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
  setIsOpenModal(state) {
    state.isOpenModal = !state.isOpenModal
  },
  addPayment(state, payment) {
    state.payments.push(payment)
  }
};

// actions are functions that cause side effects and can involve
// asynchronous operations.
const actions = {
  postPayment: ({ commit }, payment) => {
    axios.post(" https://tests.szapi.ru/ts14/public_html/payments", { ...payment }, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((response) => {
        commit("addPayment", response.data)
        commit("setIsOpenModal")
      })
  },
  getAllPaymentsAsync: async ({ commit }) => {
    await axios
    .get("https://tests.szapi.ru/ts14/public_html/form_tss")
    .then((response) => {
      commit("setSources", response.data.sources);
      commit("setTypes", response.data.types);
      commit("setStatuses", response.data.statuses);
    });
    await axios
      .get("https://tests.szapi.ru/ts14/public_html/payments")
      .then((response) => commit("setPayments", response.data));
   
  },
  filterPayments: ({ commit }, { date, source_id }) => {
    if (date && source_id && source_id !== "0") {
      axios
        .get(
          `https://tests.szapi.ru/ts14/public_html/payments?date=${date}&source_id=${source_id}`
        )
        .then((response) => commit("setPayments", response.data));
    } else if (date) {
      axios
        .get(`https://tests.szapi.ru/ts14/public_html/payments?date=${date}`)
        .then((response) => commit("setPayments", response.data));
    } else if (source_id && source_id !== "0") {
      axios
        .get(
          `https://tests.szapi.ru/ts14/public_html/payments?source_id=${source_id}`
        )
        .then((response) => commit("setPayments", response.data));
    } else {
      axios
        .get("https://tests.szapi.ru/ts14/public_html/payments")
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
