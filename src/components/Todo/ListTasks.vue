<template>
  <v-list class="pt-0" flat>
    <draggable tag="ul" v-model="tasks" handle=".handle">
      <task v-for="task in tasks" :key="task.id" :task="task" />
    </draggable>
  </v-list>
</template>

<script>
import Task from "@/components/Todo/Task.vue";
import draggable from "vuedraggable";

export default {
  components: {
    task: Task,
    draggable
  },
  computed: {
    tasks: {
      get() {
        return this.$store.getters.tasksFiltered;
      },
      set(value) {
        this.$store.dispatch("setTasks", value);
      }
    }
  }
};
</script>
