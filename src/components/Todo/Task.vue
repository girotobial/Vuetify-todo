<template>
  <div>
    <v-list-item
      @click="$store.commit('doneTask', task.id)"
      :class="{ 'blue lighten-5': task.done }"
    >
      <template v-slot:default>
        <v-list-item-action>
          <v-checkbox :input-value="task.done" color="primary"></v-checkbox>
        </v-list-item-action>

        <v-list-item-content>
          <v-list-item-title
            :class="{ 'text-decoration-line-through': task.done }"
            >{{ task.title }}</v-list-item-title
          >
        </v-list-item-content>
        <v-list-item-action>
          <task-menu />
        </v-list-item-action>
      </template>
    </v-list-item>
    <v-divider></v-divider>
    <dialog-delete
      v-if="dialogs.delete"
      :task="task"
      @close="dialogs.delete = false"
    />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import DialogDelete from "@/components/Todo/Dialogs/DialogDelete.vue";
import TaskMenu from "@/components/Todo/TaskMenu.vue";

export default Vue.extend({
  data() {
    return {
      dialogs: {
        delete: false
      }
    };
  },
  props: ["task"],
  components: {
    "dialog-delete": DialogDelete,
    "task-menu": TaskMenu
  }
});
</script>
