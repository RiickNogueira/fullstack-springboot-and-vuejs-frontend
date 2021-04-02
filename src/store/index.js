import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: { drawer: true },
  mutations: {
    toggleMenu(state, isVisible) {
      if (isVisible === undefined) {
        state.drawer = !state.drawer;
      } else {
        state.drawer = isVisible;
      }
    },
  },
  actions: {},
  modules: {},
});
