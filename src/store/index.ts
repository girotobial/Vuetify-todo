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
  mutations: {
    addTask(state, newTaskTitle: string) {
      const newTask = {
        id: Date.now(),
        title: newTaskTitle,
        done: false
      };
      state.tasks.push(newTask);
    },
    doneTask(state, id: number) {
      const task = state.tasks.filter(task => task.id === id)[0];
      task.done = !task.done;
    },
    deleteTask(state, id: number) {
      state.tasks = state.tasks.filter(task => task.id !== id);
    }
  },
  actions: {}
});
