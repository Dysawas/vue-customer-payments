import { createStore } from "vuex";
import payments from "./modules/payments";

export default createStore({
  modules: {
    payments,
  },
});
