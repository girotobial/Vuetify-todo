import Vue from "vue";
import Vuex from "vuex";
import Localbase from "localbase";

const db = new Localbase("db");
db.config.debug = false;

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    search: "",
    appTitle: process.env.VUE_APP_TITLE,
    tasks: [],
    snackbar: {
      show: false,
      text: ""
    },
    sorting: false
  },
  mutations: {
    setSearch(state, value: string) {
      state.search = value;
    },
    addTask(state, newTask) {
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
    setTasks(state, tasks) {
      state.tasks = tasks;
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
    },
    toggleSorting(state) {
      state.sorting = !state.sorting;
    }
  },
  actions: {
    addTask({ commit }, newTaskTitle: string) {
      const newTask = {
        id: Date.now(),
        title: newTaskTitle,
        done: false,
        dueDate: null
      };
      db.collection("tasks")
        .add(newTask)
        .then(() => {
          commit("addTask", newTask);
          commit("showSnackBar", "Task added!");
        });
    },
    doneTask({ state, commit }, id: number) {
      const task = state.tasks.filter(task => task.id === id)[0];
      db.collection("tasks")
        .doc({ id: id })
        .update({
          done: !task.done
        })
        .then(() => {
          commit("doneTask", id);
        });
    },
    deleteTask({ commit }, id: number) {
      db.collection("tasks")
        .doc({ id: id })
        .delete()
        .then(() => {
          commit("deleteTask", id);
          commit("showSnackBar", "Task deleted!");
        });
    },
    updateTaskTitle({ commit }, payload) {
      db.collection("tasks")
        .doc({ id: payload.id })
        .update({
          title: payload.title
        })
        .then(() => {
          commit("updateTaskTitle", payload);
          commit("showSnackBar", "Task updated!");
        });
    },
    updateTaskDueDate({ commit }, payload) {
      db.collection("tasks")
        .doc({ id: payload.id })
        .update({
          dueDate: payload.dueDate
        })
        .then(() => {
          commit("updateTaskDueDate", payload);
          commit("showSnackBar", "Due Date updated!");
        });
    },
    setTasks({ commit }, tasks) {
      db.collection("tasks").set(tasks);
      commit("setTasks", tasks);
    },
    getTasks({ commit }) {
      db.collection("tasks")
        .get()
        .then(tasks => {
          commit("setTasks", tasks);
        });
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
