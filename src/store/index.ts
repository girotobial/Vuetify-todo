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
    ],
    snackbar: {
      show: false,
      text: ""
    }
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
    },
    updateTaskTitle(state, payload) {
      const task = state.tasks.filter(task => task.id === payload.id)[0];
      task.title = payload.title;
    },
    showSnackBar(state, text: string) {
      let timeout = 0;
      if (state.snackbar.show) {
        state.snackbar.show = false;
        timeout = 300;
      }
      setTimeout(() => {
        state.snackbar.show = true;
        state.snackbar.text = text;
      }, timeout);
    },
    hideSnackBar(state) {
      state.snackbar.show = false;
    }
  },
  actions: {
    addTask({ commit }, newTaskTitle: string) {
      commit("addTask", newTaskTitle);
      commit("showSnackBar", "Task added!");
    },
    deleteTask({ commit }, id: number) {
      commit("deleteTask", id);
      commit("showSnackBar", "Task deleted!");
    }
  }
});
