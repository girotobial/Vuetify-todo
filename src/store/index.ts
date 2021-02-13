import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    tasks: [
      {
        id: 0,
        title: "Wake up",
        done: false
      },
      {
        id: 1,
        title: "Get bananas",
        done: false
      },
      {
        id: 2,
        title: "Eat bananas",
        done: false
      }
    ]
  },
  mutations: {},
  actions: {}
});
