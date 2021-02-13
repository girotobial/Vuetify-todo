<template>
  <v-list class="pt-0" flat>
    <draggable tag="ul" :list="$store.getters.tasksFiltered" handle=".handle">
      <task
        v-for="task in $store.getters.tasksFiltered"
        :key="task.id"
        :task="task"
      />
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
  }
};
</script>
