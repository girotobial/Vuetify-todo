import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    search: "",
    tasks: [
      {
        id: 0,
        title: "Wake up",
        done: false,
        dueDate: "2020-10-16"
      },
      {
        id: 1,
        title: "Get bananas",
        done: false,
        dueDate: "2020-10-17"
      },
      {
        id: 2,
        title: "Eat bananas",
        done: false,
        dueDate: null
      }
    ],
    snackbar: {
      show: false,
      text: ""
    }
  },
  mutations: {
    setSearch(state, value: string) {
      state.search = value;
    },
    addTask(state, newTaskTitle: string) {
      const newTask = {
        id: Date.now(),
        title: newTaskTitle,
        done: false,
        dueDate: null
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
    updateTaskDueDate(state, payload) {
      const task = state.tasks.filter(task => task.id === payload.id)[0];
      task.dueDate = payload.dueDate;
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
    },
    updateTaskTitle({ commit }, payload) {
      commit("updateTaskTitle", payload);
      commit("showSnackBar", "Task updated!");
    },
    updateTaskDueDate({ commit }, payload) {
      commit("updateTaskDueDate", payload);
      commit("showSnackBar", "Due Date updated!");
    }
  },
  getters: {
    tasksFiltered(state) {
      if (!state.search) {
        return state.tasks;
      } else {
        return state.tasks.filter(task =>
          task.title.toLowerCase().includes(state.search.toLowerCase())
        );
      }
    }
  }
});
